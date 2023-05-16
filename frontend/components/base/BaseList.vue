<script setup lang="ts">
import { h } from 'vue'
import BaseCard from './BaseCard.vue'
import BaseImage from './BaseImage.vue'
import { ActionItem } from '~/types'

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  components: {
    type: Array as PropType<Component[]>,
    required: true
  },
  options: {
    type: Array as PropType<ActionItem[]>,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const OopsCard = function (mode: 'missing' | 'fetching'): Component {
  return h(BaseCard, { class: 'text-center pa-2', color: 'transparent' }, [
    h('h2', { class: 'mt-2' },
      // return a different message depending on the mode
      mode === 'fetching'
        ? [
            'Fetching ',
            h('span', { class: 'label text-primary' }, props.label),
            '...'
          ]
        : [
            'No ',
            h('span', { class: 'label text-primary' }, props.label),
            ' found'
          ]
    ),

    h(BaseImage, {
      src: 'https://media.npr.org/assets/img/2023/01/14/this-is-fine_custom-dcb93e90c4e1548ffb16978a5a8d182270c872a9-s1600-c85.webp',
      alt: "Meme of a dog in a burning room saying 'This is fine'",
      width: '100%',
      class: 'mt-2'
    })
  ])
}

</script>

<template>
  <v-row justify="center">
    <v-col
      v-if="props.options"
      md="8">
      <base-btn
        v-for="option in props.options"
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
      v-if="props.loading"
      cols="12"
      md="8">
      <component
        :is="OopsCard('fetching')" />

      <v-progress-linear
        color="primary"
        indeterminate />
    </v-col>

    <v-col
      v-else-if="props.components.length === 0"
      cols="12"
      md="8">
      <component :is="OopsCard('missing')" />
    </v-col>

    <v-col
      v-for="(component, index) in props.components"
      :key="index"
      cols="12"
      md="8">
      <component :is="component" />
    </v-col>
  </v-row>
</template>

<style scoped>
.label {
  font-weight: bold;
  text-decoration: underline;
}
</style>
