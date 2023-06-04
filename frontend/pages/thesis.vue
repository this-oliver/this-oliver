<script setup lang="ts">

const pageTitle = 'SSASY Thesis Presentation - oliverrr'
const pageDescription = 'Checkout my thesis presentation.'
useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogSiteName: 'oliverrr\'s personal website'
})

const content = `
I will present [SSASy](https://www.ssasy.net), a self-sovereign authentication scheme that enables an alternative to current password-based authentication schemes and Federated Identities like Google and Microsoft.

In my presentation, I will talk about existing problems, the solution that I have developed and the results of my research.

<br>

#### Practical Information

- the presentation will be held on the 7th of June 2023 at 0900 (Swedish time)
- the presentation will be held on Zoom
- the presentation will be in English
`

const presentationStart = new Date('2023-06-07T09:00:00+02:00')
const presentationEnd = new Date(presentationStart.getTime() + 60 * 60 * 1000) // 60 minutes after start

/**
 * Returns true if the presentation has started.
 */
const presentationStarted = computed<boolean>(() => {
  const now = new Date()
  return now.getTime() > presentationStart.getTime()
})

/**
 * Returns true if the presentation is starting in less than 30 minutes.
 */
const presentationIsStarting = computed<boolean>(() => {
  const now = new Date()
  now.setMinutes(now.getMinutes() + 30) // 30 minutes from now

  return now.getTime() > presentationStart.getTime()
})

/**
 * Returns true if the presentation has ended.
 */
const presentationIsOver = computed<boolean>(() => {
  const now = new Date()
  return now.getTime() > presentationEnd.getTime()
})

/**
 * Return true if presentation link can be accessed.
 */
const allowAccessToPresentation = computed<boolean>(() => {
  return (presentationIsStarting.value === true || presentationStarted.value === true) && presentationIsOver.value === false
})

/**
 * Returns a string with the countdown to the deadline.
 */
const getCountDown = computed<string>(() => {
  const now = new Date()
  const diff = presentationStart.getTime() - now.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  return `${days} days, ${hours} hours, ${minutes} minutes`
})

const getPresentationLink = computed<string>(() => {
  return allowAccessToPresentation.value ? 'https://ltu-se.zoom.us/j/2781238720' : '#'
})

</script>

<template>
  <base-page title="SSASy Thesis Presentation">
    <v-row justify="center">
      <v-col
        class="text-center"
        md="8">
        <base-card>
          <h2 v-if="presentationIsOver">
            Presentation is over!
          </h2>
          <h2 v-else-if="presentationStarted">
            Presentation is live!
          </h2>
          <h2 v-else-if="presentationIsStarting">
            Presenting soon!
          </h2>
          <h2 v-else>
            Presenting in {{ getCountDown }}
          </h2>

          <base-btn
            block
            color="primary"
            :disabled="!allowAccessToPresentation"
            :href="getPresentationLink">
            Go to Zoom
          </base-btn>
        </base-card>
      </v-col>

      <v-col md="8">
        <markdown-card
          id="welcome-banner"
          :markdown="content"
          disable-anchors />
      </v-col>
    </v-row>
  </base-page>
</template>

<style>
#welcome-banner {
  font-size: 1.15rem;
}

@media (min-width: 768px) {
  #welcome-banner {
    font-size: 1.25rem;
  }
}
</style>
