import { getBrandType, isBrandTypeCode } from "@/lib/brand-types";
import { INDUSTRY_ASSETS, type IndustryValue } from "@/lib/industry-assets";

const FALLBACK_ASSETS = [
  "LinkedIn banner",
  "A4 one-pager",
  "Instagram post",
];

export interface BrandKitData {
  code: string;
  name: string;
  tagline: string;
  essence: string;
  palette: {
    primary: string;
    secondary: string;
    light: string;
    dark: string;
  };
  fontPairing: {
    display: string;
    displayWeight: number;
    body: string;
    bodyWeight: number;
  };
  visualRules: string[];
  topAssets: string[];
  industryLabel: string | null;
  nextStep: string;
}

export function assembleBrandKitData(
  code: string,
  industry?: string,
): BrandKitData | null {
  if (!isBrandTypeCode(code)) return null;
  const type = getBrandType(code);
  if (!type) return null;

  const industryKey = industry as IndustryValue | undefined;
  const industryAssets =
    industryKey && industryKey in INDUSTRY_ASSETS
      ? INDUSTRY_ASSETS[industryKey]
      : null;

  const topAssets = industryAssets
    ? industryAssets.primaryAssets.slice(0, 3)
    : FALLBACK_ASSETS;

  return {
    code: type.code,
    name: type.name,
    tagline: type.tagline,
    essence: type.essence,
    palette: type.palette,
    fontPairing: type.fontPairing,
    visualRules: type.visualRules,
    topAssets,
    industryLabel: industryAssets?.label ?? null,
    nextStep: type.nextStep,
  };
}
