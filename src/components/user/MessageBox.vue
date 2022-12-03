<template>
    <div class="d-flex mb-4"
         :class="[message.senderId === currentUserId ? 'justify-content-end' : 'justify-content-start']">
        <div v-if="message.senderId !== currentUserId" class="img_cont_msg">
            <img :src="user" class="rounded-circle user_img_msg">
        </div>
        <div :class="[message.senderId === currentUserId ? 'msg_cotainer_send' : 'msg_cotainer']">
            {{message.content}}
            <span :class="[message.senderId === currentUserId ? 'msg_time_send' : 'msg_time']">{{getTime(message.timestamp).number}} {{getTime(message.timestamp).type.substr(0, 1)}} ago</span>
        </div>
        <div v-if="message.senderId === currentUserId" class="img_cont_msg">
            <img :src="profileImage" class="rounded-circle user_img_msg">
        </div>
    </div>
</template>

<script>
    import timesPlugin from "../../plugins/timesPlugin";

    export default {
        computed: {
            getTime() {
                return timesPlugin.differenceTimes(this.message, this.current)
            },
        },
        data() {
            return {
                current: new Date()

            }
        },

        props: ["message", "userImage", "profileImage", "currentUserId"]
    }
</script>

<style scoped>

</style>