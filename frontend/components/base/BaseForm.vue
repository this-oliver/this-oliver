<script setup lang="ts">
import type { ActionItem } from '~/types'

const props = defineProps({
  options: {
    type: Object as PropType<ActionItem[]>
  }
})
</script>

<template>
  <v-sheet color="surface">
    <v-row justify="center">
      <v-col cols="10">
        <slot name="options">
          <base-btn
            v-for="option in props.options"
            :key="option.label"
            class="mx-1"
            :color="option.color"
            small
            :to="option.to"
            @click="option.action">
            {{ option.label }}
          </base-btn>
        </slot>
      </v-col>

      <v-col cols="10">
        <slot />
      </v-col>
    </v-row>
  </v-sheet>
</template>
