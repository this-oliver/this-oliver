<script setup lang="ts">
import { useUserStore } from '~/stores/user-store'

definePageMeta({
  middleware: ['auth']
})

const userStore = useUserStore()
const user = ref<any>(null)

onMounted(async () => {
  user.value = await userStore.getUser(true)
})
</script>

<template>
  <base-page title="Update Profile">
    <user-form
      v-if="user"
      :user="user" />
  </base-page>
</template>
