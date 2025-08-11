import type { Website } from "~/types";

export default defineEventHandler(async (event): Promise<Website> => {
  const { cmsApiToken, cmsApiUrl } = useRuntimeConfig(event);

  try {
    const endpoint = `${cmsApiUrl}/api/website`;
    const res = await $fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${cmsApiToken}`
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
