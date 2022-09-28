import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8088/api/';
class UserService {
     getUserBoard() {
        return axios.get(API_URL + 'user/', { headers:{
                'Authorization':authHeader()
        }});
    }
}
export default new UserService();