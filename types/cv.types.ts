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
  /** Absent sur les experiences dont le detail vit dans `missions`. */
  bullets?: string[];
}

/**
 * Sous-experience : les donnees n'ont ni `role` ni `period` (voir
 * data/experiences.json), donc un type distinct plutot que `ExperienceBase`.
 */
export interface Mission {
  company: string;
  period?: string;
  intro?: string;
  bullets?: string[];
}

export interface Experience extends ExperienceBase {
  missions?: Mission[];
}

export interface Education {
  school: string;
  title: string;
  details: string;
}
