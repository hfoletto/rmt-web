import { useCityStore } from '@/store/city'
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:beforeMount', async () => {
    const cityStore = useCityStore()
    if (cityStore.city === null)
      await cityStore.fetchMostPopularCity()
  })
})
