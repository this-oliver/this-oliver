<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();

const title = ref<string>(route.query.title as string || "Error");
const message = ref<string>(route.query.message as string);
const redirect = ref<string>(route.query.redirect as string || "/");
</script>

<template>
  <base-page
    class="text-center"
    :title="title">
    <v-row
      justify="center"
      no-gutters>
      <v-col
        cols="11"
        md="6">
        <base-card color="transparent">
          <base-image
            src="https://media4.giphy.com/media/QMHoU66sBXqqLqYvGO/giphy.gif"
            lazy
            alt="A dog in a burning room saying 'this is fine'"
            width="100%"
            height="auto" />

          <h2 class="mt-2">
            <span v-if="message">{{ message }}</span>
            <span v-else>Can't find a page that matches the <code class="underline">{{ route.path }}</code> path</span>
          </h2>
        </base-card>
      </v-col>

      <v-divider class="border-opacity-0" />

      <v-col
        cols="8"
        md="4">
        <base-btn
          class="brutalist-outline"
          block
          outlined
          color="primary"
          :to="redirect">
          Go Back
        </base-btn>
      </v-col>
    </v-row>
  </base-page>
</template>
