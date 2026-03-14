import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogList from '@/components/blog/BlogList';
import { BlogListJsonLd } from '@/components/blog/JsonLd';
import { getAllPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'js솔라 블로그 | 태양광 전문가의 현장 실무 이야기',
  description: '태양광 EPC·O&M 전문가가 직접 쓰는 현장 실무 블로그. 계통연계, 인허가, O&M, 수익분석까지.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'js솔라 블로그 | 태양광 전문가의 현장 실무 이야기',
    description: '태양광 EPC·O&M 전문가가 직접 쓰는 현장 실무 블로그.',
    url: 'https://jssolar.kr/blog',
    type: 'website',
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Header />
      <BlogListJsonLd />
      <main className="min-h-screen pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <p className="text-sm font-bold text-[var(--accent)] tracking-widest uppercase mb-4">Blog</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-body)' }}>
              태양광 현장의 <span className="text-[var(--accent)]">생생한 이야기</span>
            </h1>
            <p className="text-[var(--text-muted)] text-lg max-w-2xl">
              태양광 EPC·O&M 전문가가 직접 쓰는 현장 실무 블로그입니다.<br />
              계통연계, 인허가, 수익분석까지 실전 지식을 공유합니다.
            </p>
          </div>

          <BlogList posts={posts} />

          <div className="mt-12 text-center text-sm text-[var(--text-muted)]">
            JS솔라
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
