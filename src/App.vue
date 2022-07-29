<template>
    <TheTopbar/>
    <TheNavbar/>
   <router-view @fetchData="fetchData()"></router-view>
    <TheFooter/>

</template>

<script>
    import TheTopbar from "./components/TheTopbar";
    import TheFooter from "./components/TheFooter";
    import TheNavbar from "./components/TheNavbar";
    import {useStore} from 'vuex'
    import {ref,onMounted} from 'vue';
    export default {
        components: {TheTopbar, TheFooter,TheNavbar},
        setup(){
            const store = useStore()
            function fetchData(){
                store.dispatch("carModule/getAllCars")
                store.dispatch("audiModelModule/getAllAudiModels")

            }
            onMounted( () => {
                fetchData()
            })
            return {fetchData}

        },

    }
</script>

<style>
</style>
