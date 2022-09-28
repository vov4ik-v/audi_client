<template>
    <Form @submit="handleRegister" :validation-schema="schema" class="form-signin">
        <div v-if="!successful">
        <h5 class="h3 mb-3 font-weight-normal" style="text-align: center"> Sign up</h5>
        <div class="social-login">
            <button class="btn facebook-btn social-btn" type="button"><span><i
                    class="fab fa-facebook-f"></i> Sign up</span></button>
            <button class="btn google-btn social-btn" type="button"><span><i
                    class="fab fa-google-plus-g"></i> Sign up</span></button>
        </div>

        <p style="text-align:center">OR</p>
        <div class="form-group">
            <Field type="text" id="user-firstname" name="firstname" class="form-control" placeholder="First name" required=""
                   autofocus="" />
            <ErrorMessage name="firstname" class="error-feedback"/>
        </div>
        <div class="form-group">
            <Field type="text" id="user-lastname" name="lastname" class="form-control" placeholder="Last name"
                   required=""  />
            <ErrorMessage name="lastname" class="error-feedback"/>
        </div>
        <div class="form-group">
            <Field type="email" id="user-email" name="email" class="form-control" placeholder="Email address" required=""/>
            <ErrorMessage name="email" class="error-feedback"/>
        </div>
        <div class="form-group">
            <Field type="text" id="nickname" name="username" class="form-control" placeholder="Nickname" required=""/>
            <ErrorMessage name="username" class="error-feedback"/>
        </div>
        <div class="form-group">
            <Field type="password" id="user-pass" name="password" class="form-control" placeholder="Password"  required=""/>
            <ErrorMessage name="password" class="error-feedback"/>
        </div>
        <div class="form-group">
            <Field type="password" id="user-repeatpass" name="confirmPassword" class="form-control" placeholder="Repeat Password"
                   autofocus="" required=""/>
            <ErrorMessage name="confirmPassword" class="error-feedback"/>
        </div>
        <div class="form-group">
        <button class="btn btn-primary btn-block" :disabled="loading">
            <span
                    v-if="loading"
                    class="spinner-border spinner-border-sm"
            ></span>
            <span v-else>
            <i class="fas fa-user-plus"></i> Sign Up
        </span>
        </button>
        </div>
        <div
                v-if="message"
                class="alert"
                :class="successful ? 'alert-success' : 'alert-danger'"
        >
            {{ message }}
        </div>
        <router-link to="/signin" custom v-slot="{navigate}"><a @click="navigate" href="#" id="cancel_signup"><i
                class="fas fa-angle-left"></i> Back</a></router-link>
        </div>
        <div v-else>Please login</div>
    </Form>

</template>

<script>
    import { Form, Field, ErrorMessage } from "vee-validate";
    import * as yup from "yup";
    export default {
        name: "Register",
        components: {
            Form,
            Field,
            ErrorMessage,
        },
        data() {
            const schema = yup.object().shape({
                email: yup
                    .string()
                    .required("email is required!")
                    .min(3, "Must be at least 3 characters!")
                    .max(60, "Must be maximum 20 characters!"),
                firstname: yup
                    .string()
                    .required("firstName is required!")
                    .max(50, "Must be maximum 50 characters!"),
                lastname: yup
                    .string()
                    .required("lastName is required!")
                    .max(40, "Must be maximum 40 characters!"),
                username: yup
                    .string()
                    .required("username is required!")
                    .max(20, "Must be maximum 20 characters!"),
                password: yup
                    .string()
                    .required("password is required!")
                    .max(50, "Must be maximum 50 characters!"),
                confirmPassword: yup
                    .string()
                    .required("confirmPassword is required!")
                    .max(40, "Must be maximum 40 characters!"),
            });
            return {
                successful: false,
                loading: false,
                message: "",
                schema,
            };
        },
        computed: {
            loggedIn() {
                return this.$store.state.auth.initialState.status.loggedIn;
                },
        },
        mounted() {
            if (this.loggedIn) {
                this.$router.push("/user");
            }
        },
        methods: {
            handleRegister(user) {
                this.message = "";
                this.successful = false;
                this.loading = true;
                this.$store.dispatch("auth/register", user).then(
                    (data) => {
                        this.message = data.message;
                        this.successful = true;
                        this.loading = false;
                        this.$router.push("/signin")
                    },
                    (error) => {
                        this.message =
                            error.response.data
                        console.log(error.response.data)
                        this.successful = false;
                        this.loading = false;
                    }
                );

            },
        },
    }
</script>

<style scoped>

</style>