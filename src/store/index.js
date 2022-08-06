import {createStore} from 'vuex'
import axios from 'axios'
import * as sweetalert from "sweetalert";
import carModule from './modules/carModule'
import audiModelModule from './modules/audiModelModule.js'
import emailSender from "./modules/emailSender";
export default createStore({
    modules:{
        carModule:carModule,
        audiModelModule:audiModelModule,
        emailSender:emailSender
    }
})
