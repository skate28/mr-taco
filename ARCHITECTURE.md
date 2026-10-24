# Mr. Taco — architecture

Pitch site for a small chain of Mexican street-food taco trucks in Jacksonville.
Next.js App Router · React · TypeScript · Tailwind CSS v4 · framer-motion · lucide-react.

The design is its own: papel picado, a hand-drawn SVG taco truck, lime / chili / hot pink / turquoise / yellow.
Type is Titan One, Pacifico, and Nunito. On load the hero letters slide in from the side, then the
kicker, line, and buttons follow; the truck still rolls in. Below that, headings slide in, cards pop,
and photos tilt as they enter. Motion is CSS plus framer-motion. `prefers-reduced-motion` shows the
settled page with no animation, and a missed observer never leaves a section hidden.

## Files

| Owner | Files |
| --- | --- |
| **Leads** | `src/content/site.ts` (data only), `public/images/` |
| **Code** | `src/app/`, `src/components/`, `src/lib/`, `src/content/types.ts`, `src/content/index.ts`, config, docs |

```
src/
  app/          layout (metadata, robots), page, robots.ts, sitemap.ts, icon, OG/Twitter images, not-found
  components/   one file per section, plus the truck, papel picado, and small client islands
  content/      types.ts (contract), index.ts (the single import point), site.ts (data)
  lib/          pure helpers: hours, menu, money, ordering, reviews, photos, maps, contact, nav, trucks, faq, indexing, site-url
public/images/  real photos only
```

## How content is wired

Components import content only via `import { site } from "@/content"`.

## Page order

Header → Hero (lockup, headline, illustrated truck, hero photo) → dish marquee → Favorites →
Menu (note, choices, cropped menu board) → Fresh → Find a truck → Order online → Reviews →
Photos → About → FAQ → Footer.
Below the wide header, phones get a sticky Call, Find, Menu, and Order bar. The wide header shows the section links plus Call, Find a truck, and Order.

Scroll reveals stay visible until an offscreen block actually intersects, and only when motion is allowed.
`prefers-reduced-motion` shows every section immediately. The marquee wraps and stays clipped, so the page
does not scroll sideways. Map cards show a directions fallback until the embed has loaded.

Every content section returns `null` when its content is empty, and its header link disappears with it.
Call buttons, hours, maps, ordering buttons, and prices hide individually when their fields are empty.

## Indexing

Off. Only `ALLOW_INDEXING=true` enables it (owner sign-off). Otherwise robots.txt disallows `/`, metadata robots
is `noindex, nofollow` (also googleBot), and every response sends `X-Robots-Tag: noindex, nofollow`.

## Not on this site

No "coming soon" cards, text pre-orders, AI phone answering, catering, or waitlist UI. The types don't carry
those fields. No AI-generated or stock photos: the truck, tacos, limes, and papel picado are SVG.

## Deploy

Vercel, Next.js preset, repo root. No env vars required. Set `ALLOW_INDEXING=true` only after owner sign-off.
