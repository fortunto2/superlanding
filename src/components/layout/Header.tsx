import { useTranslations } from 'next-intl';
import { createNavigation } from 'next-intl/navigation';

import { Locale, getLocales, getLocaleDisplayName } from '@/lib/i18n';

// Создаем функции для навигации с учетом локализации
const locales = ['en', 'ru'] as const;
const { Link } = createNavigation({ locales });

interface HeaderProps {
  locale: Locale;
}

export default function Header({ locale }: HeaderProps) {
  const t = useTranslations('Navigation');
  const availableLocales = getLocales();
  
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              SuperDuperAI
            </Link>
            
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-gray-700 hover:text-blue-600">
                {t('home')}
              </Link>
              <Link href="/blog" className="text-gray-700 hover:text-blue-600">
                {t('blog')}
              </Link>
              <Link href="/pricing" className="text-gray-700 hover:text-blue-600">
                {t('pricing')}
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <button className="flex items-center text-gray-700 hover:text-blue-600">
                {getLocaleDisplayName(locale)}
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 hidden group-hover:block z-10">
                <div className="py-1">
                  {availableLocales.map((loc) => (
                    <Link 
                      key={loc} 
                      href="/"
                      locale={loc}
                      className={`block px-4 py-2 text-sm ${locale === loc ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      {getLocaleDisplayName(loc)}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            <Link href="/login" className="text-gray-700 hover:text-blue-600">
              {t('login')}
            </Link>
            
            <Link 
              href="/signup" 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {t('signup')}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
} 