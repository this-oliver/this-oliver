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
    class="p-2 brutalist-outline"
    :class="`${props.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`"
    :to="props.to">
    <slot />
  </nuxt-link>

  <div
    v-else
    class="p-2 brutalist-outline"
    :class="`${props.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`"
    @click="props.disabled ? null : emit('click')">
    <slot />
  </div>
</template>
