<script setup lang="ts">
import type { Note } from "~/types";
import { useRouterQuery } from "~/composables/useRouterQuery";

// set seo meta
const title = "Notes - oliverrr";
const description = "A collection of notes on various topics.";

useSeoMeta({
  title,
  description,
  author: "oliverrr",
  ogUrl: "https://www.oliverrr.net/notes",
  ogTitle: title,
  ogDescription: description,
  ogSiteName: "oliverrr's notes"
});

const query = useRouterQuery();

const notesCurrentPage = ref(1);
const notesTotalPages = ref(1);

const { data, status, error } = await useAsyncData("notes", async () => {
  const [notesData, tags] = await Promise.all([
    $fetch("/api/notes"),
    $fetch("/api/tags")
  ]);

  notesCurrentPage.value = notesData.currentPage || notesCurrentPage.value;
  notesTotalPages.value = notesData.totalPages || notesTotalPages.value;

  return {
    notes: notesData.notes,
    tags
  };
});

const filter = reactive({
  query: "",
  tags: [] as string[]
});

const showSearchField = ref<boolean>(false);
const showFilterSidebar = ref<boolean>(false);

const getFilteredNotes = computed<Note[]>(() => {
  let filteredNotes = data.value?.notes || [];

  if (filter.query) {
    filteredNotes = filteredNotes.filter((note) => {
      const matchesTitle = note.title.toLowerCase().includes(filter.query.toLowerCase());
      const matchesContent = note.content.toLowerCase().includes(filter.query.toLowerCase());
      return matchesTitle || matchesContent;
    });
  }

  if (filter.tags.length > 0) {
    filteredNotes = filteredNotes.filter(note =>
      filter.tags.every(tag => note.tags.includes(tag))
    );
  }

  return sortNotesByDate(filteredNotes);
});

const getTagOptions = computed<{ label: string, active: boolean, action: () => void }[]>(() => {
  return data.value
    ? data.value?.tags.map((tag: string) => ({
      label: tag,
      active: filter.tags.includes(tag),
      action: () => {
        if (filter.tags.includes(tag)) {
          removeTagFromFilter(tag);
        } else {
          addTagToFilter(tag);
        }
      }
    }))
    : [];
});

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

function resetFilter(): void {
  filter.query = "";
  filter.tags = [];
}

// deep watch filters and update route query
watch(
  () => filter.query,
  async (newQuery) => {
    if (newQuery.length > 0) {
      await query.add("q", newQuery);
    } else {
      await query.remove("q");
    }
  }
);

watch(
  () => filter.tags,
  async (newTags) => {
    if (newTags.length > 0) {
      await query.add("tags", newTags.join(","));
    } else {
      await query.remove("tags");
    }
  },
  { deep: true }
);

onMounted(async () => {
  if (query.has("q")) {
    filter.query = query.get("q") as string;
    showSearchField.value = true;
  }

  if (query.has("tags")) {
    const tags = query.get("tags") as string;
    filter.tags = tags.split(",").filter(tag => tag.length > 0);
  }
});
</script>

<template>
  <base-page title="Notes">
    <div class="w-full md:w-6/12 md:mx-auto flex flex-col gap-2">
      <div id="filter" class="h-10 mb-2 flex gap-2">
        <div v-if="showSearchField" class="p-1 flex gap-2 items-center brutalist-outline">
          <input
            v-model="filter.query"
            placeholder="Search..."
            :class="`w-full h-full ${filter.query.length > 0 ? 'bg-pinkish text-slate-800' : ''}`">
          <button class="p-2 flex items-center cursor-pointer" @click="filter.query = ''; showSearchField = false;">
            <icon name="mdi-close" class="text-lg" />
          </button>
        </div>

        <base-btn
          v-else
          class="flex items-center gap-2"
          @click="showSearchField = true">
          <icon name="mdi-magnify" class="h-4 w-4 mr-1" />
          Search
        </base-btn>

        <base-btn
          :class="`flex items-center gap-2 ${filter.tags.length > 0 ? 'bg-pinkish text-slate-800' : ''}`"
          @click="showFilterSidebar = true">
          <icon name="mdi-filter" class="h-4 w-4 mr-1" />
          Filter
        </base-btn>
      </div>

      <!-- whole new row - show any selected tags -->
      <div v-if="filter.tags.length > 0" class="flex flex-wrap gap-2">
        <span
          v-for="tag in noteStore.filter.tags"
          :key="tag"
          class="bg-pinkish text-slate-800 px-2 py-1 rounded-full text-sm cursor-pointer flex gap-1 items-center"
          @click="noteStore.removeTagFromFilter(tag)">
          <span>{{ tag }}</span>
          <icon name="mdi-close" class="text-xs" />
        </span>
      </div>

      <div v-if="status === 'pending'">
        Fetching notes...
      </div>

      <div v-else-if="error">
        <error-card message="An error occurred while fetching experiences. Please try again later." />
      </div>

      <div v-else-if="getFilteredNotes.length > 0" class="flex flex-col gap-4">
        <NoteCard
          v-for="note in getFilteredNotes"
          :key="note._id"
          :note="note" />
      </div>

      <div v-else>
        No notes found.
      </div>
    </div>

    <base-sidebar
      id="tags-sidebar"
      label="Filter"
      position="right"
      class="bg-slate-200 text-slate-800 w-11/12 md:w-3/12 left-0 md:left-auto md:right-0 top-0 flex flex-col gap-2 p-2 z-20"
      :show="showFilterSidebar"
      @close="showFilterSidebar = false">
      <div class="p-2 flex flex-col gap-2">
        <span class="text-xl mb-2">Tags</span>
        <div v-for="tag in getTagOptions" :key="tag.label" class="flex justify-between pr-2">
          <span>{{ tag.label }}</span>

          <input
            type="checkbox"
            :checked="tag.active"
            class="cursor-pointer"
            @click="tag.action()">
        </div>
      </div>
      <base-btn
        v-if="filter.tags.length > 0"
        class="mt-auto flex flex-col gap-2 bg-amber-200 text-slate-800"
        @click="resetFilter()">
        Reset Filters
      </base-btn>
    </base-sidebar>
  </base-page>
</template>
