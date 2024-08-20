import axios from 'axios'
import { useRouter } from 'vue-router'
import { User } from '@/types/interfaces'
import { LoginPayload } from '@/types/interfaces.ts'
import { useUserStore } from '@/stores/AuthStore.ts'

export const useAuth = () => {

  const store = useUserStore();
  //const { store.user } = storeToRefs(store);

  async function getUser(): User | null {
    console.log('getUser')
    console.log(store.user)
    if(store.user) return store.user

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
    store.setUser(_user)
    console.log('initUser')
    console.log(store.user);
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
    //store.clearStoreData()
    store.$reset()
    router.push({ name: 'login' })
  }

  return { login, logout, initUser }
}
