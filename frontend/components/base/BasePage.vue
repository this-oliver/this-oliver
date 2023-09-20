<script setup lang="ts">

const props = defineProps({
	title: {
		type: String,
		defualt: undefined
	}
});
</script>

<template>
  <v-row
    id="base-page"
    class="pa-1"
    justify="center"
    no-gutters>
    <v-col
      v-if="props.title"
      class="text-center">
      <h1>{{ props.title }}</h1>
    </v-col>

    <v-divider class="border-opacity-0" />

    <v-col
      id="base-page-content"
      class="mt-1 mt-md-2">
      <slot />
    </v-col>
  </v-row>
</template>

<style scoped>
#base-page-content {
  padding-bottom: 3rem;
}
</style>
