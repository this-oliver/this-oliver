<script setup lang="ts">
import { h } from 'vue';
import { useNoteStore } from '~/stores/note-store';
import { useAuthStore } from '~/stores/auth-store';
import { ActionItem, Note } from '~/types';
import NoteCard from '~/components/cards/NoteCard.vue';

const authStore = useAuthStore();
const noteStore = useNoteStore();

const loading = ref(false);

const query = ref<string>('');
const showFilter = ref(false);
const filterPublished = ref(false);
const filterUnpublished = ref(false);
const filteredTags = ref<string[]>([]);

const showReset = computed<boolean>(() => {
	return filteredTags.value.length > 0 || filterUnpublished.value === true || filterPublished.value === true;
});

const getNotes = computed<Note[]>(() => {
	let filteredNotes: Note[] = noteStore.notes;

	// filter query
	if (query.value.length > 0) {
		filteredNotes = noteStore.notes.filter((note) => {
			return note.title.toLowerCase().includes(query.value.toLowerCase());
		});
	}

	// filter tags
	if (filteredTags.value.length > 0) {
		filteredNotes = noteStore.notes.filter((note) => {
			return note.tags.some(tag => tagInFilter(tag));
		});
	}

	// filter published status
	if (filterPublished.value || filterUnpublished.value) {
		filteredNotes = filteredNotes.filter((note) => {
			return filterPublished.value
				? note.publish === true
				: note.publish === false;
		});
	}

	return filteredNotes;
});

const getTags = computed<{ name: string, filtered: boolean}[]>(() => {
	return noteStore.tags.flat()
		.map((tag) => {
			return {
				name: tag,
				filtered: tagInFilter(tag)
			};
		})
		.sort((a, b) => {
			if (a.filtered && !b.filtered) { return -1; }
			if (!a.filtered && b.filtered) { return 1; }
			return 0;
		});
});

const options = computed<ActionItem[]>(() => {
	let base: ActionItem[] = [
		{
			label: 'Filter',
			color: 'primary',
			icon: 'mdi-filter',
			action: () => { showFilter.value = !showFilter.value; }
		}
	];

	if (authStore.isLoggedIn) {
		base = [
			...base,
			{
				label: 'Create Note',
				color: 'secondary',
				icon: 'mdi-plus',
				to: '/notes/create'
			}
		];
	}

	return base;
});

const components = computed(() => {
	return getNotes.value.map((note) => {
		// return a NoteCard component with the note prop set to the note
		return h(NoteCard, { note, adminMode: authStore.isLoggedIn });
	});
});

function tagInFilter (tag: string): boolean {
	return filteredTags.value.includes(tag);
}

function removeTagFromFilter (tag: string): void {
	filteredTags.value = filteredTags.value.filter(t => t !== tag);
}

function addTagToFilter (tag: string): void {
	if (filteredTags.value.includes(tag)) { return; }
	filteredTags.value.push(tag);
}

function resetFilters (): void {
	filteredTags.value = [];
	filterUnpublished.value = false;
}

onMounted(async () => {
	loading.value = true;
	await noteStore.indexNotes();
	await noteStore.indexTags();
	loading.value = false;
});

const title = 'Notes - oliverrr';
const description = 'A collection of notes on various topics.';

useSeoMeta({
	title,
	description,
	author: 'oliverrr',
	ogUrl: 'https://www.oliverrr.net/notes',
	ogTitle: title,
	ogDescription: description,
	ogSiteName: 'oliverrr\'s notes'
});

</script>

<template>
  <base-page title="Notes">
    <v-row justify="center">
      <v-col lg="7">
        <base-list
          label="notes"
          allow-search
          :options="options"
          :loading="loading"
          :components="components"
          @search="(q) => query = q" />
      </v-col>
    </v-row>

    <v-navigation-drawer
      v-model="showFilter"
      class="pa-2"
      temporary
      color="primary"
      location="right"
      width="60%">
      <template #prepend>
        <v-row
          justify="space-between"
          align="center">
          <v-col cols="auto">
            <v-toolbar-title>Filter Notes</v-toolbar-title>
          </v-col>

          <v-col
            class="text-center"
            cols="auto">
            <base-btn
              text
              @click="showFilter = false">
              <v-icon
                size="large"
                icon="mdi-close" />
            </base-btn>
          </v-col>
        </v-row>
      </template>

      <v-list>
        <h4>
          Reset
        </h4>
        <v-list-item
          color="error"
          :disabled="!showReset"
          @click="resetFilters">
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

        <h4 v-if="authStore.isLoggedIn">
          Status
        </h4>
        <v-list-item v-if="authStore.isLoggedIn">
          <template #append>
            <v-list-item-action start>
              <v-checkbox-btn
                v-model="filterPublished"
                color="success" />
            </v-list-item-action>
          </template>
          Published
        </v-list-item>
        <v-list-item v-if="authStore.isLoggedIn">
          <template #append>
            <v-list-item-action start>
              <v-checkbox-btn
                v-model="filterUnpublished"
                color="success" />
            </v-list-item-action>
          </template>
          Unpublished
        </v-list-item>

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
                @update:model-value="(value: boolean) => value ? addTagToFilter(tag.name) : removeTagFromFilter(tag.name)" />
            </v-list-item-action>
          </template>

          {{ tag.name }}
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </base-page>
</template>
