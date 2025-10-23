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
  <base-card class="flex flex-col gap-1">
    <div class="overflow-hidden">
      <RothkoCard
        :source="props.experience.title + props.experience.org + props.experience.startDate"
        :color="experienceColor"
        pattern="circle"
        class="flex h-[6rem]" />
    </div>

    <div id="details" class="flex justify-between text-sm my-2 gap-2 flex-wrap">
      <span v-if="!isEmpty(props.experience.org)" class="font-semibold">
        {{ props.experience.org }}
      </span>
      <span>
        {{ getPrettyDate(props.experience.startDate) }} - {{ props.experience.endDate ? getPrettyDate(props.experience.endDate) : 'present' }}
      </span>
    </div>

    <span class="font-bold text-xl">
      {{ props.experience.title }}
    </span>

    <markdown-card :markdown="props.experience.description" />

    <div
      v-if="props.experience.link || props.experience.image"
      id="external-links"
      class="flex justify-between text-sm my-2 gap-2 flex-wrap">
      <a
        v-if="props.experience.link"
        :href="props.experience.link"
        target="_blank"
        class="flex items-center gap-1">
        <icon name="mdi-link-variant" />
        {{ props.experience.link }}
      </a>

      <a
        v-if="props.experience.image"
        :href="props.experience.image"
        target="_blank"
        class="flex items-center gap-1">
        <icon name="mdi-image-frame" />
        Preview
      </a>
    </div>
  </base-card>
</template>
