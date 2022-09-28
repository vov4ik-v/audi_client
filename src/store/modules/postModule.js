import axios from "axios";
import * as sweetalert from "sweetalert";
import authHeader from "../../services/auth-header";
const user = JSON.parse(localStorage.getItem('user'));
export default {
    namespaced:true,
    state(){
        return{
            posts:[]

        }

    },
    mutations:{
        getAllPostsForUser(state,posts){
            state.posts=posts

        },
        updateUsersLiked(state,payload){
            state.posts.find(post => post.id == payload.postId).usersLiked = payload.usersLiked
            state.posts.find(post => post.id == payload.postId).likes = payload.likes
        }
    },
    actions:{
        async likePost({commit},payload){
            try {
                let {data} = await axios.post(`http://localhost:8088/api/post/${payload.postId}/${payload.username}/like`,{},{
                    headers: {
                        'Authorization': authHeader()
                    }})
                commit('updateUsersLiked',{
                    usersLiked: data.usersLiked,
                    likes: data.likes,
                    postId: payload.postId
                })
            }
            catch (e) {

            }

        },
        async createPost(_,payload){
            try{
                let {data} =  await axios.post(`http://localhost:8088/api/post/create`,JSON.stringify(payload.post),{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': authHeader()
                    }})
                if (data.status === 200){
                    await sweetalert({ icon:'success',title: 'Success!', text: 'Post added successfully'});
                }
            }catch(error) {
                await sweetalert({ icon:'error',title: 'Error!', text: 'Please try again'});
                console.log(error);
            };
            
            
        },
        async getAllPostsForUser({commit}){
            try{
                let response =  await axios.get(`http://localhost:8088/api/post/user/posts`,{   headers: {
                        'Authorization': authHeader()
                    }})
                if (response.status === 200){
                    commit("getAllPostsForUser",response.data)
                }
            }catch(error) {
                console.log(error);
            }
        },
        async getAllPostsForUserByUsername({commit},username){
            console.log(username)
            try{
                let response =  await axios.get(`http://localhost:8088/api/post/${username}/posts`,{   headers: {
                        'Authorization': authHeader()
                    }})
                commit("getAllPostsForUser",response.data)
            }catch(error) {
                console.log(error);
            }
        }
    },
    getters:{
        postsForUser:(state) =>{return state.posts},
        postUserLiked:(state) => (id) =>{
           let post =  state.posts.find(post => post.id == id)
            return {
                likes:post.likes,
                usersLiked:post.usersLiked
            }
        }
    }
}