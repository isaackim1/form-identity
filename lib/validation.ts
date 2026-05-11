import { z } from "zod";

export const VALID_BRAND_TYPE_CODES = [
  "OCLD", "OCRD", "OCLF", "OCRF",
  "OALD", "OARD", "OALF", "OARF",
  "ICLD", "ICRD", "ICLF", "ICRF",
  "IALD", "IARD", "IALF", "IARF",
] as const;

export const resultCreationSchema = z.object({
  brand_type_code: z.enum(VALID_BRAND_TYPE_CODES),
  industry: z.string().optional(),
  answers: z.any().optional(),
  axis_scores: z.any().optional(),
});

export const emailCaptureSchema = z.object({
  email: z.string().email(),
  brand_type_code: z.enum(VALID_BRAND_TYPE_CODES),
  industry: z.string().optional(),
  answers: z.any().optional(),
  result_slug: z.string().optional(),
  source: z.string().optional(),
});

export type ResultCreationInput = z.infer<typeof resultCreationSchema>;
export type EmailCaptureInput = z.infer<typeof emailCaptureSchema>;
