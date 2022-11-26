import {ErrorResponse} from "@nuxtjs/apollo";
import {GraphQLError} from "graphql/index";

export default defineNuxtPlugin((nuxtApp) => {
    // access cookie for auth
    const cookie = useCookie('XSRF-TOKEN')

    nuxtApp.hook('apollo:error', (error: ErrorResponse) => {
        error.graphQLErrors?.forEach((graphQLError: GraphQLError) => {
            console.log(graphQLError.debugMessage)
        })
    })

    nuxtApp.hook('apollo:auth', ({ client, token }) => {
        console.log(client)
        console.log(token)
        // `client` can be used to differentiate logic on a per client basis.
        // apply apollo client token
        // token.value = '<secret_token>'
    })
})
