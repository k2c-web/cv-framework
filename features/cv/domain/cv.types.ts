export interface CVData {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  about: string;
  skills: Record<string, string[]>;
  experience: ExperienceEntry[];
  previousExperience: PreviousExperienceEntry[];
  education: Education;
}

export interface MissionEntry {
  company: string;
  role: string;
  period: string;
  intro: string;
  stack: string[];
  bullets: string[];
}

export interface SimpleExperience {
  company: string;
  role: string;
  period: string;
  intro: string;
  stack: string[];
  bullets: string[];
  missions?: undefined;
}

export interface ExperienceWithMissions {
  company: string;
  role: string;
  period: string;
  missions: MissionEntry[];
   bullets: string[];
}

export type ExperienceEntry = SimpleExperience | ExperienceWithMissions;

export interface PreviousExperienceEntry {
  company: string;
  role: string;
  period: string;
  intro: string;
  bullets: string[];
}

export interface Education {
  school: string;
  title: string;
  details: string;
}
