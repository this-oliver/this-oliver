<script setup lang="ts">
import { useGeneralStore } from "~/stores/app";

const route = useRoute();
const generalStore = useGeneralStore();

function isCurrentRoute(to: string): boolean {
  return route.fullPath.includes(to);
}
</script>

<template>
  <div class="relative flex items-center md:justify-between gap-4">
    <!-- Menu icon: absolutely positioned on small screens, normal on md+ -->
    <icon
      name="mdi:menu"
      class="text-3xl md:hidden absolute left-0 top-1/2 -translate-y-1/2 z-10"
      @click="generalStore.toggleSidebar()" />

    <!-- Centered Nuxt link on small screens, normal on md+ -->
    <nuxt-link
      to="/"
      class="text-3xl font-bold mx-auto md:mx-0">
      Oliverrr
    </nuxt-link>

    <div class="hidden md:flex gap-4 text-lg">
      <div
        v-for="option in generalStore.getNavItems"
        :key="option.label"
        :class="`${option.to && isCurrentRoute(option.to) ? 'underline' : ''} text-xl cursor-pointer hover:underline`">
        <nuxt-link v-if="option.to" :to="option.to">
          {{ option.label }}
        </nuxt-link>
        <span v-else @click="option.action">
          {{ option.label }}
        </span>
      </div>
    </div>
  </div>
</template>
