import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';

import { locales } from '@/lib/i18n';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

import '../globals.css';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * Root layout component for localized pages
 */
export default async function LocaleLayout({
  children,
  params,
}) {
  const { locale } = params;
  
  // Validate that the locale is supported
  if (!locales.includes(locale)) {
    notFound();
  }
  
  // Load messages for the locale
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch {
    // В случае ошибки загрузки сообщений для локали, вернуть 404
    notFound();
  }
  
  return (
    <html lang={locale}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="flex flex-col min-h-screen">
            <Header locale={locale} />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
} 