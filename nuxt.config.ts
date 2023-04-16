import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/apollo',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
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
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '96x96',
        href: '/favicon-96x96.png',
      },
    ],
  },
  ssr: false,
  apollo: {
    clients: {
      default: {
        httpEndpoint: process.env.APOLLO_CLIENT_HTTP_ENDPOINT,
        httpLinkOptions: {
          credentials: 'include',
        },
      },
    },
  },
  piniaPersistedstate: {
    cookieOptions: {
      sameSite: 'strict',
    },
    storage: 'localStorage',
  },
})
