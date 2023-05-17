<script setup lang="ts">
import { h } from 'vue'
import { useNoteStore } from '~/stores/note-store'
import { useAuthStore } from '~/stores/auth-store'
import { ActionItem, Note } from '~/types'
import NoteCard from '~/components/cards/NoteCard.vue'

const authStore = useAuthStore()
const noteStore = useNoteStore()

const notes = ref<Note[]>([])
const tags = ref<string[]>([])
const showFilter = ref(false)
const tagsFilter = ref<string[]>([])
const loading = ref(false)

const getNotes = computed<Note[]>(() => {
  if (tagsFilter.value.length > 0) {
    return notes.value.filter((note) => {
      return note.tags.some(tag => inFilter(tag))
    })
  } else {
    return notes.value
  }
})

const options = computed<ActionItem[]>(() => {
  let base: ActionItem[] = [
    {
      label: 'Filter',
      color: 'primary',
      icon: 'mdi-filter',
      action: () => { showFilter.value = true }
    }
  ]

  if (authStore.isLoggedIn) {
    base = [
      {
        label: 'Create Note',
        color: 'secondary',
        icon: 'mdi-plus',
        to: '/notes/create'
      },
      ...base
    ]
  }

  return base
})

const components = computed(() => {
  return getNotes.value.map((note) => {
    // return a NoteCard component with the note prop set to the note
    return h(NoteCard, { note, adminMode: authStore.isLoggedIn })
  })
})

function inFilter (tag: string): boolean {
  return tagsFilter.value.includes(tag)
}

function addTagToFilter (tag: string) {
  tagsFilter.value.push(tag)
}

function removeTagFromFilter (tag: string) {
  tagsFilter.value = tagsFilter.value.filter(t => t !== tag)
}

onMounted(async () => {
  loading.value = true
  notes.value = await noteStore.indexNotes()
  tags.value = await noteStore.indexTags()
  loading.value = false
})

</script>

<template>
  <base-page title="Notes">
    <base-list
      label="notes"
      :options="options"
      :loading="loading"
      :components="components" />

    <v-dialog
      v-model="showFilter"
      width="70vw">
      <base-card class="pa-2">
        <v-card-title>Filter Notes</v-card-title>

        <v-list>
          <v-list-item
            v-for="(tag, index) in tags"
            :key="tag + index">
            <template #prepend>
              <v-list-item-action start>
                <v-checkbox-btn
                  :value="inFilter(tag)"
                  @click="inFilter(tag) ? removeTagFromFilter(tag) : addTagToFilter(tag)" />
              </v-list-item-action>
            </template>

            {{ tag }}
          </v-list-item>
        </v-list>
      </base-card>
    </v-dialog>
  </base-page>
</template>

<style scoped>
#notes-list > * {
  margin-bottom: 1rem;
}

@media (min-width: 600px) {
  #notes-list {
    overflow-y: auto;
    max-height: 80vh;
    padding-bottom: 5vh;

    /* hide the scroll */
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
}
</style>
