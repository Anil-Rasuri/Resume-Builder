import { displayUrl, toHref } from "@/lib/links";
import type { PersonalInfo, Resume } from "@/types/resume";

export interface ContactItem {
  label: string;
  href?: string;
}

export const dateRange = (start: string, end: string): string =>
  [start, end].filter(Boolean).join(" – ");

export const contactItems = (p: PersonalInfo): ContactItem[] => {
  const items: ContactItem[] = [];
  if (p.email) items.push({ label: p.email, href: `mailto:${p.email}` });
  if (p.phone) items.push({ label: p.phone, href: `tel:${p.phone.replace(/[^\d+]/g, "")}` });
  if (p.location) items.push({ label: p.location });
  if (p.linkedin) items.push({ label: displayUrl(p.linkedin), href: toHref(p.linkedin) });
  if (p.github) items.push({ label: displayUrl(p.github), href: toHref(p.github) });
  if (p.website) items.push({ label: displayUrl(p.website), href: toHref(p.website) });
  return items;
};

export const hasAnySkills = (skills: Resume["skills"]): boolean =>
  skills.technical.length + skills.soft.length + skills.other.length > 0;