export interface CVData {
  profile : {
    name: string;
    title: string;
    location: string;
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    about: string;
  }
  skills: Skills;
  experiences: Experience[];
  previousExperiences: Experience[];
  education: Education;
}

export type Skills = Record<string, string[]>;

interface ExperienceBase {
  company: string;
  role: string;
  period: string;
  intro?: string;
  stack?: string[];
  bullets: string[];
}

export interface Experience extends ExperienceBase {
  missions?: ExperienceBase[];
}


export interface Education {
  school: string;
  title: string;
  details: string;
}
