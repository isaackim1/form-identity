import { beforeEach, describe, expect, it, vi } from "vitest";
import { getSupabaseServerClient } from "../supabase/server";
import { getSavedResultBySlug } from "../results";

vi.mock("../supabase/server", () => ({
  getSupabaseServerClient: vi.fn(),
}));

const maybeSingle = vi.fn();
const eq = vi.fn(() => ({ maybeSingle }));
const select = vi.fn(() => ({ eq }));
const from = vi.fn(() => ({ select }));

describe("getSavedResultBySlug", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(getSupabaseServerClient).mockReturnValue({ from } as never);
  });

  it("queries quiz_results by result_slug and returns the saved row", async () => {
    const row = {
      result_slug: "r_abc12345",
      brand_type_code: "IALD",
      industry: "consulting-coaching",
      answers: { E1: { answer: "A", strength: "definitely" } },
      axis_scores: { E: { score: 6 } },
      created_at: "2026-05-12T13:00:00.000Z",
    };
    maybeSingle.mockResolvedValue({ data: row, error: null });

    await expect(getSavedResultBySlug("r_abc12345")).resolves.toEqual(row);

    expect(from).toHaveBeenCalledWith("quiz_results");
    expect(select).toHaveBeenCalledWith("result_slug, brand_type_code, industry, answers, axis_scores, created_at");
    expect(eq).toHaveBeenCalledWith("result_slug", "r_abc12345");
    expect(maybeSingle).toHaveBeenCalled();
  });

  it("returns null when Supabase is not configured", async () => {
    vi.mocked(getSupabaseServerClient).mockImplementation(() => {
      throw new Error("Supabase is not configured.");
    });

    await expect(getSavedResultBySlug("r_abc12345")).resolves.toBeNull();
  });

  it("returns null when no row is found", async () => {
    maybeSingle.mockResolvedValue({ data: null, error: null });

    await expect(getSavedResultBySlug("r_missing1")).resolves.toBeNull();
  });

  it("returns null when Supabase returns an error", async () => {
    maybeSingle.mockResolvedValue({ data: null, error: { message: "nope" } });

    await expect(getSavedResultBySlug("r_abc12345")).resolves.toBeNull();
  });
});
