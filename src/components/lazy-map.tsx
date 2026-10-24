"use client";

import { MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { focusRing } from "@/components/styles";
import { cn } from "@/lib/cn";

/**
 * A styled directions card is always painted. The embed is requested only once
 * the card is near the viewport, and it stays hidden until the frame loads.
 * If the observer never fires, the card remains the whole map.
 */
export function LocationMap({
  src,
  title,
  directions,
  label,
}: {
  src: string;
  title: string;
  directions: string;
  label: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || active || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setActive(true);
          observer.disconnect();
        }
      },
      { rootMargin: "280px 0px", threshold: 0.01 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [active]);

  return (
    <div ref={rootRef} className="relative mt-5 aspect-[16/10] overflow-hidden rounded-2xl border-[3px] border-ink bg-turquoise">
      <a
        href={directions}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "absolute inset-0 z-0 flex flex-col items-center justify-center gap-2 bg-[radial-gradient(circle_at_30%_20%,var(--mt-yellow),transparent_42%),radial-gradient(circle_at_80%_80%,var(--mt-lime),transparent_36%)] px-4 text-center",
          focusRing,
        )}
      >
        <span className="grid size-12 place-items-center rounded-full border-[3px] border-ink bg-paper text-chili shadow-[3px_3px_0_0_var(--mt-ink)]">
          <MapPin className="size-6" aria-hidden="true" />
        </span>
        <span className="font-display text-lg uppercase tracking-wide text-ink">{label}</span>
        <span className="text-sm font-extrabold text-ink/80">Open in Google Maps</span>
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
      {active && (
        <iframe
          title={title}
          src={src}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={() => setLoaded(true)}
          className={cn(
            "absolute inset-0 z-10 size-full border-0 transition-opacity duration-300",
            loaded ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        />
      )}
    </div>
  );
}
