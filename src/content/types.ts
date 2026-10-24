/**
 * Content contract for Mr. Taco (multi-truck). Based on the Famous Sandwiches / Star's Caribbean
 * contract; the single-location fields (address, geo, mapUrl, phone, hours, closedNotice,
 * locationHint) moved into `locations[]`. Other differences are marked "NEW" below.
 *
 * `src/content/site.ts` is data only:
 *
 *   import type { SiteContent } from "./types";
 *   export const site: SiteContent = { ... };
 *
 * Rules (enforced by review, partly by these types):
 *  - Empty strings, empty arrays, `null`, and absent optional fields hide the matching UI.
 *  - Never invent prices, hours, reviews, ordering links, or social URLs.
 *  - No owner/staff personal names, no reviewer names, no photo-source URLs anywhere in here.
 *    This file's values ship to the browser.
 *  - Photos: real files only, in `public/images/`, referenced as `/images/<file>`.
 *    No AI-generated or stock photos of the food or the trucks.
 *  - No pitch features (text pre-orders, AI phone answering, catering, waitlists, "coming soon").
 *    The types carry no fields for them.
 */

export type PhoneNumber = {
  /** Shown to people, e.g. "(904) 555-0100". */
  display: string;
  /** `tel:` href, e.g. "tel:+19045550100". */
  tel: string;
  /** E.164, e.g. "+19045550100". */
  e164: string;
};

export type Weekday = "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";

export type DayHours = {
  /** 24-hour "HH:MM", or null when that edge is still unknown. */
  openTime: string | null;
  /**
   * 24-hour "HH:MM". A close time earlier than (or equal to) the open time means the truck
   * closes after midnight, on the next calendar day: { openTime: "17:00", closeTime: "00:00" }
   * is 5 PM to midnight, and { openTime: "12:00", closeTime: "02:00" } is noon to 2 AM.
   * Open/closed logic must treat these as overnight windows (and check the previous day's
   * window just after midnight).
   */
  closeTime: string | null;
  /** True closes the truck for the whole day. */
  closed?: boolean;
};

export type Hours = {
  /** IANA zone used to decide open vs closed. "America/New_York". */
  timezone: string;
  /** Short public line, e.g. "Mon–Sat 5 PM–midnight". Empty = built from `byDay`. */
  summary: string;
  /** Fallback window for a weekday missing from `byDay`. Null = unknown, don't assume. */
  openTime: string | null;
  closeTime: string | null;
  /** Per-day hours. This is the schedule open/closed reads. */
  byDay?: Partial<Record<Weekday, DayHours>>;
};

export type MenuItem = {
  /** Stable slug, e.g. "steak-tacos". */
  id: string;
  name: string;
  description?: string;
  /** Dollars. Leave unset until a real price is confirmed. Never invent one. */
  price?: number;
  /** `price` is a starting price (size upcharges). Renders as "$9.99+". */
  priceFrom?: boolean;
  /** Optional size prices. When set, these render instead of `price`. */
  sizes?: MenuSize[];
  /** Shop labels the item "New". Small badge; keep it out of `name`. */
  isNew?: boolean;
  /** House signature / customer favorite. Gets a badge and can be featured. */
  signature?: boolean;
  /** Seeded stand-in copy. Never rendered. */
  placeholder?: boolean;
};

export type MenuSize = {
  /** e.g. "1", "3", "Small", "Large". */
  label: string;
  /** Dollars. */
  price: number;
};

export type MenuCategory = {
  id: string;
  /** e.g. "Tacos", "Burritos", "Sides". */
  name: string;
  /** Shown under the tab heading. */
  description?: string;
  items: MenuItem[];
};

/** NEW: a "pick your filling" style list shown with the menu (e.g. regular vs special meats). */
export type MenuChoiceGroup = {
  /** e.g. "Regular meats". */
  label: string;
  /** e.g. ["Al pastor", "Carnitas", "Chorizo"]. */
  options: string[];
  /** Optional short note, e.g. "Steak costs a little more." */
  note?: string;
};

/** NEW: "truck" added for food-truck exteriors. */
export type PhotoCategory = "truck" | "storefront" | "interior" | "food" | "menu-board" | "logo" | "drinks";

/** Where a photo came from, as a key only. Never a URL, and never shown in the UI. */
export type PhotoCredit =
  | "google-maps-ugc"
  | "yelp-ugc"
  | "facebook-page"
  | "owner"
  | "nick-shoot"
  | "doordash-listing"
  | "restaurantji-ugc";

