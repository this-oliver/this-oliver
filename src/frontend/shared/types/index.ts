export interface ActionItem {
  label: string
  description?: string
  color?: string
  icon?: string
  disabled?: boolean
  outlined?: boolean
  text?: boolean
  hint?: string
  to?: string
  action?: () => void
  component?: any
}

export interface Note {
  _id: string
  title: string
  slug: string
  content: string
  publish: boolean
  tags: string[]
  createdAt: string
  updatedAt: string
}

export type ExperienceType = "job" | "education" | "project" | "other";

export interface Experience {
  _id: string
  title: string
  org: string
  startDate: string
  endDate: string
  description: string
  type: ExperienceType
  link?: string
  image?: string
  images?: {
    name: string
    alt: string
    caption: string
    url: string
  }[]
}

export interface Website {
  about: string
  socials: { label: string, url: string }[]
}

export interface User {
  _id: string
  name: string
  status: string
  articles: Note[]
  experiences: Experience[]
  visits?: number
  createdAt: string
}
