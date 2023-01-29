import { useAuthStore } from '@/store/auth'
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:beforeMount', async () => {
    const store = useAuthStore()
    await store.fetchUser()
  })
})
