import axios from 'axios';
import authHeader from "./auth-header";
const API_URL = 'http://localhost:8088/api/email/';
class EmailService{
    getEmails(){
        return axios.get(API_URL+"getEmails",{headers:{
                'Authorization':authHeader()
            }})
    }
    deleteEmail(emailId){
        return axios.delete(API_URL+"deleteEmail/"+emailId,{headers:{
                'Authorization':authHeader()
            }})
    }
    sendMessage(email,emailRequest){
        return axios.put(API_URL+"sentMessage/"+email,JSON.stringify(emailRequest),{headers:{
                'Content-Type': 'application/json',
                'Authorization':authHeader()

            }})
    }
}
export default new EmailService();