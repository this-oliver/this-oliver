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
      color: 'primary',
      outlined: showEducation.value,
      action: () => { showEducation.value = !showEducation.value }
    },
    {
      label: 'Work',
      color: 'primary',
      outlined: showWork.value,
      action: () => { showWork.value = !showWork.value }
    },
    {
      label: 'Projects',
      color: 'primary',
      outlined: showProjects.value,
      action: () => { showProjects.value = !showProjects.value }
    }
  ]

  if (authStore.isLoggedIn) {
    base = [
      {
        label: 'Create xP',
        color: 'secondary',
        icon: 'mdi-plus',
        to: '/experiences/create'
      },
      ...base
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
    } else if (experience.type === 'projects') {
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

</script>

<template>
  <base-page title="Experiences">
    <base-list
      label="experiences"
      :options="options"
      :loading="loading"
      :components="components" />
  </base-page>
</template>
