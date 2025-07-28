import process from "node:process";
import SimpleAnalytics from "simple-analytics-vue";

export default defineNuxtPlugin((nuxtApp) => {
  // only run analytics in production
  if (process.env.NODE_ENV === "production") {
    nuxtApp.vueApp.use(SimpleAnalytics);
  } else {
    console.warn("Skipping analytics in non-production env");
  }
});
