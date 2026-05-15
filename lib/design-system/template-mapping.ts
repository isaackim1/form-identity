import { FORMAT_SPECS, type FormatSpec } from "./formats";
import { LAYOUT_ARCHETYPES, type LayoutArchetype, type ArchetypeId } from "./layout-archetypes";
import { TYPE_LAYOUT_BEHAVIORS, type TypeLayoutBehavior } from "./type-layout-behaviors";
import { getStructuralProfile, type StructuralProfile } from "@/lib/structural-system/structural-profile";
import { isBrandTypeCode } from "@/lib/brand-types";

// ─── Asset → Format + Archetype mapping ──────────────────────────────────────

interface AssetMapping {
  formatId: string;
  archetypeId: ArchetypeId;
}

// Ordered from most specific to least specific.
// Each entry: match if ANY keyword string is found (case-insensitive substring).
const ASSET_KEYWORD_MAP: Array<{ keywords: string[]; formatId: string; archetypeId: ArchetypeId }> = [
  // Signatures
  { keywords: ["email signature"],        formatId: "email-signature",   archetypeId: "signature" },

  // Banners
  { keywords: ["linkedin"],               formatId: "linkedin-banner",   archetypeId: "banner" },
  { keywords: ["youtube channel art", "discord", "community header", "channel art"], formatId: "social-banner", archetypeId: "banner" },

  // Social
  { keywords: ["instagram story", "instagram carousel", "carousel"], formatId: "social-carousel", archetypeId: "social" },
  { keywords: ["instagram", "instagram grid", "instagram feed", "instagram post", "instagram project", "instagram product", "social media template", "social media event", "content post", "launch announcement social", "testimonial quote graphic", "social proof", "testimonial graphic", "post-event recap", "post event recap"], formatId: "instagram-post", archetypeId: "social" },

  // Presentations
  { keywords: ["pitch", "investor deck", "capability deck", "sponsorship deck", "speaker slide", "lesson slide"], formatId: "pitch-deck-slide", archetypeId: "presentation" },

  // Website
  { keywords: ["website", "homepage", "hero section", "landing page", "course landing", "registration page", "donation or giving page", "giving page", "product page"], formatId: "website-hero", archetypeId: "website" },

  // Cards
  { keywords: ["name badge", "lanyard"],  formatId: "name-badge",        archetypeId: "card" },
  { keywords: ["business card", "loyalty card", "loyalty program card", "gift card"], formatId: "business-card", archetypeId: "card" },
  { keywords: ["app icon"],               formatId: "product-card",      archetypeId: "card" },
  { keywords: ["product photography", "product page template"], formatId: "product-card", archetypeId: "card" },

  // Print
  { keywords: ["event poster", "poster", "flyer"],  formatId: "poster",  archetypeId: "poster" },

  // Packaging
  { keywords: ["packaging", "hangtag", "label", "unboxing insert", "unboxing", "tissue paper", "mailer", "merchandise label", "gift wrap"], formatId: "packaging-label", archetypeId: "packaging" },

  // Cover
  { keywords: ["podcast cover"],          formatId: "podcast-cover",     archetypeId: "social" },

  // Documents (specific)
  { keywords: ["menu"],                   formatId: "menu",              archetypeId: "document" },
  { keywords: ["invoice", "proposal and quote", "quote document"],      formatId: "invoice-proposal",  archetypeId: "document" },
  { keywords: ["letterhead", "letter and document"], formatId: "letterhead", archetypeId: "document" },
  { keywords: ["certificate"],            formatId: "certificate",       archetypeId: "document" },

  // Email / newsletter (before generic document fallback)
  { keywords: ["email newsletter", "email sequence", "email campaign", "email invitation", "email", "newsletter header", "welcome email", "onboarding email"], formatId: "email-template", archetypeId: "document" },

  // Documents (generic — catch-all must come last)
  { keywords: ["pdf", "one-pager", "one-page", "guide", "workbook", "worksheet", "report", "brochure", "overview", "brief", "kit", "spec", "specification", "manifesto", "bio", "schedule", "programme", "bulletin", "book", "lookbook", "press kit", "media kit", "welcome", "lead magnet", "slide template", "deck", "changelog", "release notes", "intake", "waiver", "influencer", "collab brief", "annual report", "sponsorship or partner", "brand book", "brand guidelines", "brand mark", "brand spec", "service overview", "service sheet", "portfolio", "case study", "signage", "window decal", "chalkboard", "instagram story", "story"], formatId: "a4-document", archetypeId: "document" },
];

