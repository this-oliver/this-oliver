<script setup lang="ts">
import type { ActionItem } from '~/types';

const props = defineProps({
	options: {
		type: Array as PropType<ActionItem[]>,
		default: () => []
	}
});
</script>

<template>
  <v-sheet color="surface">
    <slot name="options">
      <v-row
        v-if="props.options?.length > 0"
        justify="center">
        <v-col
          v-for="option in props.options"
          :key="option.label"
          class="mx-1"
          cols="auto">
          <base-btn
            :color="option.color"
            :to="option.to"
            @click="option.action">
            {{ option.label }}
          </base-btn>
        </v-col>
      </v-row>
    </slot>

    <v-row justify="center">
      <v-col cols="10">
        <slot />
      </v-col>
    </v-row>
  </v-sheet>
</template>
