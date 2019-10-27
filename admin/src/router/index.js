import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login.vue'
import Main from '../views/Main.vue'

// 分类
import CategoryCreate from '../views/Category/Create.vue'
import CategoryList from '../views/Category/List.vue'

// 物品
import ItemCreate from '../views/Item/Create.vue'
import ItemList from '../views/Item/List.vue'

// 英雄
import HeroCreate from '../views/Hero/Create.vue'
import HeroList from '../views/Hero/List.vue'

// 文章
import ArticleCreate from '../views/Article/Create.vue'
import ArticleList from '../views/Article/List.vue'

// 广告位
import AdCreate from '../views/Ad/Create.vue'
import AdList from '../views/Ad/List.vue'

// 管理员
import AdminUserCreate from '../views/AdminUser/Create.vue'
import AdminUserList from '../views/AdminUser/List.vue'

Vue.use(VueRouter)

const routes = [
  { path:'/login', name:'login', component:Login, meta: { isPublic:true} },
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      { path: '/categories/create', component: CategoryCreate},
      { path: '/items/create', component: ItemCreate},
      { path: '/heroes/create', component: HeroCreate},
      { path: '/articles/create', component: ArticleCreate},
      { path: '/ads/create', component: AdCreate},
      { path: '/admin_users/create', component: AdminUserCreate},

      { path: '/categories/list', component: CategoryList},
      { path: '/items/list', component: ItemList},
      { path: '/heroes/list', component: HeroList},
      { path: '/articles/list', component: ArticleList},
      { path: '/ads/list', component: AdList},
      { path: '/admin_users/list', component: AdminUserList},

      { path: '/categories/edit/:id', props: true, component: CategoryCreate},
      { path: '/items/edit/:id', props: true, component: ItemCreate},
      { path: '/heroes/edit/:id', props: true, component: HeroCreate},
      { path: '/articles/edit/:id', props: true, component: ArticleCreate},
      { path: '/ads/edit/:id', props: true, component: AdCreate},
      { path: '/admin_users/edit/:id', props: true, component: AdminUserCreate}
    ]
  }
]

const router = new VueRouter({
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  if(!to.meta.isPublic&&!localStorage.token){
    return next('/login')
  }
  next()
})
export default router