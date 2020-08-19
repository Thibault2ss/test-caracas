import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
require('@/plugins/global_components')

// eslint-disable-next-line
Vue.prototype.$plaid = Plaid

Vue.prototype.$axios = axios.create({
  baseURL: process.env.NODE_ENV !== 'production' ? 'http://localhost:8000/api' : '/api'
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
