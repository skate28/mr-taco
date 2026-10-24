import { cn } from "@/lib/cn";

export function nameParts(name: string): { lead: string; script: string } {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length < 2) return { lead: name.trim(), script: "" };
  return { lead: parts[0] ?? name.trim(), script: parts.slice(1).join(" ") };
}

export function Wordmark({
  name,
  tone = "ink",
  className,
  size = "md",
}: {
  name: string;
  tone?: "ink" | "cream";
  className?: string;
  size?: "md" | "header";
}) {
  const { lead, script } = nameParts(name);
  const leadColor = tone === "cream" ? "text-yellow" : "text-chili";
  const scriptColor = tone === "cream" ? "text-pink" : "text-pink-deep";
  const leadSize = size === "header" ? "text-xl uppercase sm:text-2xl xl:text-3xl" : "text-2xl uppercase sm:text-3xl";
  const scriptSize = size === "header" ? "text-xl sm:text-2xl xl:text-3xl" : "text-2xl sm:text-3xl";

  return (
    <span className={cn("inline-flex items-baseline gap-1.5", className)}>
      <span className={cn("font-display leading-none tracking-tight", leadSize, leadColor)}>{lead}</span>
      {script && <span className={cn("font-script leading-none", scriptSize, scriptColor)}>{script}</span>}
    </span>
  );
}
