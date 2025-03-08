<script setup lang="ts">
import type { User } from "~/types";
import { useAuthStore } from "~/stores/auth-store";
import { useUserStore } from "~/stores/user-store";

const DEFAULT_DESCRIPTION = "# 👋\n\nWelcome to my digital workshop, where I am constantly learning how to make things work. I use this space to document what I learn and the cool stuff I come up with. \n\nIf anything sparks your interest or if you have any questions, don't hesitate to reach out via [hello@oliverrr.net](mailto:hello@oliverrr.net). I'm always open to collaboration or an exchange of ideas.";

const authStore = useAuthStore();

const user = ref<User>();

onMounted(async () => {
  const userStore = useUserStore();
  user.value = await userStore.getUser();
});

const pageTitle = "What's cooking? - oliverrr";
const pageDescription = "A quick overview of what I'm up to right now.";
useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogSiteName: "oliverrr's personal website"
});
</script>

<template>
  <base-page>
    <v-row justify="center">
      <v-col md="8">
        <base-btn
          v-if="authStore.isLoggedIn"
          color="primary"
          to="/profile/edit">
          Edit
        </base-btn>
        <markdown-card
          id="welcome-banner"
          :markdown="user?.status || DEFAULT_DESCRIPTION"
          disable-anchors />
      </v-col>
    </v-row>
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
