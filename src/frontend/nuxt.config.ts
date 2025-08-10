// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-10",
  devtools: { enabled: true },

  components: [
    { path: "~/components/app" },
    { path: "~/components/base" },
    { path: "~/components/cards" }
  ],

  css: [
    "~/assets/styles/main.css"
  ],

  modules: ["@pinia/nuxt"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  /**
   * NOTE: `runtimeConfig.public.restApi` is available in the client
   * and server side while `runtimeConfig.secret` is only available
   * in the server side.
   */
  runtimeConfig: {
    cmsApiUrl: "",
    cmsApiToken: ""
  }
});
