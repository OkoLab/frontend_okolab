//import { useAuth } from '../composables/useAuth'
// import { useRouter } from 'vue-router'
// import { useUserStore } from '../stores/AuthStore';
// //import { storeToRefs } from 'pinia'

// // Rediret to home if user is logged in
// export const guestMiddleware = async () => {
//     const router = useRouter()
//     const store = useUserStore()
//     //const { user } = storeToRefs(store)

//     console.log('guestMiddleware')
//     console.log(store.user)

//     if(store.user) {
//       router.push({ name: 'home' })
//     }
// }