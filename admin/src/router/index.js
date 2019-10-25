import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from '../views/Main.vue'

import CategoryCreate from '../views/Category/Create.vue'
import CategoryList from '../views/Category/List.vue'

import ItemCreate from '../views/Item/Create.vue'
import ItemList from '../views/Item/List.vue'

import HeroCreate from '../views/Hero/Create.vue'
import HeroList from '../views/Hero/List.vue'

import ArticleCreate from '../views/Article/Create.vue'
import ArticleList from '../views/Article/List.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'main',
  component: Main,
  children: [
    { path: '/categories/create', component: CategoryCreate},
    { path: '/items/create', component: ItemCreate},
    { path: '/heroes/create', component: HeroCreate},
    { path: '/articles/create', component: ArticleCreate},

    { path: '/categories/list', component: CategoryList},
    { path: '/items/list', component: ItemList},
    { path: '/heroes/list', component: HeroList},
    { path: '/articles/list', component: ArticleList},

    { path: '/categories/edit/:id', props: true, component: CategoryCreate},
    { path: '/items/edit/:id', props: true, component: ItemCreate},
    { path: '/heroes/edit/:id', props: true, component: HeroCreate},
    { path: '/articles/edit/:id', props: true, component: ArticleCreate},
  ]
}]

const router = new VueRouter({
  routes
})

export default router