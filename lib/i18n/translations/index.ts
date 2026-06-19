import type { Locale } from "../types";
import { en, type Translations } from "./en";
import { vi } from "./vi";

const translations: Record<Locale, Translations> = { en, vi };

export function getTranslations(locale: Locale): Translations {
  return translations[locale];
}

export type { Translations };
export { en, vi };
