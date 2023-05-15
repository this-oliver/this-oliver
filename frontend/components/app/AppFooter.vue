<script setup lang="ts">
import { useDisplay } from 'vuetify'

const { smAndDown } = useDisplay()

const links = ref([
  {
    title: 'Email',
    link: 'mailto:hello@oliverrr.net?subject=Reaching out from oliverrr.net'
  },
  {
    title: 'Github',
    link: 'https://github.com/this-oliver'
  },
  {
    title: 'Twitter',
    link: 'https://twitter.com/maybeolivier'
  },
  {
    title: 'Ξ ETH',
    link: 'https://etherscan.io/address/oliverrr.eth'
  }
])

const hasVisited = computed(() => {
  return true
})
</script>

<template>
  <v-footer
    app
    absolute
    color="transparent">
    <v-row :class="`px-2 ${!smAndDown ? 'text-center' : ''}`">
      <v-col
        v-for="item in links"
        :key="item.link"
        cols="auto">
        <a
          class="simple-link mx-2"
          :href="item.link"
          target="_blank">
          {{ item.title }}
        </a>
      </v-col>
      <v-col
        cols="auto"
        class="ml-md-auto">
        oliver
        &copy; {{ new Date().getFullYear() }}
        &nbsp;
        <span v-if="hasVisited">👋</span>
        <span v-else>🤠</span>
      </v-col>
    </v-row>
  </v-footer>
</template>
