import axios from "axios";
import * as sweetalert from "sweetalert";

export default {
    namespaced:true,
    state(){
        return{
            emails:[],

        }

    },
    actions:{
        async addEmail(state,email){
            try{
                let {data} =  await axios.post(`http://localhost:8088/api/email/addEmail`,JSON.stringify({
                    email:email
                }),{
                    headers: {
                        'Content-Type': 'application/json'
                    }})
                console.log(data)
                if (data.status === 200){
                    await sweetalert({ icon:'success',title: 'Success!', text: 'You subscribe successfully'});
                }
            }catch(error) {
                await sweetalert({ icon:'error',title: 'Error!', text: 'Please try again'});
                console.log(error);
            };

        },
        async getAllCars({commit}){
            try{
                let response =  await axios.get(`http://localhost:8088/api/email/getEmails`)
                if (response.status === 200){
                    commit("getAllEmails",response.data)
                }
            }catch(error) {
                console.log(error);
            }

        }

    },
    mutations:{
        getAllEmails(state,emails){
            state.emails=emails
        }

    },
    getters:{
        cars:(state) =>{return state.cars},
        carByAudiModel: (state) => (modelName) =>{
            return state.cars.find(car => car.modelName.replace(/\s/g, '-').toLowerCase() == modelName)
        },
        carById: (state) => (id) =>{
            return state.cars.find(car => car.id == id)
        }

    }

}