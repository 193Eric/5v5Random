import Vue from 'vue'
import Router from 'vue-router'
import admin from './views/admin.vue'
import common from './views/common.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/admin',
      component: admin
    },
    {
      path: '/common',
      component: common
    },
    {
      path: '/',
      redirect: '/common',
      component: common
    }
  ]
})
