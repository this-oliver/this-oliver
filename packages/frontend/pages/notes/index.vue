<script setup lang="ts">
import { h } from 'vue';
import { useNoteStore } from '~/stores/note-store';
import { useAuthStore } from '~/stores/auth-store';
import { ActionItem, Note } from '~/types';
import { useRouterQuery } from '~/composables/useRouterQuery';
import NoteCard from '~/components/cards/NoteCard.vue';

const authStore = useAuthStore();
const noteStore = useNoteStore();
const query = useRouterQuery();

const loading = ref(false);

const showFilter = ref(false);
const filter = reactive({
	query: '',
	published: false,
	unpublished: false,
	tags: [] as string[]
});

const showReset = computed<boolean>(() => {
	return filter.tags.length > 0 || filter.unpublished === true || filter.published === true;
});

const getNotes = computed<Note[]>(() => {
	let filteredNotes: Note[] = noteStore.notes;

	// filter query
	if (filter.query.length > 0) {
		filteredNotes = noteStore.notes.filter((note) => {
			return note.title.toLowerCase().includes(filter.query.toLowerCase());
		});
	}

	// filter tags
	if (filter.tags.length > 0) {
		filteredNotes = noteStore.notes.filter((note) => {
			return note.tags.some(tag => tagInFilter(tag));
		});
	}

	// filter published status
	if (filter.published || filter.unpublished) {
		filteredNotes = filteredNotes.filter((note) => {
			return filter.published
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
				color: 'primary',
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
	return filter.tags.includes(tag);
}

function removeTagFromFilter (tag: string): void {
	filter.tags = filter.tags.filter(t => t !== tag);
}

function addTagToFilter (tag: string): void {
	if (!filter.tags.includes(tag)) {
		filter.tags.push(tag);
	}
}

function resetFilters (): void {
	filter.query = '';
	filter.tags = [];
	filter.published = false;
	filter.unpublished = false;
}

// deep watch filters and update route query
watch(
	() => filter.query,
	async (newQuery) => {
		if (newQuery.length > 0) {
			await query.add('q', newQuery);
		} else {
			await query.remove('q');
		}
	}
);

watch(
	() => filter.tags,
	async (newTags) => {
		if (newTags.length > 0) {
			await query.add('tags', newTags.join(','));
		} else {
			await query.remove('tags');
		}
	},
	{ deep: true }
);

watch(
	() => filter.published,
	async (newPublished) => {
		if (newPublished) {
			await query.add('published', String(newPublished));
		} else {
			await query.remove('published');
		}
	}
);

watch(
	() => filter.unpublished,
	async (newUnpublished) => {
		if (newUnpublished) {
			await query.add('unpublished', String(newUnpublished));
		} else {
			await query.remove('unpublished');
		}
	}
);

onMounted(async () => {
	// set filters from query params
	if (query.has('q')) {
		filter.query = query.get('q') as string;
	}

	if (query.has('published')) {
		filter.published = query.get('published') === 'true';
	}

	if (query.has('unpublished')) {
		filter.unpublished = query.get('unpublished') === 'true';
	}

	if (query.has('tags')) {
		filter.tags = query.get('tags').split(',');
	}

	// fetch notes and tags
	loading.value = true;
	await noteStore.indexNotes();
	await noteStore.indexTags();
	loading.value = false;
});

// set seo meta
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
          v-if="!loading"
          label="notes"
          allow-search
          :options="options"
          :loading="loading"
          :components="components"
          :search="filter.query"
          @search="(q) => filter.query = q" />
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
                v-model="filter.published"
                color="success" />
            </v-list-item-action>
          </template>
          Published
        </v-list-item>
        <v-list-item v-if="authStore.isLoggedIn">
          <template #append>
            <v-list-item-action start>
              <v-checkbox-btn
                v-model="filter.unpublished"
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
