<script setup lang="ts">
import { useUserStore } from '~/stores/user-store'
import type { User } from '~/types'

definePageMeta({
  middleware: ['auth']
})

const userStore = useUserStore()
const user = ref<User>()

onMounted(async () => {
  user.value = await userStore.getUser(true) as User
})
</script>

<template>
  <base-page title="Update Profile">
    <user-form
      v-if="user"
      :user="user" />
  </base-page>
</template>
