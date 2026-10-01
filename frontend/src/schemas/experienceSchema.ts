import { z } from "zod";

export const experienceItemSchema = z.object({
  uid: z.string(),
  company: z.string().trim().min(1, "Company is required"),
  role: z.string().trim().min(1, "Role is required"),
  location: z.string().trim().max(80, "Keep it under 80 characters"),
  startDate: z.string().trim().max(30, "Too long"),
  endDate: z.string().trim().max(30, "Too long"),
  current: z.boolean(),
  bulletsText: z.string().max(2000, "Keep it under 2000 characters"),
});

export const experienceSchema = z.object({
  items: z.array(experienceItemSchema),
});

export type ExperienceFormValues = z.infer<typeof experienceSchema>;