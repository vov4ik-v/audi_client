<template>
    <TheTopbar/>
    <TheNavbar/>
    <div style="min-height: 87vh">
        <div id="logreg-forms" >
            <div class="row">
                <div class="col-12 text-center pt-3">
                    <router-link to="/"  >
                <img src="../assets/img/logo2.png" height="40" alt="CoolBrand">
            </router-link>
                </div>
            </div>
            <router-view></router-view>
        </div>
    </div>
    <TheFooter/>
</template>

<script>
    import TheTopbar from "../components/TheTopbar";
    import TheFooter from "../components/TheFooter";
    import TheNavbar from "../components/TheNavbar";
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

<style scoped>

</style>