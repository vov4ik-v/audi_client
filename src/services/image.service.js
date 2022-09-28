import axios from 'axios'
import authHeader from "./auth-header";
const API_URL = 'http://localhost:8088/api/image/';
class ImageService{
    getNewsImage(newsId){
        return axios.get(API_URL+'newsImage/'+newsId,{ headers: {
                'Authorization':authHeader()
            },})
    }
    uploadNewsImage(newsId,file){
        let formData = new FormData();
        formData.append('file',file);
        return axios.post(API_URL+'newsUpload/'+newsId,formData,{headers: {
                'Content-Type': 'application/json',
                'Authorization':authHeader()
            },})
    }
    getImageToUserByUsername(username){
        return axios.get(API_URL + 'user/' + username,{ headers: {
                'Authorization':authHeader()
            },})
    }
}
export default new ImageService();