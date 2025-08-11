export default defineEventHandler(async (event): Promise<string[]> => {
  const { cmsApiToken, cmsApiUrl } = useRuntimeConfig(event);

  try {
    const endpoint = `${cmsApiUrl}/api/tags`;
    const res = await $fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${cmsApiToken}`
      }
    });

    const tags: { label: string }[] = (res as any).data;

    return tags.map(tag => tag.label);
  } catch (error) {
    throw createError({
      statusCode: 404,
      statusMessage: `Failed to fetch tags: ${(error as Error).message}`
    });
  }
});
