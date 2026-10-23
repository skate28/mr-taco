import type { OrderingLink, OrderingPlatform, SiteContent } from "@/content/types";

const PLATFORMS = new Set<OrderingPlatform>(["uber-eats", "grubhub", "doordash"]);

export function safeHref(href: string | null | undefined): string | null {
  const value = href?.trim() ?? "";
  if (!value) return null;
  if (/^(https?:|tel:|mailto:|\/)/i.test(value)) return value;
  return null;
}

export function httpHref(href: string | null | undefined): string | null {
  const value = safeHref(href);
  return value && /^https?:/i.test(value) ? value : null;
}

/** Delivery buttons with a real https URL. Blank or unknown platforms are dropped. */
export function orderingLinks(content: SiteContent): OrderingLink[] {
  return content.orderingLinks.flatMap((link) => {
    if (!PLATFORMS.has(link.platform)) return [];
    const href = httpHref(link.href);
    const label = link.label.trim();
    if (!href || !label) return [];
    return [{ platform: link.platform, label, href }];
  });
}
