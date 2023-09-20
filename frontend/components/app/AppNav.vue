<script setup lang="ts">
import { useDisplay } from 'vuetify';
import { useNavigationStore } from '~/stores/app/navigation-store';
import { useSidebarStore } from '~/stores/app/sidebar-store';

const drawer = useSidebarStore();
const navigation = useNavigationStore();
const { smAndDown } = useDisplay();

const routes = computed(() => !smAndDown.value ? navigation.options : []);

</script>

<template>
  <v-app-bar
    id="app-nav"
    app
    elevation="0">
    <v-app-bar-nav-icon
      v-if="smAndDown"
      @click="drawer.toggle" />

    <router-link
      class="plain"
      to="/">
      <h1>Oliverrr</h1>
    </router-link>

    <v-spacer v-if="!smAndDown" />

    <base-btn
      v-for="option in routes"
      :key="option.label"
      class="mx-2 plain"
      text
      :color="option.color"
      :to="option.to"
      @click="option.action">
      {{ option.label }}
    </base-btn>

    <app-theme
      v-if="!smAndDown"
      class="mx-1" />
  </v-app-bar>
</template>

<style scoped>
@media (min-width: 600px) {
  #app-nav {
    padding: 0 10rem;
  }
}
</style>
