import { Star } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { container, focusRing } from "@/components/styles";
import { site } from "@/content";
import { cn } from "@/lib/cn";
import { formatCount, reviewQuotes, reviewScores } from "@/lib/reviews";

function Stars({ value }: { value: number }) {
  const full = Math.round(value);
  return (
    <span className="flex" role="img" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          aria-hidden="true"
          className={cn("size-5 stroke-ink", index < full ? "fill-yellow" : "fill-transparent")}
          strokeWidth={1.75}
        />
      ))}
    </span>
  );
}

/** Verbatim quotes with stars and a source label. No reviewer names exist in the data. Hidden when empty. */
export function Reviews() {
  const quotes = reviewQuotes(site.testimonials);
  if (quotes.length === 0) return null;
  const scores = reviewScores(site);

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="scroll-mt-24 border-b-[3px] border-ink bg-chili py-16 text-cream sm:py-24">
      <div className={container}>
        <Reveal>
          <SectionHeading id="reviews-title" kicker="From the line" title="Reviews" tone="cream" />
          {scores.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-3">
              {scores.map((score) => {
                const body = (
                  <>
                    <span className="font-display text-3xl leading-none">{score.value.toFixed(1)}</span>
                    <Stars value={score.value} />
                    <span className="text-sm font-extrabold">
                      {formatCount(score.count)} {score.source} reviews
                    </span>
                  </>
                );
                const cls =
                  "inline-flex items-center gap-3 rounded-full border-[3px] border-ink bg-paper px-4 py-2 text-ink shadow-[0_4px_0_0_var(--mt-ink)]";
                return (
                  <li key={score.source}>
                    {score.href ? (
                      <a href={score.href} target="_blank" rel="noopener noreferrer" className={cn(cls, focusRing)}>
                        {body}
                      </a>
                    ) : (
                      <span className={cls}>{body}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </Reveal>
        <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {quotes.map((quote, index) => (
            <li key={`${quote.sourceLabel}-${index}`}>
              <Reveal delay={(index % 3) * 0.08}>
                <figure className="flex h-full flex-col rounded-[1.75rem] border-[3px] border-ink bg-paper p-6 text-ink shadow-[6px_6px_0_0_var(--mt-ink)]">
                  <div className="flex items-start justify-between gap-4">
                    <span aria-hidden="true" className="-mt-3 font-script text-7xl leading-none text-pink-deep">
                      “
                    </span>
                    {quote.rating !== null && <Stars value={quote.rating} />}
                  </div>
                  <blockquote className="mt-1 flex-1 text-lg font-semibold leading-relaxed">
                    <p>{quote.quote}</p>
                  </blockquote>
                  <figcaption className="mt-5 text-sm font-extrabold uppercase tracking-wider text-ink/70">
                    {quote.href ? (
                      <a href={quote.href} target="_blank" rel="noopener noreferrer" className={cn("underline underline-offset-4 hover:text-chili", focusRing)}>
                        {quote.sourceLabel}
                      </a>
                    ) : (
                      quote.sourceLabel
                    )}
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
