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
      <div class="bg-red-400 flex flex-col items-center justify-center p-4">
        <img
          src="https://media4.giphy.com/media/QMHoU66sBXqqLqYvGO/giphy.gif"
          alt="A sad dog with a sad face"
          width="100%"
          height="auto">

        <div class="mt-2">
          <p v-if="message">
            {{ message }}
          </p>
          <p v-else>
            Can't find a page that matches the <code class="underline">{{ route.path }}</code> path
          </p>
        </div>
      </div>

      <base-btn :to="redirect">
        Go Back
      </base-btn>
    </div>
  </base-page>
</template>
