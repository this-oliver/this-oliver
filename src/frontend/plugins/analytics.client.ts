import SimpleAnalytics from "simple-analytics-vue";

export default defineNuxtPlugin((nuxtApp) => {
  // only run analytics in production
  if (import.meta.dev === false) {
    nuxtApp.vueApp.use(SimpleAnalytics);
  } else {
    console.warn("Skipping analytics in non-production env");
  }
});
