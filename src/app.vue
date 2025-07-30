<script setup lang="ts">
const title = ref<string>("Personal Website - Oliverrr");
const description = ref<string>("Welcome! My name is Oliver and I like to build stuff and solve problems!");

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
});
</script>

<template>
  <div class="flex flex-col items-center p-4 bg-grayish dark:bg-greenish dark:text-slate-200">
    <app-nav class="w-full md:w-10/12" />
    <app-sidebar />

    <main class="mt-4 flex flex-col min-h-screen w-full md:w-10/12">
      <NuxtPage />
    </main>

    <app-footer class="w-full md:w-10/12" />
  </div>
</template>
