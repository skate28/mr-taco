import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { container, focusRing } from "@/components/styles";
import { faqItems } from "@/lib/faq";

/** Native disclosures. Hidden when there are no questions. */
export function Faq() {
  const items = faqItems();
  if (items.length === 0) return null;

  return (
    <section id="faq" aria-labelledby="faq-title" className="scroll-mt-24 overflow-x-clip border-b-[3px] border-ink bg-paper py-16 sm:py-24">
      <div className={container}>
        <Reveal from="side">
          <SectionHeading id="faq-title" title="FAQ" />
        </Reveal>
        <div className="mt-8 divide-y-2 divide-ink/15 border-y-2 border-ink/15">
          {items.map((item) => (
            <details key={item.question} className="group py-4">
              <summary className={`cursor-pointer list-none font-display text-xl uppercase tracking-wide marker:content-none [&::-webkit-details-marker]:hidden ${focusRing}`}>
                <span className="flex items-center justify-between gap-4">
                  {item.question}
                  <span aria-hidden="true" className="font-script text-3xl text-pink-deep group-open:rotate-45">
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 max-w-3xl text-lg leading-relaxed">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
