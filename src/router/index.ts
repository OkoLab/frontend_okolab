import { createRouter, createWebHistory } from 'vue-router'
import LoginComponent from '../pages/LoginComponent.vue'
import RegistrationComponent from '../pages/RegistrationComponent.vue'
import { useAuth } from '../composables/useAuth'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginComponent
  },
  {
    path: '/reg',
    name: 'registration',
    component: RegistrationComponent
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../pages/CalculatorComponent.vue'),
    meta: {
      requiresAuth: true // flag to indicate that this route requires authentication
    }
  },
  {
    path: '/link',
    name: 'link',
    component: () => import('../pages/LinkComponent.vue'),
    meta: {
      requiresAuth: true // flag to indicate that this route requires authentication
    }
  },
  {
    path: '/stock',
    name: 'stock',
    component: () => import('../pages/StockUpdateComponent.vue'),
    meta: {
      requiresAuth: true // flag to indicate that this route requires authentication
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    const { attemped, isAuthenticated: authenticated } = useAuth()
    await attemped()
    if (to.name !== 'login' && !authenticated.value) next({ name: 'login' })
    else next()
  } else {
    next() // continue to the requested route if it doesn't require authentication
  }
})

export default router
