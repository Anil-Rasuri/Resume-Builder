import type { Resume } from "@/types/resume";

export const emptyResume: Resume = {
  personal: {
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    website: "",
    summary: "",
  },
  experience: [],
  internships: [],
  education: [],
  projects: [],
  skills: { technical: [], soft: [], other: [] },
  certifications: [],
};