import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import './theme.js'
import Service from '../src/Service'
Vue.prototype.$http = Service 

import Echo from 'laravel-echo';

window.Pusher = require('pusher-js');

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: 'e9895d9d91cfbe671a61',
    cluster: 'ap2',
    encrypted:true,
    authEndpoint:process.env.VUE_APP_API + 'broadcasting/auth',
    auth: {
        headers: {
            'Authorization': `Bearer `+ localStorage.getItem('token'),
            Accept: 'application/json',
        }
      }
}); 


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
