import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getLandingPage } from '@/lib/strapi';
import { generateMetadata as generateSeoMetadata } from '@/lib/seo';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface LandingPageProps {
  params: any;
}

export async function generateMetadata({ params }: LandingPageProps): Promise<Metadata> {
  const page = await getLandingPage(params.slug, params.locale);
  
  if (!page) {
    return {};
  }
  
  return generateSeoMetadata({
    title: page.title,
    description: page.metaDescription,
    locale: params.locale,
    slug: params.slug,
    ogImage: page.featuredImage?.data?.attributes?.url ? 
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${page.featuredImage.data.attributes.url}` : 
      undefined,
  });
}

export default async function DynamicLandingPage({ params }: LandingPageProps) {
  const page = await getLandingPage(params.slug, params.locale);
  
  if (!page) {
    notFound();
  }
  
  return (
    <main className="container mx-auto px-4 py-12">
      <article className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">{page.title}</h1>
        
        <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: page.content }} />
      </article>
    </main>
  );
} 