<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})

</script>

<template>
  <base-page>
    <note-form />
  </base-page>
</template>
