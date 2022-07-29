<template>
    <li class="dropdown"><a href="#"><span>Моделі</span> <i class="bi bi-chevron-down"></i></a>
        <ul v-for="audiModel in audiModels" :key="audiModel.id">
            <li class="dropdown"><a href="#">{{audiModel}}<span>
                        </span> <i class="bi bi-chevron-right"></i></a>
                <ul v-for="car in audiModel.cars">
                    <li>
                        {{car.modelName}}
                    </li>
                </ul>
            </li>
        </ul>
    </li>

</template>

<script>
    export default {
        methods: {

        },
        data() {
            return {
                audiModels: {}

            }
        },
        mounted() {
            console.log("drop")
            setTimeout(() => {
                this.audiModels = this.$store.getters['audiModelModule/audiModels']
            }, 250)
        }
    }
</script>

<style scoped>

</style>