import axios from 'axios'
import { useRouter } from 'vue-router'
import { User } from '@/types/interfaces'
import { LoginPayload } from '@/types/interfaces.ts'
import { useAuthStore } from '@/stores/AuthStore.ts'

export const useAuth = (router = null) => {

  const authStore = useAuthStore()
  if (!router) router = useRouter()

  async function getUser(): User | null {
    if(authStore.user) return authStore.user

    try {
      const res = await axios.get('/user')
      const user = res.data['message']
      return user
    } catch (error) {
      console.log(error)
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
      await initUser();
      router.push({ name: 'home' })
    } catch (error) {
      console.log(error)
    }
  }

  const logout = async () => {
    await axios.post('/logout')
    authStore.clearStoreData()
    router.push({ name: 'login' })
  }

  return { login, logout }
}