export type Photo = {
  /** Public path under `/images`, e.g. "/images/truck-beach-blvd-night.webp". */
  src: string;
  alt: string;
  category: PhotoCategory;
  credit: PhotoCredit;
  width?: number;
  height?: number;
  /** Homepage hero photo. `heroImage` wins over this flag. */
  hero?: boolean;
  /** NEW: ties a truck photo to `locations[].id`, so a location card can show it. */
  locationId?: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

/**
 * A verbatim review quote. There is deliberately NO author/name field.
 * Rendered as: quote, star rating (when set), and `sourceLabel` (linked when `sourceUrl` is http(s)).
 */
export type Testimonial = {
  /** Verbatim text, trimmed only. Use "…" for cuts. */
  quote: string;
  /** Stars the reviewer gave, 1–5. Omit when unknown. */
  rating?: number;
  /** Platform label, e.g. "Google" or "Uber Eats". Required; quotes without it are skipped. */
  sourceLabel: string;
  /** Optional http(s) link to the review or listing. Never a photo URL. */
  sourceUrl?: string;
  /** NEW: optional `locations[].id` the review is about (e.g. "beach-blvd"). */
  locationId?: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export type OrderingLink = {
  /** e.g. "DoorDash", "Uber Eats", "Grubhub". Only services the shop really uses. */
  label: string;
  href: string;
  kind: "phone" | "online" | "delivery";
};

export type Rating = {
  /** e.g. 4.3 */
  value: number;
  /** Review count, e.g. 566. */
  count: number;
  /** e.g. "Google". */
  source: string;
  /** Optional http(s) link to the listing. */
  sourceUrl?: string;
};

/** NEW: one truck. Everything a location card, map embed and tap-to-call button needs. */
export type Location = {
  /** Stable slug, e.g. "beach-blvd". */
  id: string;
  /** Short public name, e.g. "Beach Blvd". */
  name: string;
  /** Shop's own truck number, e.g. "#5". Empty hides it. */
  truckNumber: string;
  address: {
    street: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
    /** Single line used for the footer and directions fallback. */
    full: string;
  };
  /** Area name, e.g. "Southside". Empty hides it. */
  neighborhood: string;
  /** Short wayfinding line under the address. Empty hides it. */
  locationHint: string;
  /** Null coordinates keep the map on the street address. Do not guess. */
  geo: {
    latitude: number | null;
    longitude: number | null;
  };
  /** Google Maps place link for "Directions". Empty = a directions link built from `address.full`. */
  mapUrl: string;
  /**
   * Query string for a Google Maps embed, e.g.
   * `https://www.google.com/maps?q=${encodeURIComponent(mapEmbedQuery)}&output=embed`.
   */
  mapEmbedQuery: string;
  /** Tap-to-call. Null hides the call button for this truck. */
  phone: PhoneNumber | null;
  /** Null hides the hours table and open/closed pill for this truck. */
  hours: Hours | null;
  /** Shown on the card only while this truck is closed. Empty hides it. */
  closedNotice: string;
  /** This truck's own ordering links. Empty array hides them on the card. */
  orderingLinks: OrderingLink[];
  /** This truck's main review score. Null hides it. */
  rating: Rating | null;
  /** Extra scores for this truck. */
  extraRatings?: Rating[];
};

/**
 * Colors become CSS variables. Absent = the built-in palette in globals.css.
 * Roles: ink = text, brand = main (chili red), brandDeep = darker brand, accent = secondary
 * (turquoise), mustard = highlights/prices (sunny yellow), cream = page, paper = cards.
 * NEW optional extras: lime, pink.
 */
export type Palette = {
  ink: string;
  brand: string;
  brandDeep: string;
  accent: string;
  mustard: string;
  cream: string;
  paper: string;
  lime?: string;
  pink?: string;
};

export type SiteContent = {
  name: string;
  /** Short brand line. Empty hides it. */
  tagline: string;
  /** Meta description fallback and JSON-LD. */
  description: string;
  /** Free-text opening year. Empty hides the "Est." line. */
  opened: string;
  /** NEW: every truck shown in "Find a truck". Order = display order; the first is the default. */
  locations: Location[];
  /** e.g. "$". Empty hides it. */
  priceRange: string;
  /** e.g. "Cash & cards". Empty hides it. */
  paymentNote: string;
  /** All ordering services (across trucks) for the main Order section. Empty array = no section. */
  orderingLinks: OrderingLink[];
  socials: SocialLink[];
  /** Aggregate score (hero + Reviews). Null hides it. */
  rating: Rating | null;
  /** Additional platform scores shown in Reviews after `rating`. */
  extraRatings?: Rating[];
  testimonials: Testimonial[];
  faq: FaqItem[];
  /** Line under the menu heading. Empty hides it. */
  menuNote: string;
  /** NEW: filling/tortilla choices shown with the menu. Empty array hides them. */
  menuChoices: MenuChoiceGroup[];
  menu: MenuCategory[];
  photos: Photo[];
  /** Public path for the hero photo. Wins over a photo `hero` flag. */
  heroImage?: string;
  /** Absent = built-in palette. */
  palette?: Palette;
  about: {
    heading: string;
    paragraphs: string[];
  };
  /** Short line above the hero title. Empty/absent hides it. */
  heroKicker?: string;
  /** NEW: big hero headline. Absent = `name`. */
  heroHeadline?: string;
  /** NEW: line under the hero headline. Absent = `tagline`. */
  heroSubline?: string;
  /** NEW: dish names for the scrolling marquee. Empty/absent = built from `menu`. */
  marquee?: string[];
  /** Extra verified links for the footer. */
  extraLinks?: SocialLink[];
  /** JSON-LD servesCuisine. */
  servesCuisine?: string[];
  seo: {
    title: string;
    description: string;
  };
  /** Footer credit text. Always linked to https://nicklopacki.com and always the last footer line. */
  footerCredit: string;
};
