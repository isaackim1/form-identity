import { describe, it, expect } from "vitest";
import { BRAND_DIRECTIONS } from "../brand-direction";

const ALL_TYPE_CODES = [
  "OCLD", "OCRD", "OCLF", "OCRF",
  "OALD", "OARD", "OALF", "OARF",
  "ICLD", "ICRD", "ICLF", "ICRF",
  "IALD", "IARD", "IALF", "IARF",
];

describe("BRAND_DIRECTIONS taglines", () => {
  it("all 16 type codes are present", () => {
    for (const code of ALL_TYPE_CODES) {
      expect(BRAND_DIRECTIONS).toHaveProperty(code);
    }
    expect(Object.keys(BRAND_DIRECTIONS)).toHaveLength(16);
  });

  it("every entry has a non-empty tagline", () => {
    for (const [code, dir] of Object.entries(BRAND_DIRECTIONS)) {
      expect(dir.tagline, `${code} tagline is empty`).toBeTruthy();
      expect(dir.tagline.trim().length).toBeGreaterThan(0);
    }
  });

  it("all taglines are 8 words or fewer", () => {
    for (const [code, dir] of Object.entries(BRAND_DIRECTIONS)) {
      const wordCount = dir.tagline.trim().split(/\s+/).length;
      expect(wordCount, `${code} tagline "${dir.tagline}" exceeds 8 words`).toBeLessThanOrEqual(8);
    }
  });

  it("all taglines are unique", () => {
    const taglines = Object.values(BRAND_DIRECTIONS).map(d => d.tagline.toLowerCase().trim());
    const unique = new Set(taglines);
    expect(unique.size).toBe(taglines.length);
  });

  it("every entry has all required fields", () => {
    for (const [code, dir] of Object.entries(BRAND_DIRECTIONS)) {
      expect(dir.tagline, `${code} missing tagline`).toBeTruthy();
      expect(dir.energy, `${code} missing energy`).toBeTruthy();
      expect(dir.visual, `${code} missing visual`).toBeTruthy();
      expect(dir.voice, `${code} missing voice`).toBeTruthy();
      expect(dir.avoid, `${code} missing avoid`).toBeTruthy();
      expect(dir.bestFor, `${code} missing bestFor`).toBeTruthy();
      expect(dir.nextStep, `${code} missing nextStep`).toBeTruthy();
    }
  });
});
