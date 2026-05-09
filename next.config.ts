import type { NextConfig } from "next";
import { SystemSchema } from "./lib/schema";
import rawSystem from "./lib/form-identity-system.json";

// Validate the brand system JSON at build time.
// If any field is missing or malformed, this throws and the build fails.
SystemSchema.parse(rawSystem);

const nextConfig: NextConfig = {};

export default nextConfig;
