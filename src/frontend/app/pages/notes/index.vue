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

const queryHelper = useRouterQuery();

const { data, status, error } = await useAsyncData("notes", async () => {
  const [notesData, tags] = await Promise.all([
    $fetch("/api/notes"),
    $fetch("/api/tags")
  ]);

  return {
    notes: notesData.notes,
    tags,
    pagination: {
      currentPage: notesData.currentPage || 0,
      totalPages: notesData.totalPages || 0
    }
  };
});

const filter = reactive({
  search: "",
  tags: [] as string[]
});

const pagination = reactive({
  currentPage: data.value?.pagination.currentPage || 0,
  totalPages: data.value?.pagination.totalPages || 0
});

const notes = ref<Note[]>(data.value?.notes || []);
const showSearchField = ref<boolean>(false);
const showFilterSidebar = ref<boolean>(false);

const loading = ref(false);
const scrollYPosition = ref(0);

/**
 * removes duplicates and filters based on search and tags
 */
const getNotes = computed<Note[]>(() => {
  // remove duplicates
  const uniqueNotes = notes.value.filter((note, index, self) =>
    index === self.findIndex(n => n._id === note._id)
  );

  // filter based on search and tags
  const filteredNotes = uniqueNotes.filter((note) => {
    if (filter.search) {
      const matchesTitle = note.title.toLowerCase().includes(filter.search.toLowerCase());
      const matchesContent = note.content.toLowerCase().includes(filter.search.toLowerCase());
      if (!matchesTitle && !matchesContent) {
        return false;
      }
    }

    if (filter.tags.length > 0) {
      if (!filter.tags.every(tag => note.tags.includes(tag))) {
        return false;
      }
    }

    return true;
  });

  // sorted notes
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
      // filter out duplicate tags
      .filter((tag, index, self) => index === self.findIndex(t => t.label === tag.label))
      // sort alphabetically
      .sort((a, b) => a.label.localeCompare(b.label))
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
  filter.search = "";
  filter.tags = [];
}

async function fetchNotes(options: { search?: string, tags?: string[], pagination?: { page: number, limit?: number } }): Promise<Note[]> {
  const urlQuerys: string[] = [];

  if (options.search) {
    urlQuerys.push(`search=${encodeURIComponent(options.search)}`);
  }

  if (options.tags && options.tags.length > 0) {
    urlQuerys.push(`tags=${encodeURIComponent(options.tags.join(","))}`);
  }

  if (options.pagination?.page) {
    urlQuerys.push(`page=${options.pagination.page}`);
  }

  if (options.pagination?.limit) {
    urlQuerys.push(`limit=${options.pagination.limit}`);
  }

  const query: string | null = urlQuerys.length > 0 ? `${urlQuerys.join("&")}` : null;
  const res = await $fetch(query ? `/api/notes?${query}` : "/api/notes");
  return res.notes;
}

watch(
  () => filter.search,
  async (newSearch, oldSearch) => {
    const searchHasChanged = newSearch.trim() !== oldSearch.trim();

    if (!searchHasChanged) {
      return;
    }

    if (newSearch && newSearch.trim().length > 0) {
      await queryHelper.add("q", newSearch.trim());

      const fetchedNotes = await fetchNotes({ search: newSearch });
      notes.value.push(...fetchedNotes);
    } else {
      await queryHelper.remove("q");
    }
  }
);

watch(
  () => filter.tags.toString(),
  async (newTags, oldTags) => {
    if (newTags === oldTags) {
      return;
    }

    if (filter.tags.length > 0) {
      await queryHelper.add("tags", filter.tags.join(","));
      const fetchedNotes = await fetchNotes({ tags: filter.tags });
      notes.value.push(...fetchedNotes);
    } else {
      await queryHelper.remove("tags");
    }
  }
);

onMounted(async () => {
  if (queryHelper.has("q")) {
    filter.search = queryHelper.get("q") as string;
    showSearchField.value = true;
  }

  if (queryHelper.has("tags")) {
    const tags = queryHelper.get("tags") as string;
    filter.tags = tags.split(",").filter(tag => tag.length > 0);
  }

  // add event listener for scroll to fetch more notes
  window.addEventListener("scroll", async () => {
    scrollYPosition.value = window.scrollY;
    const scrollPosition = window.innerHeight + scrollYPosition.value;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= documentHeight - 100 && status.value !== "pending" && !loading.value) {
      loading.value = true;

      pagination.currentPage = pagination.currentPage + 1;
      const fetchedNotes = await fetchNotes({
        pagination: { page: pagination.currentPage }
      });

      notes.value.push(...fetchedNotes);
      loading.value = false;
    }
  });
});
</script>

<template>
  <base-page title="Notes">
    <div class="w-full md:w-6/12 md:mx-auto flex flex-col gap-2">
      <div id="filter" class="h-10 mb-2 flex gap-2">
        <div v-if="showSearchField" class="p-1 flex gap-2 items-center brutalist-outline">
          <input
            v-model="filter.search"
            placeholder="Search..."
            :class="`w-full h-full ${filter.search.length > 0 ? 'bg-pinkish text-slate-800' : ''}`">
          <button class="p-2 flex items-center cursor-pointer" @click="filter.search = ''; showSearchField = false;">
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
          :class="`flex items-center gap-2 ${filter.tags.length > 0 ? 'bg-pinkish text-slate-800' : ''} ${showFilterSidebar ? 'font-bold' : ''}`"
          @click="showFilterSidebar = !showFilterSidebar">
          <icon name="mdi-filter" class="h-4 w-4 mr-1" />
          Filter
        </base-btn>
      </div>

      <!-- whole new row - show any selected tags -->
      <div v-if="filter.tags.length > 0" class="flex flex-wrap gap-2">
        <span
          v-for="tag in filter.tags"
          :key="tag"
          class="bg-pinkish text-slate-800 px-2 py-1 rounded-full text-sm cursor-pointer flex gap-1 items-center"
          @click="removeTagFromFilter(tag)">
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

      <div v-else-if="getNotes.length > 0" class="flex flex-col gap-4">
        <NoteCard
          v-for="note in getNotes"
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
