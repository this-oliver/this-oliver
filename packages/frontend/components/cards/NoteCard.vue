<script setup lang="ts">
import type { PropType } from "vue";
import type { Note } from "~/types";
import { computed, onMounted, ref } from "vue";

const props = defineProps({
  note: {
    type: Object as PropType<Note>,
    required: true
  }
});

const { formatDate } = useTime();
const noteDate = computed<string>(() => formatDate(props.note.createdAt));

const isBrowser = ref(false);
const RothkoCard = ref<any>(null);

onMounted(async () => {
  isBrowser.value = typeof window !== "undefined";
  if (isBrowser.value) {
    RothkoCard.value = (await import("rothko-js")).RothkoCard;
  }
});
</script>

<template>
  <base-card>
    <nuxt-link :to="`/notes/${props.note.slug}`">
      <!-- Only show RothkoCard in browser -->
      <template v-if="isBrowser && RothkoCard">
        <component :is="RothkoCard" class="h-24" :source="props.note.title" />
      </template>

      <p>{{ noteDate }}</p>

      <h3 class="font-bold text-xl">
        {{ props.note.title }}
      </h3>
    </nuxt-link>
  </base-card>
</template>
