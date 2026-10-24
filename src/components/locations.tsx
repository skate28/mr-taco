import Image from "next/image";
import { MapPin, Phone, Star } from "lucide-react";

import { LocationMap } from "@/components/lazy-map";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ClosedNotice, ShopStatusPill, TodayMarker } from "@/components/shop-status";
import { buttonChili, buttonLime, buttonPaper, buttonPink, card, container, focusRing } from "@/components/styles";
import { site } from "@/content";
import type { OrderingLink } from "@/content/types";
import { cn } from "@/lib/cn";
import { phoneLabel, telHref } from "@/lib/contact";
import { hoursConfirmed, scheduleRows } from "@/lib/hours";
import { directionsHref, mapEmbedSrc } from "@/lib/maps";
import { httpHref, orderingLinks } from "@/lib/ordering";
import { photosForLocation } from "@/lib/photos";
import { formatCount } from "@/lib/reviews";
import { visibleLocations } from "@/lib/trucks";

const BANDS = ["var(--mt-chili)", "var(--mt-turquoise)"] as const;
const TILTS = ["-rotate-1", "rotate-1"] as const;

function orderClass(link: OrderingLink, index: number): string {
  const label = link.label.toLowerCase();
  if (label.includes("uber")) return buttonLime;
  if (label.includes("grubhub")) return buttonPaper;
  if (label.includes("door")) return buttonPink;
  return index % 2 === 0 ? buttonPaper : buttonLime;
}

