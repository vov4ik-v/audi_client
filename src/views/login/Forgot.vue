<template>
        <form @submit.prevent="resetPassword" class="form-reset">
            <h1 class="h3 mb-3 font-weight-normal" style="text-align: center"> Forgot your password?</h1>
            <label for="resetEmail"></label><input type="email" id="resetEmail" class="form-control" placeholder="Email address" v-model="email" required="" autofocus="">
            <button class="btn btn-primary btn-block" :disabled="loader" type="submit"><span
                    v-if="loader"
                    class="spinner-border spinner-border-sm"
            ></span><span v-else>Reset Password</span></button>
            <router-link to="/signin" custom v-slot="{navigate}"><a @click="navigate" href="#" id="cancel_signup"><i class="fas fa-angle-left"></i> Back</a></router-link>
        </form>
</template>

<script>
    import UserService from '../../services/user.service'
    import * as sweetalert from "sweetalert";

    export default {
        data(){
            return{
                loader:false,
                email:""
            }
        },
        methods:{
            resetPassword(){
                this.loader = true;
                UserService.resetPassword(this.email).then(
                    (response) => {
                        if(response.status === 200){
                             sweetalert({ icon:'success',title: 'Success!', text: 'Please check your email'});
                                this.loader = false
                        }
                    },
                    (error) => {
                        sweetalert({ icon:'error',title: 'Error!', text: error.response.data});
                        this.loader = false
                    })
            }

        }
    }
</script>

<style scoped>

</style>