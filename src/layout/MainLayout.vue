<template>
    <TheTopbar/>
    <TheNavbar/>
    <router-view style="min-height: 87vh" v-if="!loading" :key="$route.path"></router-view>
    <TheFooter/>
</template>

<script>
    import TheTopbar from "../components/TheTopbar";
    import TheFooter from "../components/TheFooter";
    import TheNavbar from "../components/TheNavbar";
    import UserService from "../services/user.service";
    import {computed} from 'vue'
    import NewsService from "../services/news.service";
    export default {
        components: {TheTopbar, TheFooter,TheNavbar},
        data(){
            return{
                loading:false,
                user:{
                    user:"fasfa",
                    content:"",
                    img:this.getCurrentUserImage,
                },
                newsListItem:{}
            }
        },
        provide(){
          return{
              user: computed(() =>this.getProfileInfo),
              userImage: computed(() => this.getCurrentUserImage),
              newsList: computed(() => this.newsList)
          }
        },
        computed:{
            getProfileInfo(){
                return this.$store.getters['auth/getCurrentUserInfo']
            },
            getCurrentUserImage(){
                let image =  this.$store.getters['imageUploadModule/getProfileImage']
                return  'data:image/png;base64,' + image.imageBytes
            },
            getNewsList(){
                return this.newsListItem
            }
        },
        methods: {
        async loadFile(){
            await this.$store.dispatch("imageUploadModule/getProfileImage")
            await this.$store.dispatch("auth/getUserInfo")
            await this.$store.dispatch("carModule/getAllCars")
            await this.$store.dispatch("chat/getFriends")
            await this.$store.dispatch("newsModule/getNews")
            await this.$store.dispatch("audiModelModule/getAllAudiModels")
             UserService.getUserBoard().then(
                (response) => {
                    this.user.content = response.data;
                },
                (error) => {
                    this.user.content =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                }
            );


        }
            // this.user.img = this.getProfileImage;

    },
     mounted() {
         this.loading = true
         this.loadFile()
         this.loading = false

    },

    }
</script>

<style scoped>

</style>