import { site } from "@/content";
import { phoneLabel, telHref } from "@/lib/contact";
import { hasFaq } from "@/lib/faq";
import { menuView } from "@/lib/menu";
import { siteOrderingLinks } from "@/lib/ordering";
import { galleryPhotos } from "@/lib/photos";
import { hasReviews } from "@/lib/reviews";
import { visibleLocations } from "@/lib/trucks";

export type NavLink = {
  href: string;
  label: string;
};

export type HeaderCall = {
  id: string;
  name: string;
  truckNumber: string;
  place: string;
  phone: string;
  tel: string;
};

/** Tap-to-call rows for the header. Phone strings come from each location, unchanged. */
export function headerCalls(): HeaderCall[] {
  return visibleLocations(site.locations).flatMap((location) => {
    const tel = telHref(location.phone);
    if (!location.phone || !tel) return [];
    const place = [location.neighborhood.trim(), location.address.street.trim()].filter(Boolean).join(" · ");
    return [
      {
        id: location.id,
        name: location.name.trim(),
        truckNumber: location.truckNumber.trim(),
        place,
        phone: phoneLabel(location.phone),
        tel,
      },
    ];
  });
}

export function hasAbout(): boolean {
  return site.about.paragraphs.some((paragraph) => paragraph.trim());
}

/** Header links. A link exists only when its section renders. */
export function primaryNav(): NavLink[] {
  return [
    { href: "#menu", label: "Menu", show: menuView(site).length > 0 },
    { href: "#trucks", label: "Trucks", show: visibleLocations(site.locations).length > 0 },
    { href: "#order", label: "Order", show: siteOrderingLinks(site).length > 0 },
    { href: "#reviews", label: "Reviews", show: hasReviews(site) },
    { href: "#photos", label: "Photos", show: galleryPhotos(site.photos, site.heroImage).length > 0 },
    { href: "#about", label: "About", show: hasAbout() },
    { href: "#faq", label: "FAQ", show: hasFaq() },
  ]
    .filter((link) => link.show)
    .map(({ href, label }) => ({ href, label }));
}
