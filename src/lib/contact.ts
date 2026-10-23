import type { PhoneNumber } from "@/content/types";

/** `tel:` href, or null when no number is set. */
export function telHref(number: PhoneNumber | null | undefined): string | null {
  if (!number) return null;
  const tel = number.tel.trim();
  if (/^tel:\+?[\d-]+$/i.test(tel)) return tel;
  const e164 = number.e164.trim();
  if (/^\+?\d+$/.test(e164)) return `tel:${e164}`;
  return null;
}

export function phoneLabel(number: PhoneNumber): string {
  return number.display.trim() || number.e164.trim() || number.tel.replace(/^tel:/i, "").trim();
}
