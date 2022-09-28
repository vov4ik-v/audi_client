<template>
    <footer id="footer">
        <div class="footer-top">
            <div class="container">
                <div class="row">

                    <div class="col-lg-3 col-md-6">
                        <div class="footer-info">
                            <h3>AUDI</h3>
                            <div class="social-links mt-3">
                                <a href="#" class="twitter"><i class="bi bi-twitter"></i></a>
                                <a href="#" class="facebook"><i class="bi bi-facebook"></i></a>
                                <a href="#" class="instagram"><i class="bi bi-instagram"></i></a>
                                <a href="#" class="google-plus"><i class="bi bi-mailbox"></i></a>
                                <a href="#" class="linkedin"><i class="bi bi-linkedin"></i></a>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-2 col-md-6 footer-links">
                        <h4>Useful Links</h4>
                        <ul>
                            <li><i class="bx bx-chevron-right"></i> <a href="#">Home</a></li>
                            <li><i class="bx bx-chevron-right"></i> <a href="#">News</a></li>
                        </ul>
                    </div>

                    <div class="col-lg-3 col-md-6 footer-links">
                        <h4>Our Services</h4>
                        <ul>
                            <li><i class="bx bx-chevron-right"></i> <a href="#">Audi Assistants</a></li>
                            <li><i class="bx bx-chevron-right"></i> <a href="#">Another Service</a></li>
                        </ul>
                    </div>

                    <div class="col-lg-4 col-md-6 footer-newsletter">
                        <h4>Підписатись на обновлення</h4>
                        <form @submit.prevent="submitNewsletter">
                            <input type="email" v-model="email" name="email"><input type="submit" value="Subscribe">
                        </form>

                    </div>

                </div>
            </div>
        </div>
    </footer><!-- End Footer -->
</template>

<script>
    export default {
        data(){
            return{
                email:""

            }
        },
        methods:{
            submitNewsletter(){
                this.$store.dispatch("emailSender/addEmail", this.email)
                this.email=''
            }

        }
    }
</script>

<style scoped>

</style>