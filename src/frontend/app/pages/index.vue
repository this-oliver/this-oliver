<script setup lang="ts">
const DEFAULT_DESCRIPTION = "Hello!";

const pageTitle = "What's cooking? - oliverrr";
const pageDescription = "A quick overview of what I'm up to right now.";
useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogSiteName: "oliverrr's personal website"
});

const { data } = await useAsyncData("welcome-banner", async () => {
  return await $fetch("/api/website");
});
</script>

<template>
  <base-page>
    <div class="flex items-center justify-center">
      <markdown-card
        class="mt-[10vh] md:mt-[15vh] md:w-8/12 text-2xl md:text-3xl"
        :markdown="data?.about ?? DEFAULT_DESCRIPTION"
        :disable-anchors="true" />
    </div>
  </base-page>
</template>
