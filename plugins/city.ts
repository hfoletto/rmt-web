import { useCityStore } from '@/store/city'
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:beforeMount', async () => {
    const store = useCityStore()
    await store.fetchMostPopularCity()
  })
})
