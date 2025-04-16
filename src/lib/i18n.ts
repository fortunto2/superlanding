import { getRequestConfig } from 'next-intl/server';

export const locales = ['en', 'es', 'ru'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export default getRequestConfig(async ({ locale }) => {
  // Проверяем, что locale - строка
  const validLocale = locale || defaultLocale;
  
  // Load messages for the requested locale
  const messages = (await import(`../messages/${validLocale}.json`)).default;
  
  return {
    messages,
    locale: validLocale
  };
});

export function getLocaleDisplayName(locale: Locale): string {
  const localeNames: Record<Locale, string> = {
    en: 'English',
    es: 'Español',
    ru: 'Русский'
  };
  
  return localeNames[locale] || locale;
}

export function getLocales() {
  return locales;
} 