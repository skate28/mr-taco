import { Bob } from "@/components/bob";
import { ChiliMark, LimeArt, TacoArt } from "@/components/bits";
import { PapelPicado } from "@/components/papel-picado";
import { SpinBadge } from "@/components/spin-badge";
import { buttonChili, container, focusRing } from "@/components/styles";
import { TruckArt } from "@/components/truck-art";
import { nameParts } from "@/components/wordmark";
import { site } from "@/content";
import { cn } from "@/lib/cn";
import { formatCount, reviewScores } from "@/lib/reviews";
import { visibleTrucks } from "@/lib/trucks";
import { MapPin, Star } from "lucide-react";

export function Hero() {
  const { lead, script } = nameParts(site.name);
  const kicker = site.heroKicker.trim();
  const tagline = site.tagline.trim();
  const trucks = visibleTrucks(site.trucks);
  const scores = reviewScores(site);
  const ring = [...(site.servesCuisine ?? []), trucks[0]?.address.city ?? ""].map((part) => part.trim()).filter(Boolean).join(" · ");

  return (
    <section aria-label="Welcome" className="relative overflow-hidden border-b-[3px] border-ink bg-yellow">
      <div aria-hidden="true" className="hero-dots pointer-events-none absolute inset-0 opacity-70" />
      <PapelPicado />
      <div className={cn(container, "relative grid items-center gap-6 pb-12 pt-6 sm:pb-16 sm:pt-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-2 lg:pb-20")}>
        <div className="relative z-10">
          {kicker && (
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border-[3px] border-ink bg-paper px-4 py-1.5 font-display text-xs uppercase tracking-[0.16em] shadow-[0_4px_0_0_var(--mt-ink)] sm:text-sm">
              <MapPin className="size-4 text-chili" aria-hidden="true" />
              {kicker}
            </p>
          )}
          <h1 className="max-w-xl">
            <span className="block font-display text-[clamp(4.6rem,16vw,8.25rem)] uppercase leading-[0.78] tracking-tight text-chili sign-extrude">
              {lead}
            </span>
            {script && (
              <span className="mt-1 block pl-8 sm:pl-16">
                <span className="relative inline-block -rotate-6">
                  <span aria-hidden="true" className="absolute inset-x-[-6%] bottom-[12%] top-[38%] -z-10 rounded-full bg-pink" />
                  <span className="font-script text-[clamp(3.6rem,12vw,6.5rem)] leading-none text-ink">{script}</span>
                </span>
              </span>
            )}
          </h1>
          {tagline && <p className="mt-6 max-w-md text-xl font-extrabold leading-snug sm:text-2xl">{tagline}</p>}

          {scores.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-3">
              {scores.map((score) => (
                <li key={score.source}>
                  <a
                    href={score.href ?? "#reviews"}
                    {...(score.href ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border-[3px] border-ink bg-paper px-4 py-2 text-sm font-extrabold shadow-[0_4px_0_0_var(--mt-ink)]",
                      focusRing,
                    )}
                  >
                    <Star className="size-4 fill-yellow stroke-ink" aria-hidden="true" />
                    {score.value.toFixed(1)} on {score.source} · {formatCount(score.count)} reviews
                  </a>
                </li>
              ))}
            </ul>
          )}

          {trucks.length > 0 && (
            <>
              <div className="mt-7">
                <a href="#trucks" className={buttonChili}>
                  <MapPin className="size-5" aria-hidden="true" />
                  Find a truck
                </a>
              </div>
              <ul className="mt-5 flex flex-wrap gap-2">
                {trucks.map((truck) => (
                  <li key={truck.id}>
                    <a
                      href={`#truck-${truck.id}`}
                      className={cn(
                        "inline-flex min-h-10 items-center rounded-full border-[3px] border-ink bg-turquoise px-3 py-1 font-display text-sm uppercase tracking-wide shadow-[0_3px_0_0_var(--mt-ink)]",
                        focusRing,
                      )}
                    >
                      {truck.name}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <div aria-hidden="true" className="absolute left-[8%] top-[6%] size-40 rounded-full border-[3px] border-ink bg-lime sm:size-56" />
          <div aria-hidden="true" className="absolute bottom-[18%] right-[4%] size-16 rounded-full border-[3px] border-ink bg-pink sm:size-24" />
          <Bob className="absolute left-0 top-[18%] z-10 hidden sm:block" delay={0.2}>
            <TacoArt className="w-20 drop-shadow-[4px_4px_0_var(--mt-ink)]" />
          </Bob>
          <Bob className="absolute right-[2%] top-[8%] z-10" delay={0.6}>
            <LimeArt className="size-14 sm:size-16" />
          </Bob>
          <div className="relative z-[1] pt-4">
            <TruckArt animate label={`Illustrated ${site.name} food truck`} />
          </div>
          {ring && (
            <SpinBadge text={ring} className="absolute bottom-2 left-0 z-20 w-24 -rotate-6 sm:w-32">
              <ChiliMark className="size-8 sm:size-10" />
            </SpinBadge>
          )}
        </div>
      </div>
    </section>
  );
}
