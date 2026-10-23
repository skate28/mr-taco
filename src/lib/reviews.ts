import type { Rating, SiteContent, Testimonial } from "@/content/types";
import { httpHref } from "@/lib/ordering";

export type ReviewScore = {
  value: number;
  count: number;
  source: string;
  href: string | null;
};

export type ReviewQuote = {
  quote: string;
  rating: number | null;
  sourceLabel: string;
  href: string | null;
};

function score(rating: Rating | null | undefined): ReviewScore | null {
  if (!rating || !Number.isFinite(rating.value) || rating.value <= 0) return null;
  const source = rating.source.trim();
  if (!source || !Number.isFinite(rating.count) || rating.count <= 0) return null;
  return { value: rating.value, count: rating.count, source, href: httpHref(rating.sourceUrl) };
}

export function reviewScores(content: SiteContent): ReviewScore[] {
  const primary = score(content.rating);
  const extras = (content.extraRatings ?? []).flatMap((rating) => {
    const row = score(rating);
    return row ? [row] : [];
  });
  return primary ? [primary, ...extras] : extras;
}

/** Verbatim quotes with a source label. There is no author field to leak. */
export function reviewQuotes(testimonials: Testimonial[]): ReviewQuote[] {
  return testimonials.flatMap((item) => {
    const quote = item.quote.trim();
    const sourceLabel = item.sourceLabel.trim();
    if (!quote || !sourceLabel) return [];
    const rating =
      typeof item.rating === "number" && Number.isFinite(item.rating) && item.rating >= 1 && item.rating <= 5
        ? item.rating
        : null;
    return [{ quote, rating, sourceLabel, href: httpHref(item.sourceUrl) }];
  });
}

export function hasReviews(content: SiteContent): boolean {
  return reviewQuotes(content.testimonials).length > 0;
}

export function formatCount(count: number): string {
  return new Intl.NumberFormat("en-US").format(Math.round(count));
}
