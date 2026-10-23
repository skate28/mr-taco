import type { DayHours, Hours, Weekday } from "@/content/types";

const WEEKDAYS: Record<string, Weekday> = {
  Sun: "sun",
  Mon: "mon",
  Tue: "tue",
  Wed: "wed",
  Thu: "thu",
  Fri: "fri",
  Sat: "sat",
};

const DAY_ORDER: Weekday[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

const DAY_LABEL: Record<Weekday, string> = {
  mon: "Mon",
  tue: "Tue",
  wed: "Wed",
  thu: "Thu",
  fri: "Fri",
  sat: "Sat",
  sun: "Sun",
};

export type ShopClockInput = {
  hours: Hours;
  closedNotice: string;
};

export type ShopStatus = {
  isOpen: boolean | null;
  summary: string;
  closedNotice: string;
  todayWindow: string | null;
};

export type ScheduleRow = {
  label: string;
  value: string;
  days: Weekday[];
};

export type StatusTone = "open" | "closed" | "neutral";

function parseMinutes(value: string | null | undefined): number | null {
  if (!value) return null;
  const match = /^(\d{1,2}):(\d{2})$/.exec(value.trim());
  if (!match) return null;
  const hour = Number(match[1]);
  const minute = Number(match[2]);
  if (hour > 23 || minute > 59) return null;
  return hour * 60 + minute;
}

export function formatClock(value: string): string {
  const minutes = parseMinutes(value);
  if (minutes == null) return value;
  const hour24 = Math.floor(minutes / 60);
  const minute = minutes % 60;
  const suffix = hour24 >= 12 ? "PM" : "AM";
  const hour = hour24 % 12 || 12;
  if (minute === 0) return `${hour} ${suffix}`;
  return `${hour}:${String(minute).padStart(2, "0")} ${suffix}`;
}

function formatWindow(openTime: string, closeTime: string): string {
  return `${formatClock(openTime)}–${formatClock(closeTime)}`;
}

export function dayHours(hours: Hours, weekday: Weekday | null): DayHours | null {
  if (!weekday) return null;
  const listed = hours.byDay?.[weekday];
  if (listed) return listed;
  if (hours.openTime && hours.closeTime) {
    return { openTime: hours.openTime, closeTime: hours.closeTime };
  }
  return null;
}

function windowLabel(day: DayHours | null): string | null {
  if (!day || day.closed || !day.openTime || !day.closeTime) return null;
  return formatWindow(day.openTime, day.closeTime);
}

/** True when at least one day has a real window or an explicit closed flag. */
export function hoursConfirmed(hours: Hours | null | undefined): boolean {
  if (!hours) return false;
  const listed = DAY_ORDER.some((key) => {
    const day = hours.byDay?.[key];
    if (!day) return false;
    if (day.closed) return true;
    return Boolean(day.openTime && day.closeTime);
  });
  return listed || Boolean(hours.openTime && hours.closeTime);
}

export function zonedParts(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);

  const read = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value;

  let hour = Number(read("hour"));
  const minute = Number(read("minute"));
  if (hour === 24) hour = 0;

  return {
    minutes: hour * 60 + minute,
    weekday: WEEKDAYS[read("weekday") ?? ""] ?? null,
  };
}

export function getShopStatus(now: Date, content: ShopClockInput): ShopStatus {
  const hours = content.hours;
  const summary = hours.summary.trim();
  const timeZone = hours.timezone.trim() || "America/New_York";
  let isOpen: boolean | null = null;
  let todayWindow: string | null = null;

  try {
    if (!hoursConfirmed(hours)) {
      isOpen = null;
    } else {
      const zoned = zonedParts(now, timeZone);
      const day = dayHours(hours, zoned.weekday);
      todayWindow = windowLabel(day);

      if (day?.closed) {
        isOpen = false;
      } else {
        const openMinutes = parseMinutes(day?.openTime);
        const closeMinutes = parseMinutes(day?.closeTime);
        if (openMinutes == null || closeMinutes == null) {
          isOpen = null;
        } else if (closeMinutes > openMinutes) {
          isOpen = zoned.minutes >= openMinutes && zoned.minutes < closeMinutes;
        } else {
          isOpen = zoned.minutes >= openMinutes || zoned.minutes < closeMinutes;
        }
      }
    }
  } catch {
    isOpen = null;
  }

  return {
    isOpen,
    summary,
    closedNotice: content.closedNotice.trim(),
    todayWindow,
  };
}

