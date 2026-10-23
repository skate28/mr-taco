import { cn } from "@/lib/cn";

const COLORS = [
  "var(--mt-chili)",
  "var(--mt-yellow)",
  "var(--mt-turquoise)",
  "var(--mt-pink)",
  "var(--mt-lime)",
] as const;

function cutouts(variant: number): string {
  if (variant % 4 === 1) {
    return "M24 34 h10 v10 h-10 z M40 34 h10 v10 h-10 z M35 52 m-6 0 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0";
  }
  if (variant % 4 === 2) {
    return "M35 36 m-9 0 a9 9 0 1 0 18 0 a9 9 0 1 0 -18 0 M28 54 h14 v6 h-14 z";
  }
  if (variant % 4 === 3) {
    return "M32 30 l6 8 l-6 8 l-6 -8 z M24 54 h8 v8 h-8 z M42 54 h8 v8 h-8 z";
  }
  return "M35 34 m-7 0 a7 7 0 1 0 14 0 a7 7 0 1 0 -14 0 M22 50 h8 v8 h-8 z M44 50 h8 v8 h-8 z";
}

function Flag({ color, variant }: { color: string; variant: number }) {
  const d = `M8 8 H66 V68 L37 88 L8 68 Z ${cutouts(variant)}`;
  return (
    <svg viewBox="0 0 74 96" className="h-[4.25rem] w-11 shrink-0 sm:h-20 sm:w-[3.25rem]">
      <path d={d} fill={color} fillRule="evenodd" stroke="var(--mt-ink)" strokeWidth="2.4" />
    </svg>
  );
}

/** Hanging cut-paper banner. Decorative. */
export function PapelPicado({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("relative overflow-hidden", className)}>
      <div className="absolute inset-x-0 top-1.5 h-[3px] bg-ink" />
      <div className="flex w-max">
        {Array.from({ length: 28 }, (_, index) => (
          <Flag key={index} color={COLORS[index % COLORS.length]} variant={index} />
        ))}
      </div>
    </div>
  );
}
