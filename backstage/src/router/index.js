import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'Home',
    meta: {
      auth: true,
    },
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '/users',
        name: 'users',
        component: () => import('../views/users.vue')
      },
      {
        path: '/roles',
        name: 'roles',
        component: () => import('../views/roles.vue')
      },
      {
        path: '/rights',
        name: 'rights',
        component: () => import('../views/rights.vue')
      },
      {
        path: '/goods',
        name: 'goods',
        component: () => import('../views/goods.vue')
      },
      {
        path: '/params',
        name: 'params',
        component: () => import('../views/params.vue')
      },
      {
        path: '/categories',
        name: 'categories',
        component: () => import('../views/categories.vue')
      },
      {
        path: '/add',
        name: 'add',
        component: () => import('../views/add.vue')
      },
    ]
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      auth: false,
    },
    component: () => import('../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      auth: false,
    },
    component: () => import('../views/login.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from) => {
  const flag = to.matched.some((item) => item.meta.auth)
  if (flag) {
    const token = localStorage.getItem('token')
    if (!token) {
      return '/login'
    }
    return
  } else {
    return
  }
})
export default router
