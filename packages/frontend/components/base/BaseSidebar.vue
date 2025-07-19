<script setup lang="ts">
import type { ActionItem } from "~/types";

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: false
  },
  show: {
    type: Boolean,
    default: false
  },
  position: {
    type: String as PropType<"left" | "right">,
    default: "left"
  },
  items: {
    type: Array as () => ActionItem[],
    default: () => [],
    required: false
  }
});

const emit = defineEmits(["close"]);

function getOptionColor(option: ActionItem): string {
  if (option.color) {
    return `text-${option.color}`;
  }

  return "";
}
</script>

<template>
  <div
    v-if="props.show"
    :id="props.id"
    :class="`${props.show ? '' : 'hidden'} ${props.position}-0 fixed flex flex-col gap-4 h-full`">
    <div class="flex items-center justify-between p-4 ">
      <slot name="label">
        <span class="text-3xl">{{ props.label }}</span>
      </slot>
      <base-btn class="bg-red-400 ml-auto" @click="emit('close')">
        Close
      </base-btn>
    </div>

    <slot>
      <div
        v-for="item in props.items"
        :key="item.label"
        :class="`text-lg ${getOptionColor(item)}`">
        <icon v-if="item.icon" :name="item.icon" />

        <base-btn
          text
          :to="item.to"
          @click="item.action">
          {{ item.label }}
        </base-btn>
      </div>
    </slot>
  </div>
</template>
