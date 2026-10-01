import type { SkillCategory } from "@/types/resume";

export const skillSuggestions: Record<SkillCategory, string[]> = {
  technical: [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Python",
    "FastAPI",
    "SQL",
    "Git",
    "Docker",
  ],
  soft: [
    "Communication",
    "Teamwork",
    "Leadership",
    "Problem Solving",
    "Time Management",
    "Adaptability",
  ],
  other: ["English", "Hindi", "Telugu", "Public Speaking", "Volunteering"],
};