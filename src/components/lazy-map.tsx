"use client";

import { MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/** Loads the map iframe once the card is near the viewport, so first paint stays light. */
export function LazyMap({ src, title }: { src: string; title: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setShow(true);
        observer.disconnect();
      },
      { rootMargin: "240px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative mt-5 aspect-[16/10] overflow-hidden rounded-2xl border-[3px] border-ink bg-turquoise/40">
      <div className="absolute inset-0 grid place-items-center text-ink" aria-hidden="true">
        <MapPin className="size-8" />
      </div>
      {show && (
        <iframe
          title={title}
          src={src}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 size-full border-0"
        />
      )}
    </div>
  );
}
