import { defineStore } from 'pinia'
import { User } from '../types/interfaces'
import { ref, computed } from 'vue'

//const _user = ref < User | null > (null);

export const useUserStore = defineStore('auth', {
  state: () => {
    return {
      user: null as User | null,
    }
  },
  actions: {
    setUser(newUser) {
      this.user = newUser
    },
  }

  //const user = ref < User | null > (null);

  // const user = computed(() => _user.value)

  // function setUser(newUser) {
  //   _user.value = newUser
  // }

  // function clearStoreData() {
  //   _user.value = null
  // }

  // return { user, setUser, clearStoreData }
})
