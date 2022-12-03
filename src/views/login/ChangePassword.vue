<template>
    <Form @submit="handleChangePassword" :validation-schema="schema" class="form-signin">
        <div v-if="!successful">
            <h5 class="h3 mb-3 font-weight-normal" style="text-align: center">Change Password</h5>
            <div class="form-group">
                <Field type="password" id="user-pass" name="password" class="form-control" placeholder="Password"  required=""/>
                <ErrorMessage name="password" class="error-feedback"/>
            </div>
            <div class="form-group">
                <Field type="password" id="user-repeatpass" name="confirmPassword" class="form-control" placeholder="Repeat Password"
                       autofocus="" required=""/>
                <ErrorMessage name="confirmPassword" class="error-feedback"/>
            </div>
            <div class="form-group mt-1">
                <button class="btn btn-primary btn-block" :disabled="loading">
            <span
                    v-if="loading"
                    class="spinner-border spinner-border-sm"
            ></span>
                    <span v-else>
            <i class="fas fa-user-plus"></i> Change
        </span>
                </button>
            </div>
            <div
                    v-if="message"
                    class="alert mt-2"
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
    import UserService from '../../services/user.service'
    import * as sweetalert from "sweetalert";
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
        },
        mounted() {
        },
        methods: {
          handleChangePassword(data){
              this.loading = true
              this.message = ""
              console.log(this.$route.params.resetPasswordToken)
              if(data.password === data.confirmPassword) {
                  UserService.setNewPassword(this.$route.params.resetPasswordToken, data.password).then((response)=>{
                      if(response.status === 200){
                          sweetalert({ icon:'success',title: 'Success!', text: 'Password changed successful.Please login'});
                          this.loading = false
                      }
                  },
                  (error)=>{
                      sweetalert({ icon:'error',title: 'Error!', text: error.response.data});
                      this.loading = false
                  })
              }
              else {
                  this.message = "passwords don`t match"
                  this.successful = false
                  this.loading = false
              }

          }
        },
    }
</script>

<style scoped>

</style>