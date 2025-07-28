import type { Note } from "~/types";

export default defineEventHandler(async (event): Promise<Note> => {
  const config = useRuntimeConfig(event);
  const noteId = getRouterParam(event, "note");

  try {
    const res = await $fetch(`${config.cmsApiUrl}/api/notes?filters[slug][$eq]=${noteId}`, {
      headers: {
        Authorization: `Bearer ${config.cmsApiToken}`
      }
    });

    if (Array.isArray((res as any).data) && (res as any).data.length <= 0) {
      throw new Error(`Note with slug "${noteId}" not found`);
    }

    const note = (res as any).data[0];

    return {
      _id: note.id,
      title: note.title,
      slug: note.slug,
      content: note.content,
      tags: note.tags || [],
      publish: note.publish,
      createdAt: note.date,
      updatedAt: note.updatedAt || note.date
    };
  } catch (error) {
    throw createError({
      statusCode: 404,
      statusMessage: `Failed to fetch note with slug ${noteId}: ${(error as Error).message}`
    });
  }
});
