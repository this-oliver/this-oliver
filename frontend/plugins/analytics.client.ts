import SimpleAnalytics from 'simple-analytics-vue'
import { useStorage } from '~/composables/useStorage'
import { LOCAL_AUTH_ACCESS_TOKEN } from '~/stores/auth-store'

export default defineNuxtPlugin((nuxtApp) => {
  // skip analytics if we are not in production
  let skipAnalytics = process.env.NODE_ENV !== 'production'

  // token exists = logged in
  const { get } = useStorage()
  const token = get(LOCAL_AUTH_ACCESS_TOKEN)
  const tokenExists = token && token.length > 0

  // if we are logged in, skip analytics
  if (tokenExists) {
    skipAnalytics = true

    // eslint-disable-next-line no-console
    console.info('Skipping analytics because auth token exists')
  }

  nuxtApp.vueApp.use(SimpleAnalytics, {
    skip: skipAnalytics
  })
})
