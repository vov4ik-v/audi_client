<template>
    <div>
        <img style="width: 100%" src="../assets/img/slide/slide-11.jpg" alt="homeImage">
    </div>
    <div class="container" style="margin-top: 60px">

        <car-info-box :cars="cars" alignment="left" :car_id="55"></car-info-box>
        <car-info-box :cars="cars" alignment="right" :car_id="56"></car-info-box>
        <car-info-box :cars="cars" alignment="left" :car_id="57"></car-info-box>

        <TheTabs :tabs="['e-tron','e-tron GT','A4','A5','A6','A7','A8','Q3','Q5','Q7','Q8','S','RS']" :selected="selected" @selected="setSelected">
            <TheTab v-for="model in models" :key="model.id" :is-selected="selected=== model.name">
                <CarBox :audi-model="model.name" :audi-models="models"></CarBox>
            </TheTab>
        </TheTabs>

    </div>

</template>

<script>

    import CarInfoBox from "../components/carInfo/CarInfoBox";
    import CarBox from "../components/carInfo/CarBox";
    import TheTabs from "../components/TheTabs";
    import TheTab from "../components/TheTab";
    export default {
        components: {CarBox, CarInfoBox,TheTabs,TheTab},
        data() {
            return {
                carBox_size:0,
                carInfoBox_size:0,
                models: [],
                cars:[],
                selected: 'e-tron'

            }
        },
        methods:{
            setSelected(tab){
                this.selected = tab
            },

            async loadFile(){
                await this.$store.dispatch("carModule/getAllCars");
                await this.$store.dispatch("audiModelModule/getAllAudiModels");
                this.cars = await this.$store.getters['carModule/cars'];
                this.models = await this.$store.getters['audiModelModule/audiModels']
            }

        },
        async mounted() {
            await this.loadFile()

        },
    }
</script>

<style scoped>

</style>