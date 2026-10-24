# Mr. Taco

Marketing site for Mr. Taco — Mexican street-food taco trucks in Jacksonville, Florida.

Trucks at 10143 Beach Blvd (32246) and 5700 Philips Hwy (32216).

Next.js (App Router) · React · TypeScript · Tailwind CSS v4 · framer-motion · lucide-react.

```bash
npm ci
npm run dev        # http://localhost:3000
npm run typecheck
npm run lint
npm run build
```

- Content contract: [CONTENT_SCHEMA.md](./CONTENT_SCHEMA.md) and `src/content/types.ts`.
- Architecture: [ARCHITECTURE.md](./ARCHITECTURE.md).
- Search indexing is OFF (`noindex, nofollow`, robots.txt `Disallow: /`, `X-Robots-Tag`). See `.env.example`.

Empty strings, empty arrays, `null`, and absent optional fields hide the matching UI.

Built by [nicklopacki.com](https://nicklopacki.com).
