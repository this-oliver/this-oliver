import type { Experience } from "~/types";

export default defineEventHandler(async (event): Promise<{ experiences: Experience[], currentPage: number, totalPages: number }> => {
  const { cmsApiToken, cmsApiUrl, cmsMediaUrl } = useRuntimeConfig(event);

  const query = getQuery(event);
  const page: number = Number(query.page) || 0;
  const limit: number = Number(query.limit) || 10;

  const list: unknown[] = [];
  let currentPage: number = 0;
  let totalPages: number = 0;

  try {
    const endpoint = `${cmsApiUrl}/api/experiences?sort=startDate:desc&pagination[page]=${page}&pagination[pageSize]=${limit}&populate=images`;
    const res = await $fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${cmsApiToken}`
      }
    });

    if (res && Array.isArray((res as any).data)) {
      list.push(...(res as any).data);
    }

    currentPage = (res as any).meta.pagination.page;
    totalPages = (res as any).meta.pagination.pageCount;
  } catch (error) {
    throw createError({
      statusCode: 404,
      statusMessage: `Failed to fetch experiences: ${(error as Error).message}`
    });
  }

  const experiences: Experience[] = list.map((experience: any) => ({
    _id: experience.id,
    title: experience.title,
    description: experience.description,
    startYear: experience.startDate,
    endYear: experience.endDate,
    org: experience.org,
    type: experience.type,
    link: experience.link,
    images: experience.images?.map((image: any) => ({
      name: image.name,
      alt: image.alt,
      caption: image.caption,
      url: cmsMediaUrl ? `${cmsMediaUrl}${image.url}` : image.url
    }))
  }));

  return {
    experiences,
    currentPage,
    totalPages
  };
});
