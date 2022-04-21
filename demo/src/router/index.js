import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/family',
    name: 'Family',
    component: () => import( '../views/family.vue')
  },
  {
    path: '/signing',
    name: 'Signing',
    component: () => import( '../views/signing.vue')
  },
  {
    path: '/submit',
    name: 'Submit',
    component: () => import( '../views/submit.vue')
  },
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
