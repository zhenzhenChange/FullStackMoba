import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import Article from '../views/Article.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  component: Main,
  children: [{
    path: '/',
    name: 'home',
    component: Home
  }, {
    path: '/articles/:id',
    name: 'article',
    component: Article,
    props: true
  }]
}]

const router = new VueRouter({
  routes
})

export default router