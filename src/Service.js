//import Vue from "vue";
import axios from "axios"
import store from './store/index'

axios.interceptors.request.use(config => { 
    //config.baseURL = process.env.VUE_APP_API + 'api/'
    config.baseURL = process.env.VUE_APP_API
    config.headers.Authorization = `Bearer ${localStorage.getItem('token') || ''}`
    return config
}) 
axios.interceptors.response.use(
  response => response,
  error => {
    const { status } = error.response;
    if (status === 401) {
      store.dispatch('logout') 
    }
    return Promise.reject(error);
  }
);
export default axios;
