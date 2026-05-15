import type { BrandTypeCode } from "@/lib/brand-types";
import { STRUCTURAL_FAMILIES, type StructuralFamilyId } from "./structural-families";
import { getBrandTypeFamily } from "./brand-type-family-map";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface StructuralSpacing {
  base: number;
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  "2xl": number;
  "3xl": number;
  "4xl": number;
  margin: number;
  gutter: number;
  sectionGap: number;
  componentGap: number;
}

export interface StructuralTypeScale {
  ratio: number;
  body: number;
  caption: number;
  label: number;
  h3: number;
  h2: number;
  h1: number;
  display: number;
}

export interface StructuralProfile {
  familyId: StructuralFamilyId;
  spacing: StructuralSpacing;
  typeScale: StructuralTypeScale;
  columns: number;
  gutterPx: number;
  marginPx: number;
  columnSplitRatio: string;
  gridStrictness: "low" | "medium" | "high";
  asymmetryPermitted: boolean;
  primaryAlignment: "left" | "center" | "dynamic";
  dominantElement: "type" | "image" | "fill" | "whitespace";
  density: "low" | "medium" | "high";
  hierarchyDepth: number;
}

// ─── Computation ──────────────────────────────────────────────────────────────

function computeSpacing(
  baseUnit: number,
  gutterMultiplier: number,
  marginMultiplier: number,
  sectionGapMultiplier: number,
  componentGapMultiplier: number,
): StructuralSpacing {
  const u = baseUnit;
  return {
    base: u,
    xs: Math.round(u * 0.5),
    sm: u,
    md: u * 2,
    lg: u * 3,
    xl: u * 4,
    "2xl": u * 6,
    "3xl": u * 8,
    "4xl": u * 12,
    margin: u * marginMultiplier,
    gutter: u * gutterMultiplier,
    sectionGap: u * sectionGapMultiplier,
    componentGap: u * componentGapMultiplier,
  };
}

function computeTypeScale(ratio: number, bodyBasePx: number): StructuralTypeScale {
  const r = ratio;
  const b = bodyBasePx;
  return {
    ratio: r,
    body: b,
    caption: Math.round(b / r),
    label: Math.round(b * Math.sqrt(r)),
    h3: Math.round(b * r),
    h2: Math.round(b * r * r),
    h1: Math.round(b * r * r * r),
    display: Math.round(b * r * r * r * r),
  };
}

// ─── Public API ───────────────────────────────────────────────────────────────

export function getStructuralProfile(code: BrandTypeCode): StructuralProfile {
  const familyId = getBrandTypeFamily(code);
  const family = STRUCTURAL_FAMILIES[familyId];

  const spacing = computeSpacing(
    family.baseUnit,
    family.gutterMultiplier,
    family.marginMultiplier,
    family.sectionGapMultiplier,
    family.componentGapMultiplier,
  );

  const typeScale = computeTypeScale(family.typeScaleRatio, family.bodyBasePx);

  return {
    familyId,
    spacing,
    typeScale,
    columns: family.columnCount,
    gutterPx: spacing.gutter,
    marginPx: spacing.margin,
    columnSplitRatio: family.columnSplitRatio,
    gridStrictness: family.gridStrictness,
    asymmetryPermitted: family.asymmetryPermitted,
    primaryAlignment: family.primaryAlignment,
    dominantElement: family.dominantElement,
    density: family.density,
    hierarchyDepth: family.hierarchyDepth,
  };
}
