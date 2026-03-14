import type { BlogPost } from '@/lib/blog';

function BlogPostingJsonLd({ post }: { post: BlogPost }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    ...(post.thumbnail && { image: `https://jssolar.kr${post.thumbnail}` }),
    author: {
      '@type': 'Organization',
      name: 'JS솔라',
      url: 'https://jssolar.kr',
      description: '태양광 EPC, 인허가, 컨설팅, O&M 전문기업',
      areaServed: '대한민국',
      serviceType: ['태양광 EPC', '태양광 인허가', '태양광 O&M', '태양광 컨설팅'],
    },
    publisher: {
      '@type': 'Organization',
      name: 'js솔라',
      url: 'https://jssolar.kr',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://jssolar.kr/blog/${post.slug}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

function BlogListJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'js솔라 블로그',
    description: '태양광 EPC·O&M 전문가가 직접 쓰는 현장 실무 블로그',
    url: 'https://jssolar.kr/blog',
    author: {
      '@type': 'Organization',
      name: 'JS솔라',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export { BlogPostingJsonLd, BlogListJsonLd };
