<script setup lang="ts">
import type { PropType } from 'vue'
import type { Note, ActionItem } from '~/types'

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
const notePublished = computed<boolean>(() => props.note.publish)
const noteOptions = computed<ActionItem[]>(() => {
  return [
    { label: 'Edit', icon: 'mdi-pencil', to: `/notes/${props.note.slug}/edit` },
    { label: notePublished ? 'Unpublish' : 'Publish', color: notePublished ? 'warning' : 'success', icon: notePublished ? 'mdi-eye-off' : 'mdi-eye' }
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
      class="plain text-primary"
      :to="`/notes/${props.note.slug}`">
      <h2>{{ props.note.title }}</h2>
    </RouterLink>
  </BaseCard>
</template>

<style scoped>createdAt
.note-card-options {
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
