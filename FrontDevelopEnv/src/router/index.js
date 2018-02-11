import Vue from 'vue'
import Router from 'vue-router'
import loginPage from '@/components/users/login/login.vue'

Vue.use(Router)

export default new Router({
	mode: 'history',
  routes: [
	  {
		  path: '/',
		  name: 'index',
		  component: loginPage
	  },
    {
      path: '/users/login',
      name: 'login',
      component: loginPage
    }
  ]
})
