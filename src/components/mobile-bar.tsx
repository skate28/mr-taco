import { MapPin, UtensilsCrossed } from "lucide-react";

import { focusOnDark } from "@/components/styles";
import { site } from "@/content";
import { cn } from "@/lib/cn";
import { menuView } from "@/lib/menu";
import { siteOrderingLinks } from "@/lib/ordering";
import { visibleLocations } from "@/lib/trucks";

/** Sticky phone actions. Hidden on desktop. A button appears only when its section does. */
export function MobileBar() {
  const trucks = visibleLocations(site.locations).length > 0;
  const menu = menuView(site).length > 0;
  const order = siteOrderingLinks(site).length > 0;
  const count = [trucks, menu, order].filter(Boolean).length;
  if (count === 0) return null;

  const item = "flex min-h-12 items-center justify-center gap-1.5 rounded-xl text-sm font-extrabold uppercase tracking-wide";

  return (
    <nav
      aria-label="Quick actions"
      className={cn(
        "fixed inset-x-3 bottom-3 z-40 grid gap-1.5 rounded-2xl border-[3px] border-ink bg-ink p-1.5 text-cream shadow-[0_5px_0_0_var(--mt-lime)] md:hidden",
        count === 3 ? "grid-cols-3" : count === 2 ? "grid-cols-2" : "grid-cols-1",
      )}
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
    >
      {trucks && (
        <a href="#trucks" className={cn(item, "bg-lime font-display text-base text-ink", focusOnDark)}>
          <MapPin className="size-4" aria-hidden="true" />
          Find a truck
        </a>
      )}
      {menu && (
        <a href="#menu" className={cn(item, focusOnDark)}>
          <UtensilsCrossed className="size-4" aria-hidden="true" />
          Menu
        </a>
      )}
      {order && (
        <a href="#order" className={cn(item, focusOnDark)}>
          Order
        </a>
      )}
    </nav>
  );
}
