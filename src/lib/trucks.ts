import type { Truck } from "@/content/types";
import { telHref } from "@/lib/contact";

/** Trucks with a name and a street address. Incomplete rows are skipped. */
export function visibleTrucks(trucks: Truck[]): Truck[] {
  return trucks.filter((truck) => truck.name.trim() && truck.address.full.trim());
}

/** One shared phone across every truck that has a number, else null. */
export function sharedPhone(trucks: Truck[]) {
  const phones = trucks.flatMap((truck) => {
    const href = telHref(truck.phone);
    if (!href || !truck.phone) return [];
    return [{ href, phone: truck.phone }];
  });
  if (phones.length === 0) return null;
  const first = phones[0];
  if (!phones.every((entry) => entry.href === first.href)) return null;
  return first;
}
