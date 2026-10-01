import { z } from "zod";

export const internshipItemSchema = z.object({
  uid: z.string(),
  role: z.string().trim().min(1, "Role is required"),
  company: z.string().trim().min(1, "Company is required"),
  location: z.string().trim().max(80, "Keep it under 80 characters"),
  startDate: z.string().trim().max(30, "Too long"),
  endDate: z.string().trim().max(30, "Too long"),
  bulletsText: z.string().max(2000, "Keep it under 2000 characters"),
});

export const internshipsSchema = z.object({
  items: z.array(internshipItemSchema),
});

export type InternshipsFormValues = z.infer<typeof internshipsSchema>;