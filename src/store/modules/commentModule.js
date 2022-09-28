import axios from "axios";
import * as sweetalert from "sweetalert";
const user = JSON.parse(localStorage.getItem('user'));
export default {
    namespaced:true,
    state(){
        return{
            comments:[]
        }

    },
    mutations:{
        getAllComments(state,comments){
            state.comments = comments

        },
        addComment(state,comment){
            state.comments.push(comment)
        }
    },
    actions: {
        async createComment({commit},payload){
            try {
          let {data}  = await axios.post(`http://localhost:8088/api/comment/${payload.postId}/create`,JSON.stringify({
              message:payload.message,
              username:payload.username

          }),{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': user.token
                }})
                commit("addComment",data)
            if (data.status === 200){
                await sweetalert({ icon:'success',title: 'Success!', text: 'Post added successfully'});
            }
        }catch(error) {
            await sweetalert({ icon:'error',title: 'Error!', text: 'Please try again'});
            console.log(error);
        }

        },
        async getAllComments({commit},postId){
            try {
            let response = await axios.get(`http://localhost:8088/api/comment/${postId}/all`,{   headers: {
                    'Authorization': user.token
                }})
            if (response.status === 200){
                commit("getAllComments",response.data)
            }
        }catch(error) {
            console.log(error);
        }
        }
    },
    getters:{
        getAllComments:(state) =>{return state.comments},

    }
}