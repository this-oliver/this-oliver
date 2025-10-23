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
        id="welcome-banner"
        :markdown="data?.about ?? DEFAULT_DESCRIPTION"
        disable-anchors
        class="md:w-8/12 md:mt-[15vh]" />
    </div>
  </base-page>
</template>

<style>
#welcome-banner {
  font-size: 1.25rem;
}

@media (min-width: 768px) {
  #welcome-banner {
    font-size: 1.5rem;
  }
}
</style>
