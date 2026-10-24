import Image from "next/image";

import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { container } from "@/components/styles";
import { site } from "@/content";
import { freshPhotos } from "@/lib/photos";

/** Produce photos between the menu and the trucks. Hidden when empty. */
export function Fresh() {
  const photos = freshPhotos(site.photos);
  if (photos.length === 0) return null;

  return (
    <section aria-labelledby="fresh-title" className="overflow-x-clip border-b-[3px] border-ink bg-lime py-16 sm:py-20">
      <div className={container}>
        <Reveal from="side">
          <SectionHeading id="fresh-title" kicker="At the truck" title="Fresh" />
        </Reveal>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {photos.map((photo, index) => (
            <li key={photo.src}>
              <Reveal from="pop" delay={index * 0.06}>
                <figure className="rounded-[1.75rem] border-[3px] border-ink bg-paper p-2 shadow-[6px_6px_0_0_var(--mt-ink)]">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    sizes="(min-width: 640px) 46vw, 100vw"
                    className="aspect-[4/3] w-full rounded-2xl object-cover"
                  />
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
