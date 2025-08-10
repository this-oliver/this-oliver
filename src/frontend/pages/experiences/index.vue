<script setup lang="ts">
import type { Experience } from "~/types";
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

const { data, status } = await useAsyncData("experiences", async () => {
  return await experienceStore.indexExperiences();
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

const getFilters = computed<{ label: string, color?: string, active: boolean, toggle: () => void }[]>(() => {
  return [
    {
      label: "Education",
      active: experienceStore.filter.education,
      color: "bg-green-500",
      toggle: () => {
        experienceStore.filter.education = !experienceStore.filter.education;
      }
    },
    {
      label: "Work",
      color: "bg-blue-500",
      active: experienceStore.filter.work,
      toggle: () => {
        experienceStore.filter.work = !experienceStore.filter.work;
      }
    },
    {
      label: "Projects",
      color: "bg-yellow-500",
      active: experienceStore.filter.projects,
      toggle: () => {
        experienceStore.filter.projects = !experienceStore.filter.projects;
      }
    }
  ];
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
  <base-page title="Experiences" class="w-full">
    <div class="w-full md:w-6/12 md:mx-auto flex flex-col gap-2">
      <div id="filter" class="flex gap-2">
        <base-btn
          v-for="filter in getFilters"
          :key="filter.label"
          :class="`${filter.active ? filter.color : ''}`"
          @click="filter.toggle()">
          {{ filter.label }}
        </base-btn>
      </div>

      <div v-if="status === 'error'">
        <error-card message="An error occurred while fetching experiences. Please try again later." />
      </div>

      <div v-else-if="status === 'pending'">
        Fetching experiences...
      </div>

      <div v-else-if="getExperiences.length === 0">
        <span v-if="activeExperienceTypes.length > 0">
          No experiences found for the selected filters.
        </span>
        <span v-else>
          No experiences found.
        </span>
      </div>

      <div v-else-if="getExperiences.length > 0" id="list" class="flex flex-col gap-4">
        <ExperienceCard
          v-for="experience in getExperiences"
          :key="experience._id"
          :experience="experience" />
      </div>
    </div>
  </base-page>
</template>
