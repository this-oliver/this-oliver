<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})

</script>

<template>
  <base-page title="Create Note">
    <note-form />
  </base-page>
</template>
