<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const router = useRouter()

const title = ref<string>(route.query.title as string || 'Error')
const message = ref<string | null>(route.query.message as string | null)
const redirect = ref<string | null>(route.query.redirect as string || '/')
const secretAction = ref<NodeJS.Timeout | null>(null)

function startSecretAction () {
  let secretPath = '/auth/login'

  if (redirect.value) {
    secretPath = `${secretPath}?redirect=${redirect.value}`
  }

  secretAction.value = setTimeout(() => {
    router.push(secretPath)
  }, 2000)
}
function destorySecretAction () {
  if (secretAction.value) {
    clearTimeout(secretAction.value)
  }
}
</script>

<template>
  <base-page
    class="text-center"
    :title="title">
    <base-card
      id="wildcard"
      class="brutalist-outline"
      outlined>
      <h2 v-if="message">
        {{ message }}
      </h2>
      <h2 v-else>
        Can't find a page that matches the <code class="underline">{{ route.path }}</code> path
      </h2>
    </base-card>

    <base-btn
      class="brutalist-outline mt-2"
      color="secondary"
      outlined
      :to="redirect"
      @mousedown="startSecretAction"
      @mouseup="destorySecretAction"
      @mouseleave="destorySecretAction">
      Go Back
    </base-btn>
  </base-page>
</template>

<style scoped>
  #wildcard {
    margin-top: 100px;
  }
</style>
