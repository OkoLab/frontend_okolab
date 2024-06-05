import { reactive, computed, ref } from 'vue'
import { useAxios } from './useAxios'
import { useRouter } from 'vue-router'

// https://www.youtube.com/watch?v=v-CEB3dhZcs&list=PLh-F6-XbduO-y5EeMsugjX9zgTmGcCXL_&index=10

const state = reactive({
  authenticated: false,
  user: {}
})

export const useAuth = () => {
  const { axiosInstance } = useAxios()

  const router = useRouter()

  const errors = ref({})
  const isAuthenticated = computed(() => state.authenticated)
  const getUser = computed(() => state.user)

  const setAuthenticated = (authenticated: boolean) => {
    state.authenticated = authenticated
  }

  const setUser = (user: any) => {
    state.user = user
  }

  const attemped = async (): Promise<AxiosResponce<any>> => {
    try {
      const responce: AxiosResponce<any> = await axiosInstance.get('/user')
      setAuthenticated(true)
      setUser(responce.data)
      return responce
    } catch (error) {
      setAuthenticated(false)
      setUser({})
    }
  }

  const login = async (payload): Promise<any> => {
    try {
      const api_url = import.meta.env.VITE_API_URL
      await axiosInstance.get('/sanctum/csrf-cookie', { baseURL: api_url })
      await axiosInstance.post('/login', payload)
      await attemped()
      await router.push({ name: 'home' })
    } catch (err) {
      if (err.response.status === 422) {
        errors.value = err.response.data.errors
      }
    }
  }

  const logout = async () => {
    try {
      await axiosInstance.post('/logout')
      setAuthenticated(false)
      setUser({})
      await router.push('/')
    } catch (err) {
      console.log(err)
    }
  }

  return {
    login,
    logout,
    isAuthenticated,
    getUser,
    attemped,
    errors
  }
}