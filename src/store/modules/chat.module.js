import axios from "axios";
import * as sweetalert from "sweetalert";
import UserService from "../../services/user.service";
import ChatService from "../../services/chat.service";
const user = JSON.parse(localStorage.getItem('user'));
export const chat = {
    namespaced: true,
    state() {
        return {
            usersToChat: []
        }
    },
    actions:{
            getFriends({commit}){
                const friends = UserService.getUsers().then((users) =>
                    users.data.map((contact) =>
                        ChatService.countNewMessages(contact.id, this.getCurrentUser.id).then((count) => {
                           contact.newMessages = count.data;
                            return contact;
                        })))
                commit("getFriends",friends)
            }



    },
    mutations:{
            getFriends(state,users){
                state.usersToChat = users;
            }
    },
    getters:{

    }
}