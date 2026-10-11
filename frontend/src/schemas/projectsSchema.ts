import { z } from "zod";

export const projectItemSchema = z.object({
  uid: z.string(),
  name: z.string().trim().min(1, "Project name is required"),
  link: z.string().trim().max(150, "Link is too long"),
  techStack: z.string().trim().max(150, "Keep it under 150 characters"),
  bulletsText: z.string().max(2000, "Keep it under 2000 characters"),
});

export const projectsSchema = z.object({
  items: z.array(projectItemSchema),
});

export type ProjectsFormValues = z.infer<typeof projectsSchema>;
