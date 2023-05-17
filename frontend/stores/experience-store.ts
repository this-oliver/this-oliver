import { defineStore } from 'pinia'
import { useAuthStore } from './auth-store'
import { Experience } from '~/types'

export const useExperienceStore = defineStore('experience', () => {
  const { request } = useRequest()
  const authStore = useAuthStore()

  async function getExperience (id: string): Promise<Experience> {
    const experience = await request(`/experiences/${id}`)
    return experience as Experience
  }

  async function indexExperiences (): Promise<Experience[]> {
    const experiences = await request('/experiences')

    return _sortLatestExperiences(experiences)
  }

  async function postExperience (experience: Partial<Experience>): Promise<Experience> {
    return await request('/admin/experiences', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authStore.token}`
      },
      body: JSON.stringify(experience)
    }) as Experience
  }

  async function patchExperience (id: string, experience: Partial<Experience>): Promise<Experience> {
    return await request(`/admin/experiences/${id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${authStore.token}`
      },
      body: JSON.stringify(experience)
    }) as Experience
  }

  async function deleteExperience (id: string): Promise<void> {
    await request(`/admin/experiences/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    })
  }

  function _sortLatestExperiences (experiences: Experience[]) {
    let xp = [...experiences]

    xp = xp.sort((a, b) => {
      // sort experiences by start date:
      // experiences with the latest start year should be at the beginning of the array

      if (a.startYear > b.startYear) {
        return -1
      } else if (a.startYear < b.startYear) {
        return 1
      } else {
        return 0
      }
    })

    xp = xp.sort((a, b) => {
      // sort experiences by end date:
      // experiences with the latest end year should be at the beginning of the array

      if (a.endYear > b.endYear) {
        return -1
      } else if (a.endYear < b.endYear) {
        return 1
      } else {
        return 0
      }
    })

    xp = xp.sort((a, b) => {
      // sort experiences by context:
      // experiences with an empty end year (null or 'present') should be at the beginning of the array

      if (a.endYear === null || a.endYear === undefined || a.endYear === 0) {
        return -1
      } else if (b.endYear === null || b.endYear === undefined || b.endYear === 0) {
        return 1
      } else {
        return 0
      }
    })

    return xp
  }

  return {
    getExperience,
    indexExperiences,
    postExperience,
    patchExperience,
    deleteExperience
  }
})
