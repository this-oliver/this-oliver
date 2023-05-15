<script setup lang="ts">
import { computed } from 'vue'

const { dark, toggleTheme } = useTheme()

const props = defineProps({
  sidebarMode: {
    type: Boolean,
    default: false
  }
})

const icon = computed<string>(() => {
  return dark.value ? 'mdi-white-balance-sunny' : 'mdi-weather-night'
})
</script>

<template>
  <h2 v-if="props.sidebarMode">
    <v-icon
      style="margin-right: 1rem;"
      :icon="icon" />

    <base-btn
      text
      @click="toggleTheme">
      Theme
    </base-btn>
  </h2>

  <base-btn
    v-else
    class="mx-1"
    plain
    @click="toggleTheme">
    <v-icon :icon="icon" />
  </base-btn>
</template>
