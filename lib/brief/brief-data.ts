import { getBrandType, isBrandTypeCode } from "@/lib/brand-types";

export type AssetType = "linkedin-banner" | "one-pager" | "email-signature";

export interface AssetSpec {
  id: AssetType;
  name: string;
  dimensions: string;
  description: string;
}

export const ASSET_SPECS: Record<AssetType, AssetSpec> = {
  "linkedin-banner": {
    id: "linkedin-banner",
    name: "LinkedIn Banner",
    dimensions: "1584 × 396 px",
    description: "Profile cover. First impression on every visitor.",
  },
  "one-pager": {
    id: "one-pager",
    name: "One-Pager",
    dimensions: "A4 — 210 × 297 mm",
    description: "Single-page offer summary. Share with any prospect.",
  },
  "email-signature": {
    id: "email-signature",
    name: "Email Signature",
    dimensions: "600 × 150 px",
    description: "Branded footer on every email you send.",
  },
};

export interface BuildBriefData {
  code: string;
  typeName: string;
  tagline: string;
  essence: string;
  communicationStyle: string;
  visualLogic: string;
  layoutLogic: string;
  imageLogic: string;
  avoid: string[];
  visualRules: string[];
  palette: { primary: string; secondary: string; light: string; dark: string };
  fontPairing: { display: string; displayWeight: number; body: string; bodyWeight: number };
  asset: AssetType;
  assetName: string;
  dimensions: string;
  businessName: string;
  headline: string;
  offer: string;
  cta: string;
  website: string;
  services: string[];
}

export function assembleBuildBriefData(
  code: string,
  asset: AssetType,
  fields: { businessName: string; headline: string; offer: string; cta: string; website: string; services?: string[] },
): BuildBriefData | null {
  if (!isBrandTypeCode(code)) return null;
  const type = getBrandType(code);
  if (!type) return null;
  const spec = ASSET_SPECS[asset];
  return {
    code: type.code,
    typeName: type.name,
    tagline: type.tagline,
    essence: type.essence,
    communicationStyle: type.communicationStyle,
    visualLogic: type.visualLogic,
    layoutLogic: type.layoutLogic,
    imageLogic: type.imageLogic,
    avoid: type.avoid,
    visualRules: type.visualRules,
    palette: type.palette,
    fontPairing: type.fontPairing,
    asset,
    assetName: spec.name,
    dimensions: spec.dimensions,
    ...fields,
    services: fields.services ?? [],
  };
}
