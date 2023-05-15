<script setup lang="ts">
import { useNoteStore } from '~/stores/note-store'
import { useAuthStore } from '~/stores/auth-store'
import { ActionItem, Note, Tag } from '~/types'

const authStore = useAuthStore()
const noteStore = useNoteStore()

const notes = ref<Note[]>([])
const tags = ref<Tag[]>([])
const showFilter = ref(false)
const tagsFilter = ref<Tag[]>([])

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
  notes.value = await noteStore.indexNotes()
  tags.value = await noteStore.indexTags()
})

</script>

<template>
  <base-page
    id="notes"
    title="Notes">
    <v-row justify="center">
      <v-col md="8">
        <base-btn
          v-for="option in options"
          :key="option.label"
          class="mx-1"
          :color="option.color"
          :to="option.to"
          @click="option.action">
          <v-icon
            v-if="option.icon"
            :icon="option.icon"
            class="mr-1" />
          {{ option.label }}
        </base-btn>
      </v-col>

      <v-col
        cols="12"
        md="8">
        <v-row
          v-for="note in getNotes"
          :key="note._id">
          <v-col>
            <NoteCard
              :note="note"
              :admin-mode="authStore.isLoggedIn" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>

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
