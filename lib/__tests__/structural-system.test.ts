import { describe, it, expect } from "vitest";
import { STRUCTURAL_FAMILIES } from "@/lib/structural-system/structural-families";
import { getBrandTypeFamily } from "@/lib/structural-system/brand-type-family-map";
import { getStructuralProfile } from "@/lib/structural-system/structural-profile";
import { getFullTemplateContext } from "@/lib/design-system/template-mapping";

const ALL_CODES = [
  "OCLD", "OCRD", "OCLF", "OCRF",
  "OALD", "OARD", "OALF", "OARF",
  "ICLD", "ICRD", "ICLF", "ICRF",
  "IALD", "IARD", "IALF", "IARF",
] as const;

describe("structural families", () => {
  it("every family has at least one brand type", () => {
    for (const family of Object.values(STRUCTURAL_FAMILIES)) {
      expect(family.brandTypes.length).toBeGreaterThan(0);
    }
  });

  it("brand types across all families total exactly 16 with no duplicates", () => {
    const all = Object.values(STRUCTURAL_FAMILIES).flatMap((f) => f.brandTypes);
    expect(all.length).toBe(16);
    expect(new Set(all).size).toBe(16);
  });

  it("all 16 brand type codes are covered", () => {
    const covered = new Set(
      Object.values(STRUCTURAL_FAMILIES).flatMap((f) => f.brandTypes),
    );
    for (const code of ALL_CODES) {
      expect(covered.has(code)).toBe(true);
    }
  });
});

describe("getBrandTypeFamily", () => {
  it("maps every brand type code to exactly one family", () => {
    for (const code of ALL_CODES) {
      const familyId = getBrandTypeFamily(code);
      expect(familyId).toBeDefined();
      expect(STRUCTURAL_FAMILIES[familyId]).toBeDefined();
    }
  });

  it("maps structured-authority types correctly", () => {
    expect(getBrandTypeFamily("OCLD")).toBe("structured-authority");
    expect(getBrandTypeFamily("OALD")).toBe("structured-authority");
    expect(getBrandTypeFamily("IALD")).toBe("structured-authority");
  });

  it("maps intimate-editorial types correctly", () => {
    expect(getBrandTypeFamily("ICRD")).toBe("intimate-editorial");
    expect(getBrandTypeFamily("ICRF")).toBe("intimate-editorial");
    expect(getBrandTypeFamily("IARD")).toBe("intimate-editorial");
    expect(getBrandTypeFamily("IARF")).toBe("intimate-editorial");
  });
});

describe("getStructuralProfile", () => {
  it("returns a profile for every brand type code", () => {
    for (const code of ALL_CODES) {
      const profile = getStructuralProfile(code);
      expect(profile).toBeDefined();
      expect(profile.familyId).toBeDefined();
    }
  });

  it("spacing values are all positive numbers", () => {
    const profile = getStructuralProfile("OCLD");
    for (const [, val] of Object.entries(profile.spacing)) {
      expect(typeof val).toBe("number");
      expect(val).toBeGreaterThan(0);
    }
  });

  it("type scale values are numeric and strictly ascending", () => {
    for (const code of ALL_CODES) {
      const { typeScale } = getStructuralProfile(code);
      expect(typeof typeScale.caption).toBe("number");
      expect(typeof typeScale.body).toBe("number");
      expect(typeof typeScale.h1).toBe("number");
      expect(typeof typeScale.display).toBe("number");
      expect(typeScale.caption).toBeLessThan(typeScale.body);
      expect(typeScale.body).toBeLessThan(typeScale.h3);
      expect(typeScale.h3).toBeLessThan(typeScale.h2);
      expect(typeScale.h2).toBeLessThan(typeScale.h1);
      expect(typeScale.h1).toBeLessThan(typeScale.display);
    }
  });

  it("computed margin equals baseUnit × marginMultiplier", () => {
    const profile = getStructuralProfile("OCLD"); // structured-authority: base=8, marginMultiplier=6
    expect(profile.marginPx).toBe(48);
  });

  it("computed gutter equals baseUnit × gutterMultiplier", () => {
    const profile = getStructuralProfile("ICRD"); // intimate-editorial: base=8, gutterMultiplier=3
    expect(profile.gutterPx).toBe(24);
  });

  it("minimal-precision uses deep margins (64px)", () => {
    const profile = getStructuralProfile("ICLD"); // minimal-precision: base=8, marginMultiplier=8
    expect(profile.marginPx).toBe(64);
    expect(profile.dominantElement).toBe("whitespace");
  });

  it("bold-impact has dominant fill and asymmetry permitted", () => {
    const profile = getStructuralProfile("OALF");
    expect(profile.dominantElement).toBe("fill");
    expect(profile.asymmetryPermitted).toBe(true);
  });
});

describe("getFullTemplateContext", () => {
  it("returns structuralProfile for a valid brand type code", () => {
    const ctx = getFullTemplateContext("linkedin-banner", "OCLD");
    expect(ctx.structuralProfile).not.toBeNull();
    expect(ctx.structuralProfile?.familyId).toBe("structured-authority");
  });

  it("returns null structuralProfile for an invalid brand type code", () => {
    const ctx = getFullTemplateContext("linkedin-banner", "XXXX");
    expect(ctx.structuralProfile).toBeNull();
  });

  it("includes the existing TemplateRecommendation fields", () => {
    const ctx = getFullTemplateContext("email signature", "IARF");
    expect(ctx.format).toBeDefined();
    expect(ctx.archetype).toBeDefined();
    expect(ctx.summary).toBeTruthy();
  });
});
