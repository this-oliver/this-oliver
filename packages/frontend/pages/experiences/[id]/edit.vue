<script setup lang="ts">
import type { Experience } from "~/types";
import { useExperienceStore } from "~/stores/experience-store";

definePageMeta({ middleware: ["auth"] });

const route = useRoute();
const experienceStore = useExperienceStore();

const experience = ref<Experience | null>(null);

onMounted(async () => {
  experience.value = await experienceStore.getExperience(route.params.id as string);
});
</script>

<template>
  <base-page title="Update Experience">
    <experience-form
      v-if="experience"
      :experience="experience"
      :edit-mode="true" />

    <v-skeleton-loader
      v-else
      class="mx-auto"
      type="list-item-three-line" />
  </base-page>
</template>
