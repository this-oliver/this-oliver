import type { Note } from "~/types";

export default defineEventHandler(async (event): Promise<{ notes: Note[], currentPage: number, totalPages: number }> => {
  const { cmsApiToken, cmsApiUrl } = useRuntimeConfig(event);

  const query = getQuery(event);
  const page: number = Number(query.page) || 1;
  const limit: number = Number(query.limit) || 10;
  const search: string | null = query.search ? String(query.search) : null;
  const tags: string[] = query.tags ? String(query.tags).split(",").map(tag => tag.trim()).filter(tag => tag.length > 0) : [];

  const list: unknown[] = [];
  let currentPage: number = 0;
  let totalPages: number = 0;

  const filters: string[] = [
    "populate=tags",
    "sort=date:desc"
  ];

  if (search) {
    filters.push(`filters[$or][0][title][$containsi]=${search}`);
    filters.push(`filters[$or][1][content][$containsi]=${search}`);
  }

  if (tags.length > 0) {
    tags.forEach((tag) => {
      filters.push(`filters[tags][label][$containsi]=${tag}`);
    });
  }

  if (!search && tags.length <= 0) {
    filters.push(`pagination[page]=${page}`);
    filters.push(`pagination[pageSize]=${limit}`);
  }

  try {
    const endpoint = `${cmsApiUrl}/api/notes?${filters.join("&")}`;
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
      statusMessage: `Failed to fetch notes: ${(error as Error).message}`
    });
  }

  const notes: Note[] = list.map((note: any) => ({
    _id: note.id,
    title: note.title,
    slug: note.slug,
    date: note.date,
    content: note.content,
    tags: note.tags ? note.tags.map((tag: any) => tag.label) : [],
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
