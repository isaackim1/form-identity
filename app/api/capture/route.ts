import { NextRequest, NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const { email, code } = body as { email?: unknown; code?: unknown };

  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });
  }

  if (typeof code !== "string" || code.length === 0) {
    return NextResponse.json({ ok: false, error: "Missing brand type code." }, { status: 400 });
  }

  // Placeholder — log capture, no real storage yet
  console.log(`[capture] email=${email} code=${code} ts=${new Date().toISOString()}`);

  return NextResponse.json({ ok: true });
}
