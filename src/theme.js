import 'normalize.css'   
import Vue from 'vue'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons) 
import { ValidationProvider } from 'vee-validate';
import { ValidationObserver } from 'vee-validate'; 

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

import { extend } from 'vee-validate';
import { required,min,length,integer,email } from 'vee-validate/dist/rules'; 
extend('required', {
  ...required,
  message: 'this field required'
});
extend('length', {
  ...length, 
  message: (field,length) => "this field must be contain from" + length.length +"digit"  
});

extend('integer', {
  ...integer, 
  message: 'use only digits'  
})

extend('min', {
  ...min, 
  message:(field,length) => "this field must be contain from"  + length.length +" char &/ num"
  
});

extend('email', {
  ...email, 
  message: 'please enter correct mail'  
})