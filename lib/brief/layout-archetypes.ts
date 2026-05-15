import type { BrandTypeCode } from "@/lib/brand-types";
import { getBrandTypeFamily } from "@/lib/structural-system/brand-type-family-map";
import type { StructuralFamilyId } from "@/lib/structural-system/structural-families";

export type BlueprintArchetype = StructuralFamilyId;

export type ZoneTreatment = "type" | "fill" | "image" | "whitespace" | "support";

export type PaletteRole = "primary" | "secondary" | "light" | "dark" | "white";

export interface ZoneDefinition {
  id: string;
  label: string;
  treatment: ZoneTreatment;
  flex: number;
}

export interface ArchetypeLayoutConfig {
  archetype: BlueprintArchetype;
  familyName: string;
  accentBarPx: number;
  zones: ZoneDefinition[];
  gutterPct: number;
  marginPct: number;
  columns: number;
  zoneColors: Record<string, PaletteRole>;
}

const CONFIGS: Record<BlueprintArchetype, ArchetypeLayoutConfig> = {
  "structured-authority": {
    archetype: "structured-authority",
    familyName: "Structured Authority",
    accentBarPx: 3,
    zones: [
      { id: "type",      label: "Primary Type Zone",  treatment: "type",      flex: 60 },
      { id: "support",   label: "Supporting Zone",     treatment: "support",   flex: 40 },
    ],
    gutterPct: 0,
    marginPct: 6,
    columns: 12,
    zoneColors: { type: "light", support: "secondary" },
  },

  "warm-module": {
    archetype: "warm-module",
    familyName: "Warm Module",
    accentBarPx: 2,
    zones: [
      { id: "type",   label: "Weighted Type Zone",        treatment: "type",  flex: 58 },
      { id: "image",  label: "Image Partner",             treatment: "image", flex: 42 },
    ],
    gutterPct: 0,
    marginPct: 5,
    columns: 12,
    zoneColors: { type: "light", image: "secondary" },
  },

  "bold-impact": {
    archetype: "bold-impact",
    familyName: "Bold Impact",
    accentBarPx: 0,
    zones: [
      { id: "fill",   label: "Primary Fill Zone",  treatment: "fill", flex: 67 },
      { id: "type",   label: "Type on Dark",        treatment: "type", flex: 33 },
    ],
    gutterPct: 0,
    marginPct: 4,
    columns: 6,
    zoneColors: { fill: "primary", type: "dark" },
  },

  "minimal-precision": {
    archetype: "minimal-precision",
    familyName: "Minimal Precision",
    accentBarPx: 1,
    zones: [
      { id: "margin-l", label: "Deep Margin",              treatment: "whitespace", flex: 22 },
      { id: "type",     label: "Constrained Type Column",  treatment: "type",       flex: 52 },
      { id: "margin-r", label: "Deep Margin",              treatment: "whitespace", flex: 26 },
    ],
    gutterPct: 0,
    marginPct: 0,
    columns: 12,
    zoneColors: { "margin-l": "light", type: "white", "margin-r": "light" },
  },

  "intimate-editorial": {
    archetype: "intimate-editorial",
    familyName: "Intimate Editorial",
    accentBarPx: 2,
    zones: [
      { id: "type",   label: "Editorial Type Zone",      treatment: "type",  flex: 56 },
      { id: "image",  label: "Image Editorial Partner",  treatment: "image", flex: 44 },
    ],
    gutterPct: 0,
    marginPct: 5,
    columns: 9,
    zoneColors: { type: "light", image: "secondary" },
  },
};

export function getArchetypeLayoutConfig(code: BrandTypeCode): ArchetypeLayoutConfig {
  const familyId = getBrandTypeFamily(code);
  return CONFIGS[familyId];
}
