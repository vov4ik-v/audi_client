<template>
    <li @click="$emit('change-active-user',contact)" class="p-2 user-content "
    >
        <a class="d-flex  justify-content-between">
            <div class="d-flex flex-row">
                <img :src="image" alt="avatar"
                     class="rounded-circle d-flex align-self-center me-3 shadow-1-strong" width="60">
                <div class="pt-1">
                    <p style="color: rgb(38,38,38)" class="fw-bold mb-0">{{contact.firstname}} {{contact.lastname}}</p>
                    <p class="small text-muted">Hello, Are you there?</p>
                </div>
            </div>
            <div v-if="contact.newMessages !== 0" class="pt-1">
                <p class="small text-muted mb-1">Just now</p>
                <span class="badge bg-danger float-end">{{contact.newMessages}}</span>
            </div>
        </a>
    </li>
</template>

<script>
    import ImageService from "../../services/image.service";

    export default {
        props:["contact"],
        data(){
            return{
                image:""
            }
        },
        methods:{
            test(){
                console.log(this.contact)
            },
            loadImage(){
                ImageService.getImageToUserByUsername(this.contact.username).then(
                    (response) =>{
                        this.image = 'data:image/png;base64,'+response.data.imageBytes
                    },
                    (error) =>{
                        this.image =
                            (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                            error.message ||
                            error.toString();

                    }
                )
            }
        },
        mounted() {
            this.loadImage()
        }
    }
</script>

<style scoped>
    .user-content{
    }
.user-content:hover{
    background-color:#aeb0b4
}
</style>