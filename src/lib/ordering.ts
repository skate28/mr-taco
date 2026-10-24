import type { OrderingLink, SiteContent } from "@/content/types";

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

/** Every ordering link with a real href. URLs are never rewritten. */
export function orderingLinks(links: OrderingLink[] | null | undefined): OrderingLink[] {
  return (links ?? []).flatMap((link) => {
    const label = link.label.trim();
    const href = link.kind === "phone" ? safeHref(link.href) : httpHref(link.href);
    if (!label || !href) return [];
    if (link.kind === "phone" && !/^tel:/i.test(href)) return [];
    return [{ label, href, kind: link.kind }];
  });
}

export function siteOrderingLinks(content: SiteContent): OrderingLink[] {
  return orderingLinks(content.orderingLinks);
}
