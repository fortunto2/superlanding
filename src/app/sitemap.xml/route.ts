import { getAllLandingPageSlugs } from '@/lib/strapi';
import { locales, defaultLocale } from '@/lib/i18n';

// Base URL of the website
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://superduperai.co';

export async function GET() {
  // Get all landing page slugs
  let landingSlugs: string[] = [];
  try {
    landingSlugs = await getAllLandingPageSlugs();
  } catch (error) {
    console.warn('Error fetching landing page slugs for sitemap:', error);
    // Continue with empty array
  }
  
  // Create sitemap XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${locales.map(locale => `
  <url>
    <loc>${BASE_URL}${locale === defaultLocale ? '' : `/${locale}`}</loc>
    ${locales.map(altLocale => `
    <xhtml:link
      rel="alternate"
      hreflang="${altLocale}"
      href="${BASE_URL}${altLocale === defaultLocale ? '' : `/${altLocale}`}"
    />`).join('')}
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${BASE_URL}${locale === defaultLocale ? '' : `/${locale}`}/blog</loc>
    ${locales.map(altLocale => `
    <xhtml:link
      rel="alternate"
      hreflang="${altLocale}"
      href="${BASE_URL}${altLocale === defaultLocale ? '' : `/${altLocale}`}/blog"
    />`).join('')}
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  ${landingSlugs.map(slug => `
  <url>
    <loc>${BASE_URL}${locale === defaultLocale ? '' : `/${locale}`}/${slug}</loc>
    ${locales.map(altLocale => `
    <xhtml:link
      rel="alternate"
      hreflang="${altLocale}"
      href="${BASE_URL}${altLocale === defaultLocale ? '' : `/${altLocale}`}/${slug}"
    />`).join('')}
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  `).join('')}
  `).join('')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
} 