import { useTheme as useVuetifyTheme } from 'vuetify/lib/framework.mjs'

const materialDesignColors = [
  'primary',
  'secondary',
  'accent',
  'error',
  'info',
  'success',
  'warning'
]

const notAllowedColors = [
  '#ffffff',
  '#000000',
  '#F5F5F5', // lightTheme.background
  '#133317' // darkTheme.background
]

export function useColor () {
  /**
   * Returns a random Material Design color
   */
  function getRandomColor (): string {
    return materialDesignColors[Math.floor(Math.random() * materialDesignColors.length)]
  }

  /**
   * Returns a random hex color
   */
  function getRandomHexColor (): string {
    // random hex color generator
    const color = '#' + Math.floor(Math.random() * 16777215).toString(16)

    // if color is white or black, generate a new one
    if (notAllowedColors.includes(color)) {
      return getRandomHexColor()
    }

    return color
  }

  /**
   * Returns hex representation of a Material Design color
   */
  function getColor (color: string): string {
    const theme = useVuetifyTheme()

    return theme.global.current.value.colors[color]
  }

  /**
   * Returns true if color is a valid hex color
   */
  function isHexColor (color: string): boolean {
    return /^#[0-9A-F]{6}$/i.test(color)
  }

  return {
    getRandomColor,
    getRandomHexColor,
    getColor,
    isHexColor
  }
}