export function scheduleRows(hours: Hours): ScheduleRow[] {
  const groups: { days: Weekday[]; signature: string }[] = [];

  for (const weekday of DAY_ORDER) {
    const day = hours.byDay?.[weekday];
    const signature = !day
      ? "unknown"
      : day.closed
        ? "closed"
        : day.openTime && day.closeTime
          ? `${day.openTime}|${day.closeTime}`
          : "unknown";
    const previous = groups[groups.length - 1];
    if (previous && previous.signature === signature) previous.days.push(weekday);
    else groups.push({ days: [weekday], signature });
  }

  return groups
    .filter((group) => group.signature !== "unknown")
    .map((group) => {
      const first = DAY_LABEL[group.days[0]];
      const last = DAY_LABEL[group.days[group.days.length - 1]];
      const label = group.days.length === 1 ? first : `${first}–${last}`;
      const value =
        group.signature === "closed" ? "Closed" : formatWindow(...(group.signature.split("|") as [string, string]));
      return { label, value, days: group.days };
    });
}

const ORDER_FROM_SUN: Weekday[] = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

export function nextOpeningLabel(now: Date, hours: Hours): string | null {
  if (!hoursConfirmed(hours)) return null;
  try {
    const zoned = zonedParts(now, hours.timezone.trim() || "America/New_York");
    if (!zoned.weekday) return null;
    const start = ORDER_FROM_SUN.indexOf(zoned.weekday);
    for (let offset = 0; offset < 8; offset++) {
      const weekday = ORDER_FROM_SUN[(start + offset) % 7];
      const day = dayHours(hours, weekday);
      if (!day || day.closed || !day.openTime) continue;
      const open = parseMinutes(day.openTime);
      if (open == null) continue;
      if (offset === 0 && zoned.minutes >= open) continue;
      const time = formatClock(day.openTime);
      if (offset === 0) return `Opens ${time}`;
      if (offset === 1) return `Opens tomorrow ${time}`;
      return `Opens ${DAY_LABEL[weekday]} ${time}`;
    }
  } catch {
    return null;
  }
  return null;
}

export function weekdayKey(date: Date, timeZone: string): Weekday | null {
  try {
    return zonedParts(date, timeZone.trim() || "America/New_York").weekday;
  } catch {
    return null;
  }
}

/** Public hours line. Empty string when hours are unknown (callers hide it). */
export function hoursFallback(hours: Hours): string {
  const summary = hours.summary.trim();
  if (summary) return summary;
  return scheduleRows(hours)
    .map((row) => `${row.label} ${row.value}`)
    .join(" · ");
}

export function statusLabel(now: Date, input: ShopClockInput): { label: string; tone: StatusTone } {
  const status = getShopStatus(now, input);

  if (status.isOpen === true) {
    const until = status.todayWindow?.split("–")[1]?.trim();
    return { label: until ? `Open now · until ${until}` : "Open now", tone: "open" };
  }

  if (status.isOpen === false) {
    const next = nextOpeningLabel(now, input.hours);
    return { label: next ? `Closed now · ${next}` : "Closed now", tone: "closed" };
  }

  return { label: hoursFallback(input.hours), tone: "neutral" };
}

export type OpeningHoursSpec = {
  "@type": "OpeningHoursSpecification";
  dayOfWeek: string;
  opens: string;
  closes: string;
};

const DAY_URL: Record<Weekday, string> = {
  sun: "https://schema.org/Sunday",
  mon: "https://schema.org/Monday",
  tue: "https://schema.org/Tuesday",
  wed: "https://schema.org/Wednesday",
  thu: "https://schema.org/Thursday",
  fri: "https://schema.org/Friday",
  sat: "https://schema.org/Saturday",
};

export function openingHoursSpec(hours: Hours | undefined): OpeningHoursSpec[] | undefined {
  if (!hours || !hoursConfirmed(hours)) return undefined;
  const specs = DAY_ORDER.flatMap((key) => {
    const day = hours.byDay?.[key];
    if (!day || day.closed || !day.openTime || !day.closeTime) return [];
    return [
      {
        "@type": "OpeningHoursSpecification" as const,
        dayOfWeek: DAY_URL[key],
        opens: day.openTime,
        closes: day.closeTime,
      },
    ];
  });
  if (specs.length > 0) return specs;
  if (hours.openTime && hours.closeTime) {
    return DAY_ORDER.map((key) => ({
      "@type": "OpeningHoursSpecification" as const,
      dayOfWeek: DAY_URL[key],
      opens: hours.openTime as string,
      closes: hours.closeTime as string,
    }));
  }
  return undefined;
}
