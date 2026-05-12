import { getSupabaseServerClient } from "./supabase/server";

export interface SavedResult {
  result_slug: string;
  brand_type_code: string;
  industry: string | null;
  answers: unknown;
  axis_scores: unknown;
  created_at: string | null;
}

export async function getSavedResultBySlug(resultSlug: string): Promise<SavedResult | null> {
  let supabase: ReturnType<typeof getSupabaseServerClient>;

  try {
    supabase = getSupabaseServerClient();
  } catch {
    return null;
  }

  const { data, error } = await supabase
    .from("quiz_results")
    .select("result_slug, brand_type_code, industry, answers, axis_scores, created_at")
    .eq("result_slug", resultSlug)
    .maybeSingle();

  if (error || !data) return null;

  return data as SavedResult;
}
