export type Locale = "en" | "vi";

export const LOCALES: Record<
  Locale,
  { label: string; flag: string; nativeLabel: string }
> = {
  en: { label: "English", flag: "🇬🇧", nativeLabel: "English" },
  vi: { label: "Vietnamese", flag: "🇻🇳", nativeLabel: "Tiếng Việt" },
};

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_STORAGE_KEY = "casecraft_locale";

export function parseLocale(value: unknown): Locale {
  return value === "vi" ? "vi" : "en";
}
