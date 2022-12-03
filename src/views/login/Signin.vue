<template>
    <Form @submit="handleLogin" :validation-schema="schema" class="form-signin">
        <h1 class="h3 mb-3 font-weight-normal" style="text-align: center"> Sign in</h1>
<!--        <div class="social-login">-->
<!--            <button class="btn facebook-btn social-btn" type="button"><span><i-->
<!--                    class="fab fa-facebook-f"></i> Sign in</span></button>-->
<!--            <button class="btn google-btn social-btn" type="button"><span><i class="fab fa-google-plus-g"></i> Sign in </span>-->
<!--            </button>-->
<!--        </div>-->
        <p style="text-align:center"> OR </p>
        <div class="form-group">
            <Field type="username" id="inputEmail" class="form-control" name="username" placeholder="Email address"/>
            <ErrorMessage name="username" class="error-feedback"/>
        </div>
        <div class="form-group">
            <Field type="password" id="inputPassword" name="password" class="form-control" placeholder="Password"/>
            <ErrorMessage name="password" class="error-feedback"/>
        </div>
        <div class="form-group">
            <button :disabled="loading" class="btn btn-success btn-block">
             <span
                     v-if="loading"
                     class="spinner-border spinner-border-sm"
             ></span>
                <span v-else><i class="fas fa-sign-in-alt"></i>  Sign in</span>
            </button>
        </div>
        <div class="form-group">
            <div v-if="message" class="alert alert-danger" role="alert">
                {{ message }}
            </div>
        </div>
        <router-link to="/forgot" custom v-slot="{navigate}"><a @click="navigate" href="#" id="forgot_pswd">Forgot
            password?</a></router-link>

        <hr>
        <!-- <p>Don't have an account!</p>  -->
        <router-link to="/signup" custom v-slot="{navigate}">
            <button @click="navigate" class="btn btn-primary btn-block" type="button" id="btn-signup"><i
                    class="fas fa-user-plus"></i> Sign up New Account
            </button>
        </router-link>
    </Form>
</template>


<script>
    import {Form, Field, ErrorMessage} from "vee-validate";
    import * as yup from "yup";

    export default {
        components: {Form, Field, ErrorMessage},
        data() {
            const schema = yup.object().shape({
                username: yup.string().required("username is required!"),
                password: yup.string().required("Password is required!"),
            });
            return {
                loading: false,
                message: "",
                schema,
            };
        },
        computed: {
            loggedIn() {
                return this.$store.state.auth.initialState.status.loggedIn;
            },
            currentUserProfile(){
                return this.$store.getters['auth/getCurrentUserInfo']
            }
        },
        created() {
            if (this.loggedIn) {
                this.$router.push("/");
            }
        },
        methods: {
            async handleLogin(user) {
                this.loading = true;
                await this.$store.dispatch("auth/login", user).then(
                    (response) => {
                        this.$router.push("/");
                    },
                    (error) => {
                        console.log(error)
                        this.loading = false;
                        this.message =  error.response.data
                    }
                );
            },
        },
    }
</script>

<style scoped>

</style>