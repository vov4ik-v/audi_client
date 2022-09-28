import axios from 'axios';
const API_URL = 'http://localhost:8088/api/auth/';
class AuthService {
    login(user) {
        return axios
            .post(API_URL + 'signin', {
                username: user.username,
                password: user.password
            })
            .then(response => {
                if (response.data.token){
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                return response.data;
            });
    }
    logout() {
        localStorage.removeItem('user');
    }
    register(user) {
        return axios.post(API_URL + 'signup', {
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            password: user.password,
            confirmPassword: user.confirmPassword
        });
    }
}
export default new AuthService();