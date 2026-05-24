<script setup lang="ts">
import type { NuxtError } from "#app";
import type { ActionItem } from "~/types";
import { useGeneralStore } from "~/stores/app";

const props = defineProps({
  error: Object as () => NuxtError
});

const handleError = () => clearError({ redirect: "/" });

const generalStore = useGeneralStore();
const options = computed<ActionItem[]>(() => generalStore.getNavItems);
</script>

<template>
  <div class="flex flex-col items-center p-4 bg-grayish dark:bg-greenish dark:text-slate-200">
    <app-nav class="w-full md:w-10/12" />
    <base-sidebar
      id="app-sidebar"
      class="bg-grayish text-slate-800 w-11/12 md:w-3/12 left-0 top-0 flex flex-col gap-4 p-2 z-20"
      :show="generalStore.isSidebarVisible"
      :items="options"
      @close="generalStore.toggleSidebar" />

    <main class="mt-4 flex flex-col min-h-screen w-full md:w-10/12 items-center">
      <error-card>
        <h2 class="text-lg font-semibold text-center">
          {{ props.error?.statusCode || "Error" }} - {{ props.error?.statusMessage || "An error occurred" }}
        </h2>
        <template #actions>
          <base-btn class="bg-red-400" @click="handleError">
            <icon name="mdi-arrow-left" class="h-4 w-4 mr-1" />
            Return Home
          </base-btn>
        </template>
      </error-card>
    </main>

    <app-footer class="w-full md:w-10/12" />
  </div>
</template>
