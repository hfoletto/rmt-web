import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/apollo',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@tailvue/nuxt',
  ],
  runtimeConfig: {
    appName: 'Rate My Theater',
  },
  head: {
    link: [
      {
        rel: 'stylesheet',
        href: 'https://rsms.me/inter/inter.css',
      },
    ],
  },
  ssr: false,
  apollo: {
    clients: {
      default: {
        httpEndpoint: 'http://localhost/graphql',
        httpLinkOptions: {
          credentials: 'include',
        },
      },
    },
  },
})
