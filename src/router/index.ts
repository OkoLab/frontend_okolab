import { createRouter, createWebHistory } from 'vue-router'
import LoginComponent from '../components/auth/TheLogin.vue'
import LogoutComponent from '../components/auth/TheLogout.vue'
import Home from '../layouts/TheHome.vue'
import { authMiddleware } from '../middleware/authMiddleware';
import { guestMiddleware } from '../middleware/guestMiddleware';

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginComponent,
    beforeEnter: guestMiddleware
  },
  {
    path: '/logout',
    name: 'logout',
    component: LogoutComponent,
    beforeEnter: authMiddleware
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    beforeEnter: authMiddleware
  },
  {
    path: '/link',
    name: 'link',
    component: () => import('../pages/LinkComponent.vue'),
    beforeEnter: authMiddleware
  },
  {
    path: '/stock',
    name: 'stock',
    component: () => import('../pages/StockUpdateComponent.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
