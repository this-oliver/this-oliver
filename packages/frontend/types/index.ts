export interface ActionItem {
  label: string;
  description?: string;
  color?: string;
  icon?: string;
  disabled?: boolean;
  outlined?: boolean;
  text?: boolean;
  hint?: string;
  to?: string;
  action?: () => void;
  component?: any;
}

export interface Note {
  _id: string;
  title: string
  content: string
  publish: boolean
  views: number
  tags: string[]
  slug: string
  createdAt: string
}

export type ExperienceType = 'job' | 'education' | 'project' | 'other';

export interface Experience {
  _id: string;
  title: string
  org: string
  startYear: number
  endYear: number
  description: string
  type: ExperienceType
  link?: string
  image?: string
  createdAt: string
}

export interface User {
  _id: string
  name: string
  status: string
  articles: Note[]
  experiences: Experience[]
  visits?: number,
  createdAt: string
}
