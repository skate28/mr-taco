import { focusRing } from "@/components/styles";
import { Wordmark } from "@/components/wordmark";
import { site } from "@/content";
import { cn } from "@/lib/cn";
import type { NavLink } from "@/lib/nav";

export function Header({ links }: { links: NavLink[] }) {
  return (
    <header className="sticky top-0 z-40 border-b-[3px] border-ink bg-cream/95 backdrop-blur-sm">
      <div className="color-bar" aria-hidden="true" />
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <a href="#content" className={cn("shrink-0 rounded-md", focusRing)} aria-label={`${site.name}, back to top`}>
          <Wordmark name={site.name} />
        </a>
        {links.length > 0 && (
          <nav aria-label="Sections" className="min-w-0">
            <ul className="flex items-center gap-4 overflow-x-auto text-sm font-extrabold uppercase tracking-[0.14em] sm:gap-5">
              {links.map((link) => (
                <li key={link.href} className="shrink-0">
                  <a href={link.href} className={cn("rounded-md decoration-2 underline-offset-8 hover:underline", focusRing)}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
