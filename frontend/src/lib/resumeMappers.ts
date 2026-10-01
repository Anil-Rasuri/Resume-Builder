import { newId } from "@/lib/id";
import type { CertificationsFormValues } from "@/schemas/certificationsSchema";
import type { EducationFormValues } from "@/schemas/educationSchema";
import type { ExperienceFormValues } from "@/schemas/experienceSchema";
import type { InternshipsFormValues } from "@/schemas/internshipsSchema";
import type { ProjectsFormValues } from "@/schemas/projectsSchema";
import type {
  CertificationItem,
  EducationItem,
  ExperienceItem,
  InternshipItem,
  ProjectItem,
} from "@/types/resume";

type ExperienceRow = ExperienceFormValues["items"][number];
type InternshipRow = InternshipsFormValues["items"][number];
type EducationRow = EducationFormValues["items"][number];
type ProjectRow = ProjectsFormValues["items"][number];
type CertificationRow = CertificationsFormValues["items"][number];

const textToBullets = (text: string | undefined): string[] =>
  (text ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

/* ---------- Experience ---------- */

export const createEmptyExperience = (): ExperienceRow => ({
  uid: newId(),
  company: "",
  role: "",
  location: "",
  startDate: "",
  endDate: "",
  current: false,
  bulletsText: "",
});

export const experienceToForm = (items: ExperienceItem[]): ExperienceFormValues => ({
  items: items.map(({ id, bullets, ...rest }) => ({
    ...rest,
    uid: id,
    bulletsText: bullets.join("\n"),
  })),
});

export const experienceFromForm = (rows: ExperienceRow[] | undefined): ExperienceItem[] =>
  (rows ?? []).filter(Boolean).map((row) => ({
    id: row.uid ?? newId(),
    company: row.company ?? "",
    role: row.role ?? "",
    location: row.location ?? "",
    startDate: row.startDate ?? "",
    endDate: row.current ? "" : row.endDate ?? "",
    current: row.current ?? false,
    bullets: textToBullets(row.bulletsText),
  }));

/* ---------- Internships ---------- */

export const createEmptyInternship = (): InternshipRow => ({
  uid: newId(),
  company: "",
  role: "",
  location: "",
  startDate: "",
  endDate: "",
  bulletsText: "",
});

export const internshipsToForm = (items: InternshipItem[]): InternshipsFormValues => ({
  items: items.map(({ id, bullets, ...rest }) => ({
    ...rest,
    uid: id,
    bulletsText: bullets.join("\n"),
  })),
});

export const internshipsFromForm = (rows: InternshipRow[] | undefined): InternshipItem[] =>
  (rows ?? []).filter(Boolean).map((row) => ({
    id: row.uid ?? newId(),
    company: row.company ?? "",
    role: row.role ?? "",
    location: row.location ?? "",
    startDate: row.startDate ?? "",
    endDate: row.endDate ?? "",
    bullets: textToBullets(row.bulletsText),
  }));

/* ---------- Education ---------- */

export const createEmptyEducation = (): EducationRow => ({
  uid: newId(),
  school: "",
  degree: "",
  branch: "",
  startDate: "",
  endDate: "",
  grade: "",
});

export const educationToForm = (items: EducationItem[]): EducationFormValues => ({
  items: items.map(({ id, ...rest }) => ({ ...rest, uid: id })),
});

export const educationFromForm = (rows: EducationRow[] | undefined): EducationItem[] =>
  (rows ?? []).filter(Boolean).map((row) => ({
    id: row.uid ?? newId(),
    school: row.school ?? "",
    degree: row.degree ?? "",
    branch: row.branch ?? "",
    startDate: row.startDate ?? "",
    endDate: row.endDate ?? "",
    grade: row.grade ?? "",
  }));

/* ---------- Projects ---------- */

export const createEmptyProject = (): ProjectRow => ({
  uid: newId(),
  name: "",
  link: "",
  techStack: "",
  description: "",
});

export const projectsToForm = (items: ProjectItem[]): ProjectsFormValues => ({
  items: items.map(({ id, ...rest }) => ({ ...rest, uid: id })),
});

export const projectsFromForm = (rows: ProjectRow[] | undefined): ProjectItem[] =>
  (rows ?? []).filter(Boolean).map((row) => ({
    id: row.uid ?? newId(),
    name: row.name ?? "",
    link: row.link ?? "",
    techStack: row.techStack ?? "",
    description: row.description ?? "",
  }));

/* ---------- Certifications ---------- */

export const createEmptyCertification = (): CertificationRow => ({
  uid: newId(),
  name: "",
  issuer: "",
  date: "",
  link: "",
});

export const certificationsToForm = (
  items: CertificationItem[]
): CertificationsFormValues => ({
  items: items.map(({ id, ...rest }) => ({ ...rest, uid: id })),
});

export const certificationsFromForm = (
  rows: CertificationRow[] | undefined
): CertificationItem[] =>
  (rows ?? []).filter(Boolean).map((row) => ({
    id: row.uid ?? newId(),
    name: row.name ?? "",
    issuer: row.issuer ?? "",
    date: row.date ?? "",
    link: row.link ?? "",
  }));