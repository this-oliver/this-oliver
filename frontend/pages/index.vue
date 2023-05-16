<script setup lang="ts">
import { useUserStore } from '~/stores/user-store'
import { useAuthStore } from '~/stores/auth-store'

const DEFAULT_DESCRIPTION = '# 👋\n\nMy name is **Oliver.** I code stuff. I secure stuff. I solve stuff. I’ve spent the last four years studying software engineering and entrepreneurship and building software applications for startups, bars and restaurants. Currently, I\'m studying [Information Security](https://www.ltu.se/edu/program/FMISA/FMISA-Informationssakerhet-master-1.76734?l=en) at LTU. \n\nIn my free time, I like to travel, hang out with friends, listen to music and work on project that I find fun or interesting.'

const userStore = useUserStore()
const authStore = useAuthStore()

const description = computed<string>(() => {
  return userStore.user?.bio.short ?? DEFAULT_DESCRIPTION
})

onMounted(async () => {
  await userStore.getUser()
})

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
          style="font-size: 1.5rem;"
          :markdown="description"
          disable-anchors />
      </v-col>
    </v-row>
  </base-page>
</template>
