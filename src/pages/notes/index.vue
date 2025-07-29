<script setup lang="ts">
import NoteCard from "~/components/cards/NoteCard.vue";
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

const { status } = await useAsyncData("notes", () => {
  return noteStore.indexNotes();
});

const showSearchField = ref<boolean>(false);

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

onMounted(async () => {
  if (query.has("q")) {
    noteStore.filter.query = query.get("q") as string;
  }
});
</script>

<template>
  <base-page title="Notes">
    <div class="md:w-6/12 md:mx-auto flex flex-col gap-2">
      <div id="filter" class="h-10 mb-2 flex md:grid md:grid-cols-2 gap-2">
        <div v-if="showSearchField" class="p-1 flex gap-2 items-center brutalist-outline">
          <input v-model="noteStore.filter.query" placeholder="Search..." class="w-full h-full">
          <button class="p-2 flex items-center cursor-pointer" @click="noteStore.filter.query = ''; showSearchField = false;">
            <icon name="mdi-close" class="text-lg" />
          </button>
        </div>

        <base-btn
          v-else
          class="w-5/12 flex items-center gap-2"
          @click="showSearchField = true">
          <icon name="mdi-magnify" class="h-4 w-4 mr-1" />
          Search
        </base-btn>
      </div>

      <div v-if="status === 'pending'">
        Fetching notes...
      </div>

      <div v-else-if="status === 'error'">
        Failed to fetch notes.
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
  </base-page>
</template>
