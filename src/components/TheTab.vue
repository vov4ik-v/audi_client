<template>
    <div v-if="isSelected">
        <slot></slot>
    </div>
</template>

<script>
    import {inject} from 'vue'
    export default {
        props:{
            isSelected:{
                type:Boolean
            }
        },

    }
</script>

<style scoped>

</style>