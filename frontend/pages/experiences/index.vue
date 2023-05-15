<script setup lang="ts">
import { useAuthStore } from '~/stores/auth-store'
import { useExperienceStore } from '~/stores/experience-store'
import { ActionItem, Experience } from '~/types'

const authStore = useAuthStore()
const experienceStore = useExperienceStore()

const showProjects = ref<boolean>(false)
const showEducation = ref<boolean>(false)
const showWork = ref<boolean>(false)
const experiences = ref<Experience[]>([])

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

onMounted(async () => {
  experiences.value = await experienceStore.indexExperience()
})

</script>

<template>
  <base-page title="Experiences">
    <v-row justify="center">
      <v-col
        cols="12"
        md="8">
        <base-btn
          v-for="option in options"
          :key="option.label"
          class="mr-1 mt-1 mt-md-0"
          :outlined="option.outlined"
          :color="option.color"
          :to="option.to"
          @click="option.action">
          <v-icon
            v-if="option.icon"
            :icon="option.icon"
            class="mr-1" />
          {{ option.label }}
        </base-btn>
      </v-col>
      <v-col
        v-for="experience in getExperiences"
        :key="experience"
        cols="12"
        md="8">
        <experience-card
          :experience="experience"
          :admin-mode="authStore.isLoggedIn" />
      </v-col>
    </v-row>
  </base-page>
</template>
