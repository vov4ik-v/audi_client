<template>
    <div class="nearby-user">
        <div class="row">

            <div class="col-md-2 col-sm-2">
                <img :src="image" alt="user" class="profile-photo-lg">
            </div>
            <div class="col-md-7 col-sm-7 profile-link">
                <h5><router-link :to="{name:'User', params:{username: friend.username}}">{{friend.firstname}} {{friend.lastname}}</router-link></h5>
                <p>{{friend.bio}}</p>
            </div>
            <div class="col-md-3 col-sm-3">
                <button v-if="!isFriend" @click="followOrUnfollow" class="btn btn-primary pull-right follow-btn">Follow</button>
                <button v-else class="btn btn-primary pull-right following-btn" data-bs-toggle="modal" :data-bs-target="'#'+modalId">
                    Following</button>
                <div class="modal fade" :id="modalId" tabindex="-1"
                     aria-labelledby="postAddLabel"
                     aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">

                            <!-- Modal body -->
                            <div class="modal-body text-center">
                                <img :src="image" alt="user" class="image-for-user">
                                <p class="text-center" style="margin-bottom: 28px">Unfollow @{{friend.username}}?</p>
                                <hr>
                                <button type="button" class="btn unfollow-btn" @click="followOrUnfollow" data-bs-dismiss="modal">Unfollow</button>
                                <hr>
                                <button type="button" class="btn cancel-btn" data-bs-dismiss="modal">Cancel</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ImageService from "../../services/image.service";
    import timesPlugin from "../../plugins/timesPlugin";
    import FriendService from "../../services/friend.service";

    export default {
        props:["friend","modalId"],
        data(){
            return{
                elements:null,
                modalName:"modal",
                image: "",
                isFriend:true,
                test:"abc",
            }
        },
        methods:{
            followOrUnfollow(){
                FriendService.addUserToFriend(this.friend.id).then(()=>{this.isFriend = !this.isFriend})
            },
            loadImage(){
                ImageService.getImageToUserByUsername(this.friend.username).then(
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
            }
        },
        created(){
            this.loadImage()
        }
    }
</script>

<style scoped>
    .profile-link a{
        color:black;
    }
    .profile-link a:hover{
        color:#2a3336;
    }
    .follow-btn{
        background-color: rgb(0, 149, 246);
        border: 1px solid transparent;
    }
    .following-btn {
        background-color: transparent;
        color: rgb(38,38,38);
        border: 1px solid rgb(219,219,219);
    }
    .unfollow-btn{
        color:rgb(237, 73, 86);
        font-weight: bold;
        font-size: 14px;
        padding:0
    }
    .cancel-btn{
        color:rgb(38,38,38);
        font-size: 13px;
        padding:0
    }
    .image-for-user{
        height: 120px;
        width: 120px;
        border-radius: 50%;
        margin-bottom: 40px;
    }
</style>