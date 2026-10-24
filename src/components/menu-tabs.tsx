"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useId, useState } from "react";

import { focusRing } from "@/components/styles";
import { cn } from "@/lib/cn";

export type MenuTabItem = {
  id: string;
  name: string;
  description: string;
  isNew: boolean;
  signature: boolean;
  prices: { label: string; price: string }[];
  price: string;
};

export type MenuTabCategory = {
  id: string;
  name: string;
  description: string;
  items: MenuTabItem[];
};

export function MenuTabs({ categories }: { categories: MenuTabCategory[] }) {
  const [active, setActive] = useState(categories[0]?.id ?? "");
  const reduce = useReducedMotion();
  const baseId = useId();
  const current = categories.find((category) => category.id === active) ?? categories[0];
  if (!current) return null;

  return (
    <div>
      {categories.length > 1 && (
        <div
          role="tablist"
          aria-label="Menu categories"
          className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-3 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
          onKeyDown={(event) => {
            const keys = ["ArrowRight", "ArrowLeft", "Home", "End"];
            if (!keys.includes(event.key)) return;
            event.preventDefault();
            const index = categories.findIndex((category) => category.id === current.id);
            const next =
              event.key === "Home"
                ? 0
                : event.key === "End"
                  ? categories.length - 1
                  : event.key === "ArrowRight"
                    ? (index + 1) % categories.length
                    : (index - 1 + categories.length) % categories.length;
            const id = categories[next]?.id;
            if (!id) return;
            setActive(id);
            document.getElementById(`${baseId}-tab-${id}`)?.focus();
          }}
        >
          {categories.map((category) => {
            const selected = category.id === current.id;
            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                id={`${baseId}-tab-${category.id}`}
                aria-selected={selected}
                aria-controls={`${baseId}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(category.id)}
                className={cn(
                  "shrink-0 whitespace-nowrap rounded-full border-[3px] border-ink px-5 py-2 font-display text-sm uppercase tracking-wide",
                  selected ? "bg-chili text-cream shadow-[0_4px_0_0_var(--mt-ink)]" : "bg-paper text-ink hover:bg-yellow",
                  focusRing,
                )}
              >
                {category.name}
              </button>
            );
          })}
        </div>
      )}

      <div
        role={categories.length > 1 ? "tabpanel" : undefined}
        id={`${baseId}-panel`}
        aria-labelledby={categories.length > 1 ? `${baseId}-tab-${current.id}` : undefined}
        tabIndex={categories.length > 1 ? 0 : undefined}
        className="mt-8 rounded-[1.75rem] border-[3px] border-ink bg-paper p-6 shadow-[8px_8px_0_0_var(--mt-ink)] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-ink sm:p-10"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={reduce === false ? { opacity: 0, y: 10 } : false}
            animate={{ opacity: 1, y: 0 }}
            {...(reduce === false ? { exit: { opacity: 0, y: -8 } } : {})}
            transition={{ duration: reduce === false ? 0.22 : 0 }}
          >
            <h3 className="font-display text-3xl uppercase text-chili sm:text-4xl">{current.name}</h3>
            {current.description && <p className="mt-2 max-w-2xl text-ink/75">{current.description}</p>}
            <ul className="mt-6 grid gap-x-10 gap-y-5 md:grid-cols-2">
              {current.items.map((item) => (
                <li key={item.id} className="border-b-2 border-dashed border-ink/20 pb-4">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-display text-lg uppercase leading-tight tracking-wide">{item.name}</span>
                    {item.signature && (
                      <span className="rounded-full bg-yellow px-2 py-0.5 text-[0.65rem] font-extrabold uppercase tracking-wider">
                        Favorite
                      </span>
                    )}
                    {item.isNew && (
                      <span className="rounded-full bg-pink px-2 py-0.5 text-[0.65rem] font-extrabold uppercase tracking-wider">
                        New
                      </span>
                    )}
                    {item.prices.length === 0 && item.price && (
                      <>
                        <span aria-hidden="true" className="mx-1 flex-1 translate-y-[-0.3em] border-b-2 border-dotted border-ink/30" />
                        <span className="font-display text-xl text-chili">{item.price}</span>
                      </>
                    )}
                  </div>
                  {item.prices.length > 0 && (
                    <p className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 font-display text-base text-chili">
                      {item.prices.map((size) => (
                        <span key={size.label} className="whitespace-nowrap">
                          <span className="font-sans text-sm font-bold text-ink/70">{size.label}</span> {size.price}
                        </span>
                      ))}
                    </p>
                  )}
                  {item.description && <p className="mt-1 text-[0.95rem] text-ink/75">{item.description}</p>}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
