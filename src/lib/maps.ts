import { site } from "@/content";
import type { Location } from "@/content/types";
import { httpHref } from "@/lib/ordering";

/** Directions link. Uses the location's mapUrl when set. */
export function directionsHref(location: Location): string | null {
  const explicit = httpHref(location.mapUrl);
  if (explicit) return explicit;
  const full = location.address.full.trim();
  if (!full) return null;
  const query = [site.name.trim(), full].filter(Boolean).join(", ");
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

/** Keyless Google Maps embed from `mapEmbedQuery`, then coordinates, then the street address. */
export function mapEmbedSrc(location: Location): string | null {
  const query = location.mapEmbedQuery.trim();
  if (query) {
    return `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=16&output=embed`;
  }
  const { latitude, longitude } = location.geo;
  if (latitude != null && longitude != null) {
    return `https://maps.google.com/maps?q=${encodeURIComponent(`${latitude},${longitude}`)}&z=16&output=embed`;
  }
  const full = location.address.full.trim();
  if (!full) return null;
  const fallback = [site.name.trim(), full].filter(Boolean).join(", ");
  return `https://maps.google.com/maps?q=${encodeURIComponent(fallback)}&z=16&output=embed`;
}
