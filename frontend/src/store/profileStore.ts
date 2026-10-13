import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Resume, TemplateId } from "@/types/resume";

export interface SavedProfile {
  resume: Resume;
  templateId: TemplateId;
  /** ISO date string of the last save */
  savedAt: string;
}

interface ProfileState {
  profile: SavedProfile | null;
  save: (resume: Resume, templateId: TemplateId) => void;
  forget: () => void;
}

/**
 * "My details": one resume the user chose to keep on this device.
 * It lives in localStorage, so it is still there on the next visit,
 * while the working form itself starts empty (see resumeStore).
 */
export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profile: null,
      save: (resume, templateId) =>
        set({
          profile: {
            resume: structuredClone(resume),
            templateId,
            savedAt: new Date().toISOString(),
          },
        }),
      forget: () => set({ profile: null }),
    }),
    { name: "rezuvo-my-details" }
  )
);
