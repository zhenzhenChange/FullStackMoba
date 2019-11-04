import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'

import './assets/scss/style.scss'
import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper, /* { default global options } */ )
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')