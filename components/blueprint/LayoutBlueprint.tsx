import type { BrandTypeCode } from "@/lib/brand-types";
import type { AssetType } from "@/lib/brief/brief-data";
import { LinkedInBannerBlueprint } from "./LinkedInBannerBlueprint";

type Palette = { primary: string; secondary: string; light: string; dark: string };

interface Props {
  code: BrandTypeCode;
  asset: AssetType;
  palette: Palette;
  visualRules: string[];
}

export function LayoutBlueprint({ code, asset, palette, visualRules }: Props) {
  if (asset === "linkedin-banner") {
    return (
      <LinkedInBannerBlueprint
        code={code}
        palette={palette}
        visualRules={visualRules}
      />
    );
  }
  return null;
}
