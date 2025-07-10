<script setup lang="ts">
import type { ActionItem, Experience } from "~/types";
import { h } from "vue";
import ExperienceCard from "~/components/cards/ExperienceCard.vue";
import { useRouterQuery } from "~/composables/useRouterQuery";
import { useExperienceStore } from "~/stores/experience-store";

const pageTitle = "Experiences - oliverrr";
const pageDescription = "A collection of experiences";

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogSiteName: "oliverrr's personal website"
});

const query = useRouterQuery();
const experienceStore = useExperienceStore();

const { data, status } = useAsyncData("experiences", async () => {
  return await experienceStore.indexExperiences();
});

const isLoading = computed<boolean>(() => status.value === "pending");

const options = computed<ActionItem[]>(() => {
  return [
    {
      label: "Education",
      color: experienceStore.filter.education ? "education" : "secondary",
      action: () => {
        experienceStore.filter.education = !experienceStore.filter.education;
      }
    },
    {
      label: "Work",
      color: experienceStore.filter.work ? "job" : "secondary",
      action: () => {
        experienceStore.filter.work = !experienceStore.filter.work;
      }
    },
    {
      label: "Projects",
      color: experienceStore.filter.projects ? "project" : "secondary",
      action: () => {
        experienceStore.filter.projects = !experienceStore.filter.projects;
      }
    }
  ];
});

const getExperiences = computed<Experience[]>(() => {
  if (!data.value) {
    return [];
  }

  return data.value.filter((experience) => {
    if (!experienceStore.filter.education && !experienceStore.filter.projects && !experienceStore.filter.work) {
      return true;
    } else if (experience.type === "education") {
      return experienceStore.filter.education;
    } else if (experience.type === "job") {
      return experienceStore.filter.work;
    } else if (experience.type === "project") {
      return experienceStore.filter.projects;
    } else {
      return true;
    }
  });
});

const components = computed(() => {
  return getExperiences.value.map((experience) => {
    // return a NoteCard component with the note prop set to the note
    return h(ExperienceCard, { experience });
  });
});

/**
 * returns all filters that are active
 */
const activeExperienceTypes = computed<string[]>(() => {
  const types: string[] = [];

  if (experienceStore.filter.education) {
    types.push("education");
  }

  if (experienceStore.filter.work) {
    types.push("work");
  }

  if (experienceStore.filter.projects) {
    types.push("projects");
  }

  return types;
});

// watch filters and update the url query
watch(
  () => activeExperienceTypes.value,
  async (newValue) => {
    if (newValue.length > 0) {
      await query.add("filter", newValue.join(","));
    } else {
      await query.remove("filter");
    }
  }
);

onMounted(async () => {
  // set filters from url query
  if (query.has("filter")) {
    const queryFilter: string = query.get("filter");

    if (queryFilter && queryFilter.length >= 0) {
      experienceStore.filter.education = queryFilter.includes("education");
      experienceStore.filter.work = queryFilter.includes("work");
      experienceStore.filter.projects = queryFilter.includes("projects");
    }
  }
});
</script>

<template>
  <base-page title="Experiences">
    <v-row justify="center">
      <v-col lg="7">
        <base-list
          label="experiences"
          :options="options"
          :loading="isLoading"
          :components="components" />
      </v-col>
    </v-row>
  </base-page>
</template>
