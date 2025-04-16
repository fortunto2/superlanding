import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
// import { useTranslations } from 'next-intl';

import { getAllBlogPosts, BlogPost } from '@/lib/strapi';
import { generateMetadata as generateSeoMetadata } from '@/lib/seo';
// import { Locale } from '@/lib/i18n';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface BlogPageProps {
  params: any;
  searchParams: any;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  return generateSeoMetadata({
    title: 'Blog',
    description: 'Latest news, tutorials and insights about SuperDuperAI',
    locale: params.locale,
    slug: 'blog',
  });
}

export default async function BlogPage({ params, searchParams }: BlogPageProps) {
  const page = Number(searchParams.page) || 1;
  let posts: BlogPost[] = [];
  let pagination = { page: 1, pageCount: 1, total: 0 };
  
  try {
    const result = await getAllBlogPosts(params.locale, page, 10);
    posts = result.posts;
    pagination = result.pagination;
  } catch (error) {
    console.warn('Error fetching blog posts:', error);
    // Continue with empty posts array
  }
  
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.slug} className="border rounded-lg overflow-hidden">
              {post.featuredImage?.data && (
                <div className="relative h-48">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${post.featuredImage.data.attributes.url}`}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">
                  <Link href={`/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-2">{new Date(post.publishDate).toLocaleDateString()}</p>
                <p>{post.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-gray-600">No blog posts found. Check back soon!</p>
        </div>
      )}
      
      {pagination.pageCount > 1 && (
        <div className="flex justify-center mt-8">
          <nav className="flex items-center gap-2">
            {page > 1 && (
              <Link
                href={`/blog?page=${page - 1}`}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Previous
              </Link>
            )}
            
            <span className="px-4 py-2">
              Page {page} of {pagination.pageCount}
            </span>
            
            {page < pagination.pageCount && (
              <Link
                href={`/blog?page=${page + 1}`}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Next
              </Link>
            )}
          </nav>
        </div>
      )}
    </main>
  );
} 