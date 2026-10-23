import { site } from "@/content";
import type { MenuItem } from "@/content/types";
import { faqItems } from "@/lib/faq";
import { openingHoursSpec } from "@/lib/hours";
import { directionsHref } from "@/lib/maps";
import { getMenu, visibleItem } from "@/lib/menu";
import { offerPrice } from "@/lib/money";
import { telHref } from "@/lib/contact";
import { galleryPhotos } from "@/lib/photos";
import { getSiteUrl } from "@/lib/site-url";
import { visibleTrucks } from "@/lib/trucks";

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
  const trucks = visibleTrucks(site.trucks).map((truck) => {
    const street = [truck.address.street, truck.address.suite].map((part) => part.trim()).filter(Boolean).join(", ");
    const entry: Record<string, unknown> = {
      "@type": "FoodEstablishment",
      name: `${site.name} — ${truck.name.trim()}`,
      servesCuisine: site.servesCuisine?.length ? site.servesCuisine : ["Mexican"],
      address: {
        "@type": "PostalAddress",
        streetAddress: street || undefined,
        addressLocality: truck.address.city.trim() || undefined,
        addressRegion: truck.address.region.trim() || undefined,
        postalCode: truck.address.postalCode.trim() || undefined,
        addressCountry: truck.address.country.trim() || undefined,
      },
    };
    const phone = truck.phone?.e164.trim();
    if (phone && telHref(truck.phone)) entry.telephone = phone;
    const map = directionsHref(truck);
    if (map) entry.hasMap = map;
    if (truck.geo.latitude != null && truck.geo.longitude != null) {
      entry.geo = { "@type": "GeoCoordinates", latitude: truck.geo.latitude, longitude: truck.geo.longitude };
    }
    const hours = openingHoursSpec(truck.hours);
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
  if (trucks.length > 0) data.location = trucks;
  const menu = menuNode(url);
  if (menu) data.hasMenu = menu;
  const photo = galleryPhotos(site.photos)[0];
  if (photo) data.image = `${url}${photo.src}`;

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
