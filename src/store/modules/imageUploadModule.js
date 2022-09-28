import axios from "axios";
import * as sweetalert from "sweetalert";
import authHeader from "../../services/auth-header";
const user = JSON.parse(localStorage.getItem('user'));
export default {
    namespaced: true,
    state() {
        return {
            profileImage: [],
            userImage:[]

        }

    },
    actions: {
        async uploadImageToUser({dispatch}, image) {
            try {
                let formData = new FormData();
                formData.append('file',image);
                let data = await axios.post(`http://localhost:8088/api/image/upload`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': user.token
                    }
                })
                console.log(data)
                dispatch("getProfileImage")
            } catch (error) {
                await sweetalert({icon: 'error', title: 'Error!', text: 'Please try again'});
                console.log(error);
            }
            ;

        },
        async uploadImageToPost(_,payload) {
            try {
                let formData = new FormData();
                formData.append('file',payload.image);
                let {data} = await axios.post(`http://localhost:8088/api/image/${payload.postId}/upload`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': user.token
                    }
                })
            } catch (error) {
                await sweetalert({icon: 'error', title: 'Error!', text: 'Please try again'});
                console.log(error);
            }
            ;

        },
        async getProfileImage({commit}){
            try {
                let response = await axios.get(`http://localhost:8088/api/image/profileImage`, {
                    headers: {
                        'Authorization':authHeader()
                    }
                })
                commit("changeProfileImage",response.data)
            }
            catch (e) {
                console.log(error)
            }
        },
        async getPostImage({commit}){
            try {
                let response = await axios.get(`http://localhost:8088/api/image/profileImage`, {
                    headers: {
                        'Authorization': user.token
                    }
                })
                commit("changeProfileImage",response.data)
            }
            catch (e) {
                console.log(error)
            }
        },
        async getUserImage({commit},username){
            try {
                let response = await axios.get(`http://localhost:8088/api/image/user/${username}`, {
                    headers: {
                        'Authorization': authHeader()
                    }
                })
                commit('setUserImage',response.data)

            }
            catch (e) {
                console.log(error);
            }
        }

    },
    mutations:{
        changeProfileImage(state,profileImage) {
            state.profileImage = profileImage;
        },
        setUserImage(state,userImage) {
            state.userImage = userImage;
        }
    },
    getters:{
        getProfileImage:(state) =>{return state.profileImage},
        getUserImage:(state) =>{return state.userImage},
    }
}