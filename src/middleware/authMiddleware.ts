import { useAuth } from '../composables/useAuth'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/AuthStore'

export const authMiddleware = async () => {

    const router = useRouter()
    const store = useUserStore()
    const { initUser } = useAuth()
    await initUser()

    console.log(store.user)

    if (!store.user) {
      router.push({ name: 'login' })
    }
}
