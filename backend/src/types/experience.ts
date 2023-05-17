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
  JOB = "job",
  EDUCATION = "education",
  PROJECT = "project",
  OTHER = "other",
}
export { IExperience, ExperienceType }