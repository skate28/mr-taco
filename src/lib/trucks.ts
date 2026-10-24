import type { Location } from "@/content/types";

/** Trucks with a name and a street address. */
export function visibleLocations(locations: Location[]): Location[] {
  return locations.filter((location) => location.name.trim() && location.address.full.trim());
}
