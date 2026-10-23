import { site } from "@/content";
import type { MenuCategory, MenuItem, SiteContent } from "@/content/types";

export function visibleItem(item: MenuItem): boolean {
  return Boolean(item.name.trim()) && !item.placeholder;
}

/** Categories with a name and at least one real item. Placeholder items are omitted. */
export function visibleCategories(menu: MenuCategory[]): MenuCategory[] {
  return menu.flatMap((category) => {
    if (!category.name.trim()) return [];
    const items = category.items.filter(visibleItem);
    if (items.length === 0) return [];
    return [{ ...category, name: category.name.trim(), items }];
  });
}

export function getMenu(content: SiteContent = site): MenuCategory[] {
  return content.menu ?? [];
}

/** What the page shows. Placeholder items are dropped and never render as a sample menu. */
export function menuView(content: SiteContent = site): MenuCategory[] {
  return visibleCategories(getMenu(content));
}

/** Decorative marquee. Dish names first, then real menu item names. */
export function marqueeWords(content: SiteContent = site): string[] {
  const named = content.dishNames.map((name) => name.trim()).filter(Boolean);
  if (named.length > 0) return named;
  return menuView(content).flatMap((category) => category.items.map((item) => item.name.trim()).filter(Boolean));
}
