export default defineEventHandler((event) => {
  const { cmsApiToken, cmsApiUrl, cmsMediaUrl } = useRuntimeConfig(event);

  if (!cmsMediaUrl) {
    console.warn("Warning: NUXT_CMS_MEDIA_URL is not set in the runtime config. Media files might not load correctly.");
  }

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
