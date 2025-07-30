<script setup lang="ts">
import type { PropType } from "vue";
import type { Note } from "~/types";

const props = defineProps({
  note: {
    type: Object as PropType<Note>,
    required: true
  }
});

const { formatDate } = useTime();
const noteDate = computed<string>(() => formatDate(props.note.createdAt));
</script>

<template>
  <base-card>
    <nuxt-link :to="`/notes/${props.note.slug}`" class="flex flex-col gap-2">
      <client-only>
        <RothkoCard
          :source="props.note.title"
          class="flex h-[6rem]" />
      </client-only>

      <div class="flex gap-1 items-center">
        <span class="mr-auto">{{ noteDate }}</span>

        <span
          v-for="tag in props.note.tags"
          :key="tag"
          class="px-2 py-1 rounded-full text-xs flex items-center bg-gray-200 text-gray-800">
          {{ tag }}
        </span>
      </div>

      <div class="font-bold text-xl">
        {{ props.note.title }}
      </div>
    </nuxt-link>
  </base-card>
</template>
