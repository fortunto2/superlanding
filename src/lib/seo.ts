import { Metadata } from 'next';
import { Locale, defaultLocale } from './i18n';

// Base URL for the website
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://superduperai.co';

// Определение интерфейса для OpenGraph с article
interface OpenGraphWithArticle {
  type: 'website' | 'article';
  siteName?: string;
  title?: string;
  description?: string;
  url?: string;
  locale?: string;
  images?: {
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  }[];
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
  };
}

// Default metadata for the website
const defaultMetadata: Metadata = {
  title: {
    template: '%s | SuperDuperAI',
    default: 'SuperDuperAI - AI-powered creation tools',
  },
  description: 'Create stunning videos, avatars, and content with SuperDuperAI',
  metadataBase: new URL(BASE_URL),
  openGraph: {
    type: 'website',
    siteName: 'SuperDuperAI',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SuperDuperAI - AI-powered creation tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@superduperai',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  robots: {
    index: true,
    follow: true,
  },
};

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  noIndex?: boolean;
  locale: Locale;
  slug?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
}

/**
 * Generate metadata for a page
 */
export function generateMetadata({
  title,
  description,
  keywords,
  ogImage,
  noIndex = false,
  locale,
  slug = '',
  type = 'website',
  publishedTime,
  modifiedTime,
}: SEOProps): Metadata {
  // Canonical URL
  const canonical = `${BASE_URL}${locale === defaultLocale ? '' : `/${locale}`}${slug ? `/${slug}` : ''}`;
  
  // Get default title as string
  let defaultTitle = 'SuperDuperAI';
  if (typeof defaultMetadata.title === 'object' && defaultMetadata.title) {
    if ('default' in defaultMetadata.title && defaultMetadata.title.default) {
      defaultTitle = String(defaultMetadata.title.default);
    }
  }
  
  // Create metadata object
  const metadata: Metadata = {
    ...defaultMetadata,
    title: title || defaultMetadata.title,
    description: description || (defaultMetadata.description ?? ''),
    keywords: keywords || [],
    alternates: {
      canonical: canonical,
    },
    robots: noIndex ? { index: false, follow: false } : defaultMetadata.robots,
  };
  
  // OpenGraph
  if (metadata.openGraph) {
    // Создаем новый объект, чтобы не мутировать исходный
    const og: OpenGraphWithArticle = { 
      ...metadata.openGraph as object,
      title: title || defaultTitle,
      description: description || (defaultMetadata.description ?? ''),
      url: canonical,
      type: type === 'article' ? 'article' : 'website',
      locale,
      images: [
        {
          url: ogImage || '/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: title || 'SuperDuperAI',
        },
      ],
    };
    
    // Add article specific metadata
    if (type === 'article' && publishedTime) {
      og.article = {
        publishedTime,
        modifiedTime: modifiedTime || publishedTime,
      };
    }
    
    // Присваиваем openGraph
    metadata.openGraph = og;
  }
  
  return metadata;
} 