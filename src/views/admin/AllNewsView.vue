<template>
   <div class="container">
       <div class="row gx-lg-5"  >
           <div v-for="news in getNews" :key="news.id" class="col-lg-4 col-md-12 mb-4 mb-lg-0">
               <!-- News block -->
               <div>
                   <!-- Featured image -->
                   <div class="bg-image hover-overlay shadow-1-strong ripple rounded-5 mb-4"
                        data-mdb-ripple-color="light">
                       <img :src="'data:image/png;base64,'+news.newsImage" class="img-fluid" />
                       <a>
                           <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);"></div>
                       </a>
                   </div>



                   <!-- Article title and description -->
                   <router-link :to="{name:'DetailsNews', params:{id: news.id}}"><a class="text-dark">
                       <h5>{{news.title}}</h5>
                   </a>
                   </router-link>
                   <!-- Article data -->
                   <div class="row mb-3 d-flex">
                       <div class="col-6 text-start">
                           <u>{{getTimesFormat(news.createdDate).date}}</u>
                       </div>
                       <div class="col-6 text-end">
                           <router-link :to="{name:'EditNews', params:{id: news.id}}" v-slot="navigate"><button @click="navigate" class="btn-primary">Edit</button></router-link>
                       </div>
                   </div>
                   <hr />
               </div>
               <!-- News block -->
           </div>
       </div>
   </div>
</template>

<script>
    import NewsService from "../../services/news.service";
    import EditNewsBox from "../../components/news/EditNewsBox";
    import timesPlugin from "../../plugins/timesPlugin";
    export default {
        components:{EditNewsBox},
        data(){
            return{
            }

        },
        methods:{
            getTimesFormat(createdDate){
                return timesPlugin.getTimeFormat(createdDate);
            }

        },
        computed:{
            getNews(){
                return this.$store.getters['newsModule/news']
            }
        },
        async mounted() {

        }
    }
</script>

<style scoped>

</style>