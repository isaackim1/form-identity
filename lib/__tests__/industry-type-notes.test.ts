import { describe, it, expect } from "vitest";
import { INDUSTRY_OPTIONS, INDUSTRY_ASSETS, type IndustryValue } from "../industry-assets";
import {
  getAxisTraits,
  getIndustryTypeNote,
  getRecommendedAssetStrategy,
  getAssetPriorityNote,
} from "../industry-type-notes";

const ALL_TYPE_CODES = [
  "OCLD", "OCRD", "OCLF", "OCRF",
  "OALD", "OARD", "OALF", "OARF",
  "ICLD", "ICRD", "ICLF", "ICRF",
  "IALD", "IARD", "IALF", "IARF",
];

const NEW_INDUSTRIES: IndustryValue[] = [
  "real-estate-property",
  "photography-videography",
  "healthcare-therapy",
  "legal-finance",
  "beauty-personal-care",
  "architecture-interior",
];

// ─── Industry options ─────────────────────────────────────────────────────────

describe("INDUSTRY_OPTIONS", () => {
  it("contains all 6 new industries", () => {
    const values = INDUSTRY_OPTIONS.map(o => o.value);
    for (const id of NEW_INDUSTRIES) {
      expect(values).toContain(id);
    }
  });

  it("has unique slugs", () => {
    const values = INDUSTRY_OPTIONS.map(o => o.value);
    const unique = new Set(values);
    expect(unique.size).toBe(values.length);
  });

  it("has a label for every option", () => {
    for (const opt of INDUSTRY_OPTIONS) {
      expect(opt.label.length).toBeGreaterThan(0);
    }
  });
});

// ─── Industry assets ──────────────────────────────────────────────────────────

describe("INDUSTRY_ASSETS", () => {
  it("contains all 6 new industries", () => {
    for (const id of NEW_INDUSTRIES) {
      expect(INDUSTRY_ASSETS).toHaveProperty(id);
    }
  });

  it("every industry has non-empty primary, secondary, and optional arrays", () => {
    for (const [id, assets] of Object.entries(INDUSTRY_ASSETS)) {
      expect(assets.primaryAssets.length, `${id}: primaryAssets empty`).toBeGreaterThan(0);
      expect(assets.secondaryAssets.length, `${id}: secondaryAssets empty`).toBeGreaterThan(0);
      expect(assets.optionalAssets.length, `${id}: optionalAssets empty`).toBeGreaterThan(0);
    }
  });

  it("every industry has a non-empty label", () => {
    for (const [id, assets] of Object.entries(INDUSTRY_ASSETS)) {
      expect(assets.label.length, `${id}: label empty`).toBeGreaterThan(0);
    }
  });

  it("INDUSTRY_ASSETS keys match INDUSTRY_OPTIONS values", () => {
    const optionValues = INDUSTRY_OPTIONS.map(o => o.value).sort();
    const assetKeys = Object.keys(INDUSTRY_ASSETS).sort();
    expect(assetKeys).toEqual(optionValues);
  });
});

// ─── getAxisTraits ────────────────────────────────────────────────────────────

describe("getAxisTraits", () => {
  it("correctly extracts axes for OCLD", () => {
    const traits = getAxisTraits("OCLD");
    expect(traits.expression).toBe("O");
    expect(traits.substance).toBe("C");
    expect(traits.orientation).toBe("L");
    expect(traits.structure).toBe("D");
  });

  it("correctly extracts axes for IARF", () => {
    const traits = getAxisTraits("IARF");
    expect(traits.expression).toBe("I");
    expect(traits.substance).toBe("A");
    expect(traits.orientation).toBe("R");
    expect(traits.structure).toBe("F");
  });

  it("correctly extracts axes for all 16 codes without throwing", () => {
    for (const code of ALL_TYPE_CODES) {
      expect(() => getAxisTraits(code)).not.toThrow();
      const traits = getAxisTraits(code);
      expect(["O", "I"]).toContain(traits.expression);
      expect(["C", "A"]).toContain(traits.substance);
      expect(["L", "R"]).toContain(traits.orientation);
      expect(["D", "F"]).toContain(traits.structure);
    }
  });
});

// ─── getIndustryTypeNote ──────────────────────────────────────────────────────

