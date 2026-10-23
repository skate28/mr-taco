import { ExternalLink } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { buttonLime, buttonPaper, buttonPink, container } from "@/components/styles";
import { site } from "@/content";
import type { OrderingPlatform } from "@/content/types";
import { orderingLinks } from "@/lib/ordering";

const BUTTON: Record<OrderingPlatform, string> = {
  "uber-eats": buttonLime,
  grubhub: buttonPaper,
  doordash: buttonPink,
};

/** Delivery buttons. Hidden until a platform has an https URL. */
export function Order() {
  const links = orderingLinks(site);
  if (links.length === 0) return null;

  return (
    <section id="order" aria-labelledby="order-title" className="scroll-mt-24 border-b-[3px] border-ink bg-turquoise py-16 sm:py-24">
      <div className={container}>
        <Reveal>
          <SectionHeading id="order-title" title="Order online" />
        </Reveal>
        <Reveal delay={0.08}>
          <ul className="mt-8 flex flex-wrap gap-4">
            {links.map((link) => (
              <li key={link.platform}>
                <a href={link.href} target="_blank" rel="noopener noreferrer" className={BUTTON[link.platform]}>
                  <ExternalLink className="size-5" aria-hidden="true" />
                  {link.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
