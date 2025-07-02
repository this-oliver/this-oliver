// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-10",

  components: [
    { path: "~/components/app" },
    { path: "~/components/base" },
    { path: "~/components/cards" },
    { path: "~/components/forms" },
    "~/components"
  ],

  css: [
    "~/assets/styles/main.css"
  ],

  modules: [
    "@pinia/nuxt",
    "@invictus.codes/nuxt-vuetify"
  ],

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
