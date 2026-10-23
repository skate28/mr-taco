import type { MetadataRoute } from "next";

import { allowIndexing } from "@/lib/indexing";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!allowIndexing()) return [];
  return [{ url: `${getSiteUrl()}/`, changeFrequency: "weekly", priority: 1 }];
}
