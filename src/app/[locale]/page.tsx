'use client';

import { useTranslations } from 'next-intl';
// import { Locale } from '@/lib/i18n';

// Определим тип для элементов features
interface FeatureItem {
  title: string;
  description: string;
}

export default function Home() {
  const t = useTranslations('Index');
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between text-sm lg:flex">
        <h1 className="text-4xl font-bold tracking-tight">{t('hero.title')}</h1>
        <p className="mt-6 text-lg">{t('hero.subtitle')}</p>
        <button className="mt-8 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          {t('hero.cta')}
        </button>
      </div>

      <div className="my-16">
        <h2 className="text-3xl font-bold mb-8">{t('features.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.raw('features.items').map((feature: FeatureItem, index: number) => (
            <div key={index} className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="mt-2">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
} 