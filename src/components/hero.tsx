import { Bob } from "@/components/bob";
import { ChiliMark, LimeArt, TacoArt } from "@/components/bits";
import { HeroTitle, afterLockup } from "@/components/hero-title";
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
  const follow = afterLockup(lead);

  return (
    <section aria-label="Welcome" className="relative overflow-hidden border-b-[3px] border-ink bg-yellow">
      <div aria-hidden="true" className="hero-dots pointer-events-none absolute inset-0 opacity-70" />
      <PapelPicado />
      <div className={cn(container, "relative grid items-center gap-8 pb-12 pt-6 sm:pb-16 sm:pt-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-4 lg:pb-20")}>
        <div className="relative z-10 min-w-0 overflow-x-clip">
          {kicker && (
            <p
              className="enter mb-4 inline-flex max-w-full items-center gap-2 rounded-full border-[3px] border-ink bg-paper px-4 py-1.5 font-display text-xs uppercase tracking-[0.14em] shadow-[0_4px_0_0_var(--mt-ink)] sm:text-sm"
              style={{ animationDelay: `${follow}s` }}
            >
              <MapPin className="size-4 text-chili" aria-hidden="true" />
              {kicker}
            </p>
          )}
          <HeroTitle lead={lead} script={script} headline={headline} />
          {subline && (
            <p className="enter mt-5 max-w-xl text-lg font-extrabold leading-snug sm:text-xl" style={{ animationDelay: `${follow + 0.1}s` }}>
              {subline}
            </p>
          )}
          {showTagline && (
            <p className="enter mt-3 font-script text-3xl text-pink-deep" style={{ animationDelay: `${follow + 0.18}s` }}>
              {tagline}
            </p>
          )}

          {scores.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-3">
              {scores.map((score, index) => (
                <li key={score.source} className="enter" style={{ animationDelay: `${follow + 0.24 + index * 0.06}s` }}>
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
              <div className="enter mt-7" style={{ animationDelay: `${follow + 0.42}s` }}>
                <a href="#trucks" className={buttonChili}>
                  <MapPin className="size-5" aria-hidden="true" />
                  Find a truck
                </a>
              </div>
              <ul className="mt-5 flex flex-wrap gap-2">
                {locations.map((location, index) => (
                  <li key={location.id} className="enter" style={{ animationDelay: `${follow + 0.5 + index * 0.07}s` }}>
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
            <figure
              className="tilt-in-solid relative z-[1] mx-auto mb-[-18%] w-[86%] max-w-md rounded-[1.4rem] border-[3px] border-ink bg-paper p-2 shadow-[8px_8px_0_0_var(--mt-ink)] sm:mb-[-22%]"
              style={{ ["--rest" as string]: "-2.5deg", animationDelay: "0.34s" }}
            >
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
            <div className="pop-in absolute bottom-1 left-0 z-30" style={{ animationDelay: "0.95s" }}>
              <SpinBadge text={ring} className="w-24 -rotate-6 sm:w-28">
                <ChiliMark className="size-8" />
              </SpinBadge>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
