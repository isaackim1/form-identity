import { NextRequest, NextResponse } from "next/server";
import { resultCreationSchema } from "@/lib/validation";
import { generateResultSlug } from "@/lib/result-slug";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request body." }, { status: 400 });
  }

  const parsed = resultCreationSchema.safeParse(body);
  if (!parsed.success) {
    const msg = parsed.error.issues.map(i => i.message).join(", ");
    return NextResponse.json({ success: false, error: msg }, { status: 400 });
  }

  let supabase: ReturnType<typeof getSupabaseServerClient>;
  try {
    supabase = getSupabaseServerClient();
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Supabase is not configured.";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }

  const { brand_type_code, industry, answers, axis_scores } = parsed.data;
  const result_slug = generateResultSlug();

  const { error } = await supabase.from("quiz_results").insert({
    result_slug,
    brand_type_code,
    industry: industry ?? null,
    answers: answers ?? null,
    axis_scores: axis_scores ?? null,
  });

  if (error) {
    return NextResponse.json({ success: false, error: "Failed to save result." }, { status: 500 });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const result_url = `${siteUrl}/result/${brand_type_code}`;

  return NextResponse.json({ success: true, result_slug, result_url });
}
