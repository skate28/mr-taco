import { ExternalLink } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { buttonLime, buttonPaper, buttonPink, container } from "@/components/styles";
import { site } from "@/content";
import { siteOrderingLinks } from "@/lib/ordering";

function orderClass(label: string): string {
  const value = label.toLowerCase();
  if (value.includes("uber")) return buttonLime;
  if (value.includes("grubhub")) return buttonPaper;
  if (value.includes("door")) return buttonPink;
  return buttonPaper;
}

/** Every site-level ordering link, labels and URLs unchanged. Hidden when there are none. */
export function Order() {
  const links = siteOrderingLinks(site);
  if (links.length === 0) return null;

  return (
    <section id="order" aria-labelledby="order-title" className="scroll-mt-24 overflow-x-clip border-b-[3px] border-ink bg-turquoise py-16 sm:py-24">
      <div className={container}>
        <Reveal>
          <SectionHeading id="order-title" title="Order online" />
        </Reveal>
        <Reveal delay={0.08}>
          <ul className="mt-8 flex flex-wrap gap-4">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  {...(link.kind === "phone" ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                  className={orderClass(link.label)}
                >
                  {link.kind !== "phone" && <ExternalLink className="size-5" aria-hidden="true" />}
                  {link.label}
                  {link.kind !== "phone" && <span className="sr-only"> (opens in a new tab)</span>}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
