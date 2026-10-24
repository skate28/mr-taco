# Content schema — Mr. Taco

Leads owns `src/content/site.ts` and `public/images/`. Replace `site.ts` wholesale; components never hard-code
business copy, prices, hours, phones, or photos.

- Types: `src/content/types.ts`. `site.ts` is data only:
  ```ts
  import type { SiteContent } from "./types";
  export const site: SiteContent = { ... };
  ```
- Empty strings, empty arrays, `null`, and absent optional fields hide the matching UI. Nothing renders "coming soon", "TBD", lorem ipsum, or a made-up price.

## Rules

- Do not invent prices, hours, phones, reviews, ordering links, or social URLs.
- No owner or staff personal names, reviewer names, or photo-source URLs (this file ships to the browser).
- Photo `credit` is a key only. It is stripped before anything reaches a client component and is never rendered.
- Real files only, in `public/images/`, referenced as `/images/<file>`.
- No AI-generated or stock photos of the food or the trucks. The hero truck is an SVG illustration.
- Reviews: verbatim quotes, `sourceLabel`, optional `rating` (1–5), optional `sourceUrl`, optional `locationId`. There is no author field.
- Ordering links keep their `label` and `href` exactly. `kind` is `phone`, `online`, or `delivery`. A blank href hides that button. An empty array hides the Order section.
- `marquee` is the decorative dish ticker. It is not a menu and must not include prices. Empty falls back to real menu item names, then the marquee hides.
- Do not link or mention any other domain for this business. Facebook and Instagram profile URLs are allowed. The footer credit stays `https://nicklopacki.com` and is the last footer line.

## Fields

| Field | Renders as | Empty → |
| --- | --- | --- |
| `name` | Header/footer wordmark, hero lockup | — |
| `tagline` | Hero script line when it differs from `heroSubline`, footer | hidden |
| `description` | Meta fallback, JSON-LD | — |
| `opened` | Footer "Est." | hidden |
| `heroKicker` | Line above the hero title | hidden |
| `heroHeadline` | Line under the hero lockup | hidden |
| `heroSubline` | Hero paragraph. Absent uses `tagline` | hidden |
| `heroImage` | Hero photo beside the illustrated truck | no photo |
| `marquee[]` | Decorative dish marquee | falls back to real menu item names, then the marquee hides |
| `locations[]` | Find a truck cards | section hidden |
| `priceRange`, `paymentNote` | Line under the menu heading | hidden |
| `menuNote` | Callout under the menu heading | hidden |
| `menuChoices[]` | Filling and tortilla lists with the menu | hidden |
| `menu[]` | Tabbed menu and JSON-LD. `price` or `sizes[]`; `priceFrom` adds "+" | section hidden |
| `orderingLinks[]` | Order online buttons | section hidden |
| `socials[]`, `extraLinks[]` | Footer | hidden |
| `rating` | Hero rating chip; first badge in Reviews | hidden |
| `extraRatings[]` | Reviews badges after `rating` | hidden |
| `testimonials[]` | Reviews quotes. `locationId` adds that truck's name to the source line | section hidden |
| `faq[]` | Accordion + FAQPage JSON-LD | hidden |
| `photos[]` | Favorites, fresh strip, truck polaroids, cropped menu board, gallery, small footer logo | each surface hidden |
| `palette` | CSS variables (`brand` → chili, `accent` → turquoise, `mustard` → yellow) | built-in street palette |
| `about` | About (needs ≥1 paragraph) | hidden |
| `servesCuisine` | JSON-LD and the hero badge ring | Mexican |
| `seo.title/description` | Title, meta, Open Graph | name / description |
| `footerCredit` | LAST footer line, linked to https://nicklopacki.com | "Built by nicklopacki.com" |

## Ordering link shape

```ts
orderingLinks: [
  { label: "DoorDash · Beach Blvd", href: "https://…", kind: "delivery" },
]
```

Leave `href` as `""` (or omit the row) until the URL is real. Do not rewrite a real href.

## Location shape

```ts
{
  id: "beach-blvd",
  name: "Beach Blvd",
  truckNumber: "#5",
  address: {
    street: "10143 Beach Blvd",
    city: "Jacksonville",
    region: "FL",
    postalCode: "32246",
    country: "US",
    full: "10143 Beach Blvd, Jacksonville, FL 32246",
  },
  neighborhood: "",
  locationHint: "",
  geo: { latitude: null, longitude: null },
  mapUrl: "",
  mapEmbedQuery: "",
  phone: null,
  hours: null,
  closedNotice: "",
  orderingLinks: [],
  rating: null,
}
```

A close time earlier than or equal to the open time is an overnight window. `{ openTime: "17:00", closeTime: "00:00" }` is 5 PM to midnight. `{ openTime: "12:00", closeTime: "02:00" }` is noon to 2 AM.

## Photo shape

```ts
{
  src: "/images/hero-steak-tacos.webp",
  alt: "Steak tacos",
  category: "food",
  credit: "owner",
  width: 1600,
  height: 900,
}
```

`category` is `truck`, `storefront`, `interior`, `food`, `menu-board`, `logo`, or `drinks`. `credit` is a key, never a URL, and never shown. `locationId` ties a truck photo to `locations[].id`.
