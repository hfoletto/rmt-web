import { defineStore } from 'pinia'

export type City = {
  id: number
  name: string
  slug: string
  state: {
    name: string
    uf: string
  }
}

type CityQueryResult = {
  mostPopularCity: City
}

export const useCityStore = defineStore('city', {
  state: () => {
    return {
      city: null as City | null,
    }
  },
  actions: {
    async fetchMostPopularCity () {
      const query = gql`
        query getMostPopularCity {
          mostPopularCity {
            id
            name
            slug
            state {
                name
                uf
            }
          }
        }
      `
      const { data, error } = await useAsyncQuery<CityQueryResult>(query)
      if (!error.value && data.value)
        this.city = data.value.mostPopularCity
    },
  },
  persist: true,
})