const FALLBACK_MAPPING: AssetMapping = {
  formatId: "a4-document",
  archetypeId: "document",
};

function detectMapping(assetName: string): AssetMapping {
  const n = assetName.toLowerCase();
  for (const entry of ASSET_KEYWORD_MAP) {
    if (entry.keywords.some(kw => n.includes(kw))) {
      return { formatId: entry.formatId, archetypeId: entry.archetypeId };
    }
  }
  return FALLBACK_MAPPING;
}

// ─── Public helpers ───────────────────────────────────────────────────────────

export function getFormatForAsset(assetName: string): FormatSpec {
  const { formatId } = detectMapping(assetName);
  return FORMAT_SPECS[formatId] ?? FORMAT_SPECS["a4-document"];
}

export function getArchetypeForAsset(assetName: string): LayoutArchetype {
  const { archetypeId } = detectMapping(assetName);
  return LAYOUT_ARCHETYPES[archetypeId] ?? LAYOUT_ARCHETYPES["document"];
}

// ─── Combined recommendation ──────────────────────────────────────────────────

export interface TemplateRecommendation {
  assetName: string;
  format: FormatSpec;
  archetype: LayoutArchetype;
  behavior: TypeLayoutBehavior | undefined;
  summary: string;
}

/**
 * Combines asset name → format spec + layout archetype + brand type layout behavior
 * into a single recommendation object for UI components to consume.
 *
 * Formula: asset → format → archetype + brand type → behavior → recommendation
 */
export function getTemplateRecommendation(
  assetName: string,
  brandTypeCode: string
): TemplateRecommendation {
  const format = getFormatForAsset(assetName);
  const archetype = getArchetypeForAsset(assetName);
  const behavior = TYPE_LAYOUT_BEHAVIORS[brandTypeCode];

  const summary = behavior
    ? `${format.name} using ${archetype.name} archetype — ${behavior.layoutPersonality} approach with ${behavior.density} density and ${behavior.gridStrictness}-strictness grid.`
    : `${format.name} using ${archetype.name} archetype.`;

  return { assetName, format, archetype, behavior, summary };
}

// ─── Batch helper for all assets in an industry ──────────────────────────────

export type AssetCategory = "primary" | "secondary" | "optional";

export interface CategorisedAsset {
  name: string;
  category: AssetCategory;
  recommendation: TemplateRecommendation;
}

// ─── Full template context (recommendation + structural profile) ──────────────

export interface FullTemplateContext extends TemplateRecommendation {
  structuralProfile: StructuralProfile | null;
}

export function getFullTemplateContext(
  assetName: string,
  brandTypeCode: string,
): FullTemplateContext {
  const recommendation = getTemplateRecommendation(assetName, brandTypeCode);
  const structuralProfile = isBrandTypeCode(brandTypeCode)
    ? getStructuralProfile(brandTypeCode)
    : null;
  return { ...recommendation, structuralProfile };
}

// ─── Batch helper for all assets in an industry ──────────────────────────────

export function getRecommendationsForIndustry(
  assets: { primary: string[]; secondary: string[]; optional: string[] },
  brandTypeCode: string
): CategorisedAsset[] {
  const result: CategorisedAsset[] = [];

  const addGroup = (names: string[], category: AssetCategory) => {
    for (const name of names) {
      result.push({
        name,
        category,
        recommendation: getTemplateRecommendation(name, brandTypeCode),
      });
    }
  };

  addGroup(assets.primary, "primary");
  addGroup(assets.secondary, "secondary");
  addGroup(assets.optional, "optional");

  return result;
}
