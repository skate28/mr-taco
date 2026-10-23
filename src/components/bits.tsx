import { cn } from "@/lib/cn";

/** Small chili used as a marquee separator. */
export function ChiliMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" className={cn("size-7", className)} aria-hidden="true">
      <path
        d="M18 3c.4 2.2-.2 3.6-1.2 4.6 5.2-.6 10 2.4 11.2 7.4 1.6 6.6-2.4 13.2-8.2 15.2-5.2 1.8-10.6-.6-12.2-6.4-1.2-4.4.6-8.2 3.4-10.4C9.2 10.2 9.4 6.6 14 4.2 15.2 2.6 16.8 2.2 18 3Z"
        fill="var(--mt-lime)"
        stroke="var(--mt-ink)"
        strokeWidth="2.2"
      />
      <path d="M16.5 6.5c1.6-2 3.4-2.2 4.2-.6" fill="none" stroke="var(--mt-ink)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** Decorative taco. Not a photo. */
export function TacoArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 90" className={cn("h-auto w-24", className)} aria-hidden="true">
      <path
        d="M14 62c8-28 26-46 46-46s38 18 46 46c-14 8-32 12-46 12S28 70 14 62Z"
        fill="var(--mt-yellow)"
        stroke="var(--mt-ink)"
        strokeWidth="3.5"
      />
      <path
        d="M26 58c6-16 18-26 34-26s28 10 34 26c-10 4-22 6-34 6s-24-2-34-6Z"
        fill="#E07A32"
        stroke="var(--mt-ink)"
        strokeWidth="3"
      />
      <path d="M38 52c2-6 8-8 10-2" fill="none" stroke="var(--mt-lime)" strokeWidth="3" strokeLinecap="round" />
      <path d="M70 48c3-7 9-6 8 1" fill="none" stroke="var(--mt-lime)" strokeWidth="3" strokeLinecap="round" />
      <circle cx="52" cy="50" r="4" fill="var(--mt-paper)" stroke="var(--mt-ink)" strokeWidth="2" />
      <circle cx="84" cy="54" r="4.5" fill="var(--mt-chili)" stroke="var(--mt-ink)" strokeWidth="2" />
      <circle cx="64" cy="58" r="3.5" fill="var(--mt-paper)" stroke="var(--mt-ink)" strokeWidth="2" />
    </svg>
  );
}

export function LimeArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={cn("size-16", className)} aria-hidden="true">
      <circle cx="40" cy="40" r="28" fill="var(--mt-lime)" stroke="var(--mt-ink)" strokeWidth="3.5" />
      <path d="M40 16v48M18 40h44M24 24l32 32M56 24 24 56" stroke="var(--mt-ink)" strokeWidth="2.4" />
      <path d="M40 8c2 4 2 6 0 8" fill="none" stroke="var(--mt-ink)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
