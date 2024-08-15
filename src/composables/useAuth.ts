import axios from 'axios'
import { useRouter } from 'vue-router'
import { User } from '@/types/interfaces'
import { LoginPayload } from '@/types/interfaces.ts'
import { useUserStore } from '@/stores/AuthStore.ts'


//const store = ref < User | null > (null)

export const useAuth = () => {

  const store = useUserStore()

  async function getUser(): Promise<User | null> {
    if(store.user) return store.user

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
    const _user = await getUser()
    store.setUser(_user)
    //user.value = await getUser()
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
    //user.value = null
    store.clearStoreData()
    router.push({ name: 'login' })
  }

  return { login, logout, initUser }
}
