import { z } from "zod";

const ColourOptionSchema = z.object({
  id: z.number(),
  name: z.string(),
  hex: z.string(),
  tag: z.string(),
  why: z.string(),
  coverage: z.string(),
  wcag_vs_warm_white: z.string(),
  cmyk_delta_e: z.number(),
});

const BrandTypeSchema = z.object({
  name: z.string(),
  character: z.string(),
  colour_direction: z.string(),
  extended: z.string().optional(),
  colour_logic: z.record(z.string(), z.string()).optional(),
});

export const SystemSchema = z.object({
  meta: z.object({
    name: z.string(),
    version: z.string(),
    description: z.string(),
    axes: z.record(
      z.string(),
      z.object({
        name: z.string(),
        poles: z.array(z.string()),
        code: z.array(z.string()),
      }),
    ),
    scoring: z.object({
      range: z.array(z.number()),
      midpoint: z.number(),
      max_distance: z.number(),
      strength_thresholds: z.record(z.string(), z.number()),
    }),
  }),
  brand_types: z.record(z.string(), BrandTypeSchema),
  colour_options: z.record(
    z.string(),
    z.object({ options: z.array(ColourOptionSchema) }),
  ),
});

export type BrandSystem = z.infer<typeof SystemSchema>;
export type BrandType = z.infer<typeof BrandTypeSchema>;
export type ColourOption = z.infer<typeof ColourOptionSchema>;
