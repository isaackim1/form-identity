export type { FormatSpec, DensityLevel, FormatCategory } from "./formats";
export { FORMAT_SPECS, ALL_FORMAT_IDS, getFormat } from "./formats";

export type { LayoutArchetype, ArchetypeId } from "./layout-archetypes";
export { LAYOUT_ARCHETYPES, ALL_ARCHETYPE_IDS, getArchetype } from "./layout-archetypes";

export type { TypeLayoutBehavior } from "./type-layout-behaviors";
export { TYPE_LAYOUT_BEHAVIORS, ALL_TYPE_CODES, getTypeLayoutBehavior } from "./type-layout-behaviors";

export type {
  TemplateRecommendation,
  CategorisedAsset,
  AssetCategory,
} from "./template-mapping";
export {
  getFormatForAsset,
  getArchetypeForAsset,
  getTemplateRecommendation,
  getRecommendationsForIndustry,
} from "./template-mapping";
