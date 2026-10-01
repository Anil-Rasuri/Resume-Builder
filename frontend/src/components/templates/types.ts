import type { Resume, TemplateId } from "@/types/resume";

export type Layout = "single" | "side-left" | "side-right";

export interface TemplateMeta {
  id: TemplateId;
  name: string;
  description: string;
  layout: Layout;
  /** Sidebar layouts only: is the name block above both columns, or inside the main column? */
  headerIn: "top" | "main";
  separator: string;
  summaryTitle: string;
  accent: string; // used for the picker thumbnail
}

export interface TemplateProps {
  resume: Resume;
  template: TemplateMeta;
}