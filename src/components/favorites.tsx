import Image from "next/image";

import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { container } from "@/components/styles";
import { site } from "@/content";
import { favoritePhotos } from "@/lib/photos";

/** A short row of food photos. Hidden when none of them are on disk. */
export function Favorites() {
  const photos = favoritePhotos(site.photos);
  if (photos.length === 0) return null;

  return (
    <section aria-labelledby="favorites-title" className="overflow-x-clip border-b-[3px] border-ink bg-pink py-16 sm:py-20">
      <div className={container}>
        <Reveal>
          <SectionHeading id="favorites-title" kicker="From the window" title="Favorites" />
        </Reveal>
        <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {photos.map((photo, index) => (
            <li key={photo.src}>
              <Reveal delay={(index % 5) * 0.05}>
                <figure className="rounded-2xl border-[3px] border-ink bg-paper p-1.5 shadow-[5px_5px_0_0_var(--mt-ink)]">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    sizes="(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 45vw"
                    className="aspect-square w-full rounded-xl object-cover"
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
