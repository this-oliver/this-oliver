import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './auth-store'
import { useRequest } from '~/composables/useRequest'
import type { User } from '~/types'

export const useUserStore = defineStore('user', () => {
  const { request } = useRequest()
  const authStore = useAuthStore()

  const user = ref<User | null>(null)

  async function getUser (force?: boolean): Promise<User> {
    if (user.value && !force) { return user.value }

    return await request('/users/oliver')
  }

  async function updateUser (patch: Partial<User>): Promise<User> {
    user.value = await request('/admin/users', {
      headers: {
        Authorization: `Bearer ${authStore.token}`
      },
      method: 'PATCH',
      body: JSON.stringify(patch)
    })

    return user.value as User
  }

  return {
    user,
    getUser,
    updateUser
  }
})
