import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { emptyResume } from "@/constants/emptyResume";
import { sampleResume } from "@/constants/sampleResume";
import { newId } from "@/lib/id";
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
  /** Fill the form from the details the user saved earlier */
  applyProfile: (resume: Resume, templateId: TemplateId) => void;
  loadSample: () => void;
  markEdited: () => void;
  reset: () => void;
}

// Projects saved before this update had a "description" paragraph.
// Turn it into bullet points so nobody loses their text.
type SavedProject = Partial<ProjectItem> & { description?: string };

const migrateProject = (p: SavedProject): ProjectItem => ({
  id: p.id ?? newId(),
  name: p.name ?? "",
  link: p.link ?? "",
  techStack: p.techStack ?? "",
  bullets:
    p.bullets ??
    (p.description
      ? p.description
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean)
      : []),
});

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

      applyProfile: (resume, templateId) =>
        set({ resume, templateId, isSample: false }),

      loadSample: () => set({ resume: sampleResume, isSample: true }),

      // Called when the user really types or clicks inside a form.
      markEdited: () => set((state) => (state.isSample ? { isSample: false } : state)),

      reset: () => set({ resume: emptyResume, templateId: "classic", isSample: false }),
    }),
    {
      name: "resume-builder-v2",
      // The working draft only lives for this browser tab: a refresh keeps it,
      // a new visit starts with an empty form. Long-term keeping is the job of
      // "Save my details" (profileStore).
      storage: createJSONStorage(() => sessionStorage),
      // Older saved data may miss newer fields or use older shapes: fix them up.
      merge: (persisted, current) => {
        const saved = persisted as Partial<ResumeState> | undefined;
        const savedProjects = (saved?.resume?.projects ?? []) as SavedProject[];
        return {
          ...current,
          ...saved,
          // Data saved before the sample update: recognise a leftover sample.
          isSample:
            saved?.isSample ??
            saved?.resume?.personal?.email === sampleResume.personal.email,
          resume: {
            ...emptyResume,
            ...saved?.resume,
            personal: { ...emptyResume.personal, ...saved?.resume?.personal },
            projects: savedProjects.map(migrateProject),
          },
        };
      },
    }
  )
);
