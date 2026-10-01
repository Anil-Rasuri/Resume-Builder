import type { ComponentType } from "react";
import ClassicTemplate from "@/components/templates/ClassicTemplate";
import ModernTemplate from "@/components/templates/ModernTemplate";
import type { TemplateProps } from "@/components/templates/types";
import type { TemplateId } from "@/types/resume";

interface TemplateMeta {
  id: TemplateId;
  name: string;
  description: string;
  component: ComponentType<TemplateProps>;
}

export const TEMPLATES: Record<TemplateId, TemplateMeta> = {
  classic: {
    id: "classic",
    name: "Classic",
    description: "Traditional, black and white",
    component: ClassicTemplate,
  },
  modern: {
    id: "modern",
    name: "Modern",
    description: "Clean with an indigo accent",
    component: ModernTemplate,
  },
};

export const TEMPLATE_LIST = Object.values(TEMPLATES);