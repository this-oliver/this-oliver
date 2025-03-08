<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  sidebarMode: {
    type: Boolean,
    default: false
  }
});

const { dark, toggleTheme } = useTheme();

const icon = computed<string>(() => {
  return dark.value ? "mdi-white-balance-sunny" : "mdi-weather-night";
});
</script>

<template>
  <div v-if="props.sidebarMode">
    <v-icon
      style="margin-right: 1rem;"
      :icon="icon" />

    <base-btn
      text
      @click="toggleTheme">
      Theme
    </base-btn>
  </div>

  <base-btn
    v-else
    class="mx-1"
    plain
    @click="toggleTheme">
    <v-icon :icon="icon" />
  </base-btn>
</template>
