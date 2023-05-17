<script setup lang="ts">
import { useRoute } from 'vue-router'
// import Image from '~/assets/images/this-is-fine.gif'

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
    <v-row
      justify="center"
      no-gutters>
      <v-col
        cols="11"
        md="6">
        <base-card color="transparent">
          <base-image
            src="/images/this-is-fine.gif"
            alt="A dog in a burning room saying 'this is fine'" />

          <h2 class="mt-2">
            <span v-if="message">{{ message }}</span>
            <span v-else>Can't find a page that matches the <code class="underline">{{ route.path }}</code> path</span>
          </h2>
        </base-card>
      </v-col>

      <v-divider class="border-opacity-0" />

      <v-col
        cols="8"
        md="4">
        <base-btn
          class="brutalist-outline"
          block
          outlined
          color="primary"
          :to="redirect"
          @mousedown="startSecretAction"
          @mouseup="destorySecretAction"
          @mouseleave="destorySecretAction">
          Go Back
        </base-btn>
      </v-col>
    </v-row>
  </base-page>
</template>
