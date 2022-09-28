<template>
    <div class="d-flex flex-start mt-2">
        <img class="rounded-circle shadow-1-strong me-3"
             :src="getProfileImage" alt="avatar" width="45"/>
        <div class="flex-grow-1 flex-shrink-1">
            <div>
                <div class="d-flex justify-content-between align-items-center">
                    <p class="mb-1">
                        <router-link  custom v-slot="{navigate}" :to="{name:'User', params:{username:comment.username}}">
                        <a  style="cursor:pointer;"  @click="navigate"><i style="font-size: 15px">{{comment.username}}</i></a></router-link>
                        <button id="closeButton" class="btn"  style="display: none" data-bs-toggle="modal"></button>

                        <span @click="test" class="small">- Shared comment - {{getTime.number}} {{getTime.type}} ago</span>
                    </p>
                </div>
                <p class="small mb-0">
                    {{comment.message}}
                </p>
            </div>
        </div>
    </div>
</template>

<script>


    import timesPlugin from "../plugins/timesPlugin";
    import ImageService from "../services/image.service";

    export default {
        props:["comment"],
        data(){
            return{
                current: new Date(),
                elements:null,
                modalName:"modal",
                image: ""
            }
        },
        methods:{
          loadImage(){
              ImageService.getImageToUserByUsername(this.comment.username).then(
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

        computed:{
           getProfileImage(){
               return this.image
           },
            getTime(){
                return timesPlugin.differenceTimes(this.comment.createdDate, this.current)
            }
        },
        created(){
            this.loadImage()
        }
    }
</script>

<style scoped>

</style>