<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useNoteStore } from '~/stores/note-store'
import type { Note } from '~/types'

const route = useRoute()
const noteStore = useNoteStore()
const { formatDate } = useTime()

const note = ref<Note | null>(null)
const noteDate = computed<string>(() => formatDate(note.value?.createdAt || ''))

onMounted(async () => {
  note.value = await noteStore.getNoteBySlug(route.params.slug as string)
})
</script>

<template>
  <BasePage>
    <v-row
      justify="center"
      no-gutters>
      <v-col cols="10">
        <color-card class="brutalist-outline" />
        <p>{{ noteDate }}</p>
        <h1>{{ note?.title }}</h1>
        <MarkdownCard :markdown="note?.content || ''" />
      </v-col>
    </v-row>
  </BasePage>
</template>
