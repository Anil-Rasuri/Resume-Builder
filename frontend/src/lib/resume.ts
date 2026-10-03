import type { Resume } from "@/types/resume";

/** True when the user has not entered anything yet. */
export const isResumeEmpty = (r: Resume): boolean =>
  Object.values(r.personal).every((v) => !String(v).trim()) &&
  r.education.length === 0 &&
  r.projects.length === 0 &&
  r.experience.length === 0 &&
  r.internships.length === 0 &&
  r.certifications.length === 0 &&
  r.skills.technical.length + r.skills.soft.length + r.skills.other.length === 0;
