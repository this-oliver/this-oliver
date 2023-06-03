import { defineStore } from 'pinia'

export const LOCAL_AUTH_KEY = 'auth'
export const LOCAL_AUTH_ACCESS_TOKEN = `${LOCAL_AUTH_KEY}-access-token`

export const useAuthStore = defineStore('auth', () => {
  const { get, set } = useStorage()
  const { request } = useRequest()

  const token = ref<string | null>(get(LOCAL_AUTH_ACCESS_TOKEN))
  const isLoggedIn = computed<boolean>(() => token.value !== null)

  async function login (email: string, password: string): Promise<boolean> {
    try {
      const response = await request('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const { token } = response

      _setAccessToken(token)

      return true
    } catch (error) {
      return false
    }
  }

  function logout () {
    _setAccessToken(null)
  }

  function _setAccessToken (newToken: string | null) {
    set(LOCAL_AUTH_ACCESS_TOKEN, newToken)
    token.value = newToken
  }

  return {
    token,
    isLoggedIn,
    login,
    logout
  }
})
