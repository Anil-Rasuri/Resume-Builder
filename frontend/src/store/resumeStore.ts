import { create } from "zustand";
import { persist } from "zustand/middleware";
import { emptyResume } from "@/constants/emptyResume";
import type {
  CertificationItem,
  EducationItem,
  ExperienceItem,
  InternshipItem,
  PersonalInfo,
  ProjectItem,
  Resume,
  Skills,
  TemplateId,
} from "@/types/resume";

interface ResumeState {
  resume: Resume;
  templateId: TemplateId;
  setPersonal: (patch: Partial<PersonalInfo>) => void;
  setExperience: (items: ExperienceItem[]) => void;
  setInternships: (items: InternshipItem[]) => void;
  setEducation: (items: EducationItem[]) => void;
  setProjects: (items: ProjectItem[]) => void;
  setSkills: (skills: Skills) => void;
  setCertifications: (items: CertificationItem[]) => void;
  setResume: (resume: Resume) => void;
  setTemplate: (id: TemplateId) => void;
  reset: () => void;
}

export const useResumeStore = create<ResumeState>()(
  persist(
    (set) => ({
      resume: emptyResume,
      templateId: "classic",

      setPersonal: (patch) =>
        set((state) => ({
          resume: {
            ...state.resume,
            personal: { ...state.resume.personal, ...patch },
          },
        })),

      setExperience: (experience) =>
        set((state) => ({ resume: { ...state.resume, experience } })),

      setInternships: (internships) =>
        set((state) => ({ resume: { ...state.resume, internships } })),

      setEducation: (education) =>
        set((state) => ({ resume: { ...state.resume, education } })),

      setProjects: (projects) =>
        set((state) => ({ resume: { ...state.resume, projects } })),

      setSkills: (skills) =>
        set((state) => ({ resume: { ...state.resume, skills } })),

      setCertifications: (certifications) =>
        set((state) => ({ resume: { ...state.resume, certifications } })),

      setResume: (resume) => set({ resume }),

      setTemplate: (templateId) => set({ templateId }),

      reset: () => set({ resume: emptyResume, templateId: "classic" }),
    }),
    { name: "resume-builder-v2" }
  )
);