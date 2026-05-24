<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();

const title = ref<string>(route.query.title as string || "Error");
const message = ref<string>(route.query.message as string);
const redirect = ref<string>(route.query.redirect as string || "/");
</script>

<template>
  <base-page :title="title">
    <div class="flex flex-col gap-4 items-center justify-center">
      <error-card v-if="message" :message="message" :redirect="redirect" />

      <error-card v-else :redirect="redirect">
        <p>Can't find a page that matches the <span class="font-mono underline">{{ route.path }}</span> path</p>
      </error-card>
    </div>
  </base-page>
</template>
