import { z } from "zod";

export const personalSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name"),
  jobTitle: z.string().trim().max(80, "Keep the title under 80 characters"),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z
    .string()
    .trim()
    .refine((v) => v === "" || /^[+()\d\s-]{7,20}$/.test(v), {
      message: "Please enter a valid phone number",
    }),
  location: z.string().trim().max(80, "Keep the location under 80 characters"),
  linkedin: z.string().trim().max(120, "Link is too long"),
  website: z.string().trim().max(120, "Link is too long"),
  summary: z.string().trim().max(500, "Summary must be 500 characters or less"),
});

export type PersonalFormValues = z.infer<typeof personalSchema>;