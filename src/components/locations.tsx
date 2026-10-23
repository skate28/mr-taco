import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ClosedNotice, ShopStatusPill, TodayMarker } from "@/components/shop-status";
import { buttonChili, buttonPaper, card, container } from "@/components/styles";
import { TruckArt } from "@/components/truck-art";
import { LazyMap } from "@/components/lazy-map";
import { site } from "@/content";
import { cn } from "@/lib/cn";
import { phoneLabel, telHref } from "@/lib/contact";
import { hoursConfirmed, scheduleRows } from "@/lib/hours";
import { directionsHref, mapEmbedSrc } from "@/lib/maps";
import { visibleTrucks } from "@/lib/trucks";
import { MapPin, Phone } from "lucide-react";

const BANDS = ["var(--mt-chili)", "var(--mt-turquoise)", "var(--mt-pink)"] as const;
const TILTS = ["-rotate-1", "rotate-1", "-rotate-[0.6deg]"] as const;

/** One card per truck. Call, hours, and the map hide when that truck has no data for them. */
export function Locations() {
  const trucks = visibleTrucks(site.trucks);
  if (trucks.length === 0) return null;
  const city = trucks.every((truck) => truck.address.city.trim() === trucks[0]?.address.city.trim())
    ? trucks[0]?.address.city.trim() ?? ""
    : "";
  const noun = trucks.length === 1 ? "truck" : "trucks";
  const kicker = [String(trucks.length), noun, city ? `in ${city}` : ""].filter(Boolean).join(" ");

  return (
    <section id="trucks" aria-labelledby="trucks-title" className="relative scroll-mt-24 border-b-[3px] border-ink bg-cream py-16 sm:py-24">
      <div aria-hidden="true" className="paper-dots pointer-events-none absolute inset-0 opacity-80" />
      <div className={cn(container, "relative")}>
        <Reveal>
          <SectionHeading id="trucks-title" kicker={kicker} title="Find a truck" />
        </Reveal>
        <ul className="mt-10 grid gap-8 lg:grid-cols-3">
          {trucks.map((truck, index) => {
            const tel = telHref(truck.phone);
            const directions = directionsHref(truck);
            const embed = mapEmbedSrc(truck);
            const scheduled = hoursConfirmed(truck.hours);
            const summary = truck.hours?.summary.trim() ?? "";
            const rows = truck.hours && scheduled ? scheduleRows(truck.hours) : [];
            const showHours = Boolean(summary || rows.length > 0);
            const hint = truck.locationHint.trim();
            const neighborhood = truck.address.neighborhood.trim();
            const clock = truck.hours
              ? { hours: truck.hours, closedNotice: truck.closedNotice?.trim() ?? "" }
              : null;
            const band = BANDS[index % BANDS.length];

            return (
              <li key={truck.id} id={`truck-${truck.id}`} className="scroll-mt-28">
                <Reveal delay={(index % 3) * 0.08} className="h-full">
                  <article
                    className={cn("wiggle flex h-full flex-col overflow-hidden", card, TILTS[index % TILTS.length])}
                    style={{ ["--tilt" as string]: index % 2 === 0 ? "-1deg" : "1deg" }}
                  >
                    <div className="border-b-[3px] border-ink px-4 pt-3" style={{ background: band }}>
                      <TruckArt body={band} compact decorative />
                    </div>
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <h3 className="font-display text-3xl uppercase leading-none tracking-tight">{truck.name}</h3>
                      <address className="mt-3 text-base font-bold leading-snug">
                        {truck.address.full}
                        {neighborhood && <span className="mt-1 block font-semibold text-ink/70">{neighborhood}</span>}
                      </address>
                      {hint && <p className="mt-2 text-sm font-semibold text-ink/70">{hint}</p>}

                      {showHours && clock && (
                        <div className="mt-4 space-y-3">
                          {scheduled && <ShopStatusPill input={clock} />}
                          {summary && <p className="text-sm font-extrabold uppercase tracking-wide">{summary}</p>}
                          {rows.length > 0 && (
                            <table className="w-full text-sm">
                              <caption className="sr-only">Hours for {truck.name}</caption>
                              <tbody>
                                {rows.map((row) => (
                                  <tr key={row.label} className="border-t border-ink/15">
                                    <th scope="row" className="py-1.5 pr-3 text-left font-bold">
                                      {row.label}
                                      <TodayMarker timeZone={clock.hours.timezone} days={row.days} />
                                    </th>
                                    <td className="py-1.5 text-right font-semibold">{row.value}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          )}
                          <ClosedNotice input={clock} className="text-sm font-semibold" />
                        </div>
                      )}

                      {(tel || directions) && (
                        <div className="mt-5 flex flex-wrap gap-3">
                          {tel && truck.phone && (
                            <a href={tel} className={buttonChili} aria-label={`Call ${site.name} ${truck.name} at ${phoneLabel(truck.phone)}`}>
                              <Phone className="size-5" aria-hidden="true" />
                              Call {phoneLabel(truck.phone)}
                            </a>
                          )}
                          {directions && (
                            <a
                              href={directions}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={buttonPaper}
                              aria-label={`Directions to ${site.name} on ${truck.name}`}
                            >
                              <MapPin className="size-5" aria-hidden="true" />
                              Directions
                              <span className="sr-only"> (opens in a new tab)</span>
                            </a>
                          )}
                        </div>
                      )}

                      {embed && <LazyMap src={embed} title={`Map of ${site.name} at ${truck.address.full}`} />}
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
