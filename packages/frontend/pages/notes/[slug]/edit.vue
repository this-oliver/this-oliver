<script setup lang="ts">
import type { Note } from "~/types";
import { useRoute } from "vue-router";
import { useNoteStore } from "~/stores/note-store";

definePageMeta({ middleware: ["auth"] });

const route = useRoute();
const noteStore = useNoteStore();

const note = ref<Note | null>(null);

onMounted(async () => {
  note.value = await noteStore.getNoteBySlug(route.params.slug as string);
});
</script>

<template>
  <base-page title="Update Note">
    <note-form
      v-if="note"
      :note="note"
      edit-mode />

    <v-skeleton-loader
      v-else
      class="mx-auto"
      type="list-item-three-line" />
  </base-page>
</template>
