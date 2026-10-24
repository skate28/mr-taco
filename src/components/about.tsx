import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { container } from "@/components/styles";
import { site } from "@/content";

/** Hidden until at least one paragraph is filled in. */
export function About() {
  const paragraphs = site.about.paragraphs.map((paragraph) => paragraph.trim()).filter(Boolean);
  if (paragraphs.length === 0) return null;
  const heading = site.about.heading.trim() || site.name;

  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-24 overflow-x-clip border-b-[3px] border-ink bg-lime py-16 sm:py-24">
      <div className={container}>
        <Reveal>
          <SectionHeading id="about-title" title={heading} />
        </Reveal>
        <div className="mt-8 max-w-3xl space-y-4 text-lg font-semibold leading-relaxed">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
