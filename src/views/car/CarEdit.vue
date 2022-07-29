<template>
    <div class="container">
        <div class="row">
            <div class="col-12 text-center pt-3">
                <h1>Add Car</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-3"></div>
            <div class="col-6 border mb-3">
                <form class="mt-1" @submit.prevent="submit">
                    <div class="form-group">
                        <label>Audi Model</label>
                        <input name="audiModel" type="text" class="form-control" v-model="updatedCar.audiModel" required>
                    </div>
                    <div class="form-group">
                        <label>Model Name</label>
                        <input type="text" class="form-control" v-model="updatedCar.modelName" required>
                    </div>
                    <div class="form-group">
                        <label>Price</label>
                        <input type="number" class="form-control" v-model="updatedCar.price" required>
                    </div>
                    <div class="form-group">
                        <label>ImageURL</label>
                        <input type="text" class="form-control" v-model="updatedCar.imageURL" required>
                    </div>
                    <div class="form-group">
                        <label>Small ImageUrl</label>
                        <input type="text" class="form-control" v-model="updatedCar.smallImageUrl" required>
                    </div>
                    <div class="form-group">
                        <label>Top View ImageUrl</label>
                        <input type="text" class="form-control" v-model="updatedCar.topViewImageUrl" required>
                    </div>
                    <div class="form-group">
                        <label>Front View ImageUrl</label>
                        <input type="text" class="form-control" v-model="updatedCar.frontViewImageUrl" required>
                    </div>
                    <div class="form-group">
                        <label>Side View ImageURL</label>
                        <input type="text" class="form-control" v-model="updatedCar.sideViewImageURL" required>
                    </div>
                    <div class="form-group">
                        <label>Engine Type</label>
                        <input type="text" class="form-control" v-model="updatedCar.engineType" required>
                    </div>
                    <div class="form-group">
                        <label>Drive Type</label>
                        <input type="text" class="form-control" v-model="updatedCar.driveType" required>
                    </div>
                    <div class="form-group">
                        <label>Empty Weight</label>
                        <input type="text" class="form-control" v-model="updatedCar.emptyWeight" required>
                    </div>
                    <div class="form-group">
                        <label>gross Weight</label>
                        <input type="text" class="form-control" v-model="updatedCar.grossWeight" required>
                    </div>
                    <div class="form-group">
                        <label>trunk Volume</label>
                        <input type="text" class="form-control" v-model="updatedCar.trunkVolume" required>
                    </div>
                    <div class="form-group">
                        <label>max Speed</label>
                        <input type="text" class="form-control" v-model="updatedCar.maxSpeed" required>
                    </div>
                    <div class="form-group">
                        <label>From 0 to 100</label>
                        <input type="text" class="form-control" v-model="updatedCar.from0to100" required>
                    </div>
                    <div class="form-group">
                        <label>Average Fuel Consumption</label>
                        <input type="text" class="form-control" v-model="updatedCar.averageFuelConsumption" required>
                    </div>
                    <div class="form-group">
                        <label>Length</label>
                        <input type="text" class="form-control" v-model="updatedCar.length" required>
                    </div>
                    <div class="form-group">
                        <label>Width</label>
                        <input type="text" class="form-control" v-model="updatedCar.width" required>
                    </div>
                    <div class="form-group">
                        <label>Height</label>
                        <input type="text" class="form-control" v-model="updatedCar.height" required>
                    </div>
                    <div class="form-group">
                        <label>Wheel Base</label>
                        <input type="text" class="form-control" v-model="updatedCar.wheelBase" required>
                    </div>


                    <button type="submit" class="btn btn-primary mt-3 mb-3 ">Submit</button>
                </form>
            </div>
            <div class="col-3"></div>


        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                id:null,
                updatedCar: {}
            }
        },
        methods:{
            submit(){
                this.$store.dispatch("carModule/editCar", this.updatedCar)
                this.$router.push({name: 'Home'})
                this.$emit('fetchData')
            }
        },

        mounted() {
            setTimeout(() => {
                console.log("mounted")
                this.modelName = this.$route.params.modelName
                this.updatedCar = this.$store.getters['carModule/carByAudiModel'](this.modelName)
            }, 350)
            // function submit() {
            //     store.dispatch("addCar", updatedCar)
            //     router.push({name: 'Home'})
            //     context.emit('fetchData')
            // }
        }
    }

</script>

<style scoped>

</style>