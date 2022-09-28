<template>
    <section class="about-list">
        <div class="container">
            <div class="row">
                <div v-show="alignment === 'right'" class="image col-lg-6 order-1" >
                        <img :src="car.descriptionImageUrl" alt="" class="w-100 h-100 img-fluid">
                </div>

                <div class="col-lg-6 order-2 order-lg-1">
                    <div class="icon-box mt-5 mt-lg-0">

                        <h2>Audi {{car.modelName}}</h2>
                    </div>
                    <div class="mt-5">
                        <h4>Ціна:</h4>
                        <p>від {{car.price}},- грн</p>
                    </div>
                    <div class="mt-5">
                        <h4>Додатково:</h4>
                        <p>Середні витрати пального: {{car.averageFuelConsumption}} л/100км</p>
                        <p>Максимальна швидкість: {{car.maxSpeed}} г/км</p>
                        <p>Динаміка від 0-100 км/год, с.: {{car.from0to100}}</p>
                    </div>

                    <div class="icon-box mt-5">
                        <button type="button" class="btn btn-primary btn-lg" @click="push">Детальніше</button>
                    </div>
                </div>
                <div v-show="alignment === 'left'" class="image col-lg-6 order-1"
                >
                    <img :src="car.descriptionImageUrl" alt="" class="h-100 w-100 img-fluid">
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        props: ["id", "alignment","cars"],
        data() {
            return {
                car: {},
                pathModelName: ''
            }

        },
        computed:{
            getModelById(){
                return this.cars.find(car => car.id == this.id)

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
        beforeUpdate() {
         this.car = this.getModelById
            this.pathModelName = this.car.modelName.replace(/\s/g, '-').toLowerCase()
        }

    }
</script>

<style scoped>

</style>