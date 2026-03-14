import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { ArrowLeft, ArrowRight, Calendar, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TableOfContents from '@/components/blog/TableOfContents';
import AuthorProfile from '@/components/blog/AuthorProfile';
import { BlogPostingJsonLd } from '@/components/blog/JsonLd';
import { getPostBySlug, getAllSlugs, getAllPosts } from '@/lib/blog';

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} | js솔라 블로그`,
    description: post.description,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://jssolar.kr/blog/${slug}`,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.updated || post.date,
      authors: ['JS솔라'],
      ...(post.thumbnail && {
        images: [{ url: post.thumbnail, width: 1200, height: 630, alt: post.title }],
      }),
    },
  };
}

const categoryColors: Record<string, string> = {
  '기술 해설': 'bg-blue-500/20 text-blue-400',
  '시공 사례': 'bg-green-500/20 text-green-400',
  '규정 정리': 'bg-amber-500/20 text-amber-400',
  'O&M': 'bg-purple-500/20 text-purple-400',
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  const colorClass = categoryColors[post.category] || 'bg-[var(--accent)]/20 text-[var(--accent)]';

  return (
    <>
      <Header />
      <BlogPostingJsonLd post={post} />
      <main className="min-h-screen pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="lg:grid lg:grid-cols-[1fr_260px] lg:gap-10">
            <article>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors mb-8"
              >
                <ArrowLeft size={14} />
                블로그 목록
              </Link>

              <div className="mb-8">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${colorClass}`}>
                  {post.category}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight" style={{ fontFamily: 'var(--font-body)' }}>
                {post.title}
              </h1>

              <div className="flex items-center gap-4 text-sm text-[var(--text-muted)] mb-4">
                <span>JS솔라</span>
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  {new Date(post.date).toLocaleDateString('ko-KR')}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {post.readingTime}분
                </span>
              </div>

              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-10">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-[var(--text-muted)] bg-white/5 px-2.5 py-1 rounded-md"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="blog-content">
                <MDXRemote
                  source={post.content}
                  options={{
                    mdxOptions: {
                      remarkPlugins: [remarkGfm],
                      rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
                    },
                  }}
                />
              </div>

              <div className="mt-16">
                <AuthorProfile />
              </div>

              <nav className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
                {prevPost && (
                  <Link
                    href={`/blog/${prevPost.slug}`}
                    className="glass rounded-2xl p-5 group hover:border-[var(--border-hover)] transition-all"
                  >
                    <span className="text-xs text-[var(--text-muted)] flex items-center gap-1 mb-2">
                      <ArrowLeft size={12} /> 이전 글
                    </span>
                    <span className="text-sm font-medium text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                      {prevPost.title}
                    </span>
                  </Link>
                )}
                {nextPost && (
                  <Link
                    href={`/blog/${nextPost.slug}`}
                    className="glass rounded-2xl p-5 group hover:border-[var(--border-hover)] transition-all md:text-right md:col-start-2"
                  >
                    <span className="text-xs text-[var(--text-muted)] flex items-center gap-1 justify-start md:justify-end mb-2">
                      다음 글 <ArrowRight size={12} />
                    </span>
                    <span className="text-sm font-medium text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                      {nextPost.title}
                    </span>
                  </Link>
                )}
              </nav>
            </article>

            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-6">
                <TableOfContents />
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
