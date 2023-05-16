import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue'
import { useRequest } from '~/composables/useRequest'
import type { User } from '~/types'

export const useUserStore = defineStore('user', () => {
  const { request } = useRequest()

  const user = ref<User | null>(null)

  async function getUser (): Promise<User> {
    return await request('/users/oliver')
  }

  onMounted(async () => {
    user.value = await getUser()
  })

  return {
    user
  }
})
