import { NextRequest, NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const VALID_CODES = new Set([
  "OCLD","OCRD","OCLF","OCRF",
  "OALD","OARD","OALF","OARF",
  "ICLD","ICRD","ICLF","ICRF",
  "IALD","IARD","IALF","IARF",
]);

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const { email, code, answers } = body as { email?: unknown; code?: unknown; answers?: unknown };

  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });
  }

  if (typeof code !== "string" || !VALID_CODES.has(code)) {
    return NextResponse.json({ ok: false, error: "Invalid brand type code." }, { status: 400 });
  }

  const capturePayload = {
    email,
    code,
    answers: typeof answers === "string" ? answers : undefined,
    ts: new Date().toISOString(),
  };

  // TODO: Connect to a real backend here. Options:
  //   - Resend:      POST to Resend API to add subscriber + trigger welcome email
  //   - Loops:       POST to loops.so/api/contacts/create with email + brandType property
  //   - ConvertKit:  POST to api.convertkit.com/v3/forms/{id}/subscribe
  //   - Airtable:    POST to api.airtable.com/v0/{baseId}/{tableId} to insert a row
  //   Never log or store emails in plaintext in the repo or logs in production.
  console.log("[capture]", JSON.stringify(capturePayload));

  return NextResponse.json({ ok: true });
}
