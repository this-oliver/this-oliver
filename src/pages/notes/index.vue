<script setup lang="ts">
import { useRouterQuery } from "~/composables/useRouterQuery";
import { useNoteStore } from "~/stores/note-store";

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

const noteStore = useNoteStore();
const query = useRouterQuery();

const { status, error } = useAsyncData("notes", async () => {
  const [notes, tags] = await Promise.all([
    noteStore.indexNotes(),
    noteStore.indexTags()
  ]);

  return { notes, tags };
});

const showSearchField = ref<boolean>(false);
const showFilterSidebar = ref<boolean>(false);

const getTagOptions = computed<{ label: string, active: boolean, action: () => void }[]>(() => {
  return noteStore.tags.map(tag => ({
    label: tag,
    active: noteStore.filter.tags.includes(tag),
    action: () => {
      if (noteStore.filter.tags.includes(tag)) {
        noteStore.removeTagFromFilter(tag);
      } else {
        noteStore.addTagToFilter(tag);
      }
    }
  }));
});

// deep watch filters and update route query
watch(
  () => noteStore.filter.query,
  async (newQuery) => {
    if (newQuery.length > 0) {
      await query.add("q", newQuery);
    } else {
      await query.remove("q");
    }
  }
);

watch(
  () => noteStore.filter.tags,
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
    noteStore.filter.query = query.get("q") as string;
    showSearchField.value = true;
  }

  if (query.has("tags")) {
    const tags = query.get("tags") as string;
    noteStore.filter.tags = tags.split(",").filter(tag => tag.length > 0);
  }
});
</script>

<template>
  <base-page title="Notes">
    <div class="w-full md:w-6/12 md:mx-auto flex flex-col gap-2">
      <div id="filter" class="h-10 mb-2 flex gap-2">
        <div v-if="showSearchField" class="p-1 flex gap-2 items-center brutalist-outline">
          <input
            v-model="noteStore.filter.query"
            placeholder="Search..."
            :class="`w-full h-full ${noteStore.filter.query.length > 0 ? 'bg-pinkish text-slate-800' : ''}`">
          <button class="p-2 flex items-center cursor-pointer" @click="noteStore.filter.query = ''; showSearchField = false;">
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
          :class="`flex items-center gap-2 ${noteStore.filter.tags.length > 0 ? 'bg-pinkish text-slate-800' : ''}`"
          @click="showFilterSidebar = true">
          <icon name="mdi-filter" class="h-4 w-4 mr-1" />
          Filter
        </base-btn>
      </div>

      <!-- whole new row - show any selected tags -->
      <div v-if="noteStore.filter.tags.length > 0" class="flex flex-wrap gap-2">
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
        Failed to fetch notes: {{ error.message }}
      </div>

      <div v-else-if="noteStore.getFilteredNotes.length === 0">
        No notes found.
      </div>

      <div v-else class="flex flex-col gap-4">
        <NoteCard
          v-for="note in noteStore.getFilteredNotes"
          :key="note._id"
          :note="note" />
      </div>
    </div>

    <base-sidebar
      id="tags-sidebar"
      label="Filter"
      position="right"
      class="bg-slate-200 text-slate-800 w-11/12 md:w-3/12 left-0 md:left-auto md:right-0 top-0 flex flex-col gap-4 p-2 z-20"
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
        v-if="noteStore.filter.tags.length > 0"
        class="mt-auto flex flex-col gap-2 bg-amber-200 text-slate-800"
        @click="noteStore.resetFilter()">
        Reset Filters
      </base-btn>
    </base-sidebar>
  </base-page>
</template>
