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
    <nuxt-link :to="`/notes/${props.note.slug}`">
      <client-only>
        <RothkoCard
          :source="props.note.title"
          class="flex h-[6rem]" />
      </client-only>

      <p>{{ noteDate }}</p>

      <h3 class="font-bold text-xl">
        {{ props.note.title }}
      </h3>
    </nuxt-link>
  </base-card>
</template>
