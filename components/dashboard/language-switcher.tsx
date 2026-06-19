"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/i18n/locale-context";
import { LOCALES, type Locale } from "@/lib/i18n/types";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale, t } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function selectLanguage(next: Locale) {
    setLocale(next);
    setOpen(false);
  }

  const current = LOCALES[locale];

  return (
    <div ref={ref} className={cn("relative", className)}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(!open)}
        className="gap-2 border-border/50"
        aria-label={t.language.switch}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <Globe className="h-4 w-4 text-muted-foreground" />
        <span className="text-base leading-none">{current.flag}</span>
        <span className="hidden sm:inline">{current.nativeLabel}</span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 text-muted-foreground transition-transform",
            open && "rotate-180"
          )}
        />
      </Button>

      {open && (
        <div
          role="listbox"
          aria-label={t.language.switch}
          className="absolute right-0 z-50 mt-2 min-w-[180px] overflow-hidden rounded-lg border border-border/50 bg-popover p-1 shadow-lg"
        >
          {(Object.keys(LOCALES) as Locale[]).map((key) => {
            const item = LOCALES[key];
            const selected = key === locale;
            return (
              <button
                key={key}
                role="option"
                aria-selected={selected}
                onClick={() => selectLanguage(key)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors",
                  selected
                    ? "bg-amber-500/15 text-amber-500"
                    : "hover:bg-muted"
                )}
              >
                <span className="text-lg leading-none">{item.flag}</span>
                <div className="flex flex-col">
                  <span className="font-medium">{item.nativeLabel}</span>
                  <span className="text-xs text-muted-foreground">
                    {item.label}
                  </span>
                </div>
                {selected && (
                  <span className="ml-auto text-xs text-amber-500">✓</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
