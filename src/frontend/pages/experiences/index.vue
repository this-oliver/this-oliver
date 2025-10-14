<script setup lang="ts">
import type { Experience, ExperienceType } from "~/types";
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

/**
 * Returns a list of filtered, sorted and unique experiences
 */
const getProcessedExperiences = computed<Experience[]>(() => {
  // filter
  let processedExperiences = experiences.value.filter((experience) => {
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

  // sort
  processedExperiences = sortLatestExperiencesByDate(processedExperiences);

  // remove duplicates
  return processedExperiences.filter((experience, index, self) =>
    index === self.findIndex(e => (
      e._id === experience._id
    ))
  );
});

const getActiveExperienceTypes = computed<ExperienceType[]>(() => {
  const types: ExperienceType[] = [];

  if (filter.education) {
    types.push("education");
  }

  if (filter.work) {
    types.push("job");
  }

  if (filter.projects) {
    types.push("project");
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

    if (a.endDate === null || a.endDate === undefined) {
      return -1;
    } else if (b.endDate === null || b.endDate === undefined) {
      return 1;
    } else {
      return 0;
    }
  });

  return xp;
}

async function fetchExperiences(type?: ExperienceType): Promise<void> {
  // stop fetching if we are already on the last page
  if (pagination.currentPage > pagination.totalPages) {
    return;
  }

  // only fetch from a specific type if provided
  if (type) {
    const newExperiences = await $fetch(`/api/experiences?type=${type}`);
    experiences.value.push(...newExperiences.experiences);
  } else {
    pagination.currentPage = pagination.currentPage + 1;
    const newExperiences = await $fetch(`/api/experiences?page=${pagination.currentPage}`);
    experiences.value.push(...newExperiences.experiences);
  }
}

/**
 * Try to fetch more experiences for the selected types if none are available
 */
async function hydrateExperiences(): Promise<void> {
  if (getProcessedExperiences.value.length === 0) {
    getActiveExperienceTypes.value.forEach(async (type) => {
      if (getProcessedExperiences.value.filter(xp => xp.type === type).length === 0) {
        await fetchExperiences(type);
      }
    });
  }
}

// watch filters and update the url query and fetch experiences
watch(
  () => getActiveExperienceTypes.value,
  async (newTypes: ExperienceType[]) => {
    if (newTypes.length > 0) {
      await query.add("filter", newTypes.join(","));
      await hydrateExperiences();
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

  await hydrateExperiences();

  // add event listener for scroll to fetch more notes
  window.addEventListener("scroll", () => {
    scrollYPosition.value = window.scrollY;
    const scrollPosition = window.innerHeight + scrollYPosition.value;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= documentHeight - 100 && status.value !== "pending" && !loading.value) {
      loading.value = true;
      fetchExperiences()
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

      <div v-else-if="getProcessedExperiences.length === 0">
        <span v-if="getActiveExperienceTypes.length > 0">
          No experiences found for the selected filters.
        </span>
        <span v-else>
          No experiences found.
        </span>
      </div>

      <div v-else-if="getProcessedExperiences.length > 0" id="list" class="flex flex-col gap-4">
        <ExperienceCard
          v-for="experience in getProcessedExperiences"
          :key="experience._id"
          :experience="experience" />
      </div>
    </div>
  </base-page>
</template>
