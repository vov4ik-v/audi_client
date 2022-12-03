<template>
    <div class="modal fade" :id="modalId" tabindex="-1"
         aria-labelledby="postAddLabel"
         aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">

                <!-- Modal body -->
                <div class="modal-body text-center">
                    <img :src="image" alt="user" class="image-for-user">
                    <p class="text-center" style="margin-bottom: 28px">Unfollow @{{friend.username}}?</p>
                    <hr>
                    <button type="button" class="btn unfollow-btn" @click="followOrUnfollow" data-bs-dismiss="modal">Unfollow</button>
                    <hr>
                    <button type="button" class="btn cancel-btn" data-bs-dismiss="modal">Cancel</button>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:["modalId","friend","image"]
    }
</script>

<style scoped>

</style>