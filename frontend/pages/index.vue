<script setup lang="ts">
import { useUserStore } from '~/stores/user-store'

const userStore = useUserStore()

</script>

<template>
  <base-page>
    <v-row justify="center">
      <v-col md="8">
        <markdown-card
          style="font-size: 1.5rem;"
          :markdown="userStore.user?.bio.short"
          disable-anchors />
      </v-col>
    </v-row>
  </base-page>
</template>
