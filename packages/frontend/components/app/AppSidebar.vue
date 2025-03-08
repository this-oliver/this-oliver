<script setup lang="ts">
import type { ActionItem } from "~/types";
import { useDisplay } from "vuetify";
import { useNavigationStore } from "~/stores/app/navigation-store";
import { useSidebarStore } from "~/stores/app/sidebar-store";

const { smAndDown } = useDisplay();

const drawer = useSidebarStore();
const navigation = useNavigationStore();
const options = computed<ActionItem[]>(() => navigation.options);

function getOptionColor(option: ActionItem): string {
  if (option.color) {
    return `text-${option.color}`;
  }

  return "";
}
</script>

<template>
  <v-navigation-drawer
    v-model="drawer.visible"
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
