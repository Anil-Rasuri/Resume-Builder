import { create } from "zustand";
import { persist } from "zustand/middleware";
import { emptyResume } from "@/constants/emptyResume";
import { sampleResume } from "@/constants/sampleResume";
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
  /** true while the resume on screen is the untouched sample */
  isSample: boolean;
  setPersonal: (patch: Partial<PersonalInfo>) => void;
  setExperience: (items: ExperienceItem[]) => void;
  setInternships: (items: InternshipItem[]) => void;
  setEducation: (items: EducationItem[]) => void;
  setProjects: (items: ProjectItem[]) => void;
  setSkills: (skills: Skills) => void;
  setCertifications: (items: CertificationItem[]) => void;
  setResume: (resume: Resume) => void;
  setTemplate: (id: TemplateId) => void;
  loadSample: () => void;
  markEdited: () => void;
  reset: () => void;
}

export const useResumeStore = create<ResumeState>()(
  persist(
    (set) => ({
      resume: emptyResume,
      templateId: "classic",
      isSample: false,

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

      setResume: (resume) => set({ resume, isSample: false }),

      setTemplate: (templateId) => set({ templateId }),

      loadSample: () => set({ resume: sampleResume, isSample: true }),

      // Called when the user really types or clicks inside a form.
      markEdited: () => set((state) => (state.isSample ? { isSample: false } : state)),

      reset: () => set({ resume: emptyResume, templateId: "classic", isSample: false }),
    }),
    {
      name: "resume-builder-v2",
      // Older saved data may miss newer fields: fill them in.
      merge: (persisted, current) => {
        const saved = persisted as Partial<ResumeState> | undefined;
        return {
          ...current,
          ...saved,
          // Data saved before this update: recognise a leftover sample.
          isSample:
            saved?.isSample ??
            saved?.resume?.personal?.email === sampleResume.personal.email,
          resume: {
            ...emptyResume,
            ...saved?.resume,
            personal: { ...emptyResume.personal, ...saved?.resume?.personal },
          },
        };
      },
    }
  )
);
