<template>
    <!--    https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp-->
    <div class="container" id="toModal">
        <div class="rounded-top text-white d-flex flex-row" style="background-color: #000; height:200px;">
            <div class="ms-4 mt-5 d-flex flex-column">
                <img v-if="getProfileImage" :src="isCurrentUser ? getCurrentUserImage : getProfileImage"
                     alt="Generic placeholder image" class="img-fluid img-thumbnail mt-4 mb-2"
                     style="width: 150px; z-index: 1">

                <div class="d-flex">
                    <div v-if="isCurrentUser">
                        <button type="button" class="btn btn-outline-dark m-1" data-bs-toggle="modal"
                                data-bs-target="#changePhoto" data-mdb-ripple-color="dark"
                                style="z-index: 1;">
                            Change Photo
                        </button>
                        <button type="button" class="btn btn-outline-dark justify-content-end" data-bs-toggle="modal"
                                data-bs-target="#editProfile" data-mdb-ripple-color="dark"
                                style="z-index: 1;">
                            Edit profile

                        </button>
                    </div>
                    <div v-else>
                        <button type="button" class="btn btn-outline-dark m-1" data-mdb-ripple-color="dark"
                                style="z-index: 1;">
                            Follow
                        </button>
                        <button type="button" class="btn btn-outline-dark justify-content-end"
                                data-mdb-ripple-color="dark"
                                style="z-index: 1;">
                            Direct
                        </button>
                    </div>
                </div>
                <edit-profile modal-id="editProfile"></edit-profile>
                <change-photo modal-id="changePhoto"></change-photo>
            </div>
            <div class="ms-3" style="margin-top: 130px;">

            </div>
        </div>
        <div class="p-4 text-black" style="background-color: #f8f9fa;">
            <div class="d-flex justify-content-end text-center py-1">
            </div>
        </div>
        <div class="card-body p-4 text-black">
            <div class="mb-5">
                <p class="lead fw-normal mb-1">About</p>
                <div class="p-4" style="background-color: #f8f9fa;">
                    <h3 class="mb-1">{{isCurrentUser ? currentUser.username :getUserInfo.username}}</h3>
                    <p class="font-italic mb-1">{{isCurrentUser ? currentUser.firstname :getUserInfo.firstname}} {{isCurrentUser ? currentUser.lastname :getUserInfo.lastname}}</p>
                    <p class="font-italic mb-1">{{isCurrentUser ? currentUser.bio :getUserInfo.bio}}</p>
                </div>
            </div>
            <div class="d-flex justify-content-between align-items-center mb-4">
                <p class="lead fw-normal mb-0">Posts</p>
                <div v-if="isCurrentUser">
                    <p class="mb-0" data-bs-toggle="modal" data-bs-target="#postAddModal"><a class="text-muted">Add
                        post</a></p>
                    <post-add modal-id="postAddModal"></post-add>
                </div>
            </div>
            <section id="post" class="post">

                <div class="row">
                    <post-box v-for="post in getAllPostsForUser" :current-user-image="getCurrentUserImage"
                              :post-image="'data:image/png;base64,'+ post.postImage"
                              :profile-image="getProfileImage" :modal-id="'postDetailsWithId'+post.id" :post-info="post"
                              :profile-info="getUserInfo"
                    ></post-box>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
    import UserService from "../../services/user.service";
    import PostBox from "../../components/post/PostBox";
    import PostAdd from "../../components/post/PostAdd";
    import EditProfile from "../../components/user/EditProfile";
    import ChangePhoto from "../../components/user/ChangePhoto";

    export default {
        // props: ['user', 'userImage'],
        data() {
            return {
                content: "",
                previewImage: null,
                username: "",
                current: new Date()

            }
        },
        inject:['user','userImage'],
        components: {PostBox, PostAdd, EditProfile, ChangePhoto},
        computed: {
            getUserInfo() {
                return this.$store.getters["auth/getUserByUsername"];
            },
            getProfileImage() {
                let image = this.$store.getters['imageUploadModule/getUserImage']
                return 'data:image/png;base64,' + image.imageBytes
            },
            getCurrentUserImage() {
                return this.userImage.value
            },
            currentUser() {
                return this.user.value;
            },
            getAllPostsForUser() {
                return this.$store.getters['postModule/postsForUser'];
            },
            isCurrentUser() {
                return this.user.value.username === this.$route.params.username
            }

        },
        created() {
            if (!this.$store.state.auth.initialState) {
                console.log(this.$store.state.auth.initialState)
                this.$router.push('/signin');
            }
            this.username = this.$route.params.username

            this.$store.dispatch('postModule/getAllPostsForUserByUsername', this.username)
            this.$store.dispatch('imageUploadModule/getUserImage', this.username)
            this.$store.dispatch('auth/getUserByUsername', this.username)
            // this.$store.dispatch('imageUploadModule/getPostImage',28)
            //  this.$store.dispatch('imageUploadModule/getProfileImage')
            // // this.previewImage = 'data:image/png;base64,'+this.$store.dispatch('imageUploadModule/getProfileImage')
            // // console.log(this.previewImage)
            // // this.previewImage = this.getProfileImage

            // console.log(this.$store.getters['imageUploadModule/getProfileImage'])

        }
    }
</script>

<style scoped>
    .post {
        padding: 0
    }
</style>