"use client";

import type { DebateFormat } from "@/lib/types";
import { FORMATS } from "@/lib/format";
import { cn } from "@/lib/utils";

interface FormatSelectorProps {
  value: DebateFormat;
  onChange: (format: DebateFormat) => void;
  className?: string;
  size?: "sm" | "default";
}

export function FormatSelector({
  value,
  onChange,
  className,
  size = "default",
}: FormatSelectorProps) {
  return (
    <div
      className={cn(
        "flex rounded-lg border border-border/50 p-0.5",
        size === "sm" && "text-sm",
        className
      )}
    >
      {(Object.keys(FORMATS) as DebateFormat[]).map((format) => (
        <button
          key={format}
          type="button"
          onClick={() => onChange(format)}
          className={cn(
            "rounded-md font-medium transition-colors",
            size === "sm" ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm",
            value === format
              ? "bg-amber-500 text-black"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {FORMATS[format].label}
        </button>
      ))}
    </div>
  );
}

interface FormatBadgeProps {
  format: DebateFormat;
  className?: string;
}

export function FormatBadge({ format, className }: FormatBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground",
        className
      )}
    >
      {FORMATS[format].label}
    </span>
  );
}
