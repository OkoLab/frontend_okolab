import { reactive, computed, ref } from 'vue'
import { useAxios } from './useAxios'
import { useRouter } from 'vue-router'
import { AxiosResponse } from "axios";

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

  const attemped = async (): Promise<AxiosResponse<any>> => {
    try {
      const response: AxiosResponse<any> = await axiosInstance.get('/user')
      setAuthenticated(true)
      setUser(response.data)
      return response
    } catch (error) {
      setAuthenticated(false)
      setUser({})
    }
  }

  const login = async (payload): Promise<any> => {
    try {
      const api_url = import.meta.env.VITE_API_URL
      axiosInstance.get('/sanctum/csrf-cookie', { baseURL: api_url }).then(async() => {
        await axiosInstance.post('/login', payload)
        //await attemped()
        //await router.push({ name: 'home' })
      });
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