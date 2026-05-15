import type { BrandTypeCode } from "@/lib/brand-types";
import { STRUCTURAL_FAMILIES, type StructuralFamilyId } from "./structural-families";

// ─── Derived map (source of truth lives in STRUCTURAL_FAMILIES.brandTypes) ───

const FAMILY_MAP: Record<BrandTypeCode, StructuralFamilyId> = (() => {
  const map = {} as Record<BrandTypeCode, StructuralFamilyId>;
  for (const family of Object.values(STRUCTURAL_FAMILIES)) {
    for (const code of family.brandTypes) {
      map[code] = family.id;
    }
  }
  return map;
})();

export function getBrandTypeFamily(code: BrandTypeCode): StructuralFamilyId {
  const id = FAMILY_MAP[code];
  if (!id) throw new Error(`No structural family mapped for brand type code: ${code}`);
  return id;
}
