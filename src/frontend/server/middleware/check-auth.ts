export default defineEventHandler((event) => {
  const { cmsApiToken, cmsApiUrl } = useRuntimeConfig(event);

  if (!cmsApiToken || cmsApiToken.trim().length === 0) {
    throw createError({
      statusCode: 503,
      statusMessage: "NUXT_CMS_API_TOKEN must be set in the runtime config.",
      fatal: true
    });
  }

  if (!cmsApiUrl || cmsApiUrl.trim().length === 0) {
    throw createError({
      statusCode: 503,
      statusMessage: "NUXT_CMS_API_URL must be set in the runtime config.",
      fatal: true
    });
  }
});
