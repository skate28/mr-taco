/** How long the lockup takes before the kicker, line, and buttons follow. */
export function afterLockup(lead: string): number {
  return 0.62 + Array.from(lead).length * 0.07;
}

/**
 * Block letters slide in from the side, then the script word follows.
 * CSS only, so the title is in the first HTML and stays put when motion is reduced.
 */
export function HeroTitle({ lead, script, headline }: { lead: string; script: string; headline: string }) {
  const letters = Array.from(lead);
  const scriptDelay = 0.18 + letters.length * 0.07;
  const headlineDelay = scriptDelay + 0.18;
  const spoken = [lead, script, headline].filter(Boolean).join(" ");

  return (
    <h1 className="max-w-xl overflow-x-clip">
      <span className="sr-only">{spoken}</span>
      <span aria-hidden="true" className="block overflow-x-clip">
        <span className="flex font-display text-[clamp(4.2rem,14vw,7.5rem)] uppercase leading-[0.78] tracking-tight text-chili">
          {letters.map((letter, index) => (
            <span
              key={`${letter}-${index}`}
              className="hero-letter sign-extrude inline-block"
              style={{ animationDelay: `${0.05 + index * 0.07}s` }}
            >
              {letter === " " ? "\u00a0" : letter}
            </span>
          ))}
        </span>
        {script && (
          <span className="hero-script mt-1 block w-fit max-w-full pl-6 sm:pl-14" style={{ animationDelay: `${scriptDelay}s` }}>
            <span className="relative inline-block -rotate-6">
              <span aria-hidden="true" className="absolute inset-x-[-6%] bottom-[12%] top-[38%] -z-10 rounded-full bg-pink" />
              <span className="font-script text-[clamp(3.4rem,11vw,6rem)] leading-none text-ink">{script}</span>
            </span>
          </span>
        )}
      </span>
      {headline && (
        <span
          aria-hidden="true"
          className="enter-right mt-5 block max-w-full font-display text-[clamp(1.6rem,4vw,2.4rem)] uppercase leading-[0.95] tracking-tight text-ink"
          style={{ animationDelay: `${headlineDelay}s` }}
        >
          {headline}
        </span>
      )}
    </h1>
  );
}
