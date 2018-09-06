import Vue from 'vue'
import Router from 'vue-router'
import logReg from '@/components/logReg'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'logReg',
      component: logReg
    }
  ]
})
