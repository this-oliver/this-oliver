<script setup lang="ts">
import type { ActionItem, Experience } from "~/types";
import { h } from "vue";
import ExperienceCard from "~/components/cards/ExperienceCard.vue";
import { useRouterQuery } from "~/composables/useRouterQuery";
import { useAuthStore } from "~/stores/auth-store";
import { useExperienceStore } from "~/stores/experience-store";

const query = useRouterQuery();
const authStore = useAuthStore();
const experienceStore = useExperienceStore();

const experiences = ref<Experience[]>([]);
const loading = ref<boolean>(false);

const filter = reactive({
  projects: false,
  education: false,
  work: false
});

const options = computed<ActionItem[]>(() => {
  let base: ActionItem[] = [
    {
      label: "Education",
      color: filter.education ? "education" : "secondary",
      action: () => {
        filter.education = !filter.education;
      }
    },
    {
      label: "Work",
      color: filter.work ? "job" : "secondary",
      action: () => {
        filter.work = !filter.work;
      }
    },
    {
      label: "Projects",
      color: filter.projects ? "project" : "secondary",
      action: () => {
        filter.projects = !filter.projects;
      }
    }
  ];

  if (authStore.isLoggedIn) {
    base = [
      ...base,
      {
        label: "Create xP",
        color: "primary",
        icon: "mdi-plus",
        to: "/experiences/create"
      }
    ];
  }

  return base;
});

const getExperiences = computed<Experience[]>(() => {
  return experiences.value.filter((experience) => {
    if (!filter.education && !filter.projects && !filter.work) {
      return true;
    } else if (experience.type === "education") {
      return filter.education;
    } else if (experience.type === "job") {
      return filter.work;
    } else if (experience.type === "project") {
      return filter.projects;
    } else {
      return true;
    }
  });
});

const components = computed(() => {
  return getExperiences.value.map((experience) => {
    // return a NoteCard component with the note prop set to the note
    return h(ExperienceCard, { experience, adminMode: authStore.isLoggedIn });
  });
});

/**
 * returns all filters that are active
 */
const activeExperienceTypes = computed<string[]>(() => {
  const types: string[] = [];

  if (filter.education) {
    types.push("education");
  }

  if (filter.work) {
    types.push("work");
  }

  if (filter.projects) {
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
  loading.value = true;
  experiences.value = await experienceStore.indexExperiences();
  loading.value = false;

  // set filters from url query
  if (query.has("filter")) {
    const queryFilter: string = query.get("filter");

    if (queryFilter && queryFilter.length >= 0) {
      filter.education = queryFilter.includes("education");
      filter.work = queryFilter.includes("work");
      filter.projects = queryFilter.includes("projects");
    }
  }
});

const pageTitle = "Experiences - oliverrr";
const pageDescription = "A collection of experiences";
useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogSiteName: "oliverrr's personal website"
});
</script>

<template>
  <base-page title="Experiences">
    <v-row justify="center">
      <v-col lg="7">
        <base-list
          label="experiences"
          :options="options"
          :loading="loading"
          :components="components" />
      </v-col>
    </v-row>
  </base-page>
</template>
