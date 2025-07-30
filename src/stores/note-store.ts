import type { Note } from "~/types";
import { defineStore } from "pinia";

export const useNoteStore = defineStore("note", () => {
  const filter = reactive({
    query: "",
    tags: [] as string[]
  });

  const notes = ref<Note[]>([]);
  const tags = ref<string[]>([]);
  const pagination = ref({
    currentPage: 0,
    totalPages: 0
  });

  const getNotes = computed<Note[]>(() => notes.value);

  const getFilteredNotes = computed<Note[]>(() => {
    let filteredNotes = notes.value;

    if (filter.query) {
      filteredNotes = filteredNotes.filter(note =>
        note.title.toLowerCase().includes(filter.query.toLowerCase())
        || note.content.toLowerCase().includes(filter.query.toLowerCase())
      );
    }

    if (filter.tags.length > 0) {
      filteredNotes = filteredNotes.filter(note =>
        filter.tags.every(tag => note.tags.includes(tag))
      );
    }
    return filteredNotes;
  });

  async function getNote(slug: string): Promise<Note> {
    return await $fetch(`/api/notes/${slug}`);
  }

  async function indexNotes(): Promise<Note[]> {
    const rawNotes = await $fetch("/api/notes");
    notes.value = sortNotesByDate(rawNotes.notes);
    pagination.value.currentPage = rawNotes.currentPage;
    pagination.value.totalPages = rawNotes.totalPages;

    return notes.value;
  }

  async function indexTags(): Promise<string[]> {
    tags.value = await $fetch("/api/tags");
    return tags.value;
  }

  function sortNotesByDate(notes: Note[]) {
    return notes.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);

      return dateA > dateB ? -1 : 1;
    });
  }

  function removeTagFromFilter(tag: string): void {
    filter.tags = filter.tags.filter(t => t !== tag);
  }

  function addTagToFilter(tag: string): void {
    if (!filter.tags.includes(tag)) {
      filter.tags.push(tag);
    }
  }

  function resetTags(): void {
    filter.tags = [];
  }

  function resetFilter(): void {
    filter.query = "";
    filter.tags = [];
  }

  return {
    notes,
    tags,
    pagination,
    filter,
    getNotes,
    getFilteredNotes,
    getNote,
    indexNotes,
    indexTags,
    removeTagFromFilter,
    addTagToFilter,
    resetFilter,
    resetTags
  };
});
