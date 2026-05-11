import { describe, it, expect } from "vitest";
import { INDUSTRY_ASSETS } from "../industry-assets";
import { FORMAT_SPECS, ALL_FORMAT_IDS } from "../design-system/formats";
import { LAYOUT_ARCHETYPES, ALL_ARCHETYPE_IDS } from "../design-system/layout-archetypes";
import { TYPE_LAYOUT_BEHAVIORS, ALL_TYPE_CODES } from "../design-system/type-layout-behaviors";
import {
  getFormatForAsset,
  getArchetypeForAsset,
  getTemplateRecommendation,
} from "../design-system/template-mapping";

const ALL_EXPECTED_TYPE_CODES = [
  "OCLD", "OCRD", "OCLF", "OCRF",
  "OALD", "OARD", "OALF", "OARF",
  "ICLD", "ICRD", "ICLF", "ICRF",
  "IALD", "IARD", "IALF", "IARF",
];

// ─── Formats ─────────────────────────────────────────────────────────────────

describe("FORMAT_SPECS", () => {
  it("contains all required format IDs", () => {
    const required = [
      "a4-document",
      "a5-document",
      "business-card",
      "instagram-post",
      "instagram-story",
      "linkedin-banner",
      "poster",
      "pitch-deck-slide",
      "email-signature",
      "website-hero",
      "menu",
      "packaging-label",
      "product-card",
      "event-flyer",
      "social-carousel",
      "letterhead",
      "invoice-proposal",
    ];
    for (const id of required) {
      expect(FORMAT_SPECS).toHaveProperty(id);
    }
  });

  it("every format has required fields", () => {
    for (const [id, spec] of Object.entries(FORMAT_SPECS)) {
      expect(spec.id).toBe(id);
      expect(spec.name).toBeTruthy();
      expect(spec.category).toBeTruthy();
      expect(spec.aspectRatio).toBeTruthy();
      expect(spec.layoutNotes).toBeTruthy();
      expect(spec.bestUse).toBeTruthy();
      expect(spec.gridBehavior).toBeTruthy();
      expect(["low", "medium", "high"]).toContain(spec.density);
      expect(spec.recommendedContentBlocks.length).toBeGreaterThan(0);
    }
  });

  it("ALL_FORMAT_IDS matches FORMAT_SPECS keys", () => {
    expect(ALL_FORMAT_IDS.sort()).toEqual(Object.keys(FORMAT_SPECS).sort());
  });
});

// ─── Layout archetypes ────────────────────────────────────────────────────────

describe("LAYOUT_ARCHETYPES", () => {
  it("contains all 12 required archetypes", () => {
    const required = [
      "document", "poster", "social", "presentation",
      "card", "banner", "signature", "packaging",
      "website", "merch", "editorial", "report",
    ];
    for (const id of required) {
      expect(LAYOUT_ARCHETYPES).toHaveProperty(id);
    }
  });

  it("every archetype has required fields", () => {
    for (const [id, arch] of Object.entries(LAYOUT_ARCHETYPES)) {
      expect(arch.id).toBe(id);
      expect(arch.name).toBeTruthy();
      expect(arch.description).toBeTruthy();
      expect(arch.layoutPrinciples.length).toBeGreaterThan(0);
      expect(arch.commonFormats.length).toBeGreaterThan(0);
      expect(arch.wireframeBehavior).toBeTruthy();
      expect(arch.contentHierarchy).toBeTruthy();
      expect(arch.spacingBehavior).toBeTruthy();
      expect(arch.whenToUse).toBeTruthy();
    }
  });

  it("ALL_ARCHETYPE_IDS matches LAYOUT_ARCHETYPES keys", () => {
    expect(ALL_ARCHETYPE_IDS.sort()).toEqual(Object.keys(LAYOUT_ARCHETYPES).sort());
  });

  it("archetype commonFormats reference valid format IDs", () => {
    for (const arch of Object.values(LAYOUT_ARCHETYPES)) {
      for (const fmtId of arch.commonFormats) {
        expect(FORMAT_SPECS).toHaveProperty(fmtId);
      }
    }
  });
});

// ─── Type layout behaviors ────────────────────────────────────────────────────

describe("TYPE_LAYOUT_BEHAVIORS", () => {
  it("covers all 16 brand type codes", () => {
    for (const code of ALL_EXPECTED_TYPE_CODES) {
      expect(TYPE_LAYOUT_BEHAVIORS).toHaveProperty(code);
    }
  });

  it("ALL_TYPE_CODES contains exactly 16 entries", () => {
    expect(ALL_TYPE_CODES).toHaveLength(16);
  });

  it("every behavior has required fields", () => {
    for (const [code, behavior] of Object.entries(TYPE_LAYOUT_BEHAVIORS)) {
      expect(behavior.typeCode).toBe(code);
      expect(behavior.layoutPersonality).toBeTruthy();
      expect(["low", "medium", "high"]).toContain(behavior.density);
      expect(behavior.hierarchyStyle).toBeTruthy();
      expect(behavior.spacingStyle).toBeTruthy();
      expect(behavior.alignmentStyle).toBeTruthy();
      expect(behavior.rhythm).toBeTruthy();
      expect(["low", "medium", "high"]).toContain(behavior.gridStrictness);
      expect(behavior.compositionNotes).toBeTruthy();
      expect(behavior.bestLayoutArchetypes.length).toBeGreaterThan(0);
      expect(behavior.avoidLayoutPatterns.length).toBeGreaterThan(0);
    }
  });

  it("bestLayoutArchetypes reference valid archetype IDs", () => {
    for (const behavior of Object.values(TYPE_LAYOUT_BEHAVIORS)) {
      for (const archetypeId of behavior.bestLayoutArchetypes) {
        expect(LAYOUT_ARCHETYPES).toHaveProperty(archetypeId);
      }
    }
  });

  it("each type has a distinct layoutPersonality", () => {
    const personalities = Object.values(TYPE_LAYOUT_BEHAVIORS).map(b => b.layoutPersonality);
    const unique = new Set(personalities);
    expect(unique.size).toBe(16);
  });
});

