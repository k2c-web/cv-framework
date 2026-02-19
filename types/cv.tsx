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

/* ----------------------------- EXPERIENCE ----------------------------- */

export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  intro?: string;

  // Présent uniquement dans certaines expériences (ex: MATCHBOX n'en a pas)
  stack?: string[];

  // Toujours présent dans ton JSON
  bullets: string[];

  // Présent uniquement dans CBTW
  missions?: MissionEntry[];
}

export interface MissionEntry {
  company: string;
  role: string;
  period: string;

  // Présent dans toutes les missions
  intro: string;

  // Toujours présent dans toutes les missions
  stack: string[];

  // Toujours présent dans toutes les missions
  bullets: string[];
}

/* ----------------------- PREVIOUS EXPERIENCE -------------------------- */

export interface PreviousExperienceEntry {
  company: string;
  role: string;
  period: string;

  // Toujours présent dans ton JSON
  intro: string;

  // Toujours présent dans ton JSON
  bullets: string[];
}

/* ----------------------------- EDUCATION ------------------------------ */

export interface Education {
  school: string;
  title: string;
  details: string;
}
