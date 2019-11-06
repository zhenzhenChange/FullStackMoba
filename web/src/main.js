import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'

import './assets/scss/style.scss'
import 'swiper/dist/css/swiper.css'

import Card from "./components/Card.vue"
import ListCard from "./components/ListCard.vue"

Vue.component("home-card", Card)
Vue.component("home-list-card", ListCard)

Vue.use(VueAwesomeSwiper, /* { default global options } */ )
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')