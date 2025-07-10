import SimpleAnalytics from "simple-analytics-vue";

export default defineNuxtPlugin((nuxtApp) => {
  let skipAnalytics: boolean = false;

  // skip analytics if we are not in production
  if (process.env.NODE_ENV !== "production") {
    console.warn("Skipping analytics in non-production env");
    skipAnalytics = true;
  }

  nuxtApp.vueApp.use(SimpleAnalytics, { skip: skipAnalytics });
});
