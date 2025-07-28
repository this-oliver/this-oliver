<script setup lang="ts">
import { useGeneralStore } from "~/stores/app";

const route = useRoute();
const generalStore = useGeneralStore();

function isCurrentRoute(to: string): boolean {
  return route.fullPath.includes(to);
}
</script>

<template>
  <div class="flex gap-4 justify-between">
    <icon name="mdi:menu" class="md:hidden" @click="generalStore.toggleSidebar()" />
    <nuxt-link to="/" class="text-3xl font-bold">
      Oliverrr
    </nuxt-link>

    <div class="hidden md:flex gap-4 text-lg">
      <div
        v-for="option in generalStore.getNavItems"
        :key="option.label"
        :class="`${isCurrentRoute(option.to) ? 'underline' : ''} text-xl cursor-pointer hover:underline`">
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
