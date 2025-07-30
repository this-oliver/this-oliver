export default defineEventHandler(async (event): Promise<string[]> => {
  const config = useRuntimeConfig(event);

  try {
    const res = await $fetch(`${config.cmsApiUrl}/api/tags`, {
      headers: {
        Authorization: `Bearer ${config.cmsApiToken}`
      }
    });

    const tags: { label: string }[] = (res as any).data;

    return tags.map(tag => tag.label);
  } catch (error) {
    console.error({ error });
    throw createError({
      statusCode: 404,
      statusMessage: `Failed to fetch tags: ${(error as Error).message}`
    });
  }
});
