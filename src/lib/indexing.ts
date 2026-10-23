/**
 * Single switch for search indexing.
 * Off until the owner signs off. Set ALLOW_INDEXING=true and redeploy to remove
 * noindex (robots.txt, robots meta, and the X-Robots-Tag header in next.config.ts).
 */
export function allowIndexing(): boolean {
  return process.env.ALLOW_INDEXING === "true";
}
