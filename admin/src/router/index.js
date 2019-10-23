import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

import CategoriesCreate from '../views/CategoriesCreate.vue'
import CategoriesList from '../views/CategoriesList.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'main',
  component: Main,
  children: [{
    // 新建分类
    path: '/categories/create',
    component: CategoriesCreate
  }, {
    // 分类列表
    path: '/categories/list',
    component: CategoriesList
  }, {
    // 修改分类
    path: '/categories/edit/:id',
    props: true,
    component: CategoriesCreate
  }]
}]

const router = new VueRouter({
  routes
})

export default router