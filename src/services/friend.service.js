import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8088/api';
class FriendService{

    addUserToFriend(userId){
        return axios.post(API_URL+'/addFriend?friendId='+userId,{},{headers:{
                'Content-Type': 'application/json',
                'Authorization': authHeader()
            }})
    }
    getFriendsFoUser(){
        return axios.get(API_URL+'/listFriends',{headers:{
                'Authorization': authHeader()
            }})

    }

    isFriend(userId){
        return axios.post(API_URL+'/isFriend?friendId='+userId,{},{headers:{
                'Content-Type': 'application/json',
                'Authorization': authHeader()
            }})
    }


}
export default new FriendService();