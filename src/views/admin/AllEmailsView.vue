<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <table class="table table-bordered">
                    <thead>
                    <tr>
                        <th scope="col">№</th>
                        <th scope="col">Email</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(email,idx) in emails" :key="email.id">
                        <th scope="row">{{idx+1}}</th>
                        <td>{{email.email}}</td>
                        <td class="text-center" style="width: 120px">
                            <button type="button" class="btn btn-success" data-bs-toggle="modal" :data-bs-target="'#modal'+email.id" style="margin-right: 5px"><i class="fas fa-edit"></i></button>
                            <button type="button" class="btn btn-danger" @click="deleteEmail(email.id)"><i class="far fa-trash-alt"></i></button>
                            <div class="modal fade" :id="'modal'+email.id" tabindex="-1" :aria-labelledby="label" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="label">Sent message</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body form-group">
                                            <input type="text" class="form-control" v-model="messageBody.subject" placeholder="Subject...">
                                        </div>
                                        <div class="modal-body form-group">
                                            <input type="text" class="form-control" v-model="messageBody.message" placeholder="Message...">
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary"  data-bs-dismiss="modal">Close</button>
                                            <button type="button" class="btn btn-primary" @click="sentMessage(email.email)">Sent</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </td>
                    </tr>
                    </tbody>
                </table>

            </div>
        </div>
    </div>
</template>

<script>
    import EmailService from '../../services/email.service'
    export default {
        data(){
            return{
                showModal:true,
                emails:[],
                messageBody:{
                    subject:"",
                    message:""
                }
            }
        },
        methods:{
          deleteEmail(emailId){
              EmailService.deleteEmail(emailId).then((response) =>{
                  console.log(response)
                  if(response.status === 200){
                      EmailService.getEmails().then((response)=>{
                              this.emails = response.data
                          },
                          (error)=>{
                              console.error(error)
                          })
                  }
              })

          },
          sentMessage(email){
              EmailService.sendMessage(email,this.messageBody).then((response)=>{
                  console.log(response)
                  this.showModal = false
              })
            }
        },
        mounted() {
            EmailService.getEmails().then((response)=>{
                this.emails = response.data
            },
            (error)=>{
                console.error(error)
            })
        }
    }
</script>

<style scoped>

</style>