//import Vue from "vue";
import axios from "axios"
import store from './store/index'

axios.interceptors.request.use(config => {  
    config.baseURL = process.env.VUE_APP_API + 'api/'
    config.headers.Authorization = `Bearer ${localStorage.getItem('token') || ''}`
    return config
}) 
axios.interceptors.response.use(
  response => response,
  error => {
    const { status } = error.response;
    if (status === 401) {
      if(this.$route.name != 'login'){
        store.dispatch('logout') 
      }
      
    }
    return Promise.reject(error);
  }
);
export default axios;
