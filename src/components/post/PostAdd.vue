<template>
    <div class="modal fade" :id="modalId" tabindex="-1"
         aria-labelledby="postAddLabel"
         aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered" id="myModal" style="">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title text-center" id="postAddLabel">Create Post</h5>
                    <button type="button" id="close" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="submit">
                    <div class="form-group">
                        <div class="mb-3 d-flex flex-column">
                            <img class="post-image img-fluid mb-3" :src="showImg" alt="">
                            <div class="btn btn-rounded justify-content-center">
                                <input type="file" ref="file" @change="onFileChange($event)">
                            </div>
                        </div>
                        <label for="textarea" class="form-label">Title</label>
                        <input type="text" class="form-control" v-model="newPost.title" required>
                        <label for="textarea" class="form-label">Location</label>
                        <input type="text" class="form-control" v-model="newPost.location">
                        <label for="textarea" class="form-label">Caption</label>
                        <textarea id="textarea"
                                  class="form-control ml-1 shadow-none textarea" v-model="newPost.caption"></textarea>
                        <button class="btn-primary">Create</button>
                    </div>
                    </form>
                </div>

            </div>
        </div>
    </div>

</template>

<script>
    import PostService from '../../services/post.service'
    export default {
        props: ["modalId"],
        data() {
            return {
                imgToShow: null,
                imgToUpload:null,
                newPost:{
                    title:"",
                    location:"",
                    caption:"",
                    postImage:""
                }
            }
        },
        methods: {
            submit(){
                if(this.imgToShow != null) {
                    this.newPost.postImage = this.imgToShow
                    console.log(this.newPost)
                    PostService.createPost(this.newPost).then(data => {
                        if (data.data.id != null && this.imgToUpload != null && this.imgToShow != null) {
                            this.$store.dispatch('imageUploadModule/uploadImageToPost', {
                                postId: data.data.id,
                                image: this.imgToUpload
                            })
                        }

                    })
                    this.$store.dispatch('postModule/getAllPostsForUser');
                    this.newPost = {}
                    this.imgToShow = null
                    this.imgToUpload = null
                }
            },
            onFileChange(e) {
                this.imgToUpload = e.target.files[0]
                this.isUpload = true;
                let file = e.target.files[0];
                let url = '';
                var reader = new FileReader();
                reader.readAsDataURL(file);
                let that = this;
                reader.onload = function (e) {
                    url = this.result.substring(this.result.indexOf(',') + 1);
                    that.imgToShow = url
                }
            },
        },
        computed: {
            showImg() {
                if (this.imgToShow != null) {
                    return 'data:image/png;base64,' + this.imgToShow
                } else {
                    return "https://kangsblackbeltacademy.com/wp-content/uploads/2017/04/default-image.jpg"
                }
            }
        }
    }
</script>

<style scoped>
    .post-button {
        align-self: center;
        width: 100px;

    }

    .post-image {
        align-self: center;
        width: 45%;
    }
</style>