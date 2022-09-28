<template>
    <div class="col-lg-4 col-md-6 col-12 mb-2 post-item filter-app">
        <div class="post-wrap w-100 h-100" @click="loadComment" data-bs-toggle="modal" :data-bs-target="'#'+modalId">
            <img :src="postImage"
                 class="img-fluid w-100 h-100 rounded-3" alt="">
            <div class="post-info d-flex flex-row" v-show="!mediaIsSmall">
                <div class="div mx-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="white" class="bi bi-heart-fill" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                </svg>
                    <b class="text-white m-2" style="font-size: 16px">{{getLikesInfo.likes}}</b>
                </div>
                <div class="div mx-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="white" class="bi bi-chat-fill" viewBox="0 0 16 16">
                    <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z"/>
                </svg>
                    <b class="text-white m-2" style="font-size: 16px">{{getAllComments.length}}</b>
                </div>
            </div>
        </div>
    </div>
    <div  class="modal fade hide" :id="modalId" tabindex="-1"
         aria-labelledby="exampleModalLabel"
         aria-hidden="true">
        <div class="modal-dialog modal-xl modal-dialog-centered" id="myModal" style="">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="container post-body">
                        <div class="d-flex justify-content-end row">
                            <div class="col-md-6">
<!--                                https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"-->
                                <img :src="postImage"
                                     class="img-fluid h-100 w-100 rounded-3" alt="">
                            </div>
                            <div class="col-md-6">
                                <div class="d-flex flex-column comment-section h-100">
                                    <div class="bg-white p-2" style="height: 20%">
<!--                                        https://i.imgur.com/RpzrMR2.jpg"-->
                                        <div class="d-flex flex-row user-info"><img class="rounded-circle p-2"
                                                                                    :src="profileImage"
                                                                                    width="60">
                                            <div class="d-flex flex-column justify-content-start ml-2">
                                               <router-link :to="{name:'User', params:{username: getProfileInfo}}"><span class="d-block font-weight-bold text-black name">{{profileInfo.firstname}} {{profileInfo.lastname}}</span></router-link>
                                                <span
                                                    class="date text-black-50">Shared publicly - {{getTime.number}} {{getTime.type}} ago</span></div>
                                            <div class="d-flex flex-row fs-12">
                                                <div class="like p-2 cursor"><a :class="isLiked ? 'like-on' : 'like-off'">
                                                    <svg v-if="!isLiked" @click="likePost" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                                                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                                                    </svg>
                                                    <svg v-else @click="likePost" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                                                        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                                                    </svg>
                                                </a></div>
                                                <div class="like p-2 cursor"><a class="comment-action">
                                                    <svg @click="focus" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-chat" viewBox="0 0 16 16">
                                                        <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
                                                    </svg>
                                                </a></div>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="bg-white" style="height: 65%">
                                        <div class="d-flex flex-row fs-12">
                                            <div class="mt-2 w-100">
                                                <hr class="hr-color">
                                                <div class="example-1 square scrollbar-dusty-grass square thin">
                                                    <div class="card-body">
                                                                <comment-box :comment="comment" v-for="comment in getAllComments" :key="comment.id"></comment-box>
                                                    </div>
                                                </div>
                                                <hr class="hr-color">
                                            </div>
                                        </div>

                                    </div>
                                    <div class="bg-white p-2 z" style="height: 25%">

                                        <div class="d-flex flex-row align-items-start"><img class="rounded-circle"
                                                                                            :src="currentUserImage"
                                                                                            width="40"><textarea
                                                class="form-control ml-1 shadow-none textarea" :id="'textAreaWithId:'+ modalId" v-model="commentMessage"></textarea><button @click="createComment" class="post-btn btn" type="button">Post
                                        </button></div>

                                    </div>
                                </div>

                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    </div>
</template>

<script>
    import CommentBox from "../CommentBox";
    import timesPlugin from "../../plugins/timesPlugin";

    export default {
        props:["modalId","postImage","postInfo","profileImage","profileInfo","currentUserImage"],
        components:{CommentBox},
        data() {
            return {
                mediaQuery: window.matchMedia('(max-width: 999px)'),
                commentMessage:"",
                current: new Date(),
            }
        },
        methods: {
            likePost(){
                this.$store.dispatch("postModule/likePost",{
                    postId:this.postInfo.id,
                    username: this.profileInfo.username
                })

            },
            loadComment(){
                this.$store.dispatch("commentModule/getAllComments",this.postInfo.id)
            },
            focus(){
                let textArea = document.getElementById(`textAreaWithId:${this.modalId}`)
                textArea.focus()
            },
            createComment(){
                let payload = {
                    message: this.commentMessage,
                    postId: this.postInfo.id,
                    username: this.profileInfo.username
                }
                this.$store.dispatch("commentModule/createComment",payload)
                this.$store.dispatch("commentModule/getAllComments",payload.postId)
                this.commentMessage = ""
            }
        },
        computed: {
            mediaIsSmall() {
                return this.mediaQuery.matches
            },
            getAllComments(){
                return this.$store.getters['commentModule/getAllComments'];
            },
            getTime(){
                return timesPlugin.differenceTimes(this.postInfo.createdDate, this.current)
            },
            getProfileInfo(){
                if(this.profileInfo.username){
                    return this.profileInfo.username
                }
                return "please wait"
            },
            getLikesInfo(){
               return this.$store.getters['postModule/postUserLiked'](this.postInfo.id)
            },
            isLiked(){
                return this.getLikesInfo.usersLiked.includes(this.getProfileInfo)
            }
        },
    }
</script>

<style scoped>

    .scrollbar-dusty-grass::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
        background-color: #F5F5F5;
        border-radius: 10px;
    }

    .scrollbar-dusty-grass::-webkit-scrollbar {
        width: 12px;
        background-color: #F5F5F5;
    }

    .scrollbar-dusty-grass::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
        background-image: -webkit-linear-gradient(330deg, #d4fc79 0%, #96e6a1 100%);
        background-image: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%);
    }


    .square::-webkit-scrollbar-track {
        border-radius: 0 !important;
    }

    .square::-webkit-scrollbar-thumb {
        border-radius: 0 !important;
    }

    .thin::-webkit-scrollbar {
        width: 6px;
    }

    .example-1 {
        position: relative;
        overflow-y: scroll;
        height: 200px;
    }
    .like-on {
        position: relative;
        margin-top: -25px;
        z-index: 2;
        color: red;
        background: #fff;
        border-radius: 100%;
        font-size: 25px;
    }
    .like-off {
        position: relative;
        margin-top: -25px;
        z-index: 2;
        color: black;
        background: #fff;
        border-radius: 100%;
        font-size: 25px;
    }
    .like-off:hover {
        color: #6c757d;
    }
    .comment-action {
        position: relative;
        margin-top: -25px;
        z-index: 2;
        color: black;
        background: #fff;
        border-radius: 100%;
        font-size: 22px;
    }

    .comment-action:hover {
        color: #6c757d;
    }
    .modal-body{
        padding:0
    }
    .post-body{
        padding:0
    }
    .modal-content{

    }
    .hr-color{
        color: #6c757d;
        margin: 0;
    }
    .post-btn{
        color:dodgerblue;
    }

    .date {
        font-size: 11px
    }

    .fs-12 {
        font-size: 12px
    }

    .shadow-none {
        box-shadow: none
    }

    .cursor {
        cursor: pointer
    }

    .textarea {
        resize: none
    }
</style>