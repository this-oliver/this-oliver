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

function getPrettyDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, { year: "numeric", month: "short" });
}
</script>

<template>
  <base-card>
    <client-only>
      <div class="overflow-hidden">
        <RothkoCard
          :source="props.experience.title"
          :color="experienceColor"
          pattern="circle"
          class="flex h-[6rem]" />
      </div>
    </client-only>

    <p>
      {{ getPrettyDate(props.experience.startDate) }} - {{ props.experience.endDate ? getPrettyDate(props.experience.endDate) : 'present' }}
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
