"use client";

import { MapPin, Menu, Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { MobileBar } from "@/components/mobile-bar";
import { focusOnDark, focusRing } from "@/components/styles";
import { Wordmark } from "@/components/wordmark";
import { cn } from "@/lib/cn";
import type { HeaderCall, NavLink } from "@/lib/nav";

type HeaderProps = {
  name: string;
  links: NavLink[];
  calls: HeaderCall[];
  showTrucks: boolean;
  showMenu: boolean;
  showOrder: boolean;
};

const callButton =
  "inline-flex min-h-11 shrink-0 items-center justify-center gap-1.5 rounded-full border-[3px] border-ink bg-chili px-3.5 font-display text-sm uppercase leading-none tracking-wide text-cream shadow-[0_3px_0_0_var(--mt-ink)]";

const menuButton =
  "inline-flex min-h-11 shrink-0 items-center justify-center gap-1.5 rounded-full border-[3px] border-ink bg-ink px-3.5 font-display text-sm uppercase leading-none tracking-wide text-cream shadow-[0_3px_0_0_var(--mt-ink)]";

const actionButton =
  "inline-flex min-h-11 shrink-0 items-center justify-center gap-1.5 rounded-full border-[3px] border-ink px-3.5 font-display text-sm uppercase leading-none tracking-wide shadow-[0_3px_0_0_var(--mt-ink)]";

export function Header({ name, links, calls, showTrucks, showMenu, showOrder }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [callOpen, setCallOpen] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const showCall = calls.length > 0;

  useEffect(() => {
    if (!menuOpen && !callOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setCallOpen(false);
      }
    };
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
        setCallOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [menuOpen, callOpen]);

  function closeAll() {
    setMenuOpen(false);
    setCallOpen(false);
  }

  function toggleCall() {
    setMenuOpen(false);
    setCallOpen((open) => !open);
  }

  function toggleMenu() {
    setCallOpen(false);
    setMenuOpen((open) => !open);
  }

  return (
    <header ref={rootRef} className="sticky top-0 z-50">
      {/* Blur stays on the bar. backdrop-filter on the header would trap the fixed mobile bar. */}
      <div className="bg-cream/95 backdrop-blur-sm">
        <div className="color-bar" aria-hidden="true" />
        <div className="relative">
          <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-2 border-b-[3px] border-ink px-3 sm:gap-3 sm:px-5 xl:px-8">
          <a href="#content" onClick={closeAll} className={cn("shrink-0 rounded-md", focusRing)} aria-label={`${name}, back to top`}>
            <Wordmark name={name} size="header" />
          </a>

          {links.length > 0 && (
            <nav aria-label="Sections" className="hidden min-w-0 xl:block">
              <ul className="flex items-center gap-x-4 text-[0.78rem] font-extrabold uppercase tracking-[0.08em]">
                {links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className={cn("rounded-md decoration-2 underline-offset-8 hover:underline", focusRing)}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <div className="flex shrink-0 items-center gap-2">
            {showCall && (
              <button
                type="button"
                className={cn(callButton, focusRing)}
                aria-expanded={callOpen}
                aria-controls="header-call-panel"
                onClick={toggleCall}
              >
                <Phone className="size-4" aria-hidden="true" />
                Call
              </button>
            )}
            <div className="hidden items-center gap-2 xl:flex">
              {showTrucks && (
                <a href="#trucks" className={cn(actionButton, "bg-lime text-ink", focusRing)}>
                  <MapPin className="size-4" aria-hidden="true" />
                  Find a truck
                </a>
              )}
              {showOrder && (
                <a href="#order" className={cn(actionButton, "bg-paper text-ink", focusRing)}>
                  Order
                </a>
              )}
            </div>
            <button
              type="button"
              className={cn(menuButton, "xl:hidden", focusOnDark)}
              aria-expanded={menuOpen}
              aria-controls="header-menu-panel"
              onClick={toggleMenu}
            >
              {menuOpen ? <X className="size-4" aria-hidden="true" /> : <Menu className="size-4" aria-hidden="true" />}
              {menuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>

        {showCall && callOpen && (
          <div id="header-call-panel" role="dialog" aria-label="Call a truck" className="header-drop absolute inset-x-0 top-full z-50 px-3 pb-3 sm:px-5 xl:px-8">
            <div className="mx-auto w-full max-w-6xl">
              <CallList calls={calls} onNavigate={closeAll} className="ml-auto w-full max-w-md" />
            </div>
          </div>
        )}

        {menuOpen && (
          <div id="header-menu-panel" className="header-drop absolute inset-x-0 top-full z-50 max-h-[calc(100dvh-4.5rem)] overflow-x-hidden overflow-y-auto border-b-[3px] border-ink bg-cream xl:hidden">
            <div className="mx-auto w-full max-w-6xl px-3 py-4 pb-28 sm:px-5">
              {showCall && (
                <div className="mb-4">
                  <p className="font-display text-sm uppercase tracking-[0.16em] text-ink/70">Call a truck</p>
                  <CallList calls={calls} onNavigate={closeAll} className="mt-3 w-full" />
                </div>
              )}
              {(showTrucks || showOrder) && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {showTrucks && (
                    <a href="#trucks" onClick={closeAll} className={cn(actionButton, "bg-lime text-ink", focusRing)}>
                      <MapPin className="size-4" aria-hidden="true" />
                      Find a truck
                    </a>
                  )}
                  {showOrder && (
                    <a href="#order" onClick={closeAll} className={cn(actionButton, "bg-chili text-cream", focusRing)}>
                      Order
                    </a>
                  )}
                </div>
              )}
              {links.length > 0 && (
                <nav aria-label="Sections">
                  <ul className="overflow-hidden rounded-2xl border-[3px] border-ink bg-paper">
                    {links.map((link) => (
                      <li key={link.href} className="border-b-[3px] border-ink last:border-b-0">
                        <a
                          href={link.href}
                          onClick={closeAll}
                          className={cn("flex min-h-14 items-center px-4 font-display text-2xl uppercase tracking-wide hover:bg-yellow", focusRing)}
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </div>
          </div>
        )}
        </div>
      </div>
      <MobileBar
        showTrucks={showTrucks}
        showMenu={showMenu}
        showOrder={showOrder}
        showCall={showCall}
        callOpen={callOpen}
        onCall={toggleCall}
        onNavigate={closeAll}
      />
    </header>
  );
}

function CallList({ calls, onNavigate, className }: { calls: HeaderCall[]; onNavigate: () => void; className?: string }) {
  return (
    <ul className={cn("space-y-2 rounded-[1.4rem] border-[3px] border-ink bg-paper p-2 shadow-[6px_6px_0_0_var(--mt-ink)]", className)}>
      {calls.map((call, index) => (
        <li key={call.id}>
          <a
            href={call.tel}
            onClick={onNavigate}
            className={cn(
              "flex flex-col gap-2 rounded-2xl border-[3px] border-ink px-3 py-3 min-[480px]:flex-row min-[480px]:items-center min-[480px]:justify-between min-[480px]:gap-3",
              index % 2 === 0 ? "bg-yellow" : "bg-turquoise",
              focusRing,
            )}
          >
            <span className="min-w-0">
              <span className="block font-display text-xl uppercase leading-none tracking-wide">
                {call.name}
                {call.truckNumber ? ` ${call.truckNumber}` : ""}
              </span>
              {call.place && <span className="mt-1 block text-sm font-bold leading-snug">{call.place}</span>}
            </span>
            <span className="flex items-center justify-between gap-3 min-[480px]:block min-[480px]:shrink-0 min-[480px]:text-right">
              <span className="block font-display text-lg leading-none">{call.phone}</span>
              <span className="block text-[0.65rem] font-extrabold uppercase tracking-wider min-[480px]:mt-1">Tap to call</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
