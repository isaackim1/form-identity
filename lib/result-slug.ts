const CHARS = "abcdefghijklmnopqrstuvwxyz0123456789";

export function generateResultSlug(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(8));
  return "r_" + Array.from(bytes).map(b => CHARS[b % CHARS.length]).join("");
}
