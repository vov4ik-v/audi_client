<template>
        <form action="/reset/password/" class="form-reset">
            <h1 class="h3 mb-3 font-weight-normal" style="text-align: center"> Forgot your password?</h1>
            <input type="email" id="resetEmail" class="form-control" placeholder="Email address" required="" autofocus="">
            <button class="btn btn-primary btn-block" type="submit">Reset Password</button>
            <router-link to="/signin" custom v-slot="{navigate}"><a @click="navigate" href="#" id="cancel_signup"><i class="fas fa-angle-left"></i> Back</a></router-link>
        </form>
</template>

<script>
    export default {

    }
</script>

<style scoped>

</style>