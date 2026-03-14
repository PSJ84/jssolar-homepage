import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import type { BlogPost } from '@/lib/blog';

const categoryColors: Record<string, string> = {
  '기술 해설': 'bg-blue-500/20 text-blue-400',
  '시공 사례': 'bg-green-500/20 text-green-400',
  '규정 정리': 'bg-amber-500/20 text-amber-400',
  'O&M': 'bg-purple-500/20 text-purple-400',
};

export default function BlogCard({ post }: { post: BlogPost }) {
  const colorClass = categoryColors[post.category] || 'bg-[var(--accent)]/20 text-[var(--accent)]';

  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <article className="glass rounded-2xl p-6 h-full transition-all duration-300 hover:border-[var(--border-hover)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(45,212,191,0.1)]">
        <div className="flex items-center gap-3 mb-4">
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${colorClass}`}>
            {post.category}
          </span>
        </div>

        <h3 className="text-xl font-bold mb-2 text-[var(--text)] group-hover:text-[var(--accent)] transition-colors leading-snug" style={{ fontFamily: 'var(--font-body)' }}>
          {post.title}
        </h3>

        <p className="text-sm text-[var(--text-muted)] mb-4 line-clamp-2 leading-relaxed">
          {post.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {new Date(post.date).toLocaleDateString('ko-KR')}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {post.readingTime}분
            </span>
          </div>
          <span className="text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowRight size={16} />
          </span>
        </div>
      </article>
    </Link>
  );
}
