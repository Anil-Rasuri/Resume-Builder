import type { PersonalInfo, Resume } from "@/types/resume";

export const dateRange = (start: string, end: string): string =>
  [start, end].filter(Boolean).join(" – ");

export const contactItems = (p: PersonalInfo): string[] =>
  [p.email, p.phone, p.location, p.linkedin, p.website].filter(Boolean);

export const hasAnySkills = (skills: Resume["skills"]): boolean =>
  skills.technical.length + skills.soft.length + skills.other.length > 0;