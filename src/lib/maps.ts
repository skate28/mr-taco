import { site } from "@/content";
import type { Truck } from "@/content/types";
import { httpHref } from "@/lib/ordering";

function queryFor(truck: Truck): string {
  return [site.name.trim(), truck.address.full.trim()].filter(Boolean).join(", ");
}

/** Directions link. Uses `mapUrl` when set, otherwise a Google Maps search for the street address. */
export function directionsHref(truck: Truck): string | null {
  const explicit = httpHref(truck.mapUrl);
  if (explicit) return explicit;
  const full = truck.address.full.trim();
  if (!full) return null;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(queryFor(truck))}`;
}

/** Keyless Google Maps embed. Coordinates when known, otherwise the street address. */
export function mapEmbedSrc(truck: Truck): string | null {
  const latitude = truck.geo.latitude;
  const longitude = truck.geo.longitude;
  if (latitude != null && longitude != null) {
    return `https://maps.google.com/maps?q=${encodeURIComponent(`${latitude},${longitude}`)}&z=16&output=embed`;
  }
  const full = truck.address.full.trim();
  if (!full) return null;
  return `https://maps.google.com/maps?q=${encodeURIComponent(queryFor(truck))}&z=16&output=embed`;
}