// ─── Template mapping ─────────────────────────────────────────────────────────

describe("getFormatForAsset", () => {
  it("maps LinkedIn banner correctly", () => {
    const fmt = getFormatForAsset("LinkedIn banner");
    expect(fmt.id).toBe("linkedin-banner");
  });

  it("maps pitch deck correctly", () => {
    const fmt = getFormatForAsset("Pitch or proposal deck");
    expect(fmt.id).toBe("pitch-deck-slide");
  });

  it("maps business card correctly", () => {
    const fmt = getFormatForAsset("Business card");
    expect(fmt.id).toBe("business-card");
  });

  it("maps Instagram story correctly", () => {
    const fmt = getFormatForAsset("Instagram carousel template");
    expect(fmt.id).toBe("social-carousel");
  });

  it("maps website hero correctly", () => {
    const fmt = getFormatForAsset("Website hero section");
    expect(fmt.id).toBe("website-hero");
  });

  it("maps menu correctly", () => {
    const fmt = getFormatForAsset("Menu — digital PDF and print-ready version");
    expect(fmt.id).toBe("menu");
  });

  it("maps email signature correctly", () => {
    const fmt = getFormatForAsset("Email signature");
    expect(fmt.id).toBe("email-signature");
  });

  it("maps poster correctly", () => {
    const fmt = getFormatForAsset("Event poster and banner");
    expect(fmt.id).toBe("poster");
  });

  it("falls back to a4-document for unknown asset names", () => {
    const fmt = getFormatForAsset("some completely unknown thing xyz");
    expect(fmt.id).toBe("a4-document");
  });

  it("returns a valid FormatSpec with all required fields for fallback", () => {
    const fmt = getFormatForAsset("unknown-asset-xyz");
    expect(fmt.id).toBeTruthy();
    expect(fmt.name).toBeTruthy();
    expect(fmt.density).toBeTruthy();
    expect(fmt.recommendedContentBlocks.length).toBeGreaterThan(0);
  });
});

describe("getArchetypeForAsset", () => {
  it("maps LinkedIn banner to banner archetype", () => {
    const arch = getArchetypeForAsset("LinkedIn banner");
    expect(arch.id).toBe("banner");
  });

  it("maps pitch deck to presentation archetype", () => {
    const arch = getArchetypeForAsset("Pitch or proposal deck");
    expect(arch.id).toBe("presentation");
  });

  it("maps menu to document archetype", () => {
    const arch = getArchetypeForAsset("Menu — digital PDF and print-ready version");
    expect(arch.id).toBe("document");
  });

  it("maps Instagram post to social archetype", () => {
    const arch = getArchetypeForAsset("Instagram feed template (square + portrait)");
    expect(arch.id).toBe("social");
  });

  it("falls back to document archetype for unknown names", () => {
    const arch = getArchetypeForAsset("unknown-xyz");
    expect(arch.id).toBe("document");
  });
});

describe("getTemplateRecommendation", () => {
  it("returns format, archetype, and behavior for known asset + type", () => {
    const rec = getTemplateRecommendation("LinkedIn banner", "IALD");
    expect(rec.format.id).toBe("linkedin-banner");
    expect(rec.archetype.id).toBe("banner");
    expect(rec.behavior?.typeCode).toBe("IALD");
    expect(rec.summary).toContain("LinkedIn Banner");
    expect(rec.summary).toContain("Banner");
  });

  it("returns undefined behavior for unknown type code", () => {
    const rec = getTemplateRecommendation("LinkedIn banner", "XXXX");
    expect(rec.behavior).toBeUndefined();
    expect(rec.summary).toBeTruthy();
  });

  it("produces a non-empty summary for all 16 type codes with a known asset", () => {
    for (const code of ALL_EXPECTED_TYPE_CODES) {
      const rec = getTemplateRecommendation("One-page service overview PDF", code);
      expect(rec.summary.length).toBeGreaterThan(10);
      expect(rec.behavior?.typeCode).toBe(code);
    }
  });
});

// ─── Industry asset coverage ──────────────────────────────────────────────────

describe("Industry asset mapping coverage", () => {
  it("every industry asset maps to a known format (not undefined)", () => {
    for (const [industry, assets] of Object.entries(INDUSTRY_ASSETS)) {
      const allAssets = [
        ...assets.primaryAssets,
        ...assets.secondaryAssets,
        ...assets.optionalAssets,
      ];
      for (const asset of allAssets) {
        const fmt = getFormatForAsset(asset);
        expect(fmt, `Industry ${industry}: asset "${asset}" returned undefined format`).toBeTruthy();
        expect(fmt.id, `Industry ${industry}: asset "${asset}" has no format ID`).toBeTruthy();
        expect(ALL_FORMAT_IDS).toContain(fmt.id);
      }
    }
  });

  it("every industry asset maps to a known archetype (not undefined)", () => {
    for (const [industry, assets] of Object.entries(INDUSTRY_ASSETS)) {
      const allAssets = [
        ...assets.primaryAssets,
        ...assets.secondaryAssets,
        ...assets.optionalAssets,
      ];
      for (const asset of allAssets) {
        const arch = getArchetypeForAsset(asset);
        expect(arch, `Industry ${industry}: asset "${asset}" returned undefined archetype`).toBeTruthy();
        expect(ALL_ARCHETYPE_IDS).toContain(arch.id);
      }
    }
  });
});
