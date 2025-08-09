<script setup lang="ts">
const props = defineProps({
  to: {
    type: String,
    default: null
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(["click"]);
</script>

<template>
  <nuxt-link
    v-if="props.to"
    :class="`${props.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} p-2 brutalist-outline`"
    :to="props.to">
    <slot />
  </nuxt-link>

  <div
    v-else
    :class="`${props.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} p-2 brutalist-outline`"
    @click="props.disabled ? null : emit('click')">
    <slot />
  </div>
</template>
