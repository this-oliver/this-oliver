<script setup lang="ts">
/**
 * The purpose of this page is to redirect viewers
 * to what is currently being worked on etc.
 */

const pageTitle = 'Now - oliverrr'
const pageDescription = 'Checkout what I\'m currently working on.'
useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogSiteName: 'oliverrr\'s personal website'
})

const redirectPath : string | undefined = '/thesis'

onMounted(() => {
  if (redirectPath) {
    const router = useRouter()
    router.push(redirectPath)
  }
})
</script>

<template>
  <base-page title="Now">
    <v-row
      id="now-content"
      justify="center">
      <v-col
        v-if="!redirectPath"
        cols="auto">
        <h2>I'm currently not working on anything.</h2>
      </v-col>
      <v-col
        v-else
        cols="auto">
        <h2>Redirecting...</h2>
      </v-col>
    </v-row>
  </base-page>
</template>

<style>
#now-content {
  padding-top: 2rem;
}
</style>
