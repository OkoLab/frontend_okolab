import axios from 'axios'
import { useRouter } from 'vue-router'
import { User } from '@/types/interfaces'
import { LoginPayload } from '@/types/interfaces.ts'
import { useAuthStore } from '@/stores/AuthStore.ts'

export const useAuth = () => {

  const authStore = useAuthStore();
  //const { store.user } = storeToRefs(store);

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
    // console.log('initUser')
    // console.log(authStore);
  }

  const router = useRouter()

  const login = async (payload: LoginPayload) => {
    try {
      await axios.post('/login', payload)
      await initUser();
      //localStorage.setItem('isAuthenticated', 'true');
      router.push({ name: 'home' })
    } catch (error) {
      console.log(error)
    }
  }

  const logout = async () => {
    await axios.post('/logout')
    authStore.clearStoreData()
    //localStorage.setItem('isAuthenticated', 'false');
    //store.$reset()
    router.push({ name: 'login' })
  }

  return { login, logout }
}
