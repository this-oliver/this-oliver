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

const coordY = ref<number>(0);
const showScrollUpBtn = ref<boolean>(false);

function handleScroll() {
  showScrollUpBtn.value = false;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

watch(coordY, (newCoordY) => {
  showScrollUpBtn.value = window && newCoordY > window.innerHeight + 250;
});

onMounted(() => {
  if (window) {
    window.addEventListener("scroll", () => {
      coordY.value = window.window.scrollY;
    });
  }
});
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

    <main class="mt-4 flex flex-col min-h-screen w-full md:w-10/12">
      <NuxtPage />
    </main>

    <div
      v-if="showScrollUpBtn"
      class="fixed bottom-10 right-10 cursor-pointer text-4xl"
      @click="handleScroll">
      <icon name="mdi-arrow-up" />
    </div>

    <app-footer class="w-full md:w-10/12" />
  </div>
</template>
