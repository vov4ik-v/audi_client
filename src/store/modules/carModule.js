import axios from "axios";
import * as sweetalert from "sweetalert";

export default {
    namespaced:true,
    state(){
        return{
            cars:[],

        }

    },
    actions:{
        async addCar(state,car){
            try{
                let {data} =  await axios.post(`http://localhost:8088/api/car/addCar`,JSON.stringify(car),{
                    headers: {
                        'Content-Type': 'application/json'
                    }})
                console.log(data)
                if (data.status === 200){
                    await sweetalert({ icon:'success',title: 'Success!', text: 'Car added successfully'});
                }
            }catch(error) {
                await sweetalert({ icon:'error',title: 'Error!', text: 'Please try again'});
                console.log(error);
            };

        },
        async editCar(state,car){
            try{
                let {data} =  await axios.put(`http://localhost:8088/api/car/editCar/${car.id}`,JSON.stringify(car),{
                    headers: {
                        'Content-Type': 'application/json'
                    }})
                console.log(data)
                if (data.status === 200){
                    await sweetalert({ icon:'success',title: 'Success!', text: 'Car edited successfully'});
                }
            }catch(error) {
                await sweetalert({ icon:'error',title: 'Error!', text: 'Please try again'});
                console.log(error);
            }

        },
        async deleteCar(state,carId){
            try{
                let {data} =  await axios.delete(`http://localhost:8088/api/car/deleteCar/${carId}`)
                console.log(data)
                if (data.status === 200){
                    await sweetalert({ icon:'success',title: 'Success!', text: 'Car deleted successfully'});
                }
            }catch(error) {
                await sweetalert({ icon:'error',title: 'Error!', text: 'Please try again'});
                console.log(error);
            }

        },
        async getAllCars({commit}){
            try{
                let response =  await axios.get(`http://localhost:8088/api/car/listCar`)
                if (response.status === 200){
                    commit("getAllCars",response.data)
                }
            }catch(error) {
                console.log(error);
            }


        }

    },
    mutations:{
        getAllCars(state,cars){
            state.cars=cars
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