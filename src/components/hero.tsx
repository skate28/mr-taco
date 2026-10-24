import { Bob } from "@/components/bob";
import { ChiliMark, LimeArt, TacoArt } from "@/components/bits";
import { PapelPicado } from "@/components/papel-picado";
import { SpinBadge } from "@/components/spin-badge";
import { buttonChili, container, focusRing } from "@/components/styles";
import { TruckArt } from "@/components/truck-art";
import { nameParts } from "@/components/wordmark";
import { site } from "@/content";
import { cn } from "@/lib/cn";
import { heroPhoto } from "@/lib/photos";
import { formatCount, reviewScores } from "@/lib/reviews";
import { visibleLocations } from "@/lib/trucks";
import { MapPin, Star } from "lucide-react";
import Image from "next/image";

export function Hero() {
  const { lead, script } = nameParts(site.name);
  const kicker = site.heroKicker?.trim() ?? "";
  const headline = site.heroHeadline?.trim() || "";
  const subline = site.heroSubline?.trim() || site.tagline.trim();
  const tagline = site.tagline.trim();
  const showTagline = Boolean(tagline) && tagline !== subline;
  const locations = visibleLocations(site.locations);
  const scores = reviewScores(site);
  const photo = heroPhoto(site.photos, site.heroImage);
  const ring = [...(site.servesCuisine ?? []), locations[0]?.address.city ?? ""].map((part) => part.trim()).filter(Boolean).join(" · ");

  return (
    <section aria-label="Welcome" className="relative overflow-hidden border-b-[3px] border-ink bg-yellow">
      <div aria-hidden="true" className="hero-dots pointer-events-none absolute inset-0 opacity-70" />
      <PapelPicado />
      <div className={cn(container, "relative grid items-center gap-8 pb-12 pt-6 sm:pb-16 sm:pt-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-4 lg:pb-20")}>
        <div className="relative z-10">
          {kicker && (
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border-[3px] border-ink bg-paper px-4 py-1.5 font-display text-xs uppercase tracking-[0.14em] shadow-[0_4px_0_0_var(--mt-ink)] sm:text-sm">
              <MapPin className="size-4 text-chili" aria-hidden="true" />
              {kicker}
            </p>
          )}
          <h1 className="max-w-xl">
            <span className="block font-display text-[clamp(4.2rem,14vw,7.5rem)] uppercase leading-[0.78] tracking-tight text-chili sign-extrude">
              {lead}
            </span>
            {script && (
              <span className="mt-1 block pl-6 sm:pl-14">
                <span className="relative inline-block -rotate-6">
                  <span aria-hidden="true" className="absolute inset-x-[-6%] bottom-[12%] top-[38%] -z-10 rounded-full bg-pink" />
                  <span className="font-script text-[clamp(3.4rem,11vw,6rem)] leading-none text-ink">{script}</span>
                </span>
              </span>
            )}
            {headline && (
              <span className="mt-5 block max-w-md font-display text-[clamp(1.6rem,4vw,2.4rem)] uppercase leading-[0.95] tracking-tight text-ink">
                {headline}
              </span>
            )}
          </h1>
          {subline && <p className="mt-5 max-w-xl text-lg font-extrabold leading-snug sm:text-xl">{subline}</p>}
          {showTagline && <p className="mt-3 font-script text-3xl text-pink-deep">{tagline}</p>}

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
                    {score.value.toFixed(1)} on {score.source}
                    <span className="font-bold text-ink/70">· {formatCount(score.count)}</span>
                  </a>
                </li>
              ))}
            </ul>
          )}

          {locations.length > 0 && (
            <>
              <div className="mt-7">
                <a href="#trucks" className={buttonChili}>
                  <MapPin className="size-5" aria-hidden="true" />
                  Find a truck
                </a>
              </div>
              <ul className="mt-5 flex flex-wrap gap-2">
                {locations.map((location) => (
                  <li key={location.id}>
                    <a
                      href={`#truck-${location.id}`}
                      className={cn(
                        "inline-flex min-h-10 items-center rounded-full border-[3px] border-ink bg-turquoise px-3 py-1 font-display text-sm uppercase tracking-wide shadow-[0_3px_0_0_var(--mt-ink)]",
                        focusRing,
                      )}
                    >
                      {location.name}
                      {location.truckNumber.trim() ? ` ${location.truckNumber.trim()}` : ""}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <div aria-hidden="true" className="absolute left-[6%] top-[8%] size-36 rounded-full border-[3px] border-ink bg-lime sm:size-48" />
          <div aria-hidden="true" className="absolute bottom-[16%] right-[2%] size-14 rounded-full border-[3px] border-ink bg-pink sm:size-20" />
          <Bob className="absolute left-0 top-[12%] z-20 hidden sm:block" delay={0.2}>
            <TacoArt className="w-16 drop-shadow-[4px_4px_0_var(--mt-ink)]" />
          </Bob>
          <Bob className="absolute right-0 top-0 z-20" delay={0.55}>
            <LimeArt className="size-12 sm:size-14" />
          </Bob>
          {photo && (
            <figure className="relative z-[1] mx-auto mb-[-18%] w-[86%] max-w-md rotate-[-2.5deg] rounded-[1.4rem] border-[3px] border-ink bg-paper p-2 shadow-[8px_8px_0_0_var(--mt-ink)] sm:mb-[-22%]">
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                priority
                sizes="(min-width: 1024px) 36vw, 86vw"
                className="h-auto w-full rounded-xl object-cover"
              />
            </figure>
          )}
          <div className="relative z-[2]">
            <TruckArt animate label={`Illustrated ${site.name} food truck`} />
          </div>
          {ring && (
            <SpinBadge text={ring} className="absolute bottom-1 left-0 z-30 w-24 -rotate-6 sm:w-28">
              <ChiliMark className="size-8" />
            </SpinBadge>
          )}
        </div>
      </div>
    </section>
  );
}
