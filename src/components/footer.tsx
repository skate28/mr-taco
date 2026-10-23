import { PapelPicado } from "@/components/papel-picado";
import { container, focusOnDark } from "@/components/styles";
import { Wordmark } from "@/components/wordmark";
import { site } from "@/content";
import { cn } from "@/lib/cn";
import { phoneLabel, telHref } from "@/lib/contact";
import { hoursConfirmed, hoursFallback } from "@/lib/hours";
import { directionsHref } from "@/lib/maps";
import { httpHref } from "@/lib/ordering";
import { visibleTrucks } from "@/lib/trucks";

/** The credit line is always last. */
export function Footer() {
  const trucks = visibleTrucks(site.trucks);
  const links = site.socials.flatMap((link) => {
    const href = httpHref(link.href);
    return href && link.label.trim() ? [{ label: link.label.trim(), href }] : [];
  });
  const credit = site.footerCredit.trim() || "Built by nicklopacki.com";
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink pb-28 text-cream md:pb-10">
      <PapelPicado />
      <div className={cn(container, "grid gap-10 pt-12 md:grid-cols-[1.3fr_1fr]")}>
        <div>
          <Wordmark name={site.name} tone="cream" />
          {site.tagline.trim() && <p className="mt-4 max-w-sm text-cream/80">{site.tagline}</p>}
          {site.opened.trim() && <p className="mt-3 font-display text-sm uppercase tracking-[0.16em] text-lime">Est. {site.opened.trim()}</p>}
        </div>
        {trucks.length > 0 && (
          <div>
            <p className="font-display text-sm uppercase tracking-[0.18em] text-lime">Trucks</p>
            <ul className="mt-4 space-y-4">
              {trucks.map((truck) => {
                const directions = directionsHref(truck);
                const tel = telHref(truck.phone);
                const hours = truck.hours && hoursConfirmed(truck.hours) ? hoursFallback(truck.hours) : "";
                return (
                  <li key={truck.id}>
                    <a href={`#truck-${truck.id}`} className={cn("font-display text-lg uppercase tracking-wide hover:text-yellow", focusOnDark)}>
                      {truck.name}
                    </a>
                    <p className="text-sm text-cream/80">{truck.address.full}</p>
                    {hours && <p className="text-sm text-cream/70">{hours}</p>}
                    <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                      {directions && (
                        <a href={directions} target="_blank" rel="noopener noreferrer" className={cn("underline underline-offset-4 hover:text-yellow", focusOnDark)}>
                          Directions
                          <span className="sr-only"> to {truck.name} (opens in a new tab)</span>
                        </a>
                      )}
                      {tel && truck.phone && (
                        <a href={tel} className={cn("font-bold hover:text-yellow", focusOnDark)}>
                          {phoneLabel(truck.phone)}
                        </a>
                      )}
                    </p>
                  </li>
                );
              })}
            </ul>
            {links.length > 0 && (
              <ul className="mt-6 space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className={cn("underline-offset-4 hover:text-yellow hover:underline", focusOnDark)}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
      <div className={cn(container, "mt-12 border-t border-cream/15 pt-6")}>
        <p className="text-xs text-cream/55">
          © {year} {site.name}
        </p>
        <p className="mt-3 text-sm text-cream/80">
          <a href="https://nicklopacki.com" className={cn("underline-offset-4 hover:text-lime hover:underline", focusOnDark)}>
            {credit}
          </a>
        </p>
      </div>
    </footer>
  );
}
