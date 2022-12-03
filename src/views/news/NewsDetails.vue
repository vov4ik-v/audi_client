<template>
    <!--Section: Newsfeed-->
    <div class="container">
        <div class="card-body">
            <!-- Data -->
            <div class="d-flex mb-3 justify-content-center">
                <h3>{{news.title}}</h3>
            </div>
            <!-- Description -->
        </div>
        <!-- Media -->
        <div class="card-img image col-lg-6 order-1 rounded-0 d-flex justify-content-center" data-mdb-ripple-color="light">
            <img :src="newsImage" class="newsDetailsImg img-fluid" />
        </div>
        <hr>
        <div class="mt-2">
            <p>
                {{news.description}}
            </p>
        </div>
        <!-- Media -->
        <!-- Interactions -->
        <div class="card-body">
            <!-- Reactions -->
            <div class="d-flex justify-content-between mb-3">
                <div>
                    <a href="">
                        <i class="fas fa-thumbs-up text-primary"></i>
                        <i class="fas fa-heart text-danger"></i>
                        <span>{{news.likes}}</span>
                    </a>
                </div>
                <div>
                    <a href="" class="text-muted"> 8 comments </a>
                </div>
            </div>
            <!-- Reactions -->

            <!-- Buttons -->
            <div class="d-flex  text-center border-top border-bottom mb-4">
                <div class="like p-2 cursor"><a :class="isLiked ? 'like-on' : 'like-off'">
                    <svg v-if="!isLiked" @click="likeNews" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                    </svg>
                    <svg v-else @click="likeNews" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                    </svg>
                </a></div>
                <div class="like p-2 cursor"><a class="comment-action">
                    <svg @click="focus" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-chat" viewBox="0 0 16 16">
                        <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
                    </svg>
                </a></div>

            </div>
            <!-- Buttons -->

            <!-- Comments -->

            <!-- Input -->
            <div class="d-flex mb-3">
                <a href="">
                    <img :src="getCurrentUserImage" class="border rounded-circle me-2"
                         alt="Avatar" style="height: 50px" />
                </a>
                <div class="form-outline w-100">
                    <textarea placeholder="Write a comment" v-model="commentMessage" class="form-control" id="textAreaExample" rows="2"></textarea>
                </div>
                <button @click="createComment" class="post-btn btn" type="button">Post
                </button>
            </div>
            <!-- Input -->

            <!-- Answers -->
            <comment-box :comment="comment" v-for="comment in getNewsComments" :key="comment.id"></comment-box>


            <!-- Comments -->
        </div>
        <!-- Interactions -->
    </div>
    <!--Section: Newsfeed-->
</template>

<script>
    import NewsService from '../../services/news.service'
    import ImageService from '../../services/image.service'
    import CommentService from '../../services/comment.service'
    import CommentBox from "../../components/CommentBox";

    export default {
        components:{CommentBox},
        data(){
            return{
                news:{},
                newsImage:null,
                comments:{},
                commentMessage:"",
                newsId:this.$route.params.id
            }
        },
        inject:["user","userImage"],
        methods:{
            likeNews() {
                NewsService.likeNews(this.news.id).then((response) => {
                    this.news.likes = response.data.likes
                    this.news.usersLiked = response.data.usersLiked
                }),
                    (error) => {
                        console.error(error);
                    }
            },
            loadComments(){
                CommentService.getNewsComments(this.newsId).then((response)=>{
                    this.comments = response.data;

                }),(error)=>{
                    console.error(error)
                }

            },
            createComment(){
                let payload = {
                    message: this.commentMessage,
                    newsId: this.newsId,
                    username: this.user.value.username
                }
                CommentService.createCommentToNews(this.newsId,payload).then((response)=>{
                    this.comments = response.data
                }),(error)=>{
                    console.error(error)
                }
                this.commentMessage=""
            },

            focus() {
                let textArea = document.getElementById(`textAreaExample`)
                textArea.focus()
            },
        },
        computed:{
            isLiked(){
                if(this.news.usersLiked && this.user.value.username){
                    return this.news.usersLiked.includes(this.user.value.username);
                }
                else {
                    return false;
                }

            },
            getCurrentUserImage() {
                return this.userImage.value
            },
            getNewsComments(){
                return this.comments;
            }
        },

        mounted() {
            NewsService.getNewsById(this.newsId).then((response) => {
                this.news = response.data
               ImageService.getNewsImage(this.news.id).then((imageResponse)=>{
                  this.newsImage = 'data:image/png;base64,' + imageResponse.data.imageBytes
               }
               ,(error)=>{
                    this.newsImage = null;
                })
            },   (error)=>{
                this.news =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
            })
            this.loadComments()
        }

    }
</script>

<style scoped>
.newsDetailsImg{
    height: 75%;
    width: 75%;
}
@media (max-width: 1024px) {
    .newsDetailsImg {
        height: 95%;
        width: 95%;
    }
}
.post-btn{
    background-color:dodgerblue;
    color:white;
    height: 50%;
    margin-left: 5px;

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
</style>