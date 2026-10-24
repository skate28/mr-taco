import { site } from "@/content";
import type { MenuItem } from "@/content/types";
import { telHref } from "@/lib/contact";
import { faqItems } from "@/lib/faq";
import { openingHoursSpec } from "@/lib/hours";
import { directionsHref } from "@/lib/maps";
import { getMenu, visibleItem } from "@/lib/menu";
import { offerPrice } from "@/lib/money";
import { heroPhoto } from "@/lib/photos";
import { getSiteUrl } from "@/lib/site-url";
import { visibleLocations } from "@/lib/trucks";

function menuItemNode(item: MenuItem) {
  const entry: Record<string, unknown> = {
    "@type": "MenuItem",
    name: item.name.trim(),
  };
  const description = item.description?.trim();
  if (description) entry.description = description;
  const price = typeof item.price === "number" ? offerPrice(item.price) : null;
  if (price) {
    entry.offers = {
      "@type": "Offer",
      price,
      priceCurrency: "USD",
      ...(item.priceFrom ? { description: "Starting price" } : {}),
    };
  }
  return entry;
}

function menuNode(url: string) {
  const sections = getMenu(site)
    .map((category) => {
      const items = category.items.filter(visibleItem);
      if (!category.name.trim() || items.length === 0) return null;
      return {
        "@type": "MenuSection",
        name: category.name.trim(),
        description: category.description?.trim() || undefined,
        hasMenuItem: items.map(menuItemNode),
      };
    })
    .filter((section) => section !== null);
  if (sections.length === 0) return undefined;
  return {
    "@type": "Menu",
    name: `${site.name} menu`,
    url: `${url}/#menu`,
    hasMenuSection: sections,
  };
}

export function JsonLd() {
  const url = getSiteUrl();
  const places = visibleLocations(site.locations).map((location) => {
    const entry: Record<string, unknown> = {
      "@type": "FoodEstablishment",
      name: `${site.name} — ${location.name.trim()}`,
      servesCuisine: site.servesCuisine?.length ? site.servesCuisine : ["Mexican"],
      address: {
        "@type": "PostalAddress",
        streetAddress: location.address.street.trim() || undefined,
        addressLocality: location.address.city.trim() || undefined,
        addressRegion: location.address.region.trim() || undefined,
        postalCode: location.address.postalCode.trim() || undefined,
        addressCountry: location.address.country.trim() || undefined,
      },
    };
    const phone = location.phone?.e164.trim();
    if (phone && telHref(location.phone)) entry.telephone = phone;
    const map = directionsHref(location);
    if (map) entry.hasMap = map;
    if (location.geo.latitude != null && location.geo.longitude != null) {
      entry.geo = {
        "@type": "GeoCoordinates",
        latitude: location.geo.latitude,
        longitude: location.geo.longitude,
      };
    }
    const hours = openingHoursSpec(location.hours ?? undefined);
    if (hours) entry.openingHoursSpecification = hours;
    return entry;
  });

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url,
    description: site.seo.description.trim() || site.description,
    servesCuisine: site.servesCuisine?.length ? site.servesCuisine : ["Mexican"],
  };
  if (places.length > 0) data.location = places;
  const menu = menuNode(url);
  if (menu) data.hasMenu = menu;
  const hero = heroPhoto(site.photos, site.heroImage);
  if (hero) data.image = `${url}${hero.src}`;

  const faq = faqItems();
  const blocks: Record<string, unknown>[] = [data];
  if (faq.length > 0) {
    blocks.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question.trim(),
        acceptedAnswer: { "@type": "Answer", text: item.answer.trim() },
      })),
    });
  }

  return (
    <>
      {blocks.map((block) => (
        <script
          key={String(block["@type"])}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block).replace(/</g, "\\u003c") }}
        />
      ))}
    </>
  );
}
