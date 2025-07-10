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
  <base-card>
    <!-- Only show RothkoCard in browser -->
    <template v-if="isBrowser && RothkoCard">
      <component
        :is="RothkoCard"
        :source="props.experience.title"
        :color="experienceColor"
        pattern="circle"
        class="h-24" />
    </template>

    <p>
      {{ props.experience.startYear }} - {{ props.experience.endYear || 'present' }}
    </p>

    <h4 v-if="!isEmpty(props.experience.org)">
      {{ props.experience.org }}
    </h4>

    <h3 class="font-bold text-xl">
      {{ props.experience.title }}
    </h3>

    <markdown-card :markdown="props.experience.description" />

    <span v-if="props.experience.link">
      <a
        :href="props.experience.link"
        target="_blank">
        <icon name="mdi-link-variant" />
        {{ props.experience.link }}
      </a>
    </span>

    <span v-if="props.experience.image">
      <a
        :href="props.experience.image"
        target="_blank">
        <icon name="mdi-image-frame" />
        Preview
      </a>
    </span>
  </base-card>
</template>
