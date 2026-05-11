import { NextRequest, NextResponse } from "next/server";
import { emailCaptureSchema } from "@/lib/validation";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const parsed = emailCaptureSchema.safeParse(body);
  if (!parsed.success) {
    const msg = parsed.error.issues.map(i => i.message).join(", ");
    return NextResponse.json({ ok: false, error: msg }, { status: 400 });
  }

  let supabase: ReturnType<typeof getSupabaseServerClient>;
  try {
    supabase = getSupabaseServerClient();
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Supabase is not configured.";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }

  const { email, brand_type_code, industry, answers, result_slug, source } = parsed.data;

  const { error } = await supabase.from("email_captures").insert({
    email,
    brand_type_code,
    industry: industry ?? null,
    answers: answers ?? null,
    result_slug: result_slug ?? null,
    source: source ?? "result_page",
  });

  if (error) {
    return NextResponse.json({ ok: false, error: "Failed to save. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
