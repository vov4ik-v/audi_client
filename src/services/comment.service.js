import axios from 'axios';
import authHeader from "./auth-header";
const API_URL = 'http://localhost:8088/api/comment/';
class CommentService{
   getNewsComments(id){
       return axios.get(API_URL+'newsComments/'+id,{ headers: {
               'Authorization':authHeader()
           },})
   }
    createCommentToNews(id,news){
        return axios.post(API_URL+'news/'+id+'/create',JSON.stringify(news),{ headers: {
                'Content-Type': 'application/json',
                'Authorization':authHeader()
            },})
    }
}
export default new CommentService();