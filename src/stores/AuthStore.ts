import { defineStore } from 'pinia'
import { User } from '../types'
import { ref } from 'vue'
import { useCacheUser } from '../composables/cache/useUserCache'

export const useAuthStore = defineStore('auth', () =>{
  const user = ref < User | null > (null)
  const errors = ref(null)
  const { cacheUser, clearUser, loadUser, isAuthenticated } = useCacheUser()

  if(isAuthenticated) {
    user.value = loadUser()
  }

  function setUser(newUser) {
    user.value = newUser
    cacheUser(user.value)    
  }

  function clearStoreData() {
    user.value = null
    errors.value = null
    clearUser()
  }

  return { user, errors, setUser, clearStoreData }
})