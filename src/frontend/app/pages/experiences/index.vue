<script setup lang="ts">
import type { Experience } from "~/types";
import { useRouterQuery } from "~/composables/useRouterQuery";

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

const { data, status } = await useAsyncData("experiences", async () => {
  const { experiences, currentPage, totalPages } = await $fetch("/api/experiences");

  return {
    experiences,
    pagination: {
      currentPage,
      totalPages
    }
  };
});

const experiences = ref<Experience[]>(data.value?.experiences || []);
const loading = ref(false);
const scrollYPosition = ref(0);

const pagination = reactive({
  currentPage: data.value?.pagination.currentPage || 1,
  totalPages: data.value?.pagination.totalPages || 1
});

const filter = reactive({
  projects: false,
  education: false,
  work: false
});

const getExperiences = computed<Experience[]>(() => {
  if (!data.value) {
    return [];
  }

  const filteredExperiences = experiences.value.filter((experience) => {
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

  return sortLatestExperiencesByDate(filteredExperiences);
});

const getFilterOptions = computed<{ label: string, color?: string, active: boolean, toggle: () => void }[]>(() => {
  return [
    {
      label: "Education",
      active: filter.education,
      color: "bg-green-500",
      toggle: () => {
        filter.education = !filter.education;
      }
    },
    {
      label: "Work",
      color: "bg-blue-500",
      active: filter.work,
      toggle: () => {
        filter.work = !filter.work;
      }
    },
    {
      label: "Projects",
      color: "bg-yellow-500",
      active: filter.projects,
      toggle: () => {
        filter.projects = !filter.projects;
      }
    }
  ];
});

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

function sortLatestExperiencesByDate(experiences: Experience[]) {
  let xp = [...experiences];

  xp = xp.sort((a, b) => {
    // sort experiences by start date:
    // experiences with the latest start year should be at the beginning of the array

    if (a.startDate > b.startDate) {
      return -1;
    } else if (a.startDate < b.startDate) {
      return 1;
    } else {
      return 0;
    }
  });

  xp = xp.sort((a, b) => {
    // sort experiences by end date:
    // experiences with the latest end year should be at the beginning of the array

    if (a.endDate > b.endDate) {
      return -1;
    } else if (a.endDate < b.endDate) {
      return 1;
    } else {
      return 0;
    }
  });

  xp = xp.sort((a, b) => {
    // sort experiences by context:
    // experiences with an empty end year (null or 'present') should be at the beginning of the array

    if (a.endDate === null || a.endDate === undefined || a.endDate === 0) {
      return -1;
    } else if (b.endDate === null || b.endDate === undefined || b.endDate === 0) {
      return 1;
    } else {
      return 0;
    }
  });

  return xp;
}

async function fetchMoreExperiences(): Promise<void> {
  if (pagination.currentPage > pagination.totalPages) {
    return;
  }

  pagination.currentPage = pagination.currentPage + 1;
  const newExperiences = await $fetch(`/api/experiences?page=${pagination.currentPage}`);
  experiences.value.push(...newExperiences.experiences);
}

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
      filter.education = queryFilter.includes("education");
      filter.work = queryFilter.includes("work");
      filter.projects = queryFilter.includes("projects");
    }
  }

  // add event listener for scroll to fetch more notes
  window.addEventListener("scroll", () => {
    scrollYPosition.value = window.scrollY;
    const scrollPosition = window.innerHeight + scrollYPosition.value;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= documentHeight - 100 && status.value !== "pending" && !loading.value) {
      loading.value = true;
      fetchMoreExperiences()
        .finally(() => {
          loading.value = false;
        });
    }
  });
});
</script>

<template>
  <base-page title="Experiences" class="w-full">
    <div class="w-full md:w-6/12 md:mx-auto flex flex-col gap-2">
      <div id="filter" class="flex gap-2">
        <base-btn
          v-for="option in getFilterOptions"
          :key="option.label"
          :class="`${option.active ? option.color : ''}`"
          @click="option.toggle()">
          {{ option.label }}
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
