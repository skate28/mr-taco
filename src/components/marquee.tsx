import { ChiliMark } from "@/components/bits";
import { marqueeWords } from "@/lib/menu";

/** Dish-name ticker. Decorative. Hidden only when there is nothing to show. */
export function Marquee() {
  const words = marqueeWords();
  if (words.length === 0) return null;

  return (
    <div aria-hidden="true" className="marquee-clip overflow-hidden border-b-[3px] border-ink bg-chili py-3 text-yellow">
      <div className="marquee-track flex w-max animate-marquee">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
            {words.map((word, index) => (
              <li key={`${copy}-${word}-${index}`} className="flex items-center whitespace-nowrap">
                <span className="px-4 font-display text-2xl uppercase tracking-wide sm:px-6 sm:text-3xl">{word}</span>
                <ChiliMark className="size-6 sm:size-7" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
