import Vue from 'vue'
import Router from 'vue-router'
import DashboardLayout from '@/layout/DashboardLayout'
import AuthLayout from '@/layout/AuthLayout'
Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: 'dashboard',
      component: DashboardLayout,
      props: true,
      beforeEnter: (to, from, next) => {
        if(to.params.isAuthenticated){
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
          component: () => import(/* webpackChunkName: "demo" */ './views/Dashboard.vue'),
          props: true,
          beforeEnter: (to, from, next) => {
          if(to.params.isSet){
            next()
          }
          else{
            next({name: 'tables'})
          }
        }
        },
        {
          path: '/tables',
          name: 'tables',
          component: () => import(/* webpackChunkName: "demo" */ './views/Tables.vue')
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
