/** Client-safe demo-grade password hash (cyrb53 variant). No server needed. */
export function hashPassword(password: string): string {
  const str = `hartwell1934::${password}`;
  let h1 = 0xdeadbeef;
  let h2 = 0x41c6ce57;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 =
    Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
    Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 =
    Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
    Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(16);
}

export function formatGBP(value: number): string {
  return `£${value.toLocaleString("en-GB")}`;
}

export function cx(
  ...parts: Array<string | false | null | undefined>
): string {
  return parts.filter(Boolean).join(" ");
}

/** Preset concierge credentials for testing the account system. */
export const CONCIERGE_EMAIL = "support@hartwell-luxury.com";
export const CONCIERGE_PASSWORD = "SecureLuxury1934!";

export const FREE_DELIVERY_THRESHOLD = 750;
export const DELIVERY_FEE = 18;

export function formatDate(iso: string | Date): string {
  const d = typeof iso === "string" ? new Date(iso) : iso;
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Rewrite a Pexels CDN URL to a smaller crop so list/cart thumbnails never
 * download the full 900px file. Non-Pexels URLs pass through untouched.
 */
export function pxThumb(src: string, w: number, h: number): string {
  if (!src.includes("images.pexels.com")) return src;
  return src.replace(/w=\d+&h=\d+/, `w=${w}&h=${h}`);
}
