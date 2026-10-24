import Image from "next/image";

import { MenuTabs, type MenuTabCategory } from "@/components/menu-tabs";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { container } from "@/components/styles";
import { site } from "@/content";
import { menuChoices, menuView } from "@/lib/menu";
import { formatPrice } from "@/lib/money";
import { menuBoardPhoto } from "@/lib/photos";

/** Priced menu. Hidden until real categories are in the content file. */
export function MenuSection() {
  const categories: MenuTabCategory[] = menuView(site).map((category) => ({
    id: category.id,
    name: category.name,
    description: category.description?.trim() ?? "",
    items: category.items.map((item) => ({
      id: item.id,
      name: item.name.trim(),
      description: item.description?.trim() ?? "",
      isNew: Boolean(item.isNew),
      signature: Boolean(item.signature),
      prices: (item.sizes ?? [])
        .filter((size) => size.label.trim() && Number.isFinite(size.price))
        .map((size) => ({ label: size.label.trim(), price: formatPrice(size.price) })),
      price: typeof item.price === "number" ? formatPrice(item.price, item.priceFrom) : "",
    })),
  }));
  if (categories.length === 0) return null;
  const note = site.menuNote.trim();
  const choices = menuChoices(site);
  const board = menuBoardPhoto(site.photos);
  const extras = [site.priceRange.trim(), site.paymentNote.trim()].filter(Boolean);

  return (
    <section id="menu" aria-labelledby="menu-title" className="scroll-mt-24 overflow-x-clip border-b-[3px] border-ink bg-paper py-16 sm:py-24">
      <div className={container}>
        <Reveal>
          <SectionHeading id="menu-title" kicker="At the window" title="Menu" />
          {extras.length > 0 && (
            <p className="mt-4 font-display text-sm uppercase tracking-[0.16em] text-ink/70">{extras.join(" · ")}</p>
          )}
          {note && (
            <p className="mt-5 max-w-3xl rounded-2xl border-[3px] border-ink bg-yellow px-4 py-3 text-base font-extrabold leading-snug shadow-[4px_4px_0_0_var(--mt-ink)]">
              {note}
            </p>
          )}
        </Reveal>
        {choices.length > 0 && (
          <Reveal delay={0.05}>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {choices.map((group) => (
                <li key={group.label} className="rounded-2xl border-[3px] border-ink bg-cream p-4">
                  <h3 className="font-display text-xl uppercase tracking-wide">{group.label}</h3>
                  <p className="mt-2 font-semibold leading-snug">{group.options.join(" · ")}</p>
                  {group.note && <p className="mt-2 text-sm font-bold text-ink/70">{group.note}</p>}
                </li>
              ))}
            </ul>
          </Reveal>
        )}
        {board && (
          <Reveal delay={0.08}>
            <figure className="mt-8 w-full max-w-md -rotate-1 overflow-hidden rounded-2xl border-[3px] border-ink bg-paper p-2 shadow-[6px_6px_0_0_var(--mt-ink)]">
              <div className="aspect-[5/1] overflow-hidden rounded-xl">
                <Image
                  src={board.src}
                  alt={board.alt}
                  width={board.width}
                  height={board.height}
                  sizes="(min-width: 768px) 28rem, 100vw"
                  className="size-full object-cover object-top"
                />
              </div>
            </figure>
          </Reveal>
        )}
        <Reveal delay={0.08} className="mt-10">
          <MenuTabs categories={categories} />
        </Reveal>
      </div>
    </section>
  );
}
