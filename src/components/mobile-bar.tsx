import { MapPin, Phone, UtensilsCrossed } from "lucide-react";

import { focusOnDark } from "@/components/styles";
import { cn } from "@/lib/cn";

type MobileBarProps = {
  showTrucks: boolean;
  showMenu: boolean;
  showOrder: boolean;
  showCall: boolean;
  callOpen: boolean;
  onCall: () => void;
  onNavigate: () => void;
};

/** Sticky phone actions. Hidden from xl up, where the header bar has the same actions. */
export function MobileBar({ showTrucks, showMenu, showOrder, showCall, callOpen, onCall, onNavigate }: MobileBarProps) {
  const count = [showCall, showTrucks, showMenu, showOrder].filter(Boolean).length;
  if (count === 0) return null;

  const item = "flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-xl px-1 text-center text-[0.68rem] font-extrabold uppercase leading-none tracking-wide";

  return (
    <nav
      aria-label="Quick actions"
      className={cn(
        "fixed inset-x-3 bottom-3 z-40 grid gap-1.5 rounded-2xl border-[3px] border-ink bg-ink p-1.5 text-cream shadow-[0_5px_0_0_var(--mt-lime)] xl:hidden",
        count >= 4 ? "grid-cols-4" : count === 3 ? "grid-cols-3" : count === 2 ? "grid-cols-2" : "grid-cols-1",
      )}
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
    >
      {showCall && (
        <button
          type="button"
          onClick={onCall}
          aria-expanded={callOpen}
          aria-controls="header-call-panel"
          className={cn(item, "bg-yellow font-display text-sm text-ink", focusOnDark)}
        >
          <Phone className="size-4" aria-hidden="true" />
          Call
        </button>
      )}
      {showTrucks && (
        <a href="#trucks" onClick={onNavigate} className={cn(item, "bg-lime font-display text-sm text-ink", focusOnDark)}>
          <MapPin className="size-4" aria-hidden="true" />
          Find
          <span className="sr-only"> a truck</span>
        </a>
      )}
      {showMenu && (
        <a href="#menu" onClick={onNavigate} className={cn(item, focusOnDark)}>
          <UtensilsCrossed className="size-4" aria-hidden="true" />
          Menu
        </a>
      )}
      {showOrder && (
        <a href="#order" onClick={onNavigate} className={cn(item, focusOnDark)}>
          Order
        </a>
      )}
    </nav>
  );
}
