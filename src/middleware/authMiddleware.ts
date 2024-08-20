import { useAuth } from '../composables/useAuth'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/AuthStore'
//import { storeToRefs } from 'pinia'

export const authMiddleware = async () => {

    const router = useRouter()
    const store = useUserStore()
    const { initUser } = useAuth()
    await initUser()

    //const { user } = storeToRefs(store)
    console.log('login')
    console.log(store.user)

    if (!store.user) {
      router.push({ name: 'login' })
    }
}
