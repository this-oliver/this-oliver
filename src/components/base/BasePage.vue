<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    defualt: undefined
  }
});
</script>

<template>
  <div class="flex flex-col gap-4 md:items-center md:justify-center pb-2 px-2">
    <slot name="title">
      <div v-if="props.title" class="w-full md:w-auto">
        <h1 class="text-2xl font-bold">
          {{ props.title }}
        </h1>
      </div>
    </slot>

    <slot id="content" class="w-full flex flex-col items-center" />
  </div>
</template>
