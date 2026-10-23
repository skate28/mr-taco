import { cn } from "@/lib/cn";

type Tone = "ink" | "cream";

export function SectionHeading({
  id,
  kicker,
  title,
  note,
  tone = "ink",
}: {
  id: string;
  kicker?: string;
  title: string;
  note?: string;
  tone?: Tone;
}) {
  return (
    <div>
      {kicker && (
        <p className={cn("font-script text-3xl leading-none sm:text-4xl", tone === "cream" ? "text-yellow" : "text-pink-deep")}>
          {kicker}
        </p>
      )}
      <h2
        id={id}
        className={cn(
          "font-display text-[clamp(2.6rem,8vw,4.6rem)] uppercase leading-[0.9] tracking-tight",
          kicker && "mt-1",
          tone === "cream" ? "text-cream sign-extrude" : "text-ink",
        )}
      >
        {title}
      </h2>
      {note && <p className={cn("mt-4 max-w-2xl text-lg", tone === "cream" ? "text-cream/85" : "text-ink/75")}>{note}</p>}
    </div>
  );
}
