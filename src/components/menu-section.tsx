import { MenuTabs, type MenuTabCategory } from "@/components/menu-tabs";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { container } from "@/components/styles";
import { site } from "@/content";
import { menuView } from "@/lib/menu";
import { formatPrice } from "@/lib/money";

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

  return (
    <section id="menu" aria-labelledby="menu-title" className="scroll-mt-24 border-b-[3px] border-ink bg-paper py-16 sm:py-24">
      <div className={container}>
        <Reveal>
          <SectionHeading id="menu-title" kicker="At the window" title="Menu" {...(note ? { note } : {})} />
        </Reveal>
        <Reveal delay={0.08} className="mt-10">
          <MenuTabs categories={categories} />
        </Reveal>
      </div>
    </section>
  );
}
