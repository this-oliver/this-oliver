<script setup lang="ts">
import type { PropType } from "vue";
import type { Experience } from "~/types";

const props = defineProps({
  experience: {
    type: Object as PropType<Experience>,
    required: true
  }
});

const experienceColor = computed<string | undefined>(() => {
  switch (props.experience.type) {
    case "education":
      return "green";

    case "job":
      return "blue";

    case "project":
      return "yellow";

    default:
      return undefined;
  }
});

function isEmpty(text: any): boolean {
  if (typeof text === "string") {
    return text.trim() === "";
  }

  return text === null || text === undefined;
}
</script>

<template>
  <base-card>
    <client-only>
      <RothkoCard
        :source="props.experience.title"
        :color="experienceColor"
        pattern="circle"
        class="flex h-[6rem]" />
    </client-only>

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
