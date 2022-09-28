import axios from 'axios';
import authHeader from './auth-header';
const user = JSON.parse(localStorage.getItem('user'));

const API_URL = 'http://localhost:8088/api/post';
class PostService {
    createPost(post) {
        return axios.post(API_URL + '/create',JSON.stringify(post),{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': user.token
            }});
    }
}
export default new PostService();