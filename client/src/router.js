import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/arrivals',
      name: 'arrivals',
      // route level code-splitting
      // this generates a separate chunk (arrivals.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "arrivals" */ './views/Arrivals.vue')
    },
    {
      path: '/departures',
      name: 'departures',
      // route level code-splitting
      // this generates a separate chunk (departures.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "departures" */ './views/Departures.vue')
    }
  ]
})
