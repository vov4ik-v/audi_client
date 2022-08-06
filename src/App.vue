<template>
        <component :is="layout +'-layout'" v-if="layout"></component>
</template>

<script>
    import {useRoute} from 'vue-router'
    import {computed} from 'vue'
    import MainLayout from "./layout/MainLayout";
    import AuthLayout from "./layout/AuthLayout";
    export default {
        components: {MainLayout,AuthLayout},
        setup(){
            const route = useRoute()
            return {
                layout:computed(() => route.meta.layout)

            }

        },

    }
</script>

<style>
</style>