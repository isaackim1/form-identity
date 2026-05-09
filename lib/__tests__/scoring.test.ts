import { describe, it, expect } from "vitest";
import { scoreAxis, scoreBrandType } from "../brand-type-engine";
import { encodeAnswers, decodeAnswers } from "../quiz-state";
import { BRAND_TYPES } from "../../components/BrandCard";

// ─── scoreAxis ────────────────────────────────────────────────────────────────

describe("scoreAxis", () => {
  it("returns pole A when scores are low", () => {
    // 6 questions, all answered 1 (strongly A) → total=6, mid=24, distance=18
    const result = scoreAxis([1,1,1,1,1,1], ["Outward","Inward"], ["O","I"]);
    expect(result.direction).toBe("Outward");
    expect(result.code).toBe("O");
    expect(result.strength).toBe("Strong");
  });

  it("returns pole B when scores are high", () => {
    // 6 questions, all answered 7 (strongly B) → total=42, mid=24, distance=18
    const result = scoreAxis([7,7,7,7,7,7], ["Outward","Inward"], ["O","I"]);
    expect(result.direction).toBe("Inward");
    expect(result.code).toBe("I");
    expect(result.strength).toBe("Strong");
  });

  it("returns Slight strength near midpoint", () => {
    // 6 questions totaling 24 = exactly at midpoint → distance=0, Slight
    const result = scoreAxis([4,4,4,4,4,4], ["Outward","Inward"], ["O","I"]);
    expect(result.strength).toBe("Slight");
    expect(result.distance).toBe(0);
  });

  it("returns pct as a number between 0 and 100", () => {
    const result = scoreAxis([3,3,5,5,4,4], ["Concrete","Conceptual"], ["C","A"]);
    expect(result.pct).toBeGreaterThanOrEqual(0);
    expect(result.pct).toBeLessThanOrEqual(100);
  });
});

// ─── scoreBrandType ───────────────────────────────────────────────────────────

describe("scoreBrandType", () => {
  it("returns a valid 4-letter code from all-A responses", () => {
    const responses = { E: [1,1,1,1,1,1], S: [1,1,1,1,1,1], O: [1,1,1,1,1,1], T: [1,1,1,1,1,1] };
    const result = scoreBrandType(responses);
    expect(result.code).toBe("OCLD");
    expect(result.code).toHaveLength(4);
  });

  it("returns a valid 4-letter code from all-B responses", () => {
    const responses = { E: [7,7,7,7,7,7], S: [7,7,7,7,7,7], O: [7,7,7,7,7,7], T: [7,7,7,7,7,7] };
    const result = scoreBrandType(responses);
    expect(result.code).toBe("IARF");
    expect(result.code).toHaveLength(4);
  });

  it("returns adjacent types for weak axes", () => {
    // Near-midpoint responses on E axis → E should be adjacent
    const responses = { E: [4,4,4,4,4,4], S: [1,1,1,1,1,1], O: [1,1,1,1,1,1], T: [1,1,1,1,1,1] };
    const result = scoreBrandType(responses);
    const adjacentAxes = result.adjacent.map(a => a.axis);
    expect(adjacentAxes).toContain("E");
  });

  it("produces one of the 16 valid codes for mixed responses", () => {
    // Mixed near-midpoint responses — result should still be a valid 4-letter code
    const responses = { E: [3,5,4,4,3,5], S: [5,3,4,4,5,3], O: [4,4,3,5,4,4], T: [3,3,5,5,4,4] };
    const result = scoreBrandType(responses);
    expect(result.code).toHaveLength(4);
    expect(result.code).toMatch(/^[OI][CA][LR][DF]$/);
  });
});

// ─── encode / decode round-trip ───────────────────────────────────────────────

describe("encodeAnswers / decodeAnswers", () => {
  it("round-trips a complete set of answers", () => {
    const original = {
      E1: { answer: "A" as const, strength: "definitely" as const },
      E2: { answer: "B" as const, strength: "lean" as const },
      S1: { answer: "A" as const, strength: "lean" as const },
    };
    const encoded = encodeAnswers(original);
    const decoded = decodeAnswers(encoded);
    expect(decoded.E1).toEqual(original.E1);
    expect(decoded.E2).toEqual(original.E2);
    expect(decoded.S1).toEqual(original.S1);
  });

  it("returns empty object for empty string", () => {
    expect(decodeAnswers("")).toEqual({});
  });

  it("ignores malformed chunks without crashing", () => {
    expect(() => decodeAnswers("bad:data,also:bad")).not.toThrow();
  });

  it("encoded string contains question IDs not array indices", () => {
    const answers = { E1: { answer: "A" as const, strength: "definitely" as const } };
    const encoded = encodeAnswers(answers);
    expect(encoded).toContain("E1:");
  });
});

// ─── all 16 type codes ────────────────────────────────────────────────────────

describe("BRAND_TYPES", () => {
  const EXPECTED_CODES = [
    "OCLD","OCRD","OCLF","OCRF",
    "OALD","OARD","OALF","OARF",
    "ICLD","ICRD","ICLF","ICRF",
    "IALD","IARD","IALF","IARF",
  ];

  it("contains all 16 expected codes", () => {
    const actualCodes = BRAND_TYPES.map(t => t.code);
    for (const code of EXPECTED_CODES) {
      expect(actualCodes).toContain(code);
    }
    expect(BRAND_TYPES).toHaveLength(16);
  });

  it("each code matches pattern [OI][CA][LR][DF]", () => {
    const pattern = /^[OI][CA][LR][DF]$/;
    for (const type of BRAND_TYPES) {
      expect(type.code).toMatch(pattern);
    }
  });

  it("each type has a name and a line", () => {
    for (const type of BRAND_TYPES) {
      expect(type.name).toBeTruthy();
      expect(type.line).toBeTruthy();
    }
  });
});
