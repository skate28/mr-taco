"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/cn";
import { getShopStatus, hoursFallback, statusLabel, weekdayKey, type ShopClockInput, type StatusTone } from "@/lib/hours";

export function ShopStatusPill({ input, className }: { input: ShopClockInput; className?: string }) {
  const summary = hoursFallback(input.hours);
  const [live, setLive] = useState<{ label: string; tone: StatusTone } | null>(null);

  useEffect(() => {
    const update = () => setLive(statusLabel(new Date(), input));
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, [input]);

  const label = live?.label ?? summary;
  const tone = live?.tone ?? "neutral";
  if (!label) return null;

  return (
    <p
      aria-live="polite"
      className={cn(
        "inline-flex max-w-full items-center gap-2 rounded-full border-[3px] border-ink bg-paper px-3 py-1.5 text-sm font-extrabold",
        className,
      )}
    >
      <span
        className={cn(
          "size-2.5 shrink-0 rounded-full",
          tone === "open" && "bg-lime",
          tone === "closed" && "bg-chili",
          tone === "neutral" && "bg-yellow",
        )}
        aria-hidden="true"
      />
      <span>{label}</span>
    </p>
  );
}

export function ClosedNotice({ input, className }: { input: ShopClockInput; className?: string }) {
  const [closed, setClosed] = useState(false);
  useEffect(() => {
    const update = () => setClosed(getShopStatus(new Date(), input).isOpen === false);
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, [input]);
  const text = input.closedNotice.trim();
  if (!closed || !text) return null;
  return <p className={className}>{text}</p>;
}

export function TodayMarker({ timeZone, days }: { timeZone: string; days: string[] }) {
  const [today, setToday] = useState<string | null>(null);
  useEffect(() => {
    const update = () => setToday(weekdayKey(new Date(), timeZone));
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, [timeZone]);
  if (!today || !days.includes(today)) return null;
  return (
    <span className="ml-2 rounded-full bg-chili px-2 py-0.5 align-middle text-[0.65rem] font-extrabold uppercase tracking-wider text-cream">
      Today
    </span>
  );
}
