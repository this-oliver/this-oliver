<script setup lang="ts">
import type { PropType } from "vue";
import type { ActionItem, Experience } from "~/types";
import { RothkoCard } from "rothko-js";

const props = defineProps({
  experience: {
    type: Object as PropType<Experience>,
    required: true
  },
  adminMode: {
    type: Boolean,
    default: false
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

const experienceOptions = computed<ActionItem[]>(() => {
  return [
    { label: "Edit", icon: "mdi-pencil", to: `/experiences/${props.experience._id}/edit` }
  ];
});

function isEmpty(text: any): boolean {
  if (typeof text === "string") {
    return text.trim() === "";
  }

  return text === null || text === undefined;
}
</script>

<template>
  <base-card
    id="experience-card"
    class="brutalist-outline pa-2 pa-md-1"
    :outlined="true">
    <RothkoCard
      :source="experience.title"
      :color="experienceColor"
      pattern="circle">
      <v-row
        v-if="props.adminMode"
        justify="end"
        no-gutters>
        <v-col
          v-for="option in experienceOptions"
          :key="option.label"
          class="mx-1"
          cols="auto">
          <BaseBtn
            small
            :color="option.color"
            :to="option.to"
            @click="option.action">
            {{ option.label }}
          </BaseBtn>
        </v-col>
      </v-row>
    </RothkoCard>

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
