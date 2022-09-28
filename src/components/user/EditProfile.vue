<template>
    <div class="modal fade" :id="modalId" tabindex="-1"
         aria-labelledby="postAddLabel"
         aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered" id="myModal" style="">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title text-center text-black" id="postAddLabel">Edit Profile</h5>
                    <button type="button" class="btn-close" id="close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <form @submit.prevent="submit">
                        <label for="username" class="text-black">Username</label>
                        <input type="text" class="form-control" id="username" v-model="updatedUser.username">
                        <label for="firstName" class="text-black">First Name</label>
                        <input type="text" class="form-control" id="firstName" v-model="updatedUser.firstname">
                        <label for="lastName" class="text-black">Last Name</label>
                        <input type="text" class="form-control" id="lastName" v-model="updatedUser.lastname">
                        <label for="textarea" class="form-label text-black">Biography</label>
                        <textarea id="textarea"
                                  class="form-control ml-1 shadow-none textarea" v-model="updatedUser.bio"></textarea>
                            <button class="btn btn-primary">ok</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import UserService from "../../services/user.service";

    export default {
        props: ["modalId"],
        methods:{
            submit(){
                this.$store.dispatch("auth/updateUser",this.updatedUser)
            },
        },
        data() {
            return {
                updatedUser: "",

            }
        },
        computed: {
            currentUser() {
                return this.$store.getters['auth/getCurrentUserInfo'];
            }
        },
        created() {
            UserService.getUserBoard().then(
                (response) => {
                    this.updatedUser = response.data;
                    console.log(this.updatedUser)
                },
                (error) => {
                    this.updatedUser =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    console.log(this.updatedUser)
                }
            );

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
        width: 35%;
    }
</style>