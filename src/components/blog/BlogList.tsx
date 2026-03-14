'use client';

import { useState } from 'react';
import BlogCard from './BlogCard';
import type { BlogPost } from '@/lib/blog';

const categories = ['전체', '기술 해설', '시공 사례', '규정 정리', 'O&M'];

export default function BlogList({ posts }: { posts: BlogPost[] }) {
  const [active, setActive] = useState('전체');

  const filtered = active === '전체' ? posts : posts.filter((p) => p.category === active);

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              active === cat
                ? 'bg-[var(--accent)] text-[var(--bg)]'
                : 'glass text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--border-hover)]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-[var(--text-muted)] py-20">아직 작성된 글이 없습니다.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </>
  );
}
