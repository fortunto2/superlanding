'use client';

import { useTranslations } from 'next-intl';
import { createNavigation } from 'next-intl/navigation';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';

import { Locale, getLocales, getLocaleDisplayName, locales } from '@/lib/i18n';

// Создаем функции для навигации с учетом локализации
const { Link } = createNavigation({ locales });

interface HeaderProps {
  locale: Locale;
}

export default function Header({ locale }: HeaderProps) {
  const t = useTranslations('Navigation');
  const availableLocales = getLocales();
  
  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-2xl font-bold text-primary">
              SuperDuperAI
            </Link>
            
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-foreground hover:text-primary">
                {t('home')}
              </Link>
              <Link href="/blog" className="text-foreground hover:text-primary">
                {t('blog')}
              </Link>
              <Link href="/pricing" className="text-foreground hover:text-primary">
                {t('pricing')}
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            <div className="relative group">
              <button className="flex items-center text-foreground hover:text-primary">
                {getLocaleDisplayName(locale)}
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div className="absolute right-0 mt-2 w-48 bg-background rounded-md shadow-lg ring-1 ring-black ring-opacity-5 hidden group-hover:block z-10">
                <div className="py-1">
                  {availableLocales.map((loc) => (
                    <Link 
                      key={loc} 
                      href="/"
                      locale={loc}
                      className={`block px-4 py-2 text-sm ${locale === loc ? 'bg-accent text-accent-foreground' : 'text-foreground hover:bg-accent hover:text-accent-foreground'}`}
                    >
                      {getLocaleDisplayName(loc)}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            <Link href="/login" className="text-foreground hover:text-primary">
              {t('login')}
            </Link>
            
            <Button asChild>
              <Link href="/signup">
                {t('signup')}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
} 