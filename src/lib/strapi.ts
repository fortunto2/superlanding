import { Locale } from './i18n';

// Define base Strapi API URL
const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || '';

// Define types for Strapi API responses
export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiData<T> {
  id: number;
  attributes: T & {
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: Locale;
  };
}

export interface StrapiImage {
  data: {
    id: number;
    attributes: {
      url: string;
      width: number;
      height: number;
      formats: {
        thumbnail: { url: string; width: number; height: number };
        small: { url: string; width: number; height: number };
        medium: { url: string; width: number; height: number };
        large: { url: string; width: number; height: number };
      };
    };
  };
}

export interface LandingPage {
  title: string;
  metaDescription: string;
  slug: string;
  content: string;
  featuredImage: StrapiImage;
}

export interface BlogPost {
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  publishDate: string;
  featuredImage: StrapiImage;
  metaDescription: string;
}

// Helper function to build API URLs with proper query parameters
function buildUrl(endpoint: string, locale: Locale, params: Record<string, string> = {}) {
  const url = new URL(`${STRAPI_API_URL}/api/${endpoint}`);
  
  // Add locale
  url.searchParams.append('locale', locale);
  
  // Add other params
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });
  
  return url.toString();
}

// Generic fetch function
async function fetchFromStrapi<T>(endpoint: string, locale: Locale, params: Record<string, string> = {}): Promise<T> {
  const url = buildUrl(endpoint, locale, params);
  
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    next: { revalidate: 3600 }, // Revalidate every hour
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch from Strapi: ${response.statusText}`);
  }
  
  return response.json();
}

// Fetch a landing page by slug
export async function getLandingPage(slug: string, locale: Locale): Promise<LandingPage | null> {
  try {
    const response = await fetchFromStrapi<StrapiResponse<StrapiData<LandingPage>[]>>(
      'landing-pages',
      locale,
      {
        'filters[slug][$eq]': slug,
        'populate': '*',
      }
    );
    
    if (!response.data || response.data.length === 0) {
      return null;
    }
    
    return response.data[0].attributes;
  } catch (error) {
    console.error('Error fetching landing page:', error);
    return null;
  }
}

// Fetch all landing page slugs (for static generation)
export async function getAllLandingPageSlugs(): Promise<string[]> {
  try {
    const response = await fetchFromStrapi<StrapiResponse<StrapiData<{ slug: string }>[]>>(
      'landing-pages',
      'en', // Default locale for fetching slugs
      {
        'fields[0]': 'slug',
        'pagination[limit]': '500',
      }
    );
    
    return response.data.map(item => item.attributes.slug);
  } catch (error) {
    console.error('Error fetching landing page slugs:', error);
    return [];
  }
}

// Fetch a blog post by slug
export async function getBlogPost(slug: string, locale: Locale): Promise<BlogPost | null> {
  try {
    const response = await fetchFromStrapi<StrapiResponse<StrapiData<BlogPost>[]>>(
      'blog-posts',
      locale,
      {
        'filters[slug][$eq]': slug,
        'populate': '*',
      }
    );
    
    if (!response.data || response.data.length === 0) {
      return null;
    }
    
    return response.data[0].attributes;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

// Fetch all blog posts
export async function getAllBlogPosts(locale: Locale, page = 1, pageSize = 10): Promise<{ posts: BlogPost[]; pagination: { page: number; pageCount: number; total: number } }> {
  try {
    const response = await fetchFromStrapi<StrapiResponse<StrapiData<BlogPost>[]>>(
      'blog-posts',
      locale,
      {
        'populate': '*',
        'sort': 'publishDate:desc',
        'pagination[page]': page.toString(),
        'pagination[pageSize]': pageSize.toString(),
      }
    );
    
    return {
      posts: response.data.map(item => item.attributes),
      pagination: response.meta.pagination || { page: 1, pageCount: 1, total: response.data.length },
    };
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return { posts: [], pagination: { page: 1, pageCount: 1, total: 0 } };
  }
} 