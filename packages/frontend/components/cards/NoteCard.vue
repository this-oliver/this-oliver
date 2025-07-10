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
  <base-card
    class="note-card brutalist-outline pa-2 pa-md-1"
    :outlined="true">
    <!-- Only show RothkoCard in browser -->
    <template v-if="isBrowser && RothkoCard">
      <component :is="RothkoCard" :source="props.note.title" />
    </template>

    <p>{{ noteDate }}</p>

    <RouterLink
      class="plain"
      :to="`/notes/${props.note.slug}`">
      <h2>{{ props.note.title }}</h2>
    </RouterLink>
  </base-card>
</template>

<style scoped>
createdAt .note-card-options {
  height: 100px;
  width: 100%;
  padding: 1rem;
  border-radius: 5px 5px 0px 0px;
}

@media (min-width: 600px) {
  .note-card {
    max-height: 250px;
  }
}
</style>
