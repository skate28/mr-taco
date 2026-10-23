import Image from "next/image";

import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { container } from "@/components/styles";
import { site } from "@/content";
import { cn } from "@/lib/cn";
import { galleryPhotos, photoDimensions } from "@/lib/photos";

/** Real photos from `public/images/` only. Hidden when there are none. */
export function Gallery() {
  const photos = galleryPhotos(site.photos);
  if (photos.length === 0) return null;

  return (
    <section id="photos" aria-labelledby="photos-title" className="scroll-mt-24 border-b-[3px] border-ink bg-yellow py-16 sm:py-24">
      <div className={container}>
        <Reveal>
          <SectionHeading id="photos-title" kicker="On the street" title="Photos" />
        </Reveal>
        <ul className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {photos.map((photo, index) => (
            <li key={photo.src} className="mb-4 break-inside-avoid">
              <Reveal delay={(index % 3) * 0.06}>
                <figure className={cn("rounded-2xl border-[3px] border-ink bg-paper p-2 shadow-[6px_6px_0_0_var(--mt-ink)]", index % 2 ? "rotate-1" : "-rotate-1")}>
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    {...photoDimensions(photo)}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="h-auto w-full rounded-xl"
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
