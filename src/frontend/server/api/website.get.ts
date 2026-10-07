export default defineEventHandler(async (event): Promise<Website> => {
  const { backendToken, backendBaseUrl } = useRuntimeConfig(event);

  try {
    const endpoint = `${backendBaseUrl}/api/website`;
    const res = await $fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${backendToken}`
      }
    });

    const website = (res as any).data;

    return {
      about: website.about,
      socials: website.socials || []
    };
  } catch (error) {
    throw createError({
      statusCode: 404,
      statusMessage: `Failed to fetch proprerty data: ${(error as Error).message}`
    });
  }
});
