import tailwindcss from "@tailwindcss/vite";

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

  icon: {
    mode: "css",
    cssLayer: "base",
    serverBundle: { collections: ["mdi"] }
  },

  modules: ["@pinia/nuxt", "@nuxt/icon"],

  runtimeConfig: {
    cmsApiUrl: "",
    cmsApiToken: "",
    public: {
      cmsMediaUrl: ""
    }
  },

  vite: { plugins: [tailwindcss()] }
});
