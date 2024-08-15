import { defineStore } from 'pinia'
import { User } from '../types/interfaces'
import { ref } from 'vue'

export const useUserStore = defineStore('auth', () => {
  const user = ref < User | null > (null)

  function setUser(user) {
    user.value = user
  }

  function clearStoreData() {
    user.value = null
  }

  //const user: Ref<User | null> = ref(null)
  return { user, setUser, clearStoreData }
})

// export const useUserStore = defineStore('auth', {
//     state: () => ({
//         user: User | null,
//       }),

//     // state: () => ({
//     //     user: ref<User | null>>
//     //     //errors: null,
//     // }),
//     getters: {
//         getUser: (state) => state.user
//     },
//     actions: {
//         setUser (user) {
//             this.user = user
//         },
//         // setErrors (errors) {
//         //     this.errors = errors
//         // },
//         clearStoreData() {
//             this.user = null
//         },
//         // clearErrors() {
//         //     this.errors = null
//         // }
//     }
// })
