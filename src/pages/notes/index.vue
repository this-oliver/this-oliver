<script setup lang="ts">
import type { ActionItem, Note } from "~/types";
import { h } from "vue";
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

const { data, status } = useAsyncData("notes", async () => {
  // fetch notes from store
  return await noteStore.indexNotes();
});

const showFilter = ref(false);

const isLoading = computed<boolean>(() => {
  return status.value === "pending";
});

const showReset = computed<boolean>(() => {
  return noteStore.filter.tags.length > 0;
});

const getNotes = computed<Note[]>(() => {
  let filteredNotes: Note[] = data.value || [];

  // filter query
  if (noteStore.filter.query.length > 0) {
    filteredNotes = filteredNotes.filter((note) => {
      return note.title.toLowerCase().includes(noteStore.filter.query.toLowerCase());
    });
  }

  // filter tags
  if (noteStore.filter.tags.length > 0) {
    filteredNotes = filteredNotes.filter((note) => {
      return note.tags.some(tag => tagInFilter(tag));
    });
  }

  return filteredNotes;
});

interface Tag {
  name: string
  filtered: boolean
};
const getTags = computed<Tag[]>(() => {
  return noteStore.tags.flat()
    .map((tag) => {
      return {
        name: tag,
        filtered: tagInFilter(tag)
      };
    })
    .sort((a, b) => {
      if (a.filtered && !b.filtered) {
        return -1;
      }
      if (!a.filtered && b.filtered) {
        return 1;
      }
      return 0;
    });
});

const options = computed<ActionItem[]>(() => {
  const hasSomethingToFilter = getTags.value.length > 0;

  return hasSomethingToFilter
    ? [
      {
        label: "Filter",
        color: "primary",
        icon: "mdi-filter",
        action: () => {
          showFilter.value = !showFilter.value;
        }
      }
    ]
    : [];
});

const components = computed(() => {
  return getNotes.value.map((note) => {
    // return a NoteCard component with the note prop set to the note
    return h(NoteCard, { note });
  });
});

function tagInFilter(tag: string): boolean {
  return noteStore.filter.tags.includes(tag);
}

function handleSelectedTagEvent(tag: Tag, event: MouseEvent): void {
  if (!event?.target)
    return;

  const input = event.target as HTMLInputElement;
  if (input.checked) {
    noteStore.addTagToFilter(tag.name);
  } else {
    noteStore.removeTagFromFilter(tag.name);
  }
}

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
  // set filters from query params
  if (query.has("q")) {
    noteStore.filter.query = query.get("q") as string;
  }

  if (query.has("tags")) {
    noteStore.filter.tags = query.get("tags").split(",");
  }
});
</script>

<template>
  <base-page title="Notes" class="flex flex-col gap-4 md:w-6/12 md:mx-auto">
    <div class="w-full flex flex-col">
      <base-list
        v-if="!isLoading"
        label="notes"
        allow-search
        :options="options"
        :is-loading="isLoading"
        :components="components"
        :search="noteStore.filter.query"
        @search="(q: string) => noteStore.filter.query = q" />
    </div>

    <base-sidebar
      id="notes-sidebar"
      :show="showFilter"
      label="Filter Notes"
      class="bg-stone-600 p-2 right-0 w-80"
      @close="showFilter = false">
      <div class="flex flex-col gap-4">
        <div v-if="getTags.length > 0" id="tags" class="flex flex-col gap-2">
          <h3>
            Tags
          </h3>

          <div v-for="tag in getTags" :key="tag.name" class="flex items-center gap-2">
            <input
              v-model="tag.filtered"
              type="checkbox"
              class="form-checkbox h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              @change="handleSelectedTagEvent(tag, event)">
            <v-checkbox-btn
              v-model="tag.filtered"
              color="success"
              @update:model-value="(value: boolean) => value ? noteStore.addTagToFilter(tag.name) : noteStore.removeTagFromFilter(tag.name)" />

            <span>
              {{ tag.name }}
            </span>
          </div>
        </div>

        <base-btn
          v-if="showReset"
          class="bg-red-400 mt-auto"
          @click="noteStore.resetFilter()">
          Reset Filters
        </base-btn>
      </div>
    </base-sidebar>
  </base-page>
</template>
