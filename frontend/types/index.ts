export interface ActionItem {
  label: string;
  description?: string;
  color?: string;
  icon?: string;
  disabled?: boolean;
  outlined?: boolean;
  hint?: string;
  to?: string;
  action?: () => void;
  component?: any;
}

export interface Tag {
  _id: string;
  name: string
  color: string
}

export interface Note {
  _id: string;
  title: string
  content: string
  publish: boolean
  views: number
  tags: Tag[]
  slug: string
  createdAt: string
}

export type ExperienceType = 'job' | 'education' | 'projects' | 'other';

export interface Experience {
  _id: string;
  title: string
  org: string
  startYear: number
  endYear: number
  description: string
  type: ExperienceType;
  createdAt: string
}

export interface User {
  _id: string
  name: string
  bio: {
    short: string
    long: string
  }
  articles: Note[]
  experiences: Experience[]
  visits?: number,
  createdAt: string
}
