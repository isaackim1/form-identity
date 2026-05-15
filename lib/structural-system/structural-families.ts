import type { BrandTypeCode } from "@/lib/brand-types";

// ─── Types ────────────────────────────────────────────────────────────────────

export type StructuralFamilyId =
  | "structured-authority"
  | "warm-module"
  | "bold-impact"
  | "minimal-precision"
  | "intimate-editorial";

export interface StructuralFamily {
  id: StructuralFamilyId;
  name: string;
  description: string;

  // Grid
  baseUnit: 8;
  columnCount: number;
  gutterMultiplier: number;
  marginMultiplier: number;
  columnSplitRatio: string;
  gridStrictness: "low" | "medium" | "high";
  asymmetryPermitted: boolean;
  asymmetryCondition: string | null;

  // Type scale
  typeScaleRatio: number;
  bodyBasePx: number;
  hierarchyDepth: number;

  // Rhythm
  density: "low" | "medium" | "high";
  sectionGapMultiplier: number;
  componentGapMultiplier: number;

  // Visual direction
  primaryAlignment: "left" | "center" | "dynamic";
  headlineAlignment: "left" | "center" | "dynamic";
  dominantElement: "type" | "image" | "fill" | "whitespace";
  imageZonePosition: string;

  // Member types
  brandTypes: BrandTypeCode[];
}

// ─── Family definitions ───────────────────────────────────────────────────────

export const STRUCTURAL_FAMILIES: Record<StructuralFamilyId, StructuralFamily> = {
  "structured-authority": {
    id: "structured-authority",
    name: "Structured Authority",
    description:
      "Swiss-grid discipline with commanding typographic hierarchy. Every element earns its position; whitespace is structural, not decorative. Perfect Fourth type scale creates decisive contrast between levels.",
    baseUnit: 8,
    columnCount: 12,
    gutterMultiplier: 2,
    marginMultiplier: 6,
    columnSplitRatio: "6/6",
    gridStrictness: "high",
    asymmetryPermitted: false,
    asymmetryCondition: null,
    typeScaleRatio: 1.333,
    bodyBasePx: 10,
    hierarchyDepth: 4,
    density: "medium",
    sectionGapMultiplier: 8,
    componentGapMultiplier: 3,
    primaryAlignment: "left",
    headlineAlignment: "left",
    dominantElement: "type",
    imageZonePosition: "right",
    brandTypes: ["OCLD", "OALD", "IALD"],
  },

  "warm-module": {
    id: "warm-module",
    name: "Warm Module",
    description:
      "Modular grid with a human bias. Columns allow a slight weight shift to create warmth without losing structure. Major Third scale keeps hierarchy approachable; generous gutters give elements room to breathe.",
    baseUnit: 8,
    columnCount: 12,
    gutterMultiplier: 3,
    marginMultiplier: 5,
    columnSplitRatio: "7/5",
    gridStrictness: "medium",
    asymmetryPermitted: true,
    asymmetryCondition: "column-weight shift only",
    typeScaleRatio: 1.25,
    bodyBasePx: 11,
    hierarchyDepth: 3,
    density: "medium",
    sectionGapMultiplier: 6,
    componentGapMultiplier: 3,
    primaryAlignment: "left",
    headlineAlignment: "left",
    dominantElement: "type",
    imageZonePosition: "integrated",
    brandTypes: ["OCRD", "OCRF", "OARD"],
  },

  "bold-impact": {
    id: "bold-impact",
    name: "Bold Impact",
    description:
      "Sparse columns with maximum visual contrast. Augmented Fourth type scale generates dramatic jumps between display and body. Generous section gaps let each zone command full attention. Asymmetry is an intentional compositional statement.",
    baseUnit: 8,
    columnCount: 6,
    gutterMultiplier: 2,
    marginMultiplier: 4,
    columnSplitRatio: "4/2",
    gridStrictness: "medium",
    asymmetryPermitted: true,
    asymmetryCondition: "deliberate visual-weight contrast",
    typeScaleRatio: 1.414,
    bodyBasePx: 11,
    hierarchyDepth: 3,
    density: "low",
    sectionGapMultiplier: 10,
    componentGapMultiplier: 4,
    primaryAlignment: "left",
    headlineAlignment: "left",
    dominantElement: "fill",
    imageZonePosition: "dominant",
    brandTypes: ["OALF", "OARF", "OCLF"],
  },

  "minimal-precision": {
    id: "minimal-precision",
    name: "Minimal Precision",
    description:
      "Maximum margin, minimum noise. Strict 12-column grid with deep margins lets type occupy only what it needs. Minor Third scale preserves refined hierarchy without shouting. Whitespace is the primary design element.",
    baseUnit: 8,
    columnCount: 12,
    gutterMultiplier: 2,
    marginMultiplier: 8,
    columnSplitRatio: "8/4",
    gridStrictness: "high",
    asymmetryPermitted: false,
    asymmetryCondition: null,
    typeScaleRatio: 1.2,
    bodyBasePx: 10,
    hierarchyDepth: 3,
    density: "low",
    sectionGapMultiplier: 10,
    componentGapMultiplier: 4,
    primaryAlignment: "left",
    headlineAlignment: "left",
    dominantElement: "whitespace",
    imageZonePosition: "contained",
    brandTypes: ["ICLD", "ICLF", "IALF"],
  },

  "intimate-editorial": {
    id: "intimate-editorial",
    name: "Intimate Editorial",
    description:
      "Nine-column editorial grid with organic rhythm. Content drives spacing; the grid is a guide, not a cage. Major Third scale at a readable body size creates a conversational tone. Images are editorial partners, not decorations.",
    baseUnit: 8,
    columnCount: 9,
    gutterMultiplier: 3,
    marginMultiplier: 5,
    columnSplitRatio: "5/4",
    gridStrictness: "low",
    asymmetryPermitted: true,
    asymmetryCondition: "organic — let content breathe",
    typeScaleRatio: 1.25,
    bodyBasePx: 11,
    hierarchyDepth: 3,
    density: "low",
    sectionGapMultiplier: 7,
    componentGapMultiplier: 3,
    primaryAlignment: "left",
    headlineAlignment: "left",
    dominantElement: "whitespace",
    imageZonePosition: "editorial",
    brandTypes: ["ICRD", "ICRF", "IARD", "IARF"],
  },
};
