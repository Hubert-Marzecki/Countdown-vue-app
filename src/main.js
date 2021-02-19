import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false;

import {i18n} from './plugins/i18n.js'

export const eventBus = new Vue ()
new Vue ({
    i18n,
  render: h => h (App),
}).$mount ('#app')