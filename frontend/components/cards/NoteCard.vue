<script setup lang="ts">
import type { PropType } from 'vue'
import type { Note, ActionItem } from '~/types'
import { useNoteStore } from '~/stores/note-store'

const props = defineProps({
  note: {
    type: Object as PropType<Note>,
    required: true
  },
  adminMode: {
    type: Boolean,
    default: false
  }
})

const { formatDate } = useTime()
const noteDate = computed<string>(() => formatDate(props.note.createdAt))

const noteOptions = computed<ActionItem[]>(() => {
  return [
    {
      label: 'Edit',
      icon: 'mdi-pencil',
      to: `/notes/${props.note.slug}/edit`
    },
    {
      label: props.note.publish === true ? 'Unpublish' : 'Publish',
      color: props.note.publish === true ? 'warning' : 'success',
      icon: props.note.publish === true ? 'mdi-eye-off' : 'mdi-eye',
      action: async () => {
        const noteStore = useNoteStore()
        const { notify } = useNotification()

        try {
          await noteStore.patchNote(props.note._id, {
            publish: !props.note.publish
          })

          notify(
            'Note updated successfully!',
            `Note ${props.note.publish === true ? 'unpublished' : 'published'}`,
            'success'
          )

          await noteStore.indexNotes()
        } catch (error) {
          const errorMessage = (error as Error).message
          notify(
            'Error updating note',
            errorMessage,
            'error'
          )
        }
      }
    }
  ]
})

</script>

<template>
  <BaseCard
    class="note-card brutalist-outline"
    :outlined="true">
    <color-card>
      <v-row
        v-if="props.adminMode"
        justify="end"
        no-gutters>
        <v-col
          v-for="option in noteOptions"
          :key="option.label"
          class="mx-1"
          cols="auto">
          <BaseBtn
            small
            :color="option.color"
            :to="option.to"
            @click="option.action">
            {{ option.label }}
          </BaseBtn>
        </v-col>
      </v-row>
    </color-card>
    <p>{{ noteDate }}</p>

    <RouterLink
      class="plain"
      :to="`/notes/${props.note.slug}`">
      <h2>{{ props.note.title }}</h2>
    </RouterLink>
  </BaseCard>
</template>

<style scoped>
createdAt .note-card-options {
  height: 100px;
  width: 100%;
  padding: 1rem;
  border-radius: 5px 5px 0px 0px;
}

@media (min-width: 600px) {
  .note-card {
    max-height: 250px;
  }
}
</style>
