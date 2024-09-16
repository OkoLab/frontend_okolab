import axios from 'axios'
import { useRouter } from 'vue-router'
import type { User, LoginPayload } from '@/types'
import { ref } from 'vue'

const user = ref<User | null>(null);

export const useAuth = (router = null) => {
  if (!router) router = useRouter()

  async function getUser(): User | null {
    if(user.value) return user.value;

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
    user.value = await getUser()
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
      user.value = null
      router.push({ name: 'login' })
    } catch (error) {
      if (error.response && error.response.status === 422) {
        errors.value = error.response.data
      } else {
        console.error('Submission failed:', error)
      }
    }
  }

  return { login, logout, initUser, user }
}
