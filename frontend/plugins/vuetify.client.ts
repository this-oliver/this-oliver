import '@mdi/font/css/materialdesignicons.css'
import { createVuetify, type ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader'
import 'vuetify/styles'

const customColors = {
  job: '#2196F3',
  education: '#4CAF50',
  project: '#FFC107',
  other: '#9E9E9E'
}

const lightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#F5F5F5',
    surface: '#FFFFFF',
    primary: '#16942B',
    secondary: '#838383',
    error: '#F44336',
    info: '#21F3DA',
    success: '#4CAF50',
    warning: '#FFC107',

    // Custom
    ...customColors
  }
}

const darkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    background: '#133317',
    surface: '#0D220B',
    primary: '#F3B1FA',
    secondary: '#556B54',
    error: '#CF6679',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',

    // Custom
    ...customColors
  }
}

function setupVuetify () {
  return createVuetify({
    components: {
      ...components,
      VSkeletonLoader
    },
    directives,
    theme: {
      defaultTheme: 'light',
      themes: {
        light: lightTheme,
        dark: darkTheme
      }
    },
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi
      }
    }
  })
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(setupVuetify())
})
