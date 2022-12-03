import axios from "axios";
import * as sweetalert from "sweetalert";
import authHeader from "../../services/auth-header";
const user = JSON.parse(localStorage.getItem('user'));
import NewsService from "../../services/news.service";
export default {
    namespaced:true,
    state(){
        return {
            news: []
        }

    },
    mutations:{
        getNews(state,news){
            state.news = news

        }
    },
    actions:{
        getNews({commit}){
            NewsService.getAll().then((response) =>{
                if (response.status === 200) {
                    commit("getNews", response.data)
                }
            },
            (error)=>{
                console.error(error)
            })
        }
    },
    getters:{
        news:(state)=>{return state.news}
    }
}