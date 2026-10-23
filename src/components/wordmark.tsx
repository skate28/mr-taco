import { cn } from "@/lib/cn";

export function nameParts(name: string): { lead: string; script: string } {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length < 2) return { lead: name.trim(), script: "" };
  return { lead: parts[0] ?? name.trim(), script: parts.slice(1).join(" ") };
}

export function Wordmark({ name, tone = "ink", className }: { name: string; tone?: "ink" | "cream"; className?: string }) {
  const { lead, script } = nameParts(name);
  const leadColor = tone === "cream" ? "text-yellow" : "text-chili";
  const scriptColor = tone === "cream" ? "text-pink" : "text-pink-deep";

  return (
    <span className={cn("inline-flex items-baseline gap-1.5", className)}>
      <span className={cn("font-display text-2xl uppercase leading-none tracking-tight sm:text-3xl", leadColor)}>{lead}</span>
      {script && <span className={cn("font-script text-2xl leading-none sm:text-3xl", scriptColor)}>{script}</span>}
    </span>
  );
}
