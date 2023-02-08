import { useToast } from 'tailvue'
import { GraphQLError } from 'graphql/index'

export default defineNuxtPlugin((nuxtApp) => {
  // access cookie for auth
  const cookie = useCookie('XSRF-TOKEN')
  const $toast = useToast()

  nuxtApp.hook('apollo:auth', ({ client, token }) => {
    // console.log(client)
    // console.log(token)
    // `client` can be used to differentiate logic on a per client basis.
    // apply apollo client token
    // token.value = '<secret_token>'
  })

  nuxtApp.hook('apollo:error', (error) => {
    console.error(error)
    if (error.graphQLErrors) {
      error.graphQLErrors.every((graphQLError: GraphQLError, i: number) => {
        if (i >= 5) return false
        return $toast.show({
          type: 'danger',
          message: graphQLError.message,
          timeout: 10,
        })
      })
      return
    }
    return $toast.show({
      type: 'danger',
      message: 'Houve um problema de conexão e não foi possível completar a requisição',
      timeout: 10,
    })
  })
})
