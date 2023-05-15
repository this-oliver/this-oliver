import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue'
import { useRequest } from '~/composables/useRequest'
import type { User } from '~/types'

export const useUserStore = defineStore('user', () => {
  const { request } = useRequest()

  const user = ref<User | null>(null)

  onMounted(async () => {
    user.value = await request('/user')
  })

  return {
    user
  }
})
