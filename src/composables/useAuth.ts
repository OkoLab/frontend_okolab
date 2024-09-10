import axios from 'axios'
import { useRouter } from 'vue-router'
import type { User, LoginPayload } from '@/types'
import { useAuthStore } from '@/stores/AuthStore.ts'
import { storeToRefs } from 'pinia'

export const useAuth = (router = null) => {
  const authStore = useAuthStore()
  const { errors } = storeToRefs(authStore)

  if (!router) router = useRouter()

  async function getUser(): User | null {
    if (authStore.user) return authStore.user

    try {
      const res = await axios.get('/user')
      const user = res.data['message']
      return user
    } catch (error) {
      if (error.response && error.response.status === 422) {
        errors.value = error.response.data
      } else {
        console.error('Submission failed:', error)
      }
      return null
    }
  }

  async function initUser() {
    const _user = await getUser()
    authStore.setUser(_user)
  }

  const login = async (payload: LoginPayload) => {
    try {
      await axios.post('/login', payload)
      await initUser()
      router.push({ name: 'home' })
    } catch (error) {
      if (error.response && error.response.status === 422) {
        errors.value = error.response.data
      } else {
        console.error('Submission failed:', error)
      }
    }
  }

  const logout = async () => {
    try {
      await axios.post('/logout')
      authStore.clearStoreData()
      router.push({ name: 'login' })
    } catch (error) {
      if (error.response && error.response.status === 422) {
        errors.value = error.response.data
      } else {
        console.error('Submission failed:', error)
      }
    }
  }

  return { login, logout }
}
