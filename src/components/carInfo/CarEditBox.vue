<template>
    <!--    <div class="row portfolio-container">-->
    <!--    <div class="col-lg-3 col-md-6 portfolio-item filter-app" v-for="car in audiModel1.cars">-->
    <!--            <img :src="car.descriptionImageUrl" class="img-fluid h-100" alt="">-->

    <!--     </div>-->
    <!--    </div>-->
    <div class="container" style="margin-top:50px;">
        <div class="row">
            <div class="col-lg-6 col-md-12" v-for="car in descriptionAudiModel.cars">
                <div>
                    <div class="card-image">
                        <img
                                :src="car.descriptionImageUrl" />
                    </div>

                    <a class="card-action" href="#"><i class="fa fa-heart"></i></a>
                    <div class="card-heading">
                        {{car.modelName}}
                        <span><router-link :to="{name:'EditCar', params:{modelName: car.modelName.replace(/\s/g, '-').toLowerCase()}}" class="card-button"><i class="bi bi-chevron-right"></i>Edit</router-link></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:["audiModel","audiModels"],
        computed:{
            getModelByName(){
                return this.audiModels.find(audiModel => audiModel.name === this.audiModel)

            }
        },
        data(){
            return{
                descriptionAudiModel:{},
            }

        },
        methods:{
            // toPathModelName(car){
            //     this.pathModelName = car.modelName.replace(/\s/g, '-').toLowerCase()
            // }
        },
        created() {
            this.descriptionAudiModel =  this.getModelByName

        }
    }
</script>

<style scoped>
    body {
        font-family: Varela Round;
        background: #f1f1f1;
    }

    a {
        text-decoration: none;
    }

    /* Card Styles */

    .card-sl {
        border-radius: 8px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

    .card-image img {
        max-height: 100%;
        max-width: 100%;
        border-radius: 8px 8px 0px 0;
    }

    .card-action {
        position: relative;
        float: right;
        margin-top: -25px;
        margin-right: 20px;
        z-index: 2;
        color: #E26D5C;
        background: #fff;
        border-radius: 100%;
        padding: 15px;
        font-size: 15px;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 1px 2px 0 rgba(0, 0, 0, 0.19);
    }

    .card-action:hover {
        color: #fff;
        background: #E26D5C;
        -webkit-animation: pulse 1.5s infinite;
    }

    .card-heading {
        font-size: 18px;
        font-weight: bold;
        background: #fff;
        padding: 10px 15px;
    }

    .card-text {
        padding: 10px 15px;
        background: #fff;
        font-size: 14px;
        color: #636262;
    }

    .card-button {
        display: flex;
        justify-content: left;
        width: 100%;
        font-size: 18px;
        color: black;
        border-radius: 0 0 8px 8px;
    }

    .card-button:hover {
        text-decoration: none;
        color: #2a3336;

    }


    @-webkit-keyframes pulse {
        0% {
            -moz-transform: scale(0.9);
            -ms-transform: scale(0.9);
            -webkit-transform: scale(0.9);
            transform: scale(0.9);
        }

        70% {
            -moz-transform: scale(1);
            -ms-transform: scale(1);
            -webkit-transform: scale(1);
            transform: scale(1);
            box-shadow: 0 0 0 50px rgba(90, 153, 212, 0);
        }

        100% {
            -moz-transform: scale(0.9);
            -ms-transform: scale(0.9);
            -webkit-transform: scale(0.9);
            transform: scale(0.9);
            box-shadow: 0 0 0 0 rgba(90, 153, 212, 0);
        }
    }
</style>