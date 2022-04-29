import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'Home',
    meta: {
      auth: true
    },
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '/users',
        name: 'Users',
        component: () => import('../views/users.vue')
      },
      {
        path: '/roles',
        name: 'Roles',
        component: () => import('../views/roles.vue')
      },
      {
        path: '/rights',
        name: 'Rights',
        component: () => import('../views/rights.vue')
      },
      {
        path: '/goods',
        name: 'Goods',
        component: () => import('../views/goods.vue'),

      },
      {
        path: '/add',
        name: 'Add',
        component: () => import('../views/add.vue')
      },
      {
        path: '/params',
        name: 'Params',
        component: () => import('../views/params.vue')
      },
      {
        path: '/categories',
        name: 'Categories',
        component: () => import('../views/categories.vue')
      },
    ]
  },
  {
    path: '/about',
    meta: {
      auth: true
    },
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/login',
    meta: {
      auth: false
    },
    name: 'Login',
    component: () => import('../views/login')
  },
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, form, next) => {
  const flag = to.matched.some((item) => item.meta.auth)
  if (flag) {
    const token = sessionStorage.getItem('token')
    if (!token) {
      next({
        path: '/login'
      })
    }
    next()
  } else {
    next()
  }
})
export default router