describe("getIndustryTypeNote", () => {
  it("returns a non-empty string for consulting + OCLD", () => {
    const note = getIndustryTypeNote("consulting-coaching", "OCLD");
    expect(note.length).toBeGreaterThan(20);
  });

  it("returns a non-empty string for consulting + IALD", () => {
    const note = getIndustryTypeNote("consulting-coaching", "IALD");
    expect(note.length).toBeGreaterThan(20);
  });

  it("produces different notes for OCLD and IALD in same industry", () => {
    const outwardNote = getIndustryTypeNote("consulting-coaching", "OCLD");
    const inwardNote  = getIndustryTypeNote("consulting-coaching", "IALD");
    expect(outwardNote).not.toBe(inwardNote);
  });

  it("produces different notes for OCLD and OALD in same industry (substance axis)", () => {
    const concreteNote  = getIndustryTypeNote("consulting-coaching", "OCLD");
    const abstractNote  = getIndustryTypeNote("consulting-coaching", "OALD");
    expect(concreteNote).not.toBe(abstractNote);
  });

  it("returns empty string for unknown industry", () => {
    const note = getIndustryTypeNote("unknown-industry", "OCLD");
    expect(note).toBe("");
  });

  it("returns empty string for 'other' industry", () => {
    const note = getIndustryTypeNote("other", "IALD");
    expect(note).toBe("");
  });

  it("returns non-empty notes for all 6 new industries with OCLD", () => {
    for (const id of NEW_INDUSTRIES) {
      const note = getIndustryTypeNote(id, "OCLD");
      expect(note.length, `${id}: note empty for OCLD`).toBeGreaterThan(20);
    }
  });

  it("returns non-empty notes for all 6 new industries with IARF", () => {
    for (const id of NEW_INDUSTRIES) {
      const note = getIndustryTypeNote(id, "IARF");
      expect(note.length, `${id}: note empty for IARF`).toBeGreaterThan(20);
    }
  });

  it("covers all 16 type codes across all known industries without throwing", () => {
    const knownIndustries = Object.keys(INDUSTRY_ASSETS).filter(id => id !== "other");
    for (const industryId of knownIndustries) {
      for (const code of ALL_TYPE_CODES) {
        expect(() => getIndustryTypeNote(industryId, code)).not.toThrow();
        const note = getIndustryTypeNote(industryId, code);
        expect(note.length).toBeGreaterThan(0);
      }
    }
  });
});

// ─── getRecommendedAssetStrategy ─────────────────────────────────────────────

describe("getRecommendedAssetStrategy", () => {
  it("returns a longer string than getIndustryTypeNote for same inputs", () => {
    const note     = getIndustryTypeNote("consulting-coaching", "OCRD");
    const strategy = getRecommendedAssetStrategy("consulting-coaching", "OCRD");
    expect(strategy.length).toBeGreaterThan(note.length);
  });

  it("returns empty string for unknown industry", () => {
    expect(getRecommendedAssetStrategy("unknown", "IALD")).toBe("");
  });
});

// ─── getAssetPriorityNote ─────────────────────────────────────────────────────

describe("getAssetPriorityNote", () => {
  it("returns non-empty string for every type code with a LinkedIn banner", () => {
    for (const code of ALL_TYPE_CODES) {
      const note = getAssetPriorityNote("LinkedIn banner", code);
      expect(note.length).toBeGreaterThan(0);
    }
  });

  it("returns different notes for outward vs inward types on a social asset", () => {
    const outward = getAssetPriorityNote("Instagram feed template", "OCLD");
    const inward  = getAssetPriorityNote("Instagram feed template", "ICLD");
    expect(outward).not.toBe(inward);
  });

  it("returns different notes for outward vs inward types on a LinkedIn banner", () => {
    const outward = getAssetPriorityNote("LinkedIn banner", "OCLD");
    const inward  = getAssetPriorityNote("LinkedIn banner", "ICLD");
    expect(outward).not.toBe(inward);
  });

  it("returns foundation note for website hero", () => {
    const note = getAssetPriorityNote("Website homepage", "IALD");
    expect(note).toContain("Foundation");
  });

  it("returns high-frequency note for email signature", () => {
    const note = getAssetPriorityNote("Email signature", "OCLD");
    expect(note).toContain("touchpoint");
  });

  it("returns a note for every asset in the new industries", () => {
    for (const id of NEW_INDUSTRIES) {
      const assets = INDUSTRY_ASSETS[id];
      const all = [...assets.primaryAssets, ...assets.secondaryAssets, ...assets.optionalAssets];
      for (const asset of all) {
        const note = getAssetPriorityNote(asset, "IALD");
        expect(note.length, `${id}: empty note for "${asset}"`).toBeGreaterThan(0);
      }
    }
  });
});
