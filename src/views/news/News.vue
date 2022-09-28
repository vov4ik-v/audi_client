<template>
    <div class="container">

        <!--Section: News of the day-->
        <section class="border-bottom pb-4 mb-5">
            <div v-for="news in mainNewsList" :key="news.id" class="row gx-5">
                <div class="col-md-6 mb-4">
                    <div class="bg-image hover-overlay ripple shadow-2-strong rounded-5" data-mdb-ripple-color="light">
                        <img :src="'data:image/png;base64,'+news.newsImage" class="img-fluid" />
                        <a>
                            <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);"></div>
                        </a>
                    </div>
                </div>

                <div class="col-md-6 mb-4">
                    <span class="badge bg-danger px-2 py-1 shadow-1-strong mb-3">News of the day</span>
                    <h4><strong>{{news.title}}</strong></h4>
                    <p class="text-muted clip">
                        {{news.description}}
                    </p>
                    <router-link :to="{name:'DetailsNews', params:{id: news.id}}"><button type="button" class="btn btn-primary">Read more</button></router-link>
                </div>
            </div>
        </section>
        <!--Section: News of the day-->

        <!--Section: Content-->
        <section>
            <div class="row gx-lg-5"  >
                <div v-for="news in middleNewsList" :key="news.id" class="col-lg-4 col-md-12 mb-4 mb-lg-0">
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

                            <p class="clip">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, iste aliquid. Sed
                                id nihil magni, sint vero provident esse numquam perferendis ducimus dicta
                                adipisci iusto nam temporibus modi animi laboriosam?
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, dolorum itaque iusto maiores minima, natus nulla obcaecati omnis pariatur quia quibusdam ratione recusandae totam? Aut deserunt dolorem est expedita facilis hic nemo sint sit voluptatem. Ab eos est non quod veniam voluptatibus voluptatum? Assumenda iusto, molestiae nam odio sed voluptatem?
                            </p>
                        </a>
                        </router-link>
                        <!-- Article data -->
                        <div class="row mb-3 d-flex">
                            <div class="col-6 text-start">
                                <u>{{getTimesFormat(news.createdDate).date}}</u>
                            </div>
                        </div>
                        <hr />
                    </div>
                    <!-- News block -->
                </div>
                <div v-for="news in smallNewsList" :key="news.id" class="col-lg-4 col-md-6 mb-4 mb-lg-0">  <!-- News -->
                    <!-- News -->
                    <router-link :to="{name:'DetailsNews', params:{id: news.id}}">   <a class="text-dark">
                        <div class="row mb-4 border-bottom pb-2">
                            <div class="col-3">
                                <img :src="`data:image/png;base64,`+news.newsImage"
                                     class="img-fluid shadow-1-strong rounded" alt="Skyscrapers" />
                            </div>

                            <div class="col-9">
                                <p class="mb-2"><strong>{{news.title}}</strong></p>
                                <p>
                                    <u>{{getTimesFormat(news.createdDate).date}}</u>
                                </p>
                            </div>
                        </div>
                    </a>
                    </router-link>
                </div>
            </div>
        </section>
        <!--Section: Content-->

        <!-- Pagination -->
        <nav class="my-4" aria-label="...">
            <ul class="pagination pagination-circle justify-content-center">
                <li class="page-item">
                    <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a>
                </li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item active" aria-current="page">
                    <a class="page-link" href="#">2 <span class="sr-only">(current)</span></a>
                </li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item">
                    <a class="page-link">Next</a>
                </li>
            </ul>
        </nav>
    </div>
    <!--Main layout-->
</template>

<script>
    import NewsService from '../../services/news.service'
    import ImageService from '../../services/image.service'
    import timesPlugin from "../../plugins/timesPlugin";
    export default {
        // inject:["newsList"],
        data(){
            return{
                newsList:{},
                smallNewsList:{},
                middleNewsList:{},
                mainNewsList:{},
            }
        },
        methods:{
            sliceNewsList(newsList){
                this.mainNewsList = newsList.slice(0,1)
                this.middleNewsList = newsList.slice(1,4)
                this.smallNewsList = newsList.slice(4,16)
            },
            getTimesFormat(createdDate){
               return timesPlugin.getTimeFormat(createdDate);
            }

        }
        ,
        computed:{
            getShowFormat(newsImage){
                return `data:image/png;base64,`+newsImage
            },
            // getNewsList() {
            //     return this.newsList.value;
            // }
        },
        mounted() {
            console.log(this.newsList.length)
            if(this.newsList.length === undefined) {
                NewsService.getAll().then((response) => {
                        this.newsList = response.data
                        this.sliceNewsList(this.newsList)
                    },
                    (error) => {
                        this.newsList =
                            (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                            error.message ||
                            error.toString();
                    })

            }

        }

    }
</script>

<style scoped>
    p.clip {
        display: -webkit-box;
        -webkit-line-clamp: 5;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
</style>