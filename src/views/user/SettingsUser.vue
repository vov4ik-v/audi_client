<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-12 col-lg-10 col-xl-8 mx-auto">
                <h2 class="h3 mb-4 page-title">Settings</h2>
                <div class="my-4">
                    <ul class="nav nav-tabs mb-4" id="myTab" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="false">Profile</a>
                        </li>
                    </ul>
                    <form @submit.prevent="submit">
                        <div class="row mt-5 align-items-center">
                            <div class="col-md-3 text-center mb-5">
                                <div class="avatar avatar-xl">
                                    <img :src="getCurrentUserImage" alt="..." class="avatar-img rounded-circle" />
                                </div>
                            </div>
                            <div class="col">
                                <div class="row align-items-center">
                                    <div class="col-md-7">
                                        <h4 class="mb-1">{{updatedUser.username}}</h4>
                                        <p class="small mb-3"><span class="badge badge-dark">New York, USA</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr class="my-4" />
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="firstname">Firstname</label>
                                <input type="text" id="firstname" class="form-control" v-model="updatedUser.firstname" />
                            </div>
                            <div class="form-group col-md-6">
                                <label for="lastname">Lastname</label>
                                <input type="text" id="lastname" class="form-control" v-model="updatedUser.lastname" />
                            </div>
                        </div>
                        <hr class="my-4" />
                        <div class="row mb-4">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="inputPassword4">Old Password</label>
                                    <input type="password" class="form-control" v-model="oldPassword" id="inputPassword4" />
                                </div>
                                <div class="form-group">
                                    <label for="inputPassword5">New Password</label>
                                    <input type="password" class="form-control" v-model="newPassword" id="inputPassword5" />
                                </div>
                                <div class="form-group">
                                    <label for="inputPassword6">Confirm Password</label>
                                    <input type="password" class="form-control" v-model="confirmNewPassword" id="inputPassword6" />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <p class="mb-2">Password requirements</p>
                                <p class="small text-muted mb-2">To create a new password, you have to meet all of the following requirements:</p>
                                <ul class="small text-muted pl-4 mb-0">
                                    <li>Minimum 8 character</li>
                                    <li>At least one special character</li>
                                    <li>At least one number</li>
                                    <li>Can’t be the same as a previous password</li>
                                </ul>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary">Save Change</button>
                    </form>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import UserService from "../../services/user.service";

    export default {
            data(){
                return{
                    updatedUser:{},
                    oldPassword:"",
                    newPassword:"",
                    confirmNewPassword:""
                }
            },
        inject:['user','userImage'],
        methods:{
            submit(){
                if(this.oldPassword !== "" && this.newPassword !== "" && this.confirmNewPassword !== "" && this.newPassword === this.confirmNewPassword){
                        UserService.changePassword(this.oldPassword,this.newPassword)
                }
                this.$store.dispatch("auth/updateUser",this.updatedUser)
            },
        },
        computed:{
            getCurrentUserImage() {
                return this.userImage.value
            },
        },
        mounted() {
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

</style>