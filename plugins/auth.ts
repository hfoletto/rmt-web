import { useUserStore } from '@/store/user'
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:beforeMount', async () => {
    const store = useUserStore()
    await store.fetchUser()
  })
})
