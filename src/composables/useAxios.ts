import axios, { AxiosInstance } from 'axios'

let axiosInstance: AxiosInstance | null = null

export const useAxios = () => {
  if (!axiosInstance) {
    const api_url = import.meta.env.VITE_API_URL

    axiosInstance = axios.create({
      baseURL: api_url + '/api',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      withCredentials: true,
      withXSRFToken: true
    })
  }
  return {
    axiosInstance
  }
}