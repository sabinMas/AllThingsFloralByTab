const DEFAULT_MAX_LENGTH = 2000;

// Strips HTML tags, angle brackets, and non-printing control characters
// (keeping tabs/newlines) so nothing markup-like reaches the email.
export function sanitizeText(value: string, maxLength = DEFAULT_MAX_LENGTH): string {
  return value
    .replace(/<[^>]*>?/g, "")
    .replace(/[<>]/g, "")
    .replace(/\p{Cc}/gu, (c) => (c === "\n" || c === "\r" || c === "\t" ? c : ""))
    .trim()
    .slice(0, maxLength);
}
