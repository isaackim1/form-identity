import rawSystem from "./form-identity-system.json";
import { SystemSchema, type BrandSystem } from "./schema";

export const system: BrandSystem = SystemSchema.parse(rawSystem);

export function getBrandType(code: string) {
  const type = system.brand_types[code];
  if (!type) throw new Error(`Unknown brand type code: ${code}`);
  return type;
}

export function getColourOptions(code: string) {
  return system.colour_options[code]?.options ?? [];
}

export const ALL_TYPE_CODES = Object.keys(system.brand_types);
