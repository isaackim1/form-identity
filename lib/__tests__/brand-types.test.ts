import { describe, it, expect } from "vitest";
import {
  BRAND_TYPES,
  ALL_BRAND_TYPE_CODES,
  getBrandType,
  getAllBrandTypes,
  isBrandTypeCode,
  type BrandTypeCode,
} from "../brand-types";

const VALID_CODES: BrandTypeCode[] = [
  "OCLD", "OCRD", "OCLF", "OCRF",
  "OALD", "OARD", "OALF", "OARF",
  "ICLD", "ICRD", "ICLF", "ICRF",
  "IALD", "IARD", "IALF", "IARF",
];

const INVALID_OLD_CODES = ["ORLD", "ORLF", "OARL", "ORLD", "OCRL"];

// ─── Completeness ─────────────────────────────────────────────────────────────

describe("BRAND_TYPES record", () => {
  it("contains exactly 16 entries", () => {
    expect(Object.keys(BRAND_TYPES)).toHaveLength(16);
  });

  it("contains all 16 valid type codes", () => {
    for (const code of VALID_CODES) {
      expect(BRAND_TYPES).toHaveProperty(code);
    }
  });

  it("does not contain any invalid old codes", () => {
    for (const code of INVALID_OLD_CODES) {
      expect(BRAND_TYPES).not.toHaveProperty(code);
    }
  });
});

describe("ALL_BRAND_TYPE_CODES", () => {
  it("has exactly 16 entries", () => {
    expect(ALL_BRAND_TYPE_CODES).toHaveLength(16);
  });

  it("matches the keys of BRAND_TYPES", () => {
    const sorted = [...ALL_BRAND_TYPE_CODES].sort();
    const keys = Object.keys(BRAND_TYPES).sort();
    expect(sorted).toEqual(keys);
  });
});

// ─── Field presence and non-emptiness ────────────────────────────────────────

