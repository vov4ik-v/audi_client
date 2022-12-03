<template>
    <section style="background-color: #eee;">
        <div class="container py-5">

            <div class="row">

                <div class="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0" style="background-color:white">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fa fa-search"></i></span>
                        </div>
                        <input type="text" class="form-control" placeholder="Search...">
                    </div>
                    <div class="card" style="border:0">
                        <div class="card-body" style="padding:0; ">
                            <ul class="list-unstyled mb-0">
                                <div class="example-2 square scrollbar-dusty-grass square thin">
                                    <chat-user-box @change-active-user="changeActiveUser" v-for="contact in contacts" :contact="contact" :key="contact.id"></chat-user-box>

                                </div>
                            </ul>

                        </div>
                    </div>

                </div>

                <div class="col-md-6 col-lg-7 col-xl-8" style="padding-left:0">
                    <div class="chat-header clearfix">
                        <div class="row">
                            <div class="col-lg-6">
                                <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
                                    <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar">
                                </a>
                                <div class="chat-about">
                                    <router-link to="/test"><h6 class="m-b-0">Aiden Chavez</h6></router-link>
                                    <small>Last seen: 2 hours ago</small>
                                </div>
                            </div>
                            <div class="col-lg-6 hidden-sm text-right">
                                <a href="javascript:void(0);" class="btn btn-outline-secondary"><i class="fa fa-camera"></i></a>
                                <a href="javascript:void(0);" class="btn btn-outline-primary"><i class="fa fa-image"></i></a>
                                <a href="javascript:void(0);" class="btn btn-outline-info"><i class="fa fa-cogs"></i></a>
                                <a href="javascript:void(0);" class="btn btn-outline-warning"><i class="fa fa-question"></i></a>
                            </div>
                        </div>
                    </div>
                    <ul class="list-unstyled">
                        <div id="chatContainer" ref="chat" class="example-1 square scrollbar-dusty-grass square thin">
                        <li class="d-flex mb-4" :class="[message.senderId === getCurrentUser.id ? 'justify-content-end' : 'justify-content-start']" v-for="message in messages" :key="message.id">
                            <img v-if="message.senderId !== getCurrentUser.id" src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp" alt="avatar"
                                 class="rounded-circle d-flex align-self-start me-3 shadow-1-strong" width="40">
                            <div class="card direct-card">
                                <div class="card-body" style="padding:0.5rem 0.5rem">
                                    <p class="mb-0">
                                        {{message.content}}
                                    </p>
                                </div>
                            </div>
                            <img v-if="message.senderId === getCurrentUser.id" src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp" alt="avatar"
                                 class="rounded-circle d-flex align-self-start ms-3 shadow-1-strong" width="40">
                        </li>
                        </div>
                        <li class="bg-white mb-3">
                            <div class="flex-grow-0 py-3 px-4 border-top">
                                <div class="input-group">
                                <textarea class="form-control" placeholder="Message" v-model="message" id="textAreaExample2" rows="5"></textarea>
                                    <button type="button" class="btn btn-info btn-rounded float-end" @click="sendMessage">Send</button>
                            </div>
                            </div>
                        </li>


                    </ul>
                    </div>
                </div>

            </div>


    </section>
</template>

<script>
    import ChatService from '../../services/chat.service'
    import UserService from '../../services/user.service'
    import ChatUserBox from "../../components/user/ChatUserBox";
    import ChatDirectForUser from "../../components/user/ChatDirectForUser";
    let stompClient = null
    export default {
        components:{ChatUserBox,ChatDirectForUser},
        computed:{
            getCurrentUser(){
                return this.$store.getters['auth/getCurrentUserInfo']
            }
        },
        data(){

            return{
                messages:[],
                activeContact:undefined,
                contacts:{},
                message:"",
            }
        },
        methods:{
            changeActiveUser(data){
              this.activeContact = data
                this.loadMessages()
            },
            loadMessages(){
                if(this.activeContact !== undefined){
                    ChatService.findChatMessages(this.activeContact.id, this.getCurrentUser.id).then((msgs) =>this.messages = msgs.data)
                }
                this.scrollToEnd()
            },
            sendMessage(){
                let msg = this.message
              if(msg.trim() !== ""){
                  const message = {
                      senderId: this.getCurrentUser.id,
                      recipientId: this.activeContact.id,
                      senderName: this.getCurrentUser.username,
                      recipientName: this.activeContact.name,
                      content: msg,
                      timestamp: new Date(),
                  };
                  stompClient.send("/app/chat", {}, JSON.stringify(message));
                  const newMessages = this.messages
                  newMessages.push(message)
                  this.messages = newMessages
              }
                this.message =""
            },
            connect(){
                        const socket = new SockJS('http://localhost:8088/ws');
                        stompClient = Stomp.over(socket);
                        stompClient.connect({}, this.onConnected, this.onError);
            },
            onError(err){
                console.log(err);
            },
            onConnected(){
                this.loadContacts()
                console.log("connected");
                stompClient.subscribe("/user/" + this.getCurrentUser.id + "/queue/messages",this.onMessageReceived)

            },
            onMessageReceived(msg){

                const notification = JSON.parse(msg.body)
                const active = this.activeContact;
                if(active.id === notification.senderId){
                    ChatService.findChatMessage(notification.id).then((message)=>{
                        // const newMessages = JSON.parse(sessionStorage.getItem("recoil-persist")).chatMessages
                        const newMessages = this.messages
                        newMessages.push(message);
                        this.messages = newMessages
                    })

                }
                else {
                    console.info("Received a new message from " + notification.senderName)
                }
                this.loadContacts();

            },
            loadContacts(){
                console.log("Load")
                const promise = UserService.getUsers().then((users) =>
                    users.data.map((contact) =>
                        ChatService.countNewMessages(contact.id, this.getCurrentUser.id).then((count) => {

                            contact.image = "ds"
                            contact.newMessages = count.data;
                            return contact;
                        })
                    )
                );
                promise.then((promise) =>{
                    Promise.all(promise).then((users) =>{
                        this.contacts = users;
                        if (this.activeContact === undefined && users.length>0){
                            this.activeContact = users[0]

                        }
                        this.loadMessages()

                    })

                })


            },
            scrollToEnd() {
                let container = this.$refs.chat;
                container.scrollTop = container.scrollHeight;

            },
        },
        mounted() {
            console.log(this.$route.params)
            this.connect()


        }
    }
</script>

<style scoped>
    .card-body{

    }
.direct-card{
    max-width:45%;
    border-radius:1.25rem
}
.scrollbar-dusty-grass::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
    background-color: #F5F5F5;
    border-radius: 10px;
}

.scrollbar-dusty-grass::-webkit-scrollbar {
    width: 12px;
    background-color: #F5F5F5;
}

.scrollbar-dusty-grass::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
    background-image: -webkit-linear-gradient(330deg, #d4fc79 0%, #96e6a1 100%);
    background-image: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%);
}


.square::-webkit-scrollbar-track {
    border-radius: 0 !important;
}

.square::-webkit-scrollbar-thumb {
    border-radius: 0 !important;
}

.thin::-webkit-scrollbar {
    width: 6px;
}

.example-1 {
    position: relative;
    overflow-y: scroll;
    height: 75vh;
}
    .example-2 {
        position: relative;
        overflow-y: scroll;
        height: 88vh;
    }
</style>