import axios from 'axios';
import authHeader from "./auth-header";
const API_URL = 'http://localhost:8088/messages/';
class ChatService {
    findChatMessages(senderId,recipientId){
        // if (!localStorage.getItem("token")) {
        //     return Promise.reject("No access token set.");
        // }
        return axios.get(API_URL+senderId+"/"+recipientId, { headers:{
                'Authorization':authHeader()
            }})
    }
    findRecipientUserByChatIdAndSenderId(senderId,chatId){
        return axios.get(API_URL+"getRecipient"+chatId+"/"+senderId, { headers:{
                'Authorization':authHeader()
            }})
    }
    findChatMessage(id){
        // if (!localStorage.getItem("token")) {
        //     return Promise.reject("No access token set.");
        // }
        return axios.get(API_URL+id, { headers:{
                'Authorization':authHeader()
            }})
    }
    countNewMessages(senderId, recipientId){
        return  axios.get(API_URL+senderId+"/"+recipientId+"/count", { headers:{
                'Authorization':authHeader()
            }})
    }


}
export default new ChatService();