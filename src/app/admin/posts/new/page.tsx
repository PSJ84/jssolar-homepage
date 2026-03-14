'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Eye } from 'lucide-react';

const categories = ['기술 해설', '시공 사례', '규정 정리', 'O&M'];

export default function NewPostPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('기술 해설');
  const [tags, setTags] = useState('');

  async function handleSubmit(publish: boolean) {
    setError('');

    if (!title.trim()) {
      setError('제목을 입력하세요.');
      return;
    }

    setSaving(true);

    const finalSlug = slug.trim() || title
      .toLowerCase()
      .replace(/[^a-z0-9가-힣\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    try {
      const res = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          slug: finalSlug,
          description: description.trim(),
          content,
          category,
          published: publish,
          tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
        }),
      });

      if (res.status === 401) {
        router.push('/admin');
        return;
      }

      const data = await res.json();
      if (res.ok) {
        router.push('/admin/posts');
      } else {
        setError(data.error || '저장에 실패했습니다.');
      }
    } catch {
      setError('네트워크 오류가 발생했습니다.');
    }
    setSaving(false);
  }

  return (
    <div className="min-h-screen pt-10 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <Link href="/admin/posts" className="flex items-center gap-1 text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">
            <ArrowLeft size={14} /> 목록으로
          </Link>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleSubmit(false)}
              disabled={saving}
              className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium glass text-[var(--text-muted)] hover:text-[var(--text)] transition-colors disabled:opacity-50 cursor-pointer"
            >
              <Save size={14} /> {saving ? '저장 중...' : '임시저장'}
            </button>
            <button
              type="button"
              onClick={() => handleSubmit(true)}
              disabled={saving}
              className="flex items-center gap-1 bg-[var(--accent)] text-[var(--bg)] px-4 py-2 rounded-lg text-sm font-bold hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-50 cursor-pointer"
            >
              <Eye size={14} /> {saving ? '발행 중...' : '발행'}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-sm mb-4">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <input
            type="text"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-transparent border-b border-[var(--border)] text-3xl font-bold text-[var(--text)] placeholder:text-[var(--text-muted)]/30 focus:outline-none focus:border-[var(--accent)] transition-colors pb-2"
          />

          <input
            type="text"
            placeholder="요약 (1~2문장)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-white/5 border border-[var(--border)] rounded-lg px-4 py-3 text-[var(--text)] focus:border-[var(--accent)] focus:outline-none transition-colors"
          />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs text-[var(--text-muted)] mb-1">카테고리</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-white/5 border border-[var(--border)] rounded-lg px-4 py-3 text-[var(--text)] focus:border-[var(--accent)] focus:outline-none transition-colors"
              >
                {categories.map((c) => (
                  <option key={c} value={c} className="bg-[var(--bg)]">{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-[var(--text-muted)] mb-1">슬러그 (URL)</label>
              <input
                type="text"
                placeholder="auto-generated"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full bg-white/5 border border-[var(--border)] rounded-lg px-4 py-3 text-[var(--text)] focus:border-[var(--accent)] focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-[var(--text-muted)] mb-1">태그 (쉼표 구분)</label>
              <input
                type="text"
                placeholder="태양광, EPC, 시공"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full bg-white/5 border border-[var(--border)] rounded-lg px-4 py-3 text-[var(--text)] focus:border-[var(--accent)] focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-[var(--text-muted)] mb-1">본문 (마크다운)</label>
            <textarea
              placeholder="마크다운으로 글을 작성하세요..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={20}
              className="w-full bg-white/5 border border-[var(--border)] rounded-lg px-4 py-3 text-[var(--text)] font-mono text-sm leading-relaxed focus:border-[var(--accent)] focus:outline-none transition-colors resize-y"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