describe("every BrandTypeDefinition", () => {
  it("has a non-empty code matching its record key", () => {
    for (const code of VALID_CODES) {
      expect(BRAND_TYPES[code].code).toBe(code);
    }
  });

  it("has a non-empty name", () => {
    for (const code of VALID_CODES) {
      expect(BRAND_TYPES[code].name.length, `${code}: name empty`).toBeGreaterThan(0);
    }
  });

  it("has a non-empty tagline", () => {
    for (const code of VALID_CODES) {
      expect(BRAND_TYPES[code].tagline.length, `${code}: tagline empty`).toBeGreaterThan(0);
    }
  });

  it("has unique taglines", () => {
    const taglines = VALID_CODES.map(code => BRAND_TYPES[code].tagline.toLowerCase().trim());
    expect(new Set(taglines).size).toBe(taglines.length);
  });

  it("has taglines that are 8 words or fewer", () => {
    for (const code of VALID_CODES) {
      const tagline = BRAND_TYPES[code].tagline.trim();
      const wordCount = tagline.split(/\s+/).length;
      expect(wordCount, `${code}: tagline "${tagline}" exceeds 8 words`).toBeLessThanOrEqual(8);
    }
  });

  it("has a non-empty essence", () => {
    for (const code of VALID_CODES) {
      expect(BRAND_TYPES[code].essence.length, `${code}: essence empty`).toBeGreaterThan(0);
    }
  });

  it("has a non-empty cardLine", () => {
    for (const code of VALID_CODES) {
      expect(BRAND_TYPES[code].cardLine.length, `${code}: cardLine empty`).toBeGreaterThan(0);
    }
  });

  it("has a non-empty energy description", () => {
    for (const code of VALID_CODES) {
      expect(BRAND_TYPES[code].energy.length, `${code}: energy empty`).toBeGreaterThan(0);
    }
  });

  it("has a non-empty communicationStyle", () => {
    for (const code of VALID_CODES) {
      expect(BRAND_TYPES[code].communicationStyle.length, `${code}: communicationStyle empty`).toBeGreaterThan(0);
    }
  });

  it("has a non-empty visualLogic", () => {
    for (const code of VALID_CODES) {
      expect(BRAND_TYPES[code].visualLogic.length, `${code}: visualLogic empty`).toBeGreaterThan(0);
    }
  });

  it("has a non-empty bestFor", () => {
    for (const code of VALID_CODES) {
      expect(BRAND_TYPES[code].bestFor.length, `${code}: bestFor empty`).toBeGreaterThan(0);
    }
  });

  it("has a non-empty nextStep", () => {
    for (const code of VALID_CODES) {
      expect(BRAND_TYPES[code].nextStep.length, `${code}: nextStep empty`).toBeGreaterThan(0);
    }
  });

  it("has at least one strength", () => {
    for (const code of VALID_CODES) {
      expect(BRAND_TYPES[code].strengths.length, `${code}: strengths empty`).toBeGreaterThan(0);
    }
  });

  it("has at least one risk", () => {
    for (const code of VALID_CODES) {
      expect(BRAND_TYPES[code].risks.length, `${code}: risks empty`).toBeGreaterThan(0);
    }
  });

  it("has at least one avoid entry", () => {
    for (const code of VALID_CODES) {
      expect(BRAND_TYPES[code].avoid.length, `${code}: avoid empty`).toBeGreaterThan(0);
    }
  });

  it("has exactly 4 neighboring types", () => {
    for (const code of VALID_CODES) {
      expect(
        BRAND_TYPES[code].neighboringTypes.length,
        `${code}: neighboringTypes should have 4 entries`,
      ).toBe(4);
    }
  });

  it("has all neighboring types reference valid codes", () => {
    for (const code of VALID_CODES) {
      for (const neighbor of BRAND_TYPES[code].neighboringTypes) {
        expect(
          VALID_CODES,
          `${code}: neighbor ${neighbor} is not a valid type code`,
        ).toContain(neighbor);
      }
    }
  });

  it("has no type listed as its own neighbor", () => {
    for (const code of VALID_CODES) {
      expect(
        BRAND_TYPES[code].neighboringTypes,
        `${code}: should not list itself as a neighbor`,
      ).not.toContain(code);
    }
  });

  it("has a valid hex color starting with #", () => {
    for (const code of VALID_CODES) {
      expect(
        BRAND_TYPES[code].color,
        `${code}: color should start with #`,
      ).toMatch(/^#[0-9A-Fa-f]{6}$/);
    }
  });

  it("has a non-empty distinctionNotes", () => {
    for (const code of VALID_CODES) {
      expect(BRAND_TYPES[code].distinctionNotes.length, `${code}: distinctionNotes empty`).toBeGreaterThan(0);
    }
  });
});

// ─── Name uniqueness ──────────────────────────────────────────────────────────

describe("type names", () => {
  it("are all unique", () => {
    const names = VALID_CODES.map(c => BRAND_TYPES[c].name);
    const unique = new Set(names);
    expect(unique.size).toBe(names.length);
  });
});

// ─── Specific type assertions ─────────────────────────────────────────────────

describe("specific type definitions", () => {
  it("ICRF is The Companion", () => {
    expect(BRAND_TYPES.ICRF.name).toBe("The Companion");
  });

  it("no type is named The Practitioner", () => {
    for (const code of VALID_CODES) {
      expect(BRAND_TYPES[code].name).not.toBe("The Practitioner");
    }
  });

  it("IALF is The Visionary", () => {
    expect(BRAND_TYPES.IALF.name).toBe("The Visionary");
  });

  it("OCLD is The Ambassador", () => {
    expect(BRAND_TYPES.OCLD.name).toBe("The Ambassador");
  });

  it("OALD is The Strategist", () => {
    expect(BRAND_TYPES.OALD.name).toBe("The Strategist");
  });

  it("OCRF is The Host", () => {
    expect(BRAND_TYPES.OCRF.name).toBe("The Host");
  });

  it("OARF is The Advocate", () => {
    expect(BRAND_TYPES.OARF.name).toBe("The Advocate");
  });

  it("OALF is The Catalyst", () => {
    expect(BRAND_TYPES.OALF.name).toBe("The Catalyst");
  });

  it("ICLF is The Artisan", () => {
    expect(BRAND_TYPES.ICLF.name).toBe("The Artisan");
  });

  it("ICRD is The Craftsperson", () => {
    expect(BRAND_TYPES.ICRD.name).toBe("The Craftsperson");
  });

  it("IALD is The Philosopher", () => {
    expect(BRAND_TYPES.IALD.name).toBe("The Philosopher");
  });

  it("IARD is The Counsellor", () => {
    expect(BRAND_TYPES.IARD.name).toBe("The Counsellor");
  });
});

// ─── Neighboring type adjacency ───────────────────────────────────────────────

describe("neighboring types are one axis flip apart", () => {
  function flipAxis(code: string, pos: number): string {
    const flips: Record<string, string> = { O: "I", I: "O", C: "A", A: "C", L: "R", R: "L", D: "F", F: "D" };
    return code.slice(0, pos) + flips[code[pos]] + code.slice(pos + 1);
  }

  it("each type's 4 neighbors are exactly the 4 one-flip variants", () => {
    for (const code of VALID_CODES) {
      const expected = [0, 1, 2, 3].map(pos => flipAxis(code, pos)).sort();
      const actual = [...BRAND_TYPES[code].neighboringTypes].sort();
      expect(actual, `${code}: neighboringTypes mismatch`).toEqual(expected);
    }
  });
});

// ─── Helper functions ─────────────────────────────────────────────────────────

describe("getBrandType", () => {
  it("returns the correct definition for a valid code", () => {
    const type = getBrandType("ICRF");
    expect(type).toBeDefined();
    expect(type?.name).toBe("The Companion");
  });

  it("returns undefined for an invalid code", () => {
    expect(getBrandType("XXXX")).toBeUndefined();
  });

  it("returns undefined for an empty string", () => {
    expect(getBrandType("")).toBeUndefined();
  });

  it("returns all 16 types when called for each valid code", () => {
    for (const code of VALID_CODES) {
      expect(getBrandType(code)).toBeDefined();
    }
  });
});

describe("getAllBrandTypes", () => {
  it("returns exactly 16 types", () => {
    expect(getAllBrandTypes()).toHaveLength(16);
  });

  it("returns types with correct code fields", () => {
    const codes = getAllBrandTypes().map(t => t.code);
    for (const code of VALID_CODES) {
      expect(codes).toContain(code);
    }
  });
});

describe("isBrandTypeCode", () => {
  it("returns true for all 16 valid codes", () => {
    for (const code of VALID_CODES) {
      expect(isBrandTypeCode(code)).toBe(true);
    }
  });

  it("returns false for invalid codes", () => {
    expect(isBrandTypeCode("XXXX")).toBe(false);
    expect(isBrandTypeCode("")).toBe(false);
    expect(isBrandTypeCode("ORLD")).toBe(false);
    expect(isBrandTypeCode("ocld")).toBe(false);
  });

  it("acts as a type guard — narrowing string to BrandTypeCode", () => {
    const input: string = "OCLD";
    if (isBrandTypeCode(input)) {
      const type = BRAND_TYPES[input]; // should compile without error
      expect(type.name).toBe("The Ambassador");
    }
  });
});
