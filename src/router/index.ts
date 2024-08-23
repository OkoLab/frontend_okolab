import { createRouter, createWebHistory } from 'vue-router'
import LoginComponent from '../components/auth/TheLogin.vue'
import LogoutComponent from '../components/auth/TheLogout.vue'
import Home from '../layouts/TheHome.vue'
import { useAuthStore } from '../stores/AuthStore'
//import { authMiddleware } from '../middleware/authMiddleware';
//import { guestMiddleware } from '../middleware/guestMiddleware';
import { useCacheUser } from '../composables/cache/useUserCache';

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginComponent,
  },
  {
    path: '/logout',
    name: 'logout',
    component: LogoutComponent,
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
  },
  {
    path: '/link',
    name: 'link',
    component: () => import('../pages/LinkComponent.vue'),
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
router.beforeEach((to, from, next) => {
  const { isAuthenticated } = useCacheUser();
  //const isAuthenticated = isAuthenticated();
  
  //const authStore = useAuthStore();
  if (to.name !== 'login' && !isAuthenticated) {
    next({ name: 'login' })
  } else if(to.name === 'login' && isAuthenticated) {
    next({ name: 'home' })
  } else {
    next();
  }
});

export default router
