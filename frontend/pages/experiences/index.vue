<script setup lang="ts">
import { h } from 'vue'
import { useAuthStore } from '~/stores/auth-store'
import { useExperienceStore } from '~/stores/experience-store'
import { ActionItem, Experience } from '~/types'
import ExperienceCard from '~/components/cards/ExperienceCard.vue'

const authStore = useAuthStore()
const experienceStore = useExperienceStore()

const showProjects = ref<boolean>(false)
const showEducation = ref<boolean>(false)
const showWork = ref<boolean>(false)
const experiences = ref<Experience[]>([])
const loading = ref<boolean>(false)

const options = computed<ActionItem[]>(() => {
  let base: ActionItem[] = [
    {
      label: 'Education',
      color: 'education',
      outlined: showEducation.value,
      action: () => { showEducation.value = !showEducation.value }
    },
    {
      label: 'Work',
      color: 'job',
      outlined: showWork.value,
      action: () => { showWork.value = !showWork.value }
    },
    {
      label: 'Projects',
      color: 'project',
      outlined: showProjects.value,
      action: () => { showProjects.value = !showProjects.value }
    }
  ]

  if (authStore.isLoggedIn) {
    base = [
      ...base,
      {
        label: 'Create xP',
        color: 'secondary',
        icon: 'mdi-plus',
        to: '/experiences/create'
      }
    ]
  }

  return base
})

const getExperiences = computed<Experience[]>(() => {
  return experiences.value.filter((experience) => {
    if (!showEducation.value && !showProjects.value && !showWork.value) {
      return true
    } else if (experience.type === 'education') {
      return showEducation.value
    } else if (experience.type === 'job') {
      return showWork.value
    } else if (experience.type === 'project') {
      return showProjects.value
    } else {
      return true
    }
  })
})

const components = computed(() => {
  return getExperiences.value.map((experience) => {
    // return a NoteCard component with the note prop set to the note
    return h(ExperienceCard, { experience, adminMode: authStore.isLoggedIn })
  })
})

onMounted(async () => {
  loading.value = true
  experiences.value = await experienceStore.indexExperiences()
  loading.value = false
})

const pageTitle = 'Experiences - oliverrr'
const pageDescription = 'A collection of experiences'
useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogSiteName: 'oliverrr\'s personal website'
})

</script>

<template>
  <base-page title="Experiences">
    <v-row justify="center">
      <v-col lg="7">
        <base-list
          label="experiences"
          :options="options"
          :loading="loading"
          :components="components" />
      </v-col>
    </v-row>
  </base-page>
</template>
