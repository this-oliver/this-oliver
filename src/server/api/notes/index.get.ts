import type { Note } from "~/types";

export default defineEventHandler(async (event): Promise<{ notes: Note[], currentPage: number, totalPages: number }> => {
  const config = useRuntimeConfig(event);

  const query = getQuery(event);
  const page: number = Number(query.page) || 0;
  const limit: number = Number(query.limit) || 12;

  const list: unknown[] = [];
  let currentPage: number = 0;
  let totalPages: number = 0;

  try {
    const res = await $fetch(
      `${config.cmsApiUrl}/api/notes?pagination[page]=${page}&pagination[pageSize]=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${config.cmsApiToken}`
        }
      }
    );

    if (res && Array.isArray((res as any).data)) {
      list.push(...(res as any).data);
    }

    currentPage = (res as any).meta.pagination.page;
    totalPages = (res as any).meta.pagination.pageCount;
  } catch (error) {
    throw createError({
      statusCode: 404,
      statusMessage: `Failed to fetch proprerty data: ${(error as Error).message}`
    });
  }

  const notes: Note[] = list.map((note: any) => ({
    _id: note.id,
    title: note.title,
    slug: note.slug,
    date: note.date,
    content: note.content,
    tags: note.tags || [],
    publish: note.publish,
    createdAt: note.date,
    updatedAt: note.updatedAt || note.date
  }));

  return {
    notes,
    currentPage,
    totalPages
  };
});
