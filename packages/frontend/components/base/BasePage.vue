<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    defualt: undefined
  }
});
</script>

<template>
  <div class="flex flex-col gap-4 items-center justify-center p-4">
    <div id="title">
      <slot name="title">
        <h1 v-if="props.title" class="text-2xl font-bold">
          {{ props.title }}
        </h1>
      </slot>
    </div>

    <div id="content" class="w-full flex flex-col items-center">
      <slot />
    </div>
  </div>
</template>
