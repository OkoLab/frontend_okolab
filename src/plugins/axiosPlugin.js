import axios from 'axios'
import { useAuth } from '@/composables/useAuth'

const axiosPlugin = {
  install() {
    axios.defaults.baseURL = import.meta.env.VITE_API_URL + '/api'
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
    axios.defaults.headers.common['Content-Type'] = 'application/json'
    axios.defaults.headers.common['Accept'] = 'application/json'
    axios.defaults.withCredentials = true
    axios.defaults.withXSRFToken = true

    // https://vueschool.io/lessons/use-axios-intereptors-to-redirect-to-login-page-on-401-unauthorized-response
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if ((error.response.status === 401 || error.response.status === 419) && !error.request.responseURL.endsWith('/api/user')) {
          const { logout } = useAuth()
          logout()
        } else {
          return Promise.reject(error)
        }
      }
    )

    const $getCsrfCookie = async function () {
      try {
        await axios.get('/sanctum/csrf-cookie', { baseURL: import.meta.env.VITE_API_URL })
      } catch (err) {
        throw Error('Error obtaining CSRF cookie:', err)
      }
    }

    $getCsrfCookie()
  }
}

export default axiosPlugin
