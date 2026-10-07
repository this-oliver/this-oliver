export default defineEventHandler(async (event): Promise<string[]> => {
  const { backendToken, backendBaseUrl } = useRuntimeConfig(event);

  try {
    const endpoint = `${backendBaseUrl}/api/tags`;
    const res = await $fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${backendToken}`
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
