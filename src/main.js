import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import 'jquery';
import router from "./router/index"
import store from "./store/index"
import timesPlugin from "./plugins/timesPlugin";

createApp(App).use(router).use(store)
  .mount('#app')
