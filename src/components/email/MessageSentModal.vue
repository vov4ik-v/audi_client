<template>


    <div class="modal fade" :id="'sentMessageModalWithId'+modalId" tabindex="-1" :aria-labelledby="'sentMessageAriaWithId'+modalId" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" :id="'sentMessageAriaWithId'+modalId">Sent message</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body form-group">
                    <input type="text" class="form-control" v-model="messageBody.subject" placeholder="Subject...">
                </div>
                <div class="modal-body form-group">
                    <input type="text" class="form-control" v-model="messageBody.message" placeholder="Message...">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" @click="sentMessage">Sent</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import EmailService from "../../services/email.service";

    export default {
        props:["email","modalId"],
        data(){
            return{
                messageBody:{
                    subject:"",
                    message:""
                }
            }
        },
        methods:{
            sentMessage(){
                EmailService.sendMessage(this.email,this.messageBody).then((response)=>{
                    console.log(response)
                })
            }
        },
    }
</script>

<style scoped>

</style>