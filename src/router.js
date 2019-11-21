import Vue from 'vue'
import Router from 'vue-router'
import DashboardLayout from '@/layout/DashboardLayout'
import { store } from "./store/store.js"
Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: 'about',
      component: DashboardLayout,
      beforeEnter: (to, from, next) => {
        if(store.state.isAuthenticated){
          next()
        }
        else{
          next({name: 'login'})
        }
      },
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import('./views/Dashboard.vue'),
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import('./views/UserProfile.vue')
        },
        {
          path: '/about',
          name: 'about',
          component: () => import('./views/About.vue')
        }
      ]
      
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "demo" */ './views/Login.vue')
    }
  ]
})
