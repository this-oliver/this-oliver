<script setup lang="ts">
import { RothkoCard } from 'rothko-js'
import { useNoteStore } from '~/stores/note-store'
import type { Note } from '~/types'

const router = useRouter()
const noteStore = useNoteStore()
const { formatDate } = useTime()

const note = ref<Note | null>(null)
const noteDate = computed<string>(() => note.value ? formatDate(note.value?.createdAt) : '')

const errorReasons: string[] = [
  'The note may have been deleted',
  'The note may have been unpublished',
  'The note may have been moved'
]

onMounted(async () => {
  note.value = await noteStore.getNoteBySlug(router.currentRoute.value.params.slug as string)

  const title = `${note.value?.title} - oliverrr`
  const description = note.value?.content

  useSeoMeta({
    title,
    description,
    author: 'oliverrr',
    ogType: 'article',
    ogUrl: `https://www.oliverrr.net/notes/${note.value?.slug}`,
    ogTitle: note.value?.title,
    ogDescription: note.value?.content,
    ogSiteName: 'oliverrr\'s notes'
  })
})
</script>

<template>
  <base-page>
    <v-row
      justify="center"
      no-gutters>
      <v-col
        v-if="note"
        md="10">
        <rothko-card
          id="note-options"
          :source="note?.title"
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
        </rothko-card>

        <p>{{ noteDate }}</p>
        <h1>{{ note?.title }}</h1>

        <markdown-card
          id="note-content"
          :markdown="note?.content" />
      </v-col>

      <v-col
        v-else
        md="10">
        <base-card
          class="brutalist-outline mt-2 pa-2"
          color="error">
          <div class="text-center">
            <h1>
              This is awkward...
            </h1>

            <base-image
              class="mt-2"
              src="/images/this-is-fine.jpg"
              alt="Meme of a dog in a burning room saying 'This is fine'"
              width="50%" />
          </div>

          <div id="note-content">
            <p>
              We couldn't find the note <span class="note-title">"{{ router.currentRoute.value.params.slug }}"</span> and there are a few possible reasons for this:
            </p>
            <ul class="error-list">
              <li
                v-for="reason in errorReasons"
                :key="reason">
                {{ reason }}
              </li>
            </ul>
          </div>
        </base-card>
      </v-col>
    </v-row>
  </base-page>
</template>

<style>
#note-content {
  font-size: 1.25rem;
}

.note-title {
  font-weight: bold;
}

ul.error-list {
  padding-left: 2rem;
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
