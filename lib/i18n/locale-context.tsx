"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { DebateFormat, DebateSide } from "@/lib/types";
import { FORMATS } from "@/lib/format";
import { getTranslations, type Translations } from "./translations";
import {
  DEFAULT_LOCALE,
  LOCALE_STORAGE_KEY,
  type Locale,
  parseLocale,
} from "./types";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

function readStoredLocale(): Locale {
  if (typeof window === "undefined") return DEFAULT_LOCALE;
  try {
    return parseLocale(localStorage.getItem(LOCALE_STORAGE_KEY));
  } catch {
    return DEFAULT_LOCALE;
  }
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLocaleState(readStoredLocale());
    setMounted(true);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    localStorage.setItem(LOCALE_STORAGE_KEY, next);
    document.documentElement.lang = next;
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.lang = locale;
    }
  }, [locale, mounted]);

  const t = useMemo(() => getTranslations(locale), [locale]);

  const value = useMemo(
    () => ({ locale, setLocale, t }),
    [locale, setLocale, t]
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}

export function useI18n() {
  return useLocale();
}

export function interpolate(
  template: string,
  vars: Record<string, string | number>
): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    String(vars[key] ?? `{${key}}`)
  );
}

export function formatRelativeTime(isoDate: string, t: Translations): string {
  const date = new Date(isoDate);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return t.dashboard.relativeTime.justNow;
  if (diffMins < 60)
    return interpolate(t.dashboard.relativeTime.minutesAgo, { n: diffMins });
  if (diffHours < 24)
    return interpolate(t.dashboard.relativeTime.hoursAgo, { n: diffHours });
  if (diffDays < 7)
    return interpolate(t.dashboard.relativeTime.daysAgo, { n: diffDays });
  return date.toLocaleDateString();
}

export function getLocalizedSideLabel(
  side: DebateSide,
  format: DebateFormat,
  t: Translations
): string {
  const config = t.format[format];
  return side === "government"
    ? config.affirmativeLabel
    : config.negativeLabel;
}

export function getLocalizedFormatSummary(
  format: DebateFormat,
  t: Translations
): string {
  const structural = FORMATS[format];
  const localized = t.format[format];
  const template = structural.crystallizationTime
    ? localized.prepSpeechCrystal
    : localized.prepSpeechNoCrystal;

  return interpolate(template, {
    prep: structural.prepTime,
    speech: structural.speechTime,
    crystal: structural.crystallizationTime ?? "",
  });
}
