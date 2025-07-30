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
  <div class="px-2 pb-2 flex flex-col gap-2 md:flex-row text-center text-pinkish">
    <a
      v-for="item in links"
      :key="item.link"
      class="underline md:mx-2"
      :href="item.link"
      target="_blank">
      {{ item.title }}
    </a>

    <div class="my-4 md:my-0 md:ml-auto">
      oliver
      &copy; {{ new Date().getFullYear() }}
      &nbsp;
      <span v-if="hasVisited">👋</span>
      <span v-else>🤠</span>
    </div>
  </div>
</template>
