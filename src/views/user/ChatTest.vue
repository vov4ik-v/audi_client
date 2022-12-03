<template>
    <div class="container-fluid h-100">
        <div class="row justify-content-center h-100">
            <div class="col-md-4 col-xl-3 chat" :class="[friendIsSelect && mediaIsSmall ? 'dn' : '']">
                <div class="card mb-sm-3 mb-md-0 contacts_card">
                    <div class="card-header">
                        <div class="input-group">
                            <input type="text" placeholder="Search..." v-model="search" class="form-control search">
                            <div class="input-group-prepend">
                                <span class="h-100 input-group-text search_btn"><i class="fas fa-search"></i></span>
                            </div>
                        </div>
                    </div>
                    <div class="card-body contacts_body" >
                        <ui class="contacts">
                            <chat-friend-box @change-friend="changeActiveUser"
                                             v-for="contact in getFriendsByFirstNameAndLastName" :contact="contact"
                                             :key="contact.id"></chat-friend-box>
                        </ui>
                    </div>
                    <div class="card-footer"></div>
                </div>
            </div>
            <div :class="[!friendIsSelect && mediaIsSmall ? 'dn' : '']" class="col-md-8 col-xl-6 chat">
                <div id="scrollTo" class="card" v-if="activeContact !== undefined">
                    <div class="card-header msg_head">
                        <div class="d-flex bd-highlight">
                            <router-link custom to="/direct" v-slot="{navigate}"><svg @click="navigate" v-if="getDirectOrFriendList" style="align-self:center;margin-right:10px" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-arrow-left-square-fill" viewBox="0 0 16 16">
                                <path d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1z"/>
                            </svg></router-link>
                            <div class="img_cont">
                                <img :src="activeContact.image" class="rounded-circle user_img">
                                <span class="online_icon"></span>
                            </div>
                            <div class="user_info">
                                <span>Chat with {{activeContact.firstname}} {{activeContact.lastname}}</span>
                            </div>
                        </div>
                    </div>
                    <div id="TEST" class="card-body msg_card_body">
                        <div v-for="message in messages" :key="message.id" class="d-flex mb-4"
                             :class="[message.senderId === getCurrentUser.id ? 'justify-content-end' : 'justify-content-start']">
                            <div v-if="message.senderId !== getCurrentUser.id" class="img_cont_msg">
                                <img :src="activeContact.image" class="rounded-circle user_img_msg">
                            </div>
                            <div :class="[message.senderId === getCurrentUser.id ? 'msg_cotainer_send' : 'msg_cotainer']">
                                {{message.content}}
                                <span :class="[message.senderId === getCurrentUser.id ? 'msg_time_send' : 'msg_time']">{{getTime(message).number}}{{getTime(message).type.substr(0, 1)}} ago</span>
                            </div>
                            <div v-if="message.senderId === getCurrentUser.id" class="img_cont_msg">
                                <img :src="getProfileImage" class="rounded-circle user_img_msg">
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="input-group">
                            <textarea name="" v-model="message" class="form-control type_msg"
                                      placeholder="Type your message..."></textarea>
                            <div class="input-group-append">
                                <span @click="sendMessage" class="input-group-text send_btn"><i
                                        class="fas fa-location-arrow"></i></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ChatService from '../../services/chat.service'
    import UserService from '../../services/user.service'
    import ChatDirectForUser from "../../components/user/ChatDirectForUser";
    import ChatFriendBox from "../../components/user/ChatFriendBox";
    import ImageService from "../../services/image.service";
    import timesPlugin from "../../plugins/timesPlugin";

    let stompClient = null
    export default {
        components: {ChatFriendBox, ChatDirectForUser},
        computed: {
            friendIsSelect(){
                console.log(this.$route.query)
                return this.$route.query.directId !== undefined
            },
            getCurrentUser() {
                return this.$store.getters['auth/getCurrentUserInfo']
            },
            getProfileImage() {
                let image = this.$store.getters['imageUploadModule/getProfileImage']
                return 'data:image/png;base64,' + image.imageBytes
            },
            getFriendsByFirstNameAndLastName() {
                return this.contacts.filter(item => (item.firstname.indexOf(this.search) || item.lastname.indexOf(this.search)) !== -1)
            },
            mediaIsSmall() {
                return this.mediaQuery.matches
            },
            getDirectOrFriendList(){
                if(window.innerWidth<768 && this.$route.query.directId !== undefined){
                    return true;
                }
                return false
            }
        },
        data() {

            return {
                mediaQuery: window.matchMedia('(max-width: 787px)'),
                messages: [],
                activeContact: undefined,
                contacts: [],
                message: "",
                search: '',
                current: new Date()
            }
        },
        methods: {
            changeActiveUser(data) {
                console.log(data)
                this.activeContact = data
                this.loadMessages()

            },

        getTime(message){
            return timesPlugin.differenceTimes(message.timestamp, this.current)
        },
            loadMessages() {
                if (this.activeContact !== undefined) {
                    ChatService.findChatMessages(this.activeContact.id, this.getCurrentUser.id).then((msgs) => this.messages = msgs.data)
                }

            },
            sendMessage() {
                let msg = this.message
                if (msg.trim() !== "") {
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
                this.message = ""
            },
            connect() {
                const socket = new SockJS('http://localhost:8088/ws');
                stompClient = Stomp.over(socket);
                stompClient.connect({}, this.onConnected, this.onError);
            },
            onError(err) {
                console.log(err);
            },
            onConnected() {
                this.loadContacts()
                console.log("connected");
                stompClient.subscribe("/user/" + this.getCurrentUser.id + "/queue/messages", this.onMessageReceived)

            },
            onMessageReceived(msg) {

                const notification = JSON.parse(msg.body)
                const active = this.activeContact;
                console.log(active)
                if (active.id === notification.senderId) {
                    ChatService.findChatMessage(notification.id).then((message) => {
                        // const newMessages = JSON.parse(sessionStorage.getItem("recoil-persist")).chatMessages
                        const newMessages = this.messages
                        newMessages.push(message);
                        this.messages = newMessages
                    })

                } else {
                    console.info("Received a new message from " + notification.senderName)
                }
                this.loadContacts();

            },
            loadContacts() {
                console.log("Load")
                const promise = UserService.getUsers().then((users) =>
                    users.data.map((contact) =>
                        ChatService.countNewMessages(contact.id, this.getCurrentUser.id).then((count) => {
                            ImageService.getImageToUserByUsername(contact.username).then(
                                (response) => {
                                    if (response.data.imageBytes !== undefined) {
                                        contact.image = 'data:image/png;base64,' + response.data.imageBytes
                                    } else {
                                        contact.image = "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
                                    }
                                },
                                (error) => {
                                    contact.image =
                                        (error.response &&
                                            error.response.data &&
                                            error.response.data.message) ||
                                        error.message ||
                                        error.toString();

                                }
                            )
                            contact.newMessages = count.data;
                            return contact;
                        })
                    )
                );
                promise.then((promise) => {
                    Promise.all(promise).then((users) => {
                        this.contacts = users;
                        if (this.activeContact === undefined && users.length > 0) {
                            console.log(this.$route.query.directId)
                            if (this.$route.query.directId) {
                                this.activeContact = users.find(user => user.id == this.$route.query.directId)
                                console.log(this.activeContact)
                                ImageService.getImageToUserByUsername(this.activeContact.username).then(
                                    (response) => {
                                        if (response.data.imageBytes !== undefined) {
                                            this.activeContact.image = 'data:image/png;base64,' + response.data.imageBytes
                                        } else {
                                            this.activeContact.image = "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
                                        }
                                    },
                                    (error) => {
                                        this.activeContact.image =
                                            (error.response &&
                                                error.response.data &&
                                                error.response.data.message) ||
                                            error.message ||
                                            error.toString();

                                    }
                                )
                            }
                        }
                        this.loadMessages()
                    })
                })

            },
            scroll() {
                console.log("tut")
                let scroll = document.getElementById("scrollTo")
                scroll.scrollTop = 90
            }
        },
        mounted() {
            this.connect()
        }
    }
</script>

<style scoped>
    .dn{
        display:none
    }
    .friend-body:hover {
        background-color: #818182;
    }

    .chat {
        margin-top: auto;
        margin-bottom: auto;
    }

    .card {
        height: 87vh;
        border-radius: 15px !important;
        background-color: rgba(0, 0, 0, 0.4) !important;
    }

    .contacts_body {
        padding: 0.75rem 0 !important;
        overflow-y: auto;
        white-space: nowrap;
    }

    .msg_card_body {
        overflow-y: auto;
    }

    .card-header {
        border-radius: 15px 15px 0 0 !important;
        border-bottom: 0 !important;
    }

    .card-footer {
        border-radius: 0 0 15px 15px !important;
        border-top: 0 !important;
    }

    .container {
        align-content: center;
    }

    .search {
        border-radius: 15px 0 0 15px !important;
        background-color: rgba(0, 0, 0, 0.3) !important;
        border: 0 !important;
        color: white !important;
    }

    .search:focus {
        box-shadow: none !important;
        outline: 0px !important;
    }

    .type_msg {
        background-color: rgba(0, 0, 0, 0.3) !important;
        border: 0 !important;
        color: white !important;
        height: 60px !important;
        overflow-y: auto;
    }

    .type_msg:focus {
        box-shadow: none !important;
        outline: 0px !important;
    }

    .attach_btn {
        border-radius: 15px 0 0 15px !important;
        background-color: rgba(0, 0, 0, 0.3) !important;
        border: 0 !important;
        color: white !important;
        cursor: pointer;
    }

    .send_btn {
        border-radius: 0 15px 15px 0 !important;
        background-color: rgba(0, 0, 0, 0.3) !important;
        border: 0 !important;
        color: white !important;
        cursor: pointer;
        height: 100%;
    }

    .search_btn {
        border-radius: 0 15px 15px 0 !important;
        background-color: rgba(0, 0, 0, 0.3) !important;
        border: 0 !important;
        color: white !important;
        cursor: pointer;
    }

    .contacts {
        list-style: none;
        padding: 0;
    }

    .contacts li {
        width: 100% !important;
        padding: 5px 10px;
        margin-bottom: 15px !important;
    }

    .active {
        background-color: rgba(0, 0, 0, 0.3);
    }

    .user_img {
        height: 70px;
        width: 70px;
        border: 1.5px solid #f5f6fa;

    }

    .user_img_msg {
        height: 40px;
        width: 40px;
        border: 1.5px solid #f5f6fa;

    }

    .img_cont {
        position: relative;
        height: 70px;
        width: 70px;
    }

    .img_cont_msg {
        height: 40px;
        width: 40px;
    }

    .online_icon {
        position: absolute;
        height: 15px;
        width: 15px;
        background-color: #4cd137;
        border-radius: 50%;
        bottom: 0.2em;
        right: 0.4em;
        border: 1.5px solid white;
    }

    .offline {
        background-color: #c23616 !important;
    }

    .user_info {
        margin-top: auto;
        margin-bottom: auto;
        margin-left: 15px;
    }

    .user_info span {
        font-size: 20px;
        color: white;
    }

    .user_info p {
        font-size: 10px;
        color: rgba(255, 255, 255, 0.6);
    }

    .video_cam {
        margin-left: 50px;
        margin-top: 5px;
    }

    .video_cam span {
        color: white;
        font-size: 20px;
        cursor: pointer;
        margin-right: 20px;
    }

    .msg_cotainer {
        margin-top: auto;
        margin-bottom: auto;
        margin-left: 10px;
        border-radius: 25px;
        background-color: #82ccdd;
        padding: 10px;
        max-width: 70%;
        min-width: 38px;
        position: relative;
    }

    .msg_cotainer_send {
        min-width: 38px;
        margin-top: auto;
        margin-bottom: auto;
        margin-right: 10px;
        border-radius: 25px;
        background-color: #78e08f;
        padding: 10px;
        max-width: 70%;
        position: relative;
    }

    .msg_time {
        position: absolute;
        bottom: -15px;
        left: 0;
        color: rgba(255, 255, 255, 0.5);
        font-size: 10px;
    }

    .msg_time_send {
        position: absolute;
        bottom: -15px;
        right: 0;
        color: rgba(255, 255, 255, 0.5);
        font-size: 10px;
    }

    .msg_head {
        position: relative;
    }

    #action_menu_btn {
        position: absolute;
        right: 10px;
        top: 10px;
        color: white;
        cursor: pointer;
        font-size: 20px;
    }

    .action_menu {
        z-index: 1;
        position: absolute;
        padding: 15px 0;
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        border-radius: 15px;
        top: 30px;
        right: 15px;
        display: none;
    }

    .action_menu ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .action_menu ul li {
        width: 100%;
        padding: 10px 15px;
        margin-bottom: 5px;
    }

    .action_menu ul li i {
        padding-right: 10px;

    }

    .action_menu ul li:hover {
        cursor: pointer;
        background-color: rgba(0, 0, 0, 0.2);
    }

    @media (max-width: 576px) {
        .contacts_card {
            margin-bottom: 15px !important;
        }
    }
</style>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           