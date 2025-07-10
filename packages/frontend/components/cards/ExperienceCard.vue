<script setup lang="ts">
import type { PropType } from "vue";
import type { Experience } from "~/types";
import { computed, onMounted, ref } from "vue";

const props = defineProps({
  experience: {
    type: Object as PropType<Experience>,
    required: true
  }
});

const experienceColor = computed<string>(() => {
  switch (props.experience.type) {
    case "education":
      return "education";

    case "job":
      return "job";

    case "project":
      return "project";

    default:
      return "other";
  }
});

function isEmpty(text: any): boolean {
  if (typeof text === "string") {
    return text.trim() === "";
  }

  return text === null || text === undefined;
}

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
    id="experience-card"
    class="brutalist-outline pa-2 pa-md-1"
    :outlined="true">
    <!-- Only show RothkoCard in browser -->
    <template v-if="isBrowser && RothkoCard">
      <component
        :is="RothkoCard"
        :source="props.experience.title"
        :color="experienceColor"
        pattern="circle" />
    </template>

    <p>{{ props.experience.startYear }} - {{ props.experience.endYear || 'present' }}</p>
    <h4 v-if="!isEmpty(props.experience.org)">
      {{ props.experience.org }}
    </h4>
    <h2>{{ props.experience.title }}</h2>
    <markdown-card :markdown="props.experience.description" />

    <span v-if="props.experience.link">
      <a
        :href="props.experience.link"
        target="_blank">
        <v-icon
          icon="mdi-link-variant"
          size="small" />
        {{ props.experience.link }}
      </a>
    </span>

    <span v-if="props.experience.image">
      <a
        :href="props.experience.image"
        target="_blank">
        <v-icon
          icon="mdi-image-frame"
          size="small" />
        Preview
      </a>
    </span>
  </base-card>
</template>

<style>
h1, h2, h3, h4 {
  margin: 0;
  padding: 0.1rem 0;
}
</style>
