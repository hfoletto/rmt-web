import { defineStore } from 'pinia'

type GetMe = {
  me: {
    email: string,
    name: string
  }
}

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: null as {
        name: string,
        email: string
      } | null,
    }
  },
  actions: {
    async fetchUser () {
      const query = gql`
        query getMe {
          me {
            email,
            name
          }
        }
      `
      const { data, error } = await useAsyncQuery<GetMe>(query)
      if (!error.value && data.value?.me)
        this.user = data.value?.me
    },
  },
})
