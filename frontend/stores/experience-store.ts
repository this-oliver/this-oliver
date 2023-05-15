import { defineStore } from 'pinia'
import { useAuthStore } from './auth-store'
import { Experience, User } from '~/types'

interface WipExperience extends Partial<Experience> {
  _id?: string
  createdAt?: string
}

export const useExperienceStore = defineStore('experience', () => {
  const { request } = useRequest()
  const authStore = useAuthStore()

  async function getExperience (id: string): Promise<Experience> {
    const experiences = await indexExperience()

    return experiences.find(xP => xP._id === id) as Experience
  }

  async function indexExperience (): Promise<Experience[]> {
    const user = await request('/user') as User

    return _sortLatestExperiences(user.experiences)
  }

  async function postExperience (experience: WipExperience): Promise<Experience> {
    return await request('/experiences', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authStore.token}`
      },
      body: JSON.stringify(experience)
    }) as Experience
  }

  async function patchExperience (id: string, experience: WipExperience): Promise<Experience> {
    return await request(`/experiences/${id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${authStore.token}`
      },
      body: JSON.stringify(experience)
    }) as Experience
  }

  async function deleteExperience (id: string): Promise<void> {
    await request(`/experiences/${id}`, {
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
    indexExperience,
    postExperience,
    patchExperience,
    deleteExperience
  }
})
