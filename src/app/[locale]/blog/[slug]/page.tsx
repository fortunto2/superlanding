import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getBlogPost } from '@/lib/strapi';
import { generateMetadata as generateSeoMetadata } from '@/lib/seo';
// import { Locale } from '@/lib/i18n';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface BlogPostPageProps {
  params: any;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPost(params.slug, params.locale);
  
  if (!post) {
    return {};
  }
  
  return generateSeoMetadata({
    title: post.title,
    description: post.metaDescription || post.excerpt,
    locale: params.locale,
    slug: `blog/${params.slug}`,
    type: 'article',
    publishedTime: post.publishDate,
    ogImage: post.featuredImage?.data?.attributes?.url ? 
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${post.featuredImage.data.attributes.url}` : 
      undefined,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug, params.locale);
  
  if (!post) {
    notFound();
  }
  
  return (
    <main className="container mx-auto px-4 py-12">
      <Link href="/blog" className="text-blue-600 hover:underline mb-4 inline-block">
        &larr; Back to Blog
      </Link>
      
      <article className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-600 mb-6">{new Date(post.publishDate).toLocaleDateString()}</p>
        
        {post.featuredImage?.data && (
          <div className="relative h-[400px] mb-8">
            <Image
              src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${post.featuredImage.data.attributes.url}`}
              alt={post.title}
              fill
              className="object-cover rounded"
            />
          </div>
        )}
        
        <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </main>
  );
} 