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
                        <input name="audiModel" type="text" class="form-control" v-model="newCar.audiModel" required>
                    </div>
                    <div class="form-group">
                        <label>Model Name</label>
                        <input type="text" class="form-control" v-model="newCar.modelName" required>
                    </div>
                    <div class="form-group">
                        <label>Price</label>
                        <input type="number" class="form-control" v-model="newCar.price" required>
                    </div>
                    <div class="form-group">
                        <label>ImageURL</label>
                        <input type="text" class="form-control" v-model="newCar.imageURL" required>
                    </div>
                    <div class="form-group">
                        <label>Small ImageUrl</label>
                        <input type="text" class="form-control" v-model="newCar.smallImageUrl" required>
                    </div>
                    <div class="form-group">
                        <label>Top View ImageUrl</label>
                        <input type="text" class="form-control" v-model="newCar.topViewImageUrl" required>
                    </div>
                    <div class="form-group">
                        <label>Front View ImageUrl</label>
                        <input type="text" class="form-control" v-model="newCar.frontViewImageUrl" required>
                    </div>
                    <div class="form-group">
                        <label>Side View ImageURL</label>
                        <input type="text" class="form-control" v-model="newCar.sideViewImageURL" required>
                    </div>
                    <div class="form-group">
                        <label>Engine Type</label>
                        <input type="text" class="form-control" v-model="newCar.engineType" required>
                    </div>
                    <div class="form-group">
                        <label>Drive Type</label>
                        <input type="text" class="form-control" v-model="newCar.driveType" required>
                    </div>
                    <div class="form-group">
                        <label>Empty Weight</label>
                        <input type="text" class="form-control" v-model="newCar.emptyWeight" required>
                    </div>
                    <div class="form-group">
                        <label>gross Weight</label>
                        <input type="text" class="form-control" v-model="newCar.grossWeight" required>
                    </div>
                    <div class="form-group">
                        <label>trunk Volume</label>
                        <input type="text" class="form-control" v-model="newCar.trunkVolume" required>
                    </div>
                    <div class="form-group">
                        <label>max Speed</label>
                        <input type="text" class="form-control" v-model="newCar.maxSpeed" required>
                    </div>
                    <div class="form-group">
                        <label>From 0 to 100</label>
                        <input type="text" class="form-control" v-model="newCar.from0to100" required>
                    </div>
                    <div class="form-group">
                        <label>Average Fuel Consumption</label>
                        <input type="text" class="form-control" v-model="newCar.averageFuelConsumption" required>
                    </div>
                    <div class="form-group">
                        <label>Length</label>
                        <input type="text" class="form-control" v-model="newCar.length" required>
                    </div>
                    <div class="form-group">
                        <label>Width</label>
                        <input type="text" class="form-control" v-model="newCar.width" required>
                    </div>
                    <div class="form-group">
                        <label>Height</label>
                        <input type="text" class="form-control" v-model="newCar.height" required>
                    </div>
                    <div class="form-group">
                        <label>Wheel Base</label>
                        <input type="text" class="form-control" v-model="newCar.wheelBase" required>
                    </div>


                    <button type="submit" class="btn btn-primary mt-3 mb-3 ">Submit</button>
                </form>
            </div>
            <div class="col-3"></div>


        </div>
    </div>
</template>

<script>
    import {useStore} from 'vuex'
    import {ref,reactive,onMounted} from 'vue'
    import {useRouter} from 'vue-router'
    export default {

        setup(context){
            onMounted(() =>{
            })
            const store = useStore();
            const router = useRouter();
            const newCar= reactive({
                audiModel: ref(""),
                modelName: ref(""),
                price: ref(0),
                imageURL: ref(""),
                smallImageUrl: ref(""),
                topViewImageUrl: ref(""),
                frontViewImageUrl: ref(""),
                sideViewImageURL: ref(""),
                engineType: ref(""),
                driveType: ref(""),
                emptyWeight: ref(""),
                grossWeight: ref(""),
                trunkVolume: ref(""),
                maxSpeed: ref(""),
                from0to100: ref(""),
                averageFuelConsumption: ref(""),
                length: ref(""),
                width: ref(""),
                height: ref(""),
                wheelBase: ref(""),
            })
            function submit() {
               store.dispatch("carModule/addCar",newCar)
                router.push({name:'Home'})
                context.emit('fetchData')

            }

            return{newCar,submit}

        }
    }
</script>

<style scoped>

</style>