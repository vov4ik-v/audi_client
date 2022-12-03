<template>
    <div class="container">
        <TheTabs :tabs="['e-tron','e-tron GT','A4','A5','A6','A7','A8','Q3','Q5','Q7','Q8','S','RS']" :selected="selected" @selected="setSelected">
            <TheTab v-for="model in getModels" :key="model.id" :is-selected="selected=== model.name">
                <CarEditBox :audi-model="model.name" :audi-models="getModels"></CarEditBox>
            </TheTab>
        </TheTabs>
    </div>
</template>

<script>
    import TheTab from "../../components/TheTab";
    import TheTabs from "../../components/TheTabs";
    import CarEditBox from "../../components/carInfo/CarEditBox";
    import TheDropDown from "../../components/TheDropDown";
    export default {
        methods:{
            setSelected(tab){
                this.selected = tab
            },
        },
            data() {
                return {
                    selected: 'e-tron'

                }
            },
            components: {CarEditBox,TheTabs,TheTab,TheDropDown},
            computed:{
            getModels(){
                return this.$store.getters['audiModelModule/audiModels']
            },
            getCars(){
                return this.$store.getters['carModule/cars']
            },
        }
    }
</script>

<style scoped>

</style>