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

// import { reactive, computed, ref } from 'vue'
// import { useAxios } from './useAxios'
// import { useRouter } from 'vue-router'
// import { AxiosResponse } from "axios";
// import { LoginPayload, User } from '../types/interfaces';
// import axios from 'axios';

// // https://www.youtube.com/watch?v=v-CEB3dhZcs&list=PLh-F6-XbduO-y5EeMsugjX9zgTmGcCXL_&index=10

// const state = reactive({
//   authenticated: false,
//   user: {}
// })

// export const useAuth = () => {
//   const { axiosInstance } = useAxios()

//   const router = useRouter()

//   const errors = ref({})
//   const isAuthenticated = computed(() => state.authenticated)
//   const getUser = computed(() => state.user)

//   const setAuthenticated = (authenticated: boolean) => {
//     state.authenticated = authenticated
//   }

//   const setUser = (user: any) => {
//     state.user = user
//   }

//   const attemped = async (): Promise<AxiosResponse<any>> => {
//     try {
//       const response: AxiosResponse<any> = await axiosInstance.get('/user')
//       setAuthenticated(true)
//       setUser(response.data)
//       return response
//     } catch (error) {
//       setAuthenticated(false)
//       setUser({})
//     }
//   }

//   const login = async (payload): Promise<any> => {
//     try {
//       const api_url = import.meta.env.VITE_API_URL
//       axiosInstance.get('/sanctum/csrf-cookie', { baseURL: api_url }).then(async() => {
//         await axiosInstance.post('/login', payload)
//         //await attemped()
//         //await router.push({ name: 'home' })
//       });
//     } catch (err) {
//       if (err.response.status === 422) {
//         errors.value = err.response.data.errors
//       }
//     }
//   }

//   const logout = async () => {
//     try {
//       await axiosInstance.post('/logout')
//       setAuthenticated(false)
//       setUser({})
//       await router.push('/')
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   return {
//     login,
//     logout,
//     isAuthenticated,
//     getUser,
//     attemped,
//     errors
//   }
// }
