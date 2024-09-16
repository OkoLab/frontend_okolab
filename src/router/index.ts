import { createRouter, createWebHistory } from 'vue-router'
import LoginComponent from '../components/auth/TheLogin.vue'
import LogoutComponent from '../components/auth/TheLogout.vue'
import Home from '../layouts/TheHome.vue'
import { useAuth } from '../composables/useAuth';

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
router.beforeEach(async (to, from, next) => {
  const { user, initUser } = useAuth();
  await initUser();
  if(!user.value && to.name !== 'login') {
    next({ name: 'login' }) ;
  } else {
    next()
  }
});

export default router

// TODO: 23/08/2024- Check how to work app when session finished

