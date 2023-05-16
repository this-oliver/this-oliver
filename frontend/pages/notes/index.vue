<script setup lang="ts">
import { h } from 'vue'
import { useNoteStore } from '~/stores/note-store'
import { useAuthStore } from '~/stores/auth-store'
import { ActionItem, Note, Tag } from '~/types'
import NoteCard from '~/components/cards/NoteCard.vue'

const authStore = useAuthStore()
const noteStore = useNoteStore()

const notes = ref<Note[]>([])
const tags = ref<Tag[]>([])
const showFilter = ref(false)
const tagsFilter = ref<Tag[]>([])
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

function inFilter (tag: Tag): boolean {
  return tagsFilter.value.some(t => t._id === tag._id)
}

function addTagToFilter (tag: Tag) {
  tagsFilter.value.push(tag)
}

function removeTagFromFilter (tag: Tag) {
  tagsFilter.value = tagsFilter.value.filter(t => t._id !== tag._id)
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
            v-for="tag in tags"
            :key="tag._id">
            <template #prepend>
              <v-list-item-action start>
                <v-checkbox-btn
                  :color="tag.color"
                  :value="inFilter(tag)"
                  @click="inFilter(tag) ? removeTagFromFilter(tag) : addTagToFilter(tag)" />
              </v-list-item-action>
            </template>

            {{ tag.name }}
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