/** One card per truck. Call, hours, ordering, and the map hide when that truck has no data for them. */
export function Locations() {
  const locations = visibleLocations(site.locations);
  if (locations.length === 0) return null;
  const city = locations.every((location) => location.address.city.trim() === locations[0]?.address.city.trim())
    ? locations[0]?.address.city.trim() ?? ""
    : "";
  const noun = locations.length === 1 ? "truck" : "trucks";
  const kicker = [String(locations.length), noun, city ? `in ${city}` : ""].filter(Boolean).join(" ");

  return (
    <section id="trucks" aria-labelledby="trucks-title" className="relative scroll-mt-24 overflow-x-clip border-b-[3px] border-ink bg-cream py-16 sm:py-24">
      <div aria-hidden="true" className="paper-dots pointer-events-none absolute inset-0 opacity-80" />
      <div className={cn(container, "relative")}>
        <Reveal>
          <SectionHeading id="trucks-title" kicker={kicker} title="Find a truck" />
        </Reveal>
        <ul className="mt-10 grid gap-8 lg:grid-cols-2">
          {locations.map((location, index) => {
            const tel = telHref(location.phone);
            const directions = directionsHref(location);
            const embed = mapEmbedSrc(location);
            const scheduled = Boolean(location.hours && hoursConfirmed(location.hours));
            const summary = location.hours?.summary.trim() ?? "";
            const rows = location.hours && scheduled ? scheduleRows(location.hours) : [];
            const showHours = Boolean(summary || rows.length > 0);
            const hint = location.locationHint.trim();
            const neighborhood = location.neighborhood.trim();
            const number = location.truckNumber.trim();
            const clock = location.hours ? { hours: location.hours, closedNotice: location.closedNotice.trim() } : null;
            const orders = orderingLinks(location.orderingLinks);
            const shots = photosForLocation(site.photos, location.id);
            const band = BANDS[index % BANDS.length];
            const scores = [location.rating, ...(location.extraRatings ?? [])].flatMap((rating) => {
              if (!rating || rating.value <= 0 || rating.count <= 0 || !rating.source.trim()) return [];
              return [{ value: rating.value, count: rating.count, source: rating.source.trim(), href: httpHref(rating.sourceUrl) }];
            });

            return (
              <li key={location.id} id={`truck-${location.id}`} className="scroll-mt-28">
                <Reveal delay={(index % 2) * 0.08} className="h-full">
                  <article
                    className={cn("wiggle flex h-full flex-col overflow-hidden", card, TILTS[index % TILTS.length])}
                    style={{ ["--tilt" as string]: index % 2 === 0 ? "-1deg" : "1deg" }}
                  >
                    <div className="relative border-b-[3px] border-ink px-4 pb-4 pt-4" style={{ background: band }}>
                      <div className="flex items-end justify-between gap-3">
                        <div>
                          <h3 className="font-display text-4xl uppercase leading-none tracking-tight text-ink">{location.name}</h3>
                          {number && (
                            <p className="mt-2 inline-flex rounded-full border-[3px] border-ink bg-yellow px-3 py-1 font-display text-sm uppercase">
                              Truck {number}
                            </p>
                          )}
                        </div>
                        {shots.length > 0 && (
                          <ul className="flex shrink-0 items-end">
                            {shots.map((shot, shotIndex) => (
                              <li key={shot.src} className={cn(shotIndex > 0 && "-ml-6")}>
                                <figure
                                  className={cn(
                                    "w-[6.5rem] rounded-sm border-[3px] border-ink bg-paper p-1.5 shadow-[4px_4px_0_0_var(--mt-ink)] sm:w-[7.5rem]",
                                    shotIndex % 2 === 0 ? "-rotate-6" : "rotate-3",
                                  )}
                                >
                                  <Image
                                    src={shot.src}
                                    alt={shot.alt}
                                    width={shot.width}
                                    height={shot.height}
                                    sizes="120px"
                                    className="aspect-[4/5] w-full object-cover"
                                  />
                                </figure>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <address className="text-base font-bold leading-snug">
                        {location.address.full}
                        {neighborhood && <span className="mt-1 block font-semibold text-ink/70">{neighborhood}</span>}
                      </address>
                      {hint && <p className="mt-2 text-sm font-semibold text-ink/70">{hint}</p>}

                      {scores.length > 0 && (
                        <ul className="mt-4 flex flex-wrap gap-2">
                          {scores.map((score) => {
                            const body = (
                              <>
                                <Star className="size-4 fill-yellow stroke-ink" aria-hidden="true" />
                                {score.value.toFixed(1)} {score.source}
                                <span className="text-ink/60">· {formatCount(score.count)}</span>
                              </>
                            );
                            const cls = "inline-flex items-center gap-1.5 rounded-full border-[3px] border-ink bg-paper px-3 py-1 text-sm font-extrabold";
                            return (
                              <li key={score.source}>
                                {score.href ? (
                                  <a href={score.href} target="_blank" rel="noopener noreferrer" className={cn(cls, focusRing)}>
                                    {body}
                                  </a>
                                ) : (
                                  <span className={cls}>{body}</span>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      )}

                      {showHours && clock && (
                        <div className="mt-4 space-y-3">
                          {scheduled && <ShopStatusPill input={clock} />}
                          {summary && <p className="text-sm font-extrabold uppercase tracking-wide">{summary}</p>}
                          {rows.length > 0 && (
                            <table className="w-full text-sm">
                              <caption className="sr-only">Hours for {location.name}</caption>
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

                      {(tel || orders.length > 0 || directions) && (
                        <div className="mt-5 flex flex-wrap gap-3">
                          {tel && location.phone && (
                            <a
                              href={tel}
                              className={buttonChili}
                              aria-label={`Call ${site.name} ${location.name} at ${phoneLabel(location.phone)}`}
                            >
                              <Phone className="size-5" aria-hidden="true" />
                              Call {phoneLabel(location.phone)}
                            </a>
                          )}
                          {directions && (
                            <a href={directions} target="_blank" rel="noopener noreferrer" className={buttonPaper}>
                              <MapPin className="size-5" aria-hidden="true" />
                              Directions
                              <span className="sr-only"> to {location.name} (opens in a new tab)</span>
                            </a>
                          )}
                          {orders.map((link, linkIndex) => (
                            <a
                              key={link.href}
                              href={link.href}
                              {...(link.kind === "phone" ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                              className={orderClass(link, linkIndex)}
                            >
                              {link.label}
                              {link.kind !== "phone" && <span className="sr-only"> (opens in a new tab)</span>}
                            </a>
                          ))}
                        </div>
                      )}

                      {embed && directions && (
                        <LocationMap
                          src={embed}
                          directions={directions}
                          label="Directions"
                          title={`Map of ${site.name} at ${location.address.full}`}
                        />
                      )}
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
