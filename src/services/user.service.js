import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8088/api/user';
class UserService {
     getUserBoard() {
        return axios.get(API_URL + '/', { headers:{
                'Authorization':authHeader()
        }});
    }
    getUsers(){
        return axios.get(API_URL+"/allUser", { headers:{
                'Authorization':authHeader()
            }})
    }
    resetPassword(email){
        let formData = new FormData();
        formData.append('email',email);
         return axios.post(API_URL+"/forgot",formData,{headers:{
                 'Content-Type': 'application/json'
        }},)
    }
    setNewPassword(token,password){
        let formData = new FormData();
        formData.append('resetToken',token);
        formData.append('password',password);
        return axios.post(API_URL+"/forgot/setNewPassword",formData,{headers:{
                'Content-Type': 'application/json'
            }})
    }
    changePassword(oldPassword,newPassword){
        let formData = new FormData();
        formData.append('oldPassword',oldPassword);
        formData.append('newPassword',newPassword);
        return axios.post(API_URL+"/changePassword",formData,{headers:{
                'Authorization':authHeader(),
                'Content-Type': 'application/json'
            }})
    }

}
export default new UserService();