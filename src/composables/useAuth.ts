import axios from 'axios'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

interface User {
  email: string
  email_verified_at?: Date
  id: number
  name: string
  two_factor_confirmed_at?: Date
  two_factor_recovery_codes?: number
  two_factor_secret?: string
  updated_at: Date
  created_at: Date
}

const user = ref<User | null>(null)

export const useAuth = () => {

  interface LoginPayload {
    email: string
    password: string
  }

  async function getUser(): Promise<User | null> {
    if(user.value) return user.value

    try {
      const res = await axios.get('/user')
      const user = res.data
      return user
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async function initUser() {
    user.value = await getUser()
  }

  const router = useRouter()

  const login = async (payload: LoginPayload) => {
    try {
      await axios.post('/login', payload)
      router.push({ name: 'home' })
    } catch (error) {
      console.log(error)
    }
  }

  const logout = async () => {
    await axios.post('/logout')
    user.value = null
    router.push({ name: 'login' })
  }

  return { login, logout, initUser, user }
}
