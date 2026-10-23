import { site } from "@/content";
import { hasFaq } from "@/lib/faq";
import { menuView } from "@/lib/menu";
import { orderingLinks } from "@/lib/ordering";
import { galleryPhotos } from "@/lib/photos";
import { hasReviews } from "@/lib/reviews";
import { visibleTrucks } from "@/lib/trucks";

export type NavLink = {
  href: string;
  label: string;
};

export function hasAbout(): boolean {
  return site.about.paragraphs.some((paragraph) => paragraph.trim());
}

/** Header links. A link exists only when its section renders. */
export function primaryNav(): NavLink[] {
  return [
    { href: "#menu", label: "Menu", show: menuView(site).length > 0 },
    { href: "#trucks", label: "Trucks", show: visibleTrucks(site.trucks).length > 0 },
    { href: "#order", label: "Order", show: orderingLinks(site).length > 0 },
    { href: "#reviews", label: "Reviews", show: hasReviews(site) },
    { href: "#photos", label: "Photos", show: galleryPhotos(site.photos).length > 0 },
    { href: "#about", label: "About", show: hasAbout() },
    { href: "#faq", label: "FAQ", show: hasFaq() },
  ]
    .filter((link) => link.show)
    .map(({ href, label }) => ({ href, label }));
}
