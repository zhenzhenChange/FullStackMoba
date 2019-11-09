import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAwesomeSwiper from 'vue-awesome-swiper'

import './assets/scss/style.scss'
import 'swiper/dist/css/swiper.css'

import Card from "./components/Card.vue"
import ListCard from "./components/ListCard.vue"

Vue.component("home-card", Card)
Vue.component("home-list-card", ListCard)

Vue.prototype.$http = axios.create({
  baseURL:'http://localhost:3000/web/api'
})

Vue.use(VueAwesomeSwiper, /* { default global options } */ )
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')