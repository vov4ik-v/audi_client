import {createStore} from 'vuex'
import axios from 'axios'
import * as sweetalert from "sweetalert";
import carModule from './modules/carModule'
import audiModelModule from './modules/audiModelModule.js'
import emailSender from "./modules/emailSender";
import userModule from "./modules/userModule";
import postModule from "./modules/postModule";
import {auth} from "./modules/auth.module"
import imageUploadModule from "./modules/imageUploadModule";
import commentModule from "./modules/commentModule";
export default createStore({
    modules:{
        carModule:carModule,
        audiModelModule:audiModelModule,
        emailSender:emailSender,
        auth,
        userModule:userModule,
        postModule:postModule,
        imageUploadModule:imageUploadModule,
        commentModule:commentModule,

    }
})
