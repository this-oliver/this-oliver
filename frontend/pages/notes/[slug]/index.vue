<script setup lang="ts">
import { useNoteStore } from '~/stores/note-store'
import type { Note } from '~/types'

const router = useRouter()
const noteStore = useNoteStore()
const { formatDate } = useTime()

const note = ref<Note | null>(null)
const noteDate = computed<string>(() => formatDate(note.value?.createdAt || ''))

onMounted(async () => {
  note.value = await noteStore.getNoteBySlug(router.currentRoute.value.params.slug as string)
})
</script>

<template>
  <base-page>
    <v-row
      justify="center"
      no-gutters>
      <v-col md="10">
        <color-card
          id="note-options"
          class="brutalist-outline">
          <base-btn
            id="back-btn"
            plain
            @click="router.push('/notes')">
            <v-icon
              icon="mdi-arrow-left"
              size="large" />

            Back
          </base-btn>
        </color-card>
        <p>{{ noteDate }}</p>
        <h1>{{ note?.title }}</h1>

        <markdown-card
          id="note-content"
          :markdown="note?.content || ''" />
      </v-col>
    </v-row>
  </base-page>
</template>

<style>
#note-content {
  font-size: 1.25rem;
}

/* display #back-btn if mouse hovers over #note-options or if screen is mobile */
#back-btn {
  display: none;
}

@media (max-width: 600px) {
  #back-btn {
    display: block;
  }
}

@media (hover: hover) {
  #note-options:hover #back-btn {
    display: block;
  }
}
</style>
