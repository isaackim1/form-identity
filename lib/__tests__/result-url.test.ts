import { describe, expect, it } from "vitest";
import { buildSharedResultPath, buildSharedResultUrl } from "../result-url";

describe("buildSharedResultPath", () => {
  it("uses a brand type code when no result slug exists", () => {
    expect(buildSharedResultPath("IALD")).toBe("/result/IALD");
  });

  it("prefers a saved result slug when present", () => {
    expect(buildSharedResultPath("IALD", "r_abc12345")).toBe("/result/r_abc12345");
  });
});

describe("buildSharedResultUrl", () => {
  it("builds a code-based share URL by default", () => {
    expect(buildSharedResultUrl({
      siteUrl: "https://form-identity.vercel.app",
      code: "ICRF",
    })).toBe("https://form-identity.vercel.app/result/ICRF");
  });

  it("builds a clean saved-result URL when resultSlug exists", () => {
    expect(buildSharedResultUrl({
      siteUrl: "https://form-identity.vercel.app",
      code: "ICRF",
      resultSlug: "r_xyz98765",
    })).toBe("https://form-identity.vercel.app/result/r_xyz98765");
  });
});
