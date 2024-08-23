import { defineStore } from 'pinia'
import { User } from '../types/interfaces'
import { ref } from 'vue'
import { useCacheUser } from '../composables/cache/useUserCache'

//const _user = ref < User | null > (null);

export const useAuthStore = defineStore('auth', () =>{
  const user = ref < User | null > (null);
  const { cacheUser, clearUser, loadUser, isAuthenticated } = useCacheUser();

  if(isAuthenticated) {
    user.value = loadUser()
  }

  function setUser(newUser) {
    user.value = newUser
    cacheUser(user.value)    
  }

  function clearStoreData() {
    user.value = null
    clearUser()
    //isAuthenticated.value = false
  }

  return { user, setUser, clearStoreData }
  // state: () => {
  //   return {
  //     user: null as User | null,
  //     isAuthenticated: false as boolean
  //   }
  // },
  // actions: {
  //   setUser(newUser) {
  //     this.user = newUser
  //     this.isAuthenticated = true
  //   },
  //   clearStoreData() {
  //     this.user = null
  //     this.isAuthenticated = false
  //   }
  })

  //const user = ref < User | null > (null);

  // const user = computed(() => _user.value)

  // function setUser(newUser) {
  //   _user.value = newUser
  // }

  // function clearStoreData() {
  //   _user.value = null
  // }

  // return { user, setUser, clearStoreData }
// })
