import type { Website } from "~/types";

export default defineEventHandler(async (event): Promise<Website> => {
  const config = useRuntimeConfig(event);

  try {
    const res = await $fetch(`${config.cmsApiUrl}/api/website`, {
      headers: {
        Authorization: `Bearer ${config.cmsApiToken}`
      }
    });

    const website = (res as any).data;

    return {
      about: website.about,
      socias: website.socias || []
    };
  } catch (error) {
    console.error({ error });
    throw createError({
      statusCode: 404,
      statusMessage: `Failed to fetch proprerty data: ${(error as Error).message}`
    });
  }
});
