import { cn } from "@/lib/cn";

type TruckArtProps = {
  /** Body fill. Cab and awning stay yellow so every truck still reads as Mr. Taco. */
  body?: string;
  /** Hero truck rolls in, steams, and sizzles. Cards stay still. */
  animate?: boolean;
  /** Drops the side lettering so a small card stays readable. */
  compact?: boolean;
  /** Hide from assistive tech when the truck name is already in text nearby. */
  decorative?: boolean;
  className?: string;
  label?: string;
};

/**
 * Hand-drawn taco truck. Shapes only — never a photo.
 */
export function TruckArt({
  body = "var(--mt-chili)",
  animate = false,
  compact = false,
  decorative = false,
  className,
  label = "Illustrated Mr. Taco food truck",
}: TruckArtProps) {
  const ink = "var(--mt-ink)";
  const yellow = "var(--mt-yellow)";
  const cream = "var(--mt-paper)";
  const turquoise = "var(--mt-turquoise)";
  const lime = "var(--mt-lime)";
  const pink = "var(--mt-pink)";

  return (
    <svg
      viewBox="0 0 680 420"
      className={cn("h-auto w-full text-ink", animate && "truck-roll", className)}
      {...(decorative ? { "aria-hidden": true as const } : { role: "img" as const, "aria-label": label })}
    >
      <ellipse cx="350" cy="372" rx="250" ry="16" fill={ink} opacity="0.14" />

      {animate && (
        <g fill={cream} stroke="none">
          <circle className="steam" cx="392" cy="168" r="8" style={{ animationDelay: "1.15s" }} />
          <circle className="steam" cx="418" cy="160" r="6" style={{ animationDelay: "1.55s" }} />
          <circle className="steam" cx="366" cy="162" r="5" style={{ animationDelay: "1.9s" }} />
        </g>
      )}

      <g className={animate ? "sizzle" : undefined} fill="none" stroke={yellow} strokeWidth="3.5" strokeLinecap="round">
        <path d="M348 150q10-16 2-26" />
        <path d="M378 144q12-18 0-30" style={{ animationDelay: "0.25s" }} />
        <path d="M408 150q8-14 2-24" style={{ animationDelay: "0.5s" }} />
      </g>

      <path d="M250 148h300l16 36H242Z" fill={yellow} stroke={ink} strokeWidth="4" strokeLinejoin="round" />
      <path d="M278 152l8 28M318 150l8 30M358 148l8 32M398 146l8 32M438 144l8 32M478 142l8 32" stroke={pink} strokeWidth="7" />

      <path
        d="M188 168h372c18 0 32 14 32 32v112H168V190c0-12 9-22 20-22Z"
        fill={body}
        stroke={ink}
        strokeWidth="5"
        strokeLinejoin="round"
      />

      <path d="M188 176c-28 6-70 28-96 70l-10 62h106V176Z" fill={yellow} stroke={ink} strokeWidth="5" strokeLinejoin="round" />
      <path d="M168 188c-22 8-52 28-70 58l-6 28h76V188Z" fill={turquoise} stroke={ink} strokeWidth="4" />
      <circle cx="92" cy="292" r="11" fill={yellow} stroke={ink} strokeWidth="3" />
      <rect x="58" y="300" width="28" height="12" rx="3" fill={ink} />
      <path d="M118 214h18" stroke={ink} strokeWidth="4" strokeLinecap="round" />

      <rect x="330" y="196" width="168" height="96" rx="16" fill={cream} stroke={ink} strokeWidth="4" />
      <path
        d="M348 268c10-34 32-52 52-52s42 18 52 52c-16 8-36 12-52 12s-36-4-52-12Z"
        fill={yellow}
        stroke={ink}
        strokeWidth="3"
      />
      <path d="M364 258c6-16 20-26 36-26s30 10 36 26c-10 4-24 6-36 6s-26-2-36-6Z" fill="#E07A32" stroke={ink} strokeWidth="2.5" />
      <circle cx="386" cy="250" r="4" fill={cream} stroke={ink} strokeWidth="2" />
      <circle cx="418" cy="254" r="4.5" fill="var(--mt-chili)" stroke={ink} strokeWidth="2" />
      <path d="M400 242c2-6 7-6 7 0" fill="none" stroke={lime} strokeWidth="3" strokeLinecap="round" />

      <rect x="318" y="278" width="192" height="16" rx="4" fill={ink} />
      <circle cx="520" cy="250" r="16" fill={lime} stroke={ink} strokeWidth="3" />
      <path d="M520 236v28M508 250h24" stroke={ink} strokeWidth="2" />

      {!compact && (
        <text
          x="430"
          y="338"
          textAnchor="middle"
          fill={cream}
          stroke={ink}
          strokeWidth="5"
          paintOrder="stroke"
          style={{ fontFamily: "var(--font-display), Impact, sans-serif", fontSize: 28, letterSpacing: 1 }}
        >
          MR. TACO
        </text>
      )}

      <line x1="210" y1="128" x2="530" y2="118" stroke={ink} strokeWidth="3" />
      {[
        [230, 126, "var(--mt-chili)"],
        [280, 124, yellow],
        [330, 122, turquoise],
        [380, 120, pink],
        [430, 118, lime],
        [480, 116, "var(--mt-chili)"],
      ].map(([x, y, fill]) => (
        <circle key={`${x}`} cx={x as number} cy={y as number} r="8" fill={fill as string} stroke={ink} strokeWidth="2.5" />
      ))}

      <Wheel cx={230} cy={348} animate={animate} />
      <Wheel cx={520} cy={348} animate={animate} />
    </svg>
  );
}

function Wheel({ cx, cy, animate }: { cx: number; cy: number; animate: boolean }) {
  const ink = "var(--mt-ink)";
  return (
    <g className={animate ? "wheel" : undefined}>
      <circle cx={cx} cy={cy} r="38" fill={ink} />
      <circle cx={cx} cy={cy} r="16" fill="var(--mt-yellow)" stroke={ink} strokeWidth="4" />
      <circle cx={cx} cy={cy} r="5" fill={ink} />
      <path d={`M${cx} ${cy - 28}v10M${cx} ${cy + 18}v10M${cx - 28} ${cy}h10M${cx + 18} ${cy}h10`} stroke="var(--mt-paper)" strokeWidth="3" strokeLinecap="round" />
    </g>
  );
}
