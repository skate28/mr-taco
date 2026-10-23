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
- Photo `credit` is a key only. Real files only, in `public/images/`, referenced as `/images/<file>`.
- No AI-generated or stock photos of the food or the trucks. The hero truck is an SVG illustration.
- Reviews: verbatim quotes, `sourceLabel` ("Google", "Yelp"), optional `rating` (1–5) and `sourceUrl`. There is no author field.
- Ordering links: only Uber Eats, Grubhub, and DoorDash, and only with a real https URL. Empty array = no Order section. A blank href hides that button.
- `dishNames` is the decorative marquee (Al Pastor, Carnitas, …). It is not a menu and must not include prices.
- Do not link or mention any other domain for this business. The footer credit stays `https://nicklopacki.com`.

## Fields

| Field | Renders as | Empty → |
| --- | --- | --- |
| `name` | Header/footer wordmark, hero title (first word in block letters, the rest in script) | — |
| `tagline` | Hero line, footer | hidden |
| `description` | Meta fallback, JSON-LD | — |
| `opened` | Footer "Est." | hidden |
| `heroKicker` | Line above the hero title | hidden |
| `dishNames[]` | Decorative dish marquee | falls back to real menu item names, then the marquee hides |
| `trucks[]` | Find a truck cards | section hidden |
| `trucks[].name`, `address.full` | Card title, address, footer, map | that truck is skipped |
| `trucks[].address.neighborhood` | Line under the address | hidden |
| `trucks[].locationHint` | Line under the address | hidden |
| `trucks[].geo` | Map pin. Null → map by street address | address embed |
| `trucks[].mapUrl` | Directions button | directions URL built from `address.full` |
| `trucks[].phone` | Call button on that card and in the footer | button hidden |
| `trucks[].hours` | Hours on that card, live open/closed pill, footer | hours hidden. A `summary` with no schedule still prints the summary and does not claim open or closed |
| `trucks[].closedNotice` | That card, only while closed | hidden |
| `menuNote` | Under the menu heading | hidden |
| `menu[]` | Tabbed menu and JSON-LD. `price` or `sizes[]`; `priceFrom` adds "+". An item with no price still shows, with no price | section hidden |
| `menu[].items[].placeholder` | Never shown | — |
| `orderingLinks[]` | Order online buttons (`uber-eats`, `grubhub`, `doordash`) | section hidden; a link with a blank href is skipped |
| `socials[]` | Footer | hidden |
| `rating` | Hero rating chip; first badge in Reviews | hidden |
| `extraRatings[]` | Reviews badges after `rating` | hidden |
| `testimonials[]` | Reviews quotes | section hidden |
| `faq[]` | Accordion + FAQPage JSON-LD | hidden |
| `photos[]` | Photos section (logo excluded) | section hidden |
| `palette` | CSS variables | built-in street palette |
| `about` | About (needs ≥1 paragraph) | hidden |
| `servesCuisine` | JSON-LD and the hero badge ring | Mexican |
| `seo.title/description` | Title, meta, Open Graph | name / description |
| `footerCredit` | LAST footer line, linked to https://nicklopacki.com | "Built by nicklopacki.com" |

## Ordering link shape

```ts
orderingLinks: [
  { platform: "uber-eats", label: "Uber Eats", href: "https://…" },
  { platform: "grubhub", label: "Grubhub", href: "https://…" },
  { platform: "doordash", label: "DoorDash", href: "https://…" },
]
```

Leave `href` as `""` (or omit the row) until the URL is real.

## Truck shape

```ts
{
  id: "beach-blvd",
  name: "Beach Blvd",
  address: {
    street: "10143 Beach Blvd",
    suite: "",
    neighborhood: "",
    city: "Jacksonville",
    region: "FL",
    postalCode: "32246",
    country: "US",
    full: "10143 Beach Blvd, Jacksonville, FL 32246",
  },
  locationHint: "",
  geo: { latitude: null, longitude: null },
  mapUrl: "",
  // phone, hours, and closedNotice stay off until confirmed
}
```

## Photo shape

```ts
{
  src: "/images/beach-blvd-truck.jpg",
  alt: "Mr. Taco truck parked on Beach Blvd",
  category: "truck",
  credit: "owner",
  width: 1600,
  height: 1200,
}
```

`category` is `truck`, `food`, `sign`, or `logo`. `credit` is a key, never a URL.
