import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/components/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/components/Register.vue')
  },
  {
    path: '/formAddUserAccount',
    name: 'FormAddUserAccount',
    component: () => import('../components/FormAddUserAccount.vue'),
    meta: { requireAdmin: true }
  },
  {
    path: '/formUpdateUserAccount/:id',
    name: 'FormUpdateUserAccount',
    component: () => import('../components/FormUpdateUserAccount.vue'),
    meta: { requireAdmin: true }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: "*",
    name: 'NotFound',
    component: () => import('@/components/NotFound')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAdmin)) {
    if (!store.getters['auth/loggedIn']) {
      next({ name: 'Login' })
    } else {
      if (store.state.auth.currentUser.idRole.trim() == 'admin') {
        next();
      }
      else {
        next(false);
      }
    }
  }
  else {
    next();
  }
})

export default router
