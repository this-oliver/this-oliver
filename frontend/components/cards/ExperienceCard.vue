<script setup lang="ts">
import type { PropType } from 'vue'
import type { ActionItem, Experience } from '~/types'

const props = defineProps({
  experience: {
    type: Object as PropType<Experience>,
    required: true
  },
  adminMode: {
    type: Boolean,
    default: false
  }
})

const experienceColor = computed<string>(() => {
  switch (props.experience.type) {
    case 'education':
      return 'education'

    case 'job':
      return 'job'

    case 'project':
      return 'project'

    default:
      return 'other'
  }
})

const experienceEmoji = computed<string>(() => {
  switch (props.experience.type) {
    case 'job':
      return '💼'
    case 'education':
      return '🎓'
    case 'project':
      return '🧪'
    default:
      return '🤷‍♂️'
  }
})

const experienceOptions = computed<ActionItem[]>(() => {
  return [
    { label: 'Edit', icon: 'mdi-pencil', to: `/experiences/${props.experience._id}/edit` }
  ]
})
</script>

<template>
  <base-card
    class="brutalist-outline pa-2 pa-md-1"
    :outlined="true">
    <color-card :color="experienceColor">
      <v-row
        v-if="props.adminMode"
        justify="end"
        no-gutters>
        <v-col
          v-for="option in experienceOptions"
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

    <v-row
      no-gutters
      justify="space-between">
      <v-col cols="auto">
        <p>{{ props.experience.startYear }} - {{ props.experience.endYear || 'present' }}</p>
      </v-col>
      <v-col
        cols="auto"
        class="experience-meta mr-2">
        <p>{{ experienceEmoji }}</p>
      </v-col>
    </v-row>

    <h2>{{ props.experience.title }}</h2>
    <h3>{{ props.experience.org }}</h3>
    <markdown-card :markdown="props.experience.description" />
  </base-card>
</template>

<style>
h1 h2 h3 {
  margin: 0;
  padding: 0.15rem 0;
}

.experience-meta {
  /* large font */
  font-size: 1.5rem;
}
</style>
