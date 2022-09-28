import axios from 'axios'
import authHeader from "./auth-header";
const API_URL = 'http://localhost:8088/api/news/';
class NewsService{

    getAll(){
        return axios.get(API_URL + 'all',{ headers: {
                'Authorization':authHeader()
        },})
    }
    getNewsById(id){
        return axios.get(API_URL + id,  {headers: {
                'Authorization':authHeader()
            },
        })
    }
    createNews(news){
        return axios.post(API_URL+'create',JSON.stringify(news), {headers: {
                'Content-Type': 'application/json',
                'Authorization':authHeader()
            },

        })
    }
    likeNews(newsId){
        return axios.post(API_URL+'likeNews/'+newsId,{},{headers: {
                'Content-Type': 'application/json',
                'Authorization':authHeader()
            },})
    }

}

export default new NewsService();