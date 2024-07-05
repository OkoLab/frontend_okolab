import axios from 'axios'

const axiosPlugin = {
  install() {
    axios.defaults.baseURL = import.meta.env.VITE_API_URL
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
    axios.defaults.headers.common['Content-Type'] = 'application/json'
    axios.defaults.headers.common['Accept'] = 'application/json'
    axios.defaults.withCredentials = true
    axios.defaults.withXSRFToken = true

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
