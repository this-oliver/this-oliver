<script setup lang="ts">

const props = defineProps({
  title: {
    type: String,
    defualt: undefined
  }
})
</script>

<template>
  <v-row
    class="pa-1"
    justify="center"
    no-gutters>
    <v-col
      v-if="props.title"
      class="text-center">
      <h1>{{ props.title }}</h1>
    </v-col>

    <v-divider class="border-opacity-0" />

    <v-col class="mt-2">
      <slot />
    </v-col>
  </v-row>
</template>
