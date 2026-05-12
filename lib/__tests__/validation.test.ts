import { describe, it, expect } from "vitest";
import { resultCreationSchema, emailCaptureSchema } from "../validation";
import { generateResultSlug, isSavedResultSlug } from "../result-slug";

// ─── result slug ──────────────────────────────────────────────────────────────

describe("generateResultSlug", () => {
  it("starts with r_", () => {
    expect(generateResultSlug()).toMatch(/^r_/);
  });

  it("has the expected format r_ followed by 8 alphanumeric chars", () => {
    expect(generateResultSlug()).toMatch(/^r_[a-z0-9]{8}$/);
  });

  it("produces unique slugs on successive calls", () => {
    const slugs = new Set(Array.from({ length: 100 }, generateResultSlug));
    expect(slugs.size).toBe(100);
  });
});

describe("isSavedResultSlug", () => {
  it("detects saved result slugs", () => {
    expect(isSavedResultSlug("r_abc12345")).toBe(true);
  });

  it("does not treat brand type codes as saved result slugs", () => {
    expect(isSavedResultSlug("IALD")).toBe(false);
  });

  it("rejects malformed slug-like values", () => {
    expect(isSavedResultSlug("r_abc")).toBe(false);
    expect(isSavedResultSlug("r_ABC12345")).toBe(false);
    expect(isSavedResultSlug("x_abc12345")).toBe(false);
  });
});

// ─── resultCreationSchema ─────────────────────────────────────────────────────

describe("resultCreationSchema", () => {
  it("accepts a valid brand type code", () => {
    const result = resultCreationSchema.safeParse({ brand_type_code: "IALD" });
    expect(result.success).toBe(true);
  });

  it("rejects an invalid brand type code", () => {
    const result = resultCreationSchema.safeParse({ brand_type_code: "XXXX" });
    expect(result.success).toBe(false);
  });

  it("accepts optional industry", () => {
    const result = resultCreationSchema.safeParse({
      brand_type_code: "OCLD",
      industry: "consulting-coaching",
    });
    expect(result.success).toBe(true);
  });

  it("accepts optional answers as an object", () => {
    const result = resultCreationSchema.safeParse({
      brand_type_code: "OCRD",
      answers: { E1: { answer: "A", strength: "definitely" } },
    });
    expect(result.success).toBe(true);
  });

  it("accepts when industry and answers are omitted", () => {
    const result = resultCreationSchema.safeParse({ brand_type_code: "IARF" });
    expect(result.success).toBe(true);
  });
});

// ─── emailCaptureSchema ───────────────────────────────────────────────────────

describe("emailCaptureSchema", () => {
  const base = { email: "test@example.com", brand_type_code: "ICLD" };

  it("accepts a valid email and brand type code", () => {
    expect(emailCaptureSchema.safeParse(base).success).toBe(true);
  });

  it("rejects an invalid email", () => {
    const result = emailCaptureSchema.safeParse({ ...base, email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("rejects a missing email", () => {
    const result = emailCaptureSchema.safeParse({ brand_type_code: "ICLD" });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid brand type code", () => {
    const result = emailCaptureSchema.safeParse({ ...base, brand_type_code: "FAKE" });
    expect(result.success).toBe(false);
  });

  it("accepts optional industry, answers, result_slug, and source", () => {
    const result = emailCaptureSchema.safeParse({
      ...base,
      industry: "retail-ecommerce",
      answers: "E1:A:d,S1:B:l",
      result_slug: "r_abc12345",
      source: "result_page",
    });
    expect(result.success).toBe(true);
  });
});
