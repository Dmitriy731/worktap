// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/scripts',
    '@nuxt/icon'
  ],
  fonts: {
    families: [
      {
        name: 'Montserrat',
        provider: 'google',
        weights: [400, 500, 600, 700],
      },
    ],
  },
  icon: {
    customCollections: [
      {
        prefix: 'icon',
        dir: './assets/icons'
      },
    ],
  },
  css: [
    './assets/styles/main.scss'
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "./assets/styles/mixins" as *;`
        }
      }
    }
  },
  runtimeConfig: {
    JWT_SECRET: process.env.JWT_SECRET,
    YANDEX_CLIENT_ID: process.env.YANDEX_CLIENT_ID,
    YANDEX_CLIENT_SECRET: process.env.YANDEX_CLIENT_SECRET,
    YANDEX_REDIRECT_URI: process.env.YANDEX_REDIRECT_URI,
  },
  routeRules: {
    '/api/**': { ssr: true },
  },
})