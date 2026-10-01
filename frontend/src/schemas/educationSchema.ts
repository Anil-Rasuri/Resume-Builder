import { z } from "zod";

export const educationItemSchema = z.object({
  uid: z.string(),
  school: z.string().trim().min(1, "School or college is required"),
  degree: z.string().trim().min(1, "Degree is required"),
  branch: z.string().trim().max(80, "Keep it under 80 characters"),
  startDate: z.string().trim().max(30, "Too long"),
  endDate: z.string().trim().max(30, "Too long"),
  grade: z.string().trim().max(40, "Too long"),
});

export const educationSchema = z.object({
  items: z.array(educationItemSchema),
});

export type EducationFormValues = z.infer<typeof educationSchema>;