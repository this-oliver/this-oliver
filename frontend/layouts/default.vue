<script setup lang="ts">

const theme = useTheme()
const layoutClass = computed<string>(() => theme.dark.value ? 'dark-theme' : '')

</script>

<template>
  <v-app :class="layoutClass">
    <app-nav />
    <app-sidebar />
    <app-notification />

    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col
            cols="11"
            md="10">
            <slot />
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <app-footer />
  </v-app>
</template>

<style>
  .dark-theme a.simple-link, .dark-theme  a.markdown-link {
    color: #F3B1FA;
  }
</style>
