export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string; 
  website: string;
  summary: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface InternshipItem {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  bullets: string[];
}

export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  branch: string;
  startDate: string;
  endDate: string;
  grade: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  link: string;
  techStack: string;
  description: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link: string;
}

export interface Skills {
  technical: string[];
  soft: string[];
  other: string[];
}

export type SkillCategory = keyof Skills;

export interface Resume {
  personal: PersonalInfo;
  experience: ExperienceItem[];
  internships: InternshipItem[];
  education: EducationItem[];
  projects: ProjectItem[];
  skills: Skills;
  certifications: CertificationItem[];
}

export type TemplateId =
  | "classic"
  | "modern"
  | "executive"
  | "minimal"
  | "elegant"
  | "bold"
  | "timeline"
  | "sidebar"
  | "studio"
  | "split";