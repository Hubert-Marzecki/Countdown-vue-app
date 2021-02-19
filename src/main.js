import Vue from 'vue'
import App from './App.vue'
// import axios from 'axios';
Vue.config.productionTip = false;

import {i18n} from './plugins/i18n.js'
// const lang =localStorage.getItem("leng")
// axios.defaults.baseURL = "http://localhost:8080/";
// axios.defaults.headers["Accept-Language"] = lang;

export const eventBus = new Vue ()
new Vue ({
    i18n,
  render: h => h (App),
}).$mount ('#app')