<script setup lang="ts">
import type { ActionItem } from "~/types";
import { useGeneralStore } from "~/stores/app";

const title = ref<string>("Personal Website - Oliverrr");
const description = ref<string>("Welcome! My name is Oliver and I like to build stuff and solve problems!");

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
});

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

    <main class="mt-4 flex flex-col min-h-screen md:w-10/12">
      <NuxtPage />
    </main>

    <app-footer class="w-full md:w-10/12" />
  </div>
</template>
