<template>

    <li class="dropdown" v-for="audiModel in models" :key="audiModel.id"><a href="#"><span>
                        {{audiModel.name}}
                        </span> <i class="bi bi-chevron-right"></i></a>
        <ul>
            <li v-for="car in audiModel.cars" :key="car.id">
                <router-link custom v-slot="{navigate}" :to="{name:'Details', params:{modelName:toPathName(car)}}">
                    <a @click="navigate"> {{car.modelName}}</a>
                </router-link>
            </li>
        </ul>
    </li>



</template>

<script>
    export default {
        props:['models'],
        methods: {
            toPathName(car){
                return car.modelName.replace(/\s/g, '-').toLowerCase()
            },
        },
        data() {
            return {
                audiModels: {}

            }
        },
        mounted() {
        }
    }
</script>

<style scoped>

</style>