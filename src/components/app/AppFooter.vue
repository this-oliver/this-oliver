<script setup lang="ts">
const links = ref([
  {
    title: "Email",
    link: "mailto:hello@oliverrr.net"
  },
  {
    title: "Github",
    link: "https://github.com/this-oliver"
  }
  // {
  //  title: 'ETH',
  //  link: 'https://etherscan.io/address/oliverrr.eth'
  // }
]);

const hasVisited = computed(() => {
  return true;
});
</script>

<template>
  <div class="flex flex-col md:flex-row md:text-center text-pinkish">
    <a
      v-for="item in links"
      :key="item.link"
      class="mx-2 underline"
      :href="item.link"
      target="_blank">
      {{ item.title }}
    </a>

    <div class="md:ml-auto">
      oliver
      &copy; {{ new Date().getFullYear() }}
      &nbsp;
      <span v-if="hasVisited">👋</span>
      <span v-else>🤠</span>
    </div>
  </div>
</template>
