import axios from 'axios';

const API_URL = 'http://localhost:8088/api/admin/';
import authHeader from './auth-header';

class AdminService {
    // CARS
    addNewCar(car) {
        return axios.post(API_URL+`addCar`, JSON.stringify(car), {
            headers: {
                'Authorization': authHeader(),
                'Content-Type': 'application/json'
            }
        })
    }

    editCar(carId, car) {
        return axios.put(API_URL+`editCar/${carId}`, JSON.stringify(car), {
            headers: {
                'Authorization': authHeader(),
                'Content-Type': 'application/json'
            }
        })
    }

    deleteCar(carId) {
        return axios.delete(API_URL+`deleteCar/${carId}`, {
            headers: {
                'Authorization': authHeader(),
            }
        })
    }

    // NEWS
    createNews(news) {
        return axios.post(API_URL + 'createNews', JSON.stringify(news), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authHeader()
            },

        })
    }

    updateNews(newsId, news) {
        return axios.put(API_URL + `updateNews/${newsId}`, JSON.stringify(news), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authHeader()
            },
        })
    }
    deleteNews(newsId) {
        return axios.delete(API_URL+`deleteNews/${newsId}`, {
            headers: {
                'Authorization': authHeader(),
            }
        })
    }
    // EMAIL
    addEmail(email){
        return axios.post(API_URL+`addEmail`,JSON.stringify(email),{headers:{
                'Content-Type': 'application/json',
                'Authorization': authHeader()
            }})
    }
    deleteEmail(emailId){
        return axios.delete(API_URL+`deleteEmail/${emailId}`, {
            headers: {
                'Authorization': authHeader(),
            }
        })
    }
    // USERS
    getUsers(){
        return axios.get(API_URL+`users`,{ headers: {
                'Authorization': authHeader(),
            }})
    }
    banUser(userId){
        return axios.post(API_URL+`banUser/${userId}`,JSON.stringify(),{ headers: {
                'Authorization': authHeader(),
            }})
    }
}

export default new AdminService();