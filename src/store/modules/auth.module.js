import AuthService from '../../services/auth.service';
import axios from "axios";
import * as sweetalert from "sweetalert";
import authHeader from "../../services/auth-header";
const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
    ? { status: { loggedIn: true }, user }
    : { status: { loggedIn: false }, user: null };
export const auth = {
    namespaced: true,
    state(){
        return{
            initialState,
            currentUserProfile:{},
            user:{}
        }
    },
    actions: {
        async getUserByUsername({commit},username){
            try {
                let response = await axios.get(`http://localhost:8088/api/user/${username}`,{   headers: {
                        'Authorization': user.token
                    }})
                commit("getUserByUsername",response.data)
            }
            catch (e) {
                console.log(e)
            }

        },
        async updateUser({commit},updatedUser){
            try{
                let {data} =  await axios.post(`http://localhost:8088/api/user/update`,JSON.stringify(updatedUser),{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': user.token

                    }})
                commit('updateUser',data)
                if (data.status === 200){
                    await sweetalert({ icon:'success',title: 'Success!', text: 'Car edited successfully'});
                }
            }catch(error) {
                await sweetalert({ icon:'error',title: 'Error!', text: 'Please try again1'});
                console.log(error);
            }
        },
        async getUserInfo({commit}){
            let {data} = await axios.get('http://localhost:8088/api/user/',{   headers: {
                    'Authorization': authHeader()
                }})
            commit('updateUser',data)
        },
        login({ commit }, user) {
            return AuthService.login(user).then(
                user => {
                    commit('loginSuccess', user);
                    return Promise.resolve(user);
                },
                error => {
                    commit('loginFailure');
                    return Promise.reject(error);
                }
            );
        },
        logout({ commit }) {
            AuthService.logout();
            commit('logout');
        },
        register({ commit }, user) {
            return AuthService.register(user).then(
                response => {
                    commit('registerSuccess');
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('registerFailure');
                    return Promise.reject(error);
                }
            );
        }
    },
    mutations: {
        loginSuccess(state, user) {
            state.initialState.status.loggedIn = true;
            state.initialState.user = user;
        },
        loginFailure(state) {
            state.initialState.status.loggedIn = false;
            state.initialState.user = null;
        },
        logout(state) {
            state.initialState.status.loggedIn = false;
            state.initialState.user = null;
            state.currentUserProfile = {};
            state.user = {}
        },
        registerSuccess(state) {
            state.initialState.status.loggedIn = false;
        },
        registerFailure(state) {
            state.initialState.status.initialState.loggedIn = false;
        },
        updateUser(state,updateUser){
            state.currentUserProfile = updateUser;
        },
        getUserByUsername(state,user){
            state.user = user
        },
    },
    getters:{
        getCurrentUserInfo(state){
            return state.currentUserProfile
        },
        getCurrentUser(state){
            return state.initialState.user
        },
        getUserByUsername(state){
            return state.user
        }
    }
};