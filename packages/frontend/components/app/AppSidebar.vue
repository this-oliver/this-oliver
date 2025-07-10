<script setup lang="ts">
import type { ActionItem } from "~/types";
import { useDisplay } from "vuetify";
import { useGeneralStore } from "~/stores/app";

const { smAndDown } = useDisplay();

const generalStore = useGeneralStore();
const options = computed<ActionItem[]>(() => generalStore.getNavItems);

function getOptionColor(option: ActionItem): string {
  if (option.color) {
    return `text-${option.color}`;
  }

  return "";
}
</script>

<template>
  <v-navigation-drawer
    v-model="generalStore.isSidebarVisible"
    :location="smAndDown ? 'top' : 'left'"
    width="100%">
    <v-row
      class="mt-2"
      justify="center">
      <v-col
        v-for="option in options"
        :key="option.label"
        cols="8">
        <div :class="`sidebar-item ${getOptionColor(option)}`">
          <v-icon
            v-if="option.icon"
            style="margin-right: 1rem;"
            :icon="option.icon" />

          <base-btn
            text
            :to="option.to"
            @click="option.action">
            {{ option.label }}
          </base-btn>
        </div>
      </v-col>

      <v-col cols="8">
        <app-theme
          class="sidebar-item"
          sidebar-mode />
      </v-col>
    </v-row>
  </v-navigation-drawer>
</template>

<style>
.sidebar-item {
  font-size: 1.25rem;
}
</style>
