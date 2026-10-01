export const SECTIONS = [
  {
    id: "personal",
    label: "Personal",
    title: "Personal details",
    description: "Contact details, links and your summary. Fields marked with * are required.",
  },
  {
    id: "education",
    label: "Education",
    title: "Education",
    description: "Add your degrees, newest first.",
  },
  {
    id: "skills",
    label: "Skills",
    title: "Skills",
    description: "Organise your skills into three groups.",
  },
  {
    id: "projects",
    label: "Projects",
    title: "Projects",
    description: "Highlight work that shows your skills.",
  },
  {
    id: "experience",
    label: "Experience",
    title: "Work experience",
    description: "Start with your most recent job. Skip this if you are a fresher.",
  },
  {
    id: "internships",
    label: "Internships",
    title: "Internships",
    description: "Add internships and training programs.",
  },
  {
    id: "certifications",
    label: "Certifications",
    title: "Certifications",
    description: "Courses and certificates that add credibility.",
  },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];