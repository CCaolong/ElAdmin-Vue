import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

// global css
import './assets/styles/index.scss'

//axios
// import axios from "axios";
import request from "./utils/request";

Vue.config.productionTip = false

//通过prototype声明一个全局变量绑定一个依赖，使此变量可以通过变量全局使用依赖中的方法
Vue.prototype.$axios = request
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
