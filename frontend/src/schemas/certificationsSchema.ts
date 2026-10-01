import { z } from "zod";

export const certificationItemSchema = z.object({
  uid: z.string(),
  name: z.string().trim().min(1, "Certification name is required"),
  issuer: z.string().trim().max(100, "Keep it under 100 characters"),
  date: z.string().trim().max(30, "Too long"),
  link: z.string().trim().max(200, "Link is too long"),
});

export const certificationsSchema = z.object({
  items: z.array(certificationItemSchema),
});

export type CertificationsFormValues = z.infer<typeof certificationsSchema>;