/**
 * Content contract for Mr. Taco.
 *
 * `src/content/site.ts` is data only:
 *
 *   import type { SiteContent } from "./types";
 *   export const site: SiteContent = { ... };
 *
 * Rules (enforced by review, partly by these types):
 *  - Empty strings, empty arrays, `null`, and absent optional fields hide the matching UI.
 *  - Never invent prices, hours, reviews, ordering links, phones, or social URLs.
 *  - No owner/staff personal names, no reviewer names, no photo-source URLs anywhere in here.
 *    This file's values ship to the browser.
 *  - Photos: real files only, in `public/images/`, referenced as `/images/<file>`.
 *    No AI-generated or stock photos of the food or the trucks.
 *  - No pitch features (text pre-orders, AI phone answering, catering, waitlists, "coming soon").
 *    The types carry no fields for them.
 *  - `dishNames` feeds the decorative marquee only. It is not a menu and has no prices.
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
  closeTime: string | null;
  /** True closes the truck for the whole day. */
  closed?: boolean;
};

export type Hours = {
  /** IANA zone used to decide open vs closed. "America/New_York". */
  timezone: string;
  /** Short public line, e.g. "Mon–Sat 10 AM–8 PM". Empty = built from `byDay`. */
  summary: string;
  /** Fallback window for a weekday missing from `byDay`. Null = unknown, don't assume. */
  openTime: string | null;
  closeTime: string | null;
  /** Per-day hours. This is the schedule open/closed reads. */
  byDay?: Partial<Record<Weekday, DayHours>>;
};

export type Address = {
  street: string;
  suite: string;
  /** Empty hides it. Do not guess a neighborhood. */
  neighborhood: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  /** Single line used for the map embed, directions, and footer. */
  full: string;
};

export type Truck = {
  /** Stable slug, e.g. "beach-blvd". Used for the card anchor. */
  id: string;
  /** Short public name, e.g. "Beach Blvd". */
  name: string;
  address: Address;
  /** Short wayfinding line under the address. Empty hides it. */
  locationHint: string;
  /** Null coordinates keep the map on the street address. Do not guess. */
  geo: {
    latitude: number | null;
    longitude: number | null;
  };
  /** Google Maps link. Empty = a directions link built from `address.full`. */
  mapUrl: string;
  /** Absent, or a blank `display`/`tel`, hides this truck's call button. */
  phone?: PhoneNumber;
  /** Absent, or unconfirmed times, hides hours on this card. */
  hours?: Hours;
  /** Shown on this card only while the truck is closed. Empty hides it. */
  closedNotice?: string;
};

export type MenuItem = {
  /** Stable slug, e.g. "al-pastor". */
  id: string;
  name: string;
  description?: string;
  /** Dollars. Leave unset until a real price is confirmed. Never invent one. */
  price?: number;
  /** `price` is a starting price. Renders as "$3.50+". */
  priceFrom?: boolean;
  /**
   * Optional size prices, e.g. [{ label: "Taco", price: 3.5 }, { label: "Quesadilla", price: 9 }].
   * When set, these render instead of `price`.
   */
  sizes?: MenuSize[];
  /** Small "New" badge. Keep it out of `name`. */
  isNew?: boolean;
  /** House signature. Gets a badge. */
  signature?: boolean;
  /** Seeded stand-in copy. Never rendered. */
  placeholder?: boolean;
};

export type MenuSize = {
  label: string;
  /** Dollars. */
  price: number;
};

export type MenuCategory = {
  id: string;
  name: string;
  description?: string;
  items: MenuItem[];
};

export type PhotoCategory = "truck" | "food" | "sign" | "logo";

/** Where a photo came from, as a key only. Full source URLs stay out of this repo. */
export type PhotoCredit = "google-maps-ugc" | "yelp-ugc" | "facebook-page" | "owner" | "nick-shoot";

export type Photo = {
  /** Public path under `/images`, e.g. "/images/beach-blvd-truck.jpg". */
  src: string;
  alt: string;
  category: PhotoCategory;
  credit: PhotoCredit;
  width?: number;
  height?: number;
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
  /** Platform label, e.g. "Google" or "Yelp". Required; quotes without it are skipped. */
  sourceLabel: string;
  /** Optional http(s) link to the review or listing. Never a photo URL. */
  sourceUrl?: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

/** Delivery apps this chain actually uses. A blank href hides that button. */
export type OrderingPlatform = "uber-eats" | "grubhub" | "doordash";

export type OrderingLink = {
  platform: OrderingPlatform;
  /** e.g. "Uber Eats", "Grubhub", "DoorDash". */
  label: string;
  /** https URL only. Empty hides the button. */
  href: string;
};

export type Rating = {
  /** e.g. 4.7 */
  value: number;
  /** Review count. */
  count: number;
  /** e.g. "Google". */
  source: string;
  /** Optional http(s) link to the listing. */
  sourceUrl?: string;
};

/**
 * Colors become CSS variables. Absent = the built-in street palette in globals.css.
 * ink = text, chili = red, lime / pink / turquoise / yellow = fills, cream = page, paper = cards.
 */
export type Palette = {
  ink: string;
  chili: string;
  chiliDeep: string;
  lime: string;
  pink: string;
  pinkDeep: string;
  turquoise: string;
  yellow: string;
  cream: string;
  paper: string;
};

export type SiteContent = {
  name: string;
  /** Empty hides it. */
  tagline: string;
  /** Meta description fallback and JSON-LD. */
  description: string;
  /** Opening year, e.g. "2014". Empty hides the "Est." line. */
  opened: string;
  /** Short line above the hero title. Empty hides it. */
  heroKicker: string;
  /**
   * Decorative marquee labels (Al Pastor, Carnitas, …). Not a menu and never priced.
   * Empty falls back to real menu item names, then the marquee hides.
   */
  dishNames: string[];
  /** One card per truck. Empty array hides Find a truck. */
  trucks: Truck[];
  /** Line under the menu heading. Empty hides it. */
  menuNote: string;
  /** Empty array hides the menu section. */
  menu: MenuCategory[];
  /** Only platforms with an https URL render. Empty array hides Order online. */
  orderingLinks: OrderingLink[];
  socials: SocialLink[];
  /** Aggregate score. Null hides it. */
  rating: Rating | null;
  /** More platform scores, shown after `rating`. */
  extraRatings?: Rating[];
  testimonials: Testimonial[];
  faq: FaqItem[];
  photos: Photo[];
  palette?: Palette;
  about: {
    heading: string;
    paragraphs: string[];
  };
  /** JSON-LD servesCuisine and the hero badge ring. */
  servesCuisine?: string[];
  seo: {
    title: string;
    description: string;
  };
  /** Footer credit text. Always linked to https://nicklopacki.com and always the last footer line. */
  footerCredit: string;
};
