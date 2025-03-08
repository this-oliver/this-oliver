<script setup lang="ts">
definePageMeta({ middleware: ["auth"] });
</script>

<template>
  <base-page title="Create Experience">
    <experience-form />
  </base-page>
</template>
