<script setup lang="ts">
const props = defineProps({
  message: {
    type: String,
    default: undefined
  },
  redirect: {
    type: String,
    default: "/"
  }
});
</script>

<template>
  <div class="flex flex-col gap-2 items-center">
    <img
      src="https://media4.giphy.com/media/QMHoU66sBXqqLqYvGO/giphy.gif"
      alt="Meme of a dog in a burning room saying 'This is fine'"
      width="100%"
      class="mt-2">

    <slot>
      <h2 class="text-lg font-semibold text-center">
        {{ props.message || "An error occurred" }}
      </h2>
    </slot>

    <slot name="actions">
      <base-btn :to="props.redirect" class="bg-red-400">
        Return Home
      </base-btn>
    </slot>
  </div>
</template>
