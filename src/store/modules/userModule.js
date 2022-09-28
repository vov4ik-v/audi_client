import axios from "axios";
import * as sweetalert from "sweetalert";
import {auth} from '../modules/auth.module'
import UserService from "../../services/user.service";
const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
    ? { status: { loggedIn: true }, user }
    : { status: { loggedIn: false }, user: null };
export default {
    namespaced:true,
    state(){
        return{
            initialState,
            currentUserProfile:{},
            user:{}
        }
    },
    actions:{
        async getUserByUsername({commit},username){
          try {
              let response = await axios.get(`http://localhost:8088/api/user/${username}`,{   headers: {
                      'Authorization': user.token
                  }})
              console.log(response)
              commit("getUserByUsername",response.data)
          }
          catch (e) {
            console.log(e)
          }

        },
       async updateUser(_,updatedUser){
            try{
                let {data} =  await axios.post(`http://localhost:8088/api/user/update`,JSON.stringify(updatedUser),{
                    headers: {
                        'Content-Type': 'application/json',
                         'Authorization': user.token

                    }})
                console.log(data)
                if (data.status === 200){
                    await sweetalert({ icon:'success',title: 'Success!', text: 'Car edited successfully'});
                }
            }catch(error) {
                await sweetalert({ icon:'error',title: 'Error!', text: 'Please try again1'});
                console.log(error);
            }
        },
        async getUserInfo({commit}){
           let {data} = await axios.get('http://localhost:8088/api/user/',{   headers: {
                   'Authorization': user.token
               }})
          commit("updateUser",data)
        }
    },
    mutations:{
        updateUser(state,updateUser){
            state.currentUserProfile = updateUser;
        },
        getUserByUsername(state,user){
            state.user = user
        },
    }
    ,
    getters:{
        getCurrentUser(){
            return user;
        },
        getCurrentUserInfo(state){
            return state.currentUserProfile
        },
        getUserByUsername(state){
            return state.user
        }
    }
}