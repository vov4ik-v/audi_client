<template>
    <div class="modal fade" :id="modalId" tabindex="-1"
         aria-labelledby="postAddLabel"
         aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered" id="myModal" style="">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title text-center text-black" id="postAddLabel">Change Photo</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="submit">
                    <div class="form-group">
                        <div class="mb-3 d-flex flex-column">
                            <img class="post-image img-fluid mb-3" :src="showImg" alt="">
                            <div class="btn btn-rounded justify-content-center">
                                <input type="file" @change="onFileChange($event)">
                            </div>
                            <button class="btn-primary" data-bs-dismiss="modal">Change</button>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        props: ["modalId"],
        data() {
            return {
                imgToShow: null,
                imgToUpload:null,
            }
        },
        methods: {
            submit(){
                if (this.imgToUpload != null) {
                    this.$store.dispatch('imageUploadModule/uploadImageToUser', this.imgToUpload)
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
                    that.imgToShow = 'data:image/png;base64,' + url
                }
            },
        },
        computed: {
            showImg() {
                if (this.imgToShow != null) {
                    return this.imgToShow
                } else {
                    return "https://kangsblackbeltacademy.com/wp-content/uploads/2017/04/default-image.jpg"
                }
            }
        }
    }
</script>

<style scoped>
    .post-image {
        align-self: center;
        width: 35%;
    }
</style>