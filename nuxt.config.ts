// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  components: true,
  css: [
    '~/assets/styles/main.css',
  ],

  modules: [
    '@nuxt/eslint', 
    '@nuxt/fonts',
    '@nuxt/image', 
    '@nuxt/test-utils',
    '@nuxt/scripts', 
    '@pinia/nuxt', 
    '@nuxt/ui'
],
runtimeConfig: {
  public: {
    apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3000/books'
  }
}
})