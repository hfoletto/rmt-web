import { useAuthStore } from '@/store/auth'
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:beforeMount', async () => {
    const authStore = useAuthStore()
    if (authStore.user === null)
      await authStore.fetchUser()
  })
})
