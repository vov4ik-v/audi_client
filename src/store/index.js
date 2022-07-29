import {createStore} from 'vuex'
import axios from 'axios'
import * as sweetalert from "sweetalert";
import carModule from './modules/carModule'
import audiModelModule from './modules/audiModelModule.js'
export default createStore({
    modules:{
        carModule:carModule,
        audiModelModule:audiModelModule
    }
})
