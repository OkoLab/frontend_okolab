import { createRouter, createWebHistory } from 'vue-router'
import LoginComponent from '../components/auth/TheLogin.vue'
import LogoutComponent from '../components/auth/TheLogout.vue'
import Home from '../layouts/TheHome.vue'

//import { userAuthStore } from '../stores/auth'

// function checkIfAuthenticated() {
//   const store = userAuthStore()
//   if (store.token) {
//     return '/'
//   }
// }

// function checkIfRequiresAuth() {
//   const store = userAuthStore()
//   if (!store.token) {
//     return '/login'
//   }
// }

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginComponent,
    //beforeEnter: [checkIfAuthenticated]
  },
  {
    path: '/logout',
    name: 'logout',
    component: LogoutComponent,
    //beforeEnter: [checkIfAuthenticated]
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    //beforeEnter: [checkIfRequiresAuth]
  },
  {
    path: '/link',
    name: 'link',
    component: () => import('../pages/LinkComponent.vue')
    // meta: {
    //   requiresAuth: true // flag to indicate that this route requires authentication
    // }
  },
  {
    path: '/stock',
    name: 'stock',
    component: () => import('../pages/StockUpdateComponent.vue')
    // meta: {
    //   requiresAuth: true // flag to indicate that this route requires authentication
    // }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
