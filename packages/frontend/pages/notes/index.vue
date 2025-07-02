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

const getTags = computed<{ name: string, filtered: boolean }[]>(() => {
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
  return [
    {
      label: "Filter",
      color: "primary",
      icon: "mdi-filter",
      action: () => {
        showFilter.value = !showFilter.value;
      }
    }
  ];
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
  <base-page title="Notes">
    <v-row justify="center">
      <v-col lg="7">
        <base-list
          v-if="!isLoading"
          label="notes"
          allow-search
          :options="options"
          :is-loading="isLoading"
          :components="components"
          :search="noteStore.filter.query"
          @search="(q) => noteStore.filter.query = q" />
      </v-col>
    </v-row>

    <v-navigation-drawer
      v-model="showFilter"
      class="pa-2"
      width="60%"
      color="primary"
      location="right"
      :scrim="true"
      :permanent="showFilter">
      <template #prepend>
        <v-row
          justify="space-between"
          align="center">
          <v-col
            class="text-center"
            cols="auto"
            md="12">
            <base-btn
              block
              color="error"
              @click="showFilter = false">
              Close
            </base-btn>
          </v-col>
        </v-row>

        <v-divider class="border-outline-25 my-2" />
      </template>

      <v-list>
        <h4>
          Reset
        </h4>
        <v-list-item
          color="error"
          :disabled="!showReset"
          @click="noteStore.resetFilter()">
          <template #append>
            <v-list-item-action start>
              <base-btn
                text
                :color="showReset ? 'error' : ''">
                <v-icon :icon="showReset ? 'mdi-close-box-multiple-outline' : 'mdi-shimmer'" />
              </base-btn>
            </v-list-item-action>
          </template>

          Reset Filters
        </v-list-item>

        <v-divider class="border-outline-25 my-2" />

        <h4 v-if="getTags.length > 0">
          Tags
        </h4>
        <v-list-item
          v-for="tag in getTags"
          :key="tag.name">
          <template #append>
            <v-list-item-action start>
              <v-checkbox-btn
                v-model="tag.filtered"
                color="success"
                @update:model-value="(value: boolean) => value ? noteStore.addTagToFilter(tag.name) : noteStore.removeTagFromFilter(tag.name)" />
            </v-list-item-action>
          </template>

          {{ tag.name }}
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </base-page>
</template>
