const CHARS = "abcdefghijklmnopqrstuvwxyz0123456789";

export function isSavedResultSlug(value: string): boolean {
  return /^r_[a-z0-9]{8}$/.test(value);
}

export function generateResultSlug(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(8));
  return "r_" + Array.from(bytes).map(b => CHARS[b % CHARS.length]).join("");
}
