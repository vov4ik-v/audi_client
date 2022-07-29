<template>
    <div class="col-lg-4 col-md-6 portfolio-item filter-app">
        <div class="portfolio-wrap h-100">
            <img :src="car.smallImageUrl" class="img-fluid h-100" alt="">
            <div class="portfolio-info">
                <h4>Audi {{car.modelName}}</h4>
                <div class="portfolio-links">
                    <a @click="push" class="btn-get-started animate__animated animate__fadeInUp">Детальніше</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:["id"],
        data(){
            return{
                car:{},
                pathModelName:"",
            }

        },
        methods:{
            push(){
                this.$router.push({
                    name:'Details',
                    params:{
                        modelName:this.pathModelName

                    }
                })

            }
        },

        mounted() {
            setTimeout(() => {
                this.car = this.$store.getters['carModule/carById'](this.id)
                this.pathModelName = this.car.modelName.replace(/\s/g, '-').toLowerCase()
            }, 250)
        }
    }
</script>

<style scoped>

</style>