import axios from "axios";
import * as sweetalert from "sweetalert";

export default {
    namespaced:true,
    state(){
        return{
            audiModels:[],

        }

    },
    actions:{
        async addAudiModel(state,audiModel){
            try{
                let {data} =  await axios.post(`http://localhost:8088/api/model/addModel`,JSON.stringify(audiModel),{
                    headers: {
                        'Content-Type': 'application/json'
                    }})
                console.log(data)
                if (data.status === 200){
                    await sweetalert({ icon:'success',title: 'Success!', text: 'Audi Model added successfully'});
                }
            }catch(error) {
                await sweetalert({ icon:'error',title: 'Error!', text: 'Please try again'});
                console.log(error);
            };

        },
        async editAudiModel(state,audiModel){
            try{
                let {data} =  await axios.put(`http://localhost:8088/api/model/edit/${audiModel.id}`,JSON.stringify(audiModel),{
                    headers: {
                        'Content-Type': 'application/json'
                    }})
                console.log(data)
                if (data.status === 200){
                    await sweetalert({ icon:'success',title: 'Success!', text: 'Audi Model edited successfully'});
                }
            }catch(error) {
                await sweetalert({ icon:'error',title: 'Error!', text: 'Please try again'});
                console.log(error);
            }

        },
        async deleteAudiModel(state,audiModelId){
            try{
                let {data} =  await axios.delete(`http://localhost:8088/api/model/delete/${audiModelId}`)
                console.log(data)
                if (data.status === 200){
                    await sweetalert({ icon:'success',title: 'Success!', text: 'Audi Model deleted successfully'});
                }
            }catch(error) {
                await sweetalert({ icon:'error',title: 'Error!', text: 'Please try again'});
                console.log(error);
            }

        },
        async getAllAudiModels({commit}){
            try{
                let response =  await axios.get(`http://localhost:8088/api/model/getAll`)
                if (response.status === 200){
                    commit("getAllAudiModels",response.data)
                }
            }catch(error) {
                console.log(error);
            }

        }

    },
    mutations:{
        getAllAudiModels(state,audiModels){
            state.audiModels=audiModels;
        }

    },
    getters:{
        audiModels:(state) =>{return state.audiModels},
        audiModelById: (state) => (id) =>{
            return state.audiModels.find(audiModel => audiModel.id == id)
        },
        audiModelByName: (state) => (audiModelName) =>{
            console.log(audiModelName)
            return state.audiModels.find(audiModel => audiModel.name == audiModelName)
        }

    }

}