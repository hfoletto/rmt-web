export default defineNuxtPlugin((nuxtApp) => {
    // access cookie for auth
    const cookie = useCookie('XSRF-TOKEN')

    nuxtApp.hook('apollo:auth', ({ client, token }) => {
        // console.log(client)
        // console.log(token)
        // `client` can be used to differentiate logic on a per client basis.
        // apply apollo client token
        // token.value = '<secret_token>'
    })
})
