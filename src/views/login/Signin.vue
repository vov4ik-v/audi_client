<template>
    <form class="form-signin">
        <h1 class="h3 mb-3 font-weight-normal" style="text-align: center"> Sign in</h1>
        <div class="social-login">
            <button class="btn facebook-btn social-btn" type="button"><span><i class="fab fa-facebook-f"></i> Sign in</span> </button>
            <button class="btn google-btn social-btn" type="button"><span><i class="fab fa-google-plus-g"></i> Sign in </span> </button>
        </div>
        <p style="text-align:center"> OR  </p>
        <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="">
        <input type="password" id="inputPassword" class="form-control" placeholder="Password" required="">

        <button class="btn btn-success btn-block" type="submit"><i class="fas fa-sign-in-alt"></i> Sign in</button>
        <router-link to="/forgot" custom v-slot="{navigate}"><a @click="navigate" href="#" id="forgot_pswd">Forgot password?</a> </router-link>

        <hr>
        <!-- <p>Don't have an account!</p>  -->
        <router-link to="/signup" custom v-slot="{navigate}"><button @click="navigate" class="btn btn-primary btn-block" type="button" id="btn-signup"><i class="fas fa-user-plus"></i> Sign up New Account</button></router-link>
    </form>
</template>


<script>
    export default {

    }
</script>

<style scoped>

</style>