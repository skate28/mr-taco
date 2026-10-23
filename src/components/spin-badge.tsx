import type { ReactNode } from "react";
import { useId } from "react";

import { cn } from "@/lib/cn";

/** Spinning sticker. Decorative. */
export function SpinBadge({ text, children, className }: { text: string; children: ReactNode; className?: string }) {
  const raw = useId().replace(/:/g, "");
  const id = `badge-${raw}`;
  const ring = `${text} ✶ `.repeat(text.length > 28 ? 2 : 3);

  return (
    <div aria-hidden="true" className={cn("pointer-events-none", className)}>
      <div className="relative grid aspect-square w-full place-items-center rounded-full border-[3px] border-ink bg-yellow shadow-[6px_6px_0_0_var(--mt-ink)]">
        <svg viewBox="0 0 200 200" className="absolute inset-0 size-full animate-spin-slow">
          <defs>
            <path id={id} d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
          </defs>
          <text className="fill-ink uppercase" style={{ fontSize: 13, letterSpacing: 1.4, fontFamily: "var(--font-display), Impact, sans-serif" }}>
            <textPath href={`#${id}`}>{ring}</textPath>
          </text>
        </svg>
        <div className="grid size-[58%] place-items-center rounded-full border-[3px] border-ink bg-chili text-cream">{children}</div>
      </div>
    </div>
  );
}
