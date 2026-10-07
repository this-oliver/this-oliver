export default defineEventHandler((event) => {
  const { backendToken, backendBaseUrl } = useRuntimeConfig(event);

  if (!backendBaseUrl || backendBaseUrl.trim().length === 0) {
    throw createError({
      statusCode: 503,
      statusMessage: "NUXT_BACKEND_BASE_URL must be set in the runtime config.",
      fatal: true
    });
  }

  if (!backendToken || backendToken.trim().length === 0) {
    throw createError({
      statusCode: 503,
      statusMessage: "NUXT_BACKEND_TOKEN must be set in the runtime config.",
      fatal: true
    });
  }
});
