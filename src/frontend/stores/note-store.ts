import type { Note } from "~/types";
import { defineStore } from "pinia";

export const useNoteStore = defineStore("note", () => {
  const filter = reactive({
    query: "",
    tags: [] as string[]
  });

  const notes = ref<Note[]>([]);
  const tags = ref<string[]>([]);

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

  const getTags = computed<string[]>(() => tags.value);

  function setNotes(newNotes: Note[]): void {
    const list = [...notes.value, ...newNotes];

    // filter out duplicates
    const uniqueList = list.filter((item, index) => {
      return list.findIndex(i => i._id === item._id) === index;
    });

    notes.value = sortNotesByDate(uniqueList);
  };

  function setTags(newTags: string[]): void {
    const list = [...tags.value, ...newTags];

    // filter out duplicates
    tags.value = list.filter((item, index) => {
      return list.indexOf(item) === index;
    });
  };

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
    filter,
    getNotes,
    getFilteredNotes,
    getTags,
    setNotes,
    setTags,
    removeTagFromFilter,
    addTagToFilter,
    resetFilter,
    resetTags
  };
});
