//import { useAuth } from '../composables/useAuth'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/AuthStore';

// Rediret to home if user is logged in
export const guestMiddleware = async () => {

    const router = useRouter()
    const store = useUserStore()
    //const { user } = useAuth()

    //if (user.value) {
    if(store.user) {
      router.push({ name: 'home' })
    }
}