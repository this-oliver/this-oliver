<script setup lang="ts">
import type { ActionItem } from "~/types";
import { useGeneralStore } from "~/stores/app";

const generalStore = useGeneralStore();
const options = computed<ActionItem[]>(() => generalStore.getNavItems);
</script>

<template>
  <base-sidebar
    id="app-sidebar"
    :show="generalStore.isSidebarVisible"
    :items="options" />
</template>
