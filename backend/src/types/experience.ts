interface IExperience {
  title: string;
  org: string;
  startYear: number;
  endYear: number;
  description: string;
  type: string;
  link?: string;
  image?: string;
}

enum ExperienceType {
  WORK = "job",
  EDUCATION = "education",
  PROJECT = "projects", // TODO: rename
  OTHER = "other",
}
export { IExperience, ExperienceType }