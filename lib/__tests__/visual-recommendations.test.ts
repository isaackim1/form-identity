import { describe, it, expect } from "vitest";
import { BRAND_VISUAL_RECOMMENDATIONS } from "../brand-visual-recommendations";
import type { Palette } from "../brand-visual-recommendations";

const ALL_TYPE_CODES = [
  "OCLD", "OCRD", "OCLF", "OCRF",
  "OALD", "OARD", "OALF", "OARF",
  "ICLD", "ICRD", "ICLF", "ICRF",
  "IALD", "IARD", "IALF", "IARF",
];

const VALID_IMAGE_MOODS = [
  "vivid", "structured", "quiet", "intimate",
  "night", "tactile", "editorial", "communal",
] as const;

const VALID_TYPOGRAPHY_WEIGHTS = ["light", "regular", "medium", "bold"] as const;

const HEX_RE = /^#[0-9A-Fa-f]{6}$/;

function validatePalette(palette: Palette, label: string) {
  const entries = [
    palette.background,
    palette.ink,
    palette.accent,
    palette.border,
    palette.secondary,
  ];
  if (palette.alternateAccent) entries.push(palette.alternateAccent);
  if (palette.quietAccent) entries.push(palette.quietAccent);

  for (const entry of entries) {
    expect(entry.role, `${label} entry missing role`).toBeTruthy();
    expect(entry.name, `${label} entry missing name`).toBeTruthy();
    expect(entry.hex, `${label} entry missing hex`).toMatch(HEX_RE);
    expect(entry.usage, `${label} entry missing usage`).toBeTruthy();
  }
  expect(palette.mood, `${label} missing mood`).toBeTruthy();
}

describe("BRAND_VISUAL_RECOMMENDATIONS", () => {
  it("covers all 16 type codes", () => {
    for (const code of ALL_TYPE_CODES) {
      expect(BRAND_VISUAL_RECOMMENDATIONS).toHaveProperty(code);
    }
    expect(Object.keys(BRAND_VISUAL_RECOMMENDATIONS)).toHaveLength(16);
  });

  it("every type has a default and alternate palette", () => {
    for (const [code, rec] of Object.entries(BRAND_VISUAL_RECOMMENDATIONS)) {
      expect(rec.palette.default, `${code} missing default palette`).toBeTruthy();
      expect(rec.palette.alternate, `${code} missing alternate palette`).toBeTruthy();
    }
  });

  it("all palette hex values are valid 6-digit hex colours", () => {
    for (const [code, rec] of Object.entries(BRAND_VISUAL_RECOMMENDATIONS)) {
      validatePalette(rec.palette.default, `${code} default`);
      validatePalette(rec.palette.alternate, `${code} alternate`);
      if (rec.palette.quiet) validatePalette(rec.palette.quiet, `${code} quiet`);
    }
  });

  it("every type has at least one quietAccent or alternateAccent", () => {
    for (const [code, rec] of Object.entries(BRAND_VISUAL_RECOMMENDATIONS)) {
      const hasExtra =
        rec.palette.default.quietAccent ||
        rec.palette.default.alternateAccent ||
        rec.palette.alternate.quietAccent ||
        rec.palette.alternate.alternateAccent;
      expect(hasExtra, `${code} has no quietAccent or alternateAccent in either palette`).toBeTruthy();
    }
  });

  it("every type has freeFonts and premiumFonts arrays", () => {
    for (const [code, rec] of Object.entries(BRAND_VISUAL_RECOMMENDATIONS)) {
      expect(Array.isArray(rec.typography.freeFonts), `${code} freeFonts not array`).toBe(true);
      expect(rec.typography.freeFonts.length, `${code} freeFonts empty`).toBeGreaterThan(0);
      expect(Array.isArray(rec.typography.premiumFonts), `${code} premiumFonts not array`).toBe(true);
      expect(rec.typography.premiumFonts.length, `${code} premiumFonts empty`).toBeGreaterThan(0);
    }
  });

  it("every type has a valid typographyWeight", () => {
    for (const [code, rec] of Object.entries(BRAND_VISUAL_RECOMMENDATIONS)) {
      expect(
        VALID_TYPOGRAPHY_WEIGHTS,
        `${code} typographyWeight invalid`
      ).toContain(rec.typography.typographyWeight);
    }
  });

  it("every type has fontPersonality and typographicUse", () => {
    for (const [code, rec] of Object.entries(BRAND_VISUAL_RECOMMENDATIONS)) {
      expect(rec.typography.fontPersonality, `${code} missing fontPersonality`).toBeTruthy();
      expect(rec.typography.typographicUse, `${code} missing typographicUse`).toBeTruthy();
    }
  });

  it("every type has imageMood, imageSubjects, imageTreatment, imageAvoid", () => {
    for (const [code, rec] of Object.entries(BRAND_VISUAL_RECOMMENDATIONS)) {
      expect(
        VALID_IMAGE_MOODS,
        `${code} imageMood invalid`
      ).toContain(rec.image.imageMood);
      expect(rec.image.imageSubjects.length, `${code} imageSubjects empty`).toBeGreaterThan(0);
      expect(rec.image.imageTreatment, `${code} missing imageTreatment`).toBeTruthy();
      expect(rec.image.imageAvoid.length, `${code} imageAvoid empty`).toBeGreaterThan(0);
    }
  });

  it("not all types share the same imageMood", () => {
    const moods = Object.values(BRAND_VISUAL_RECOMMENDATIONS).map(r => r.image.imageMood);
    const unique = new Set(moods);
    expect(unique.size).toBeGreaterThan(3);
  });

  it("outward types do not all share the same default accent hex", () => {
    const outwardCodes = ["OCLD", "OCRD", "OCLF", "OCRF", "OALD", "OARD", "OALF", "OARF"];
    const accents = outwardCodes.map(c => BRAND_VISUAL_RECOMMENDATIONS[c].palette.default.accent.hex);
    const unique = new Set(accents);
    expect(unique.size).toBe(outwardCodes.length);
  });

  it("inward types do not all share the same default accent hex", () => {
    const inwardCodes = ["ICLD", "ICRD", "ICLF", "ICRF", "IALD", "IARD", "IALF", "IARF"];
    const accents = inwardCodes.map(c => BRAND_VISUAL_RECOMMENDATIONS[c].palette.default.accent.hex);
    const unique = new Set(accents);
    expect(unique.size).toBe(inwardCodes.length);
  });

  it("all 16 default accents are distinct", () => {
    const accents = ALL_TYPE_CODES.map(c => BRAND_VISUAL_RECOMMENDATIONS[c].palette.default.accent.hex);
    const unique = new Set(accents);
    expect(unique.size).toBe(16);
  });

  it("every type has avoidDesignChoices", () => {
    for (const [code, rec] of Object.entries(BRAND_VISUAL_RECOMMENDATIONS)) {
      expect(rec.avoidDesignChoices.length, `${code} avoidDesignChoices empty`).toBeGreaterThan(0);
    }
  });
});
