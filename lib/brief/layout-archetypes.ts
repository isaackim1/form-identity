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
      { id: "type",      label: "Primary Type Zone",  treatment: "type",      flex: 65 },
      { id: "support",   label: "Supporting Zone",     treatment: "support",   flex: 35 },
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
      { id: "type",   label: "Weighted Type Zone",        treatment: "type",  flex: 55 },
      { id: "image",  label: "Image Partner",             treatment: "image", flex: 45 },
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

// ─── One-Pager portrait configs ───────────────────────────────────────────────

export interface OnePagerLayoutConfig {
  archetype: BlueprintArchetype;
  familyName: string;
  accentBarPx: number;
  sections: ZoneDefinition[];
  marginPct: number;
  columns: number;
  sectionColors: Record<string, PaletteRole>;
}

const OP_CONFIGS: Record<BlueprintArchetype, OnePagerLayoutConfig> = {
  "structured-authority": {
    archetype: "structured-authority",
    familyName: "Structured Authority",
    accentBarPx: 3,
    marginPct: 6,
    columns: 12,
    sections: [
      { id: "masthead",  label: "Masthead",              treatment: "fill",       flex: 8  },
      { id: "headline",  label: "Headline / Proposition", treatment: "type",      flex: 22 },
      { id: "content",   label: "Content Grid",           treatment: "support",   flex: 30 },
      { id: "proof",     label: "Proof / Credentials",    treatment: "type",      flex: 18 },
      { id: "cta",       label: "CTA Band",               treatment: "fill",      flex: 12 },
      { id: "footer",    label: "Footer Margin",          treatment: "whitespace", flex: 10 },
    ],
    sectionColors: {
      masthead: "dark",
      headline: "light",
      content: "secondary",
      proof: "white",
      cta: "primary",
      footer: "light",
    },
  },

  "warm-module": {
    archetype: "warm-module",
    familyName: "Warm Module",
    accentBarPx: 2,
    marginPct: 5,
    columns: 12,
    sections: [
      { id: "header",   label: "Brand Header",      treatment: "fill",       flex: 10 },
      { id: "headline", label: "Core Proposition",  treatment: "type",       flex: 20 },
      { id: "cards",    label: "Service Modules",   treatment: "image",      flex: 35 },
      { id: "proof",    label: "Warm Proof",        treatment: "type",       flex: 15 },
      { id: "cta",      label: "CTA & Contact",     treatment: "fill",       flex: 12 },
      { id: "footer",   label: "Footer",            treatment: "whitespace", flex: 8  },
    ],
    sectionColors: {
      header: "secondary",
      headline: "light",
      cards: "secondary",
      proof: "light",
      cta: "primary",
      footer: "light",
    },
  },

  "bold-impact": {
    archetype: "bold-impact",
    familyName: "Bold Impact",
    accentBarPx: 0,
    marginPct: 4,
    columns: 6,
    sections: [
      { id: "header",      label: "Minimal Header",  treatment: "whitespace", flex: 6  },
      { id: "hero",        label: "Impact Headline", treatment: "fill",       flex: 35 },
      { id: "proposition", label: "Proposition",     treatment: "type",       flex: 25 },
      { id: "services",    label: "Services",        treatment: "support",    flex: 18 },
      { id: "cta",         label: "CTA",             treatment: "fill",       flex: 10 },
      { id: "footer",      label: "Margin",          treatment: "whitespace", flex: 6  },
    ],
    sectionColors: {
      header: "light",
      hero: "primary",
      proposition: "dark",
      services: "secondary",
      cta: "dark",
      footer: "light",
    },
  },

  "minimal-precision": {
    archetype: "minimal-precision",
    familyName: "Minimal Precision",
    accentBarPx: 1,
    marginPct: 0,
    columns: 12,
    sections: [
      { id: "margin-top", label: "Deep Margin",     treatment: "whitespace", flex: 12 },
      { id: "logotype",   label: "Name / Logotype", treatment: "type",       flex: 8  },
      { id: "spacer",     label: "Breathing Zone",  treatment: "whitespace", flex: 8  },
      { id: "headline",   label: "Core Statement",  treatment: "type",       flex: 20 },
      { id: "content",    label: "Content Column",  treatment: "type",       flex: 24 },
      { id: "spacer2",    label: "Section Rest",    treatment: "whitespace", flex: 8  },
      { id: "contact",    label: "Contact",         treatment: "support",    flex: 10 },
      { id: "margin-bot", label: "Deep Margin",     treatment: "whitespace", flex: 10 },
    ],
    sectionColors: {
      "margin-top": "light",
      logotype: "white",
      spacer: "white",
      headline: "white",
      content: "white",
      spacer2: "white",
      contact: "light",
      "margin-bot": "light",
    },
  },

  "intimate-editorial": {
    archetype: "intimate-editorial",
    familyName: "Intimate Editorial",
    accentBarPx: 2,
    marginPct: 5,
    columns: 9,
    sections: [
      { id: "header",    label: "Editorial Header", treatment: "fill",       flex: 8  },
      { id: "accent",    label: "Accent Rule",      treatment: "fill",       flex: 2  },
      { id: "headline",  label: "Personal Headline",treatment: "type",       flex: 22 },
      { id: "story",     label: "About / Story",    treatment: "type",       flex: 20 },
      { id: "offerings", label: "Offerings",        treatment: "image",      flex: 18 },
      { id: "cta",       label: "Contact",          treatment: "type",       flex: 14 },
      { id: "footer",    label: "Quiet Margin",     treatment: "whitespace", flex: 16 },
    ],
    sectionColors: {
      header: "secondary",
      accent: "primary",
      headline: "light",
      story: "light",
      offerings: "secondary",
      cta: "light",
      footer: "light",
    },
  },
};

export function getOnePagerLayoutConfig(code: BrandTypeCode): OnePagerLayoutConfig {
  const familyId = getBrandTypeFamily(code);
  return OP_CONFIGS[familyId];
}
