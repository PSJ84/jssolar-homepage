'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Eye } from 'lucide-react';

const categories = ['기술 해설', '시공 사례', '규정 정리', 'O&M'];

export default function NewPostPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: '',
    slug: '',
    description: '',
    content: '',
    category: '기술 해설',
    tags: '',
    published: false,
  });

  function updateForm(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (field === 'title' && !form.slug) {
      const slug = (value as string)
        .toLowerCase()
        .replace(/[^a-z0-9가-힣\s-]/g, '')
        .replace(/\s+/g, '-');
      setForm((prev) => ({ ...prev, slug }));
    }
  }

  async function handleSubmit(publish: boolean) {
    setSaving(true);
    const res = await fetch('/api/admin/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        published: publish,
        tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      }),
    });

    if (res.status === 401) {
      router.push('/admin');
      return;
    }

    if (res.ok) {
      router.push('/admin/posts');
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
              onClick={() => handleSubmit(false)}
              disabled={saving || !form.title}
              className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium glass text-[var(--text-muted)] hover:text-[var(--text)] transition-colors disabled:opacity-50"
            >
              <Save size={14} /> 임시저장
            </button>
            <button
              onClick={() => handleSubmit(true)}
              disabled={saving || !form.title}
              className="flex items-center gap-1 bg-[var(--accent)] text-[var(--bg)] px-4 py-2 rounded-lg text-sm font-bold hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-50"
            >
              <Eye size={14} /> 발행
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="제목"
            value={form.title}
            onChange={(e) => updateForm('title', e.target.value)}
            className="w-full bg-transparent border-none text-3xl font-bold text-[var(--text)] placeholder:text-[var(--text-muted)]/30 focus:outline-none"
          />

          <input
            type="text"
            placeholder="요약 (1~2문장)"
            value={form.description}
            onChange={(e) => updateForm('description', e.target.value)}
            className="w-full bg-white/5 border border-[var(--border)] rounded-lg px-4 py-3 text-[var(--text)] focus:border-[var(--accent)] focus:outline-none transition-colors"
          />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs text-[var(--text-muted)] mb-1">카테고리</label>
              <select
                value={form.category}
                onChange={(e) => updateForm('category', e.target.value)}
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
                placeholder="url-slug"
                value={form.slug}
                onChange={(e) => updateForm('slug', e.target.value)}
                className="w-full bg-white/5 border border-[var(--border)] rounded-lg px-4 py-3 text-[var(--text)] focus:border-[var(--accent)] focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-[var(--text-muted)] mb-1">태그 (쉼표 구분)</label>
              <input
                type="text"
                placeholder="태양광, EPC, 시공"
                value={form.tags}
                onChange={(e) => updateForm('tags', e.target.value)}
                className="w-full bg-white/5 border border-[var(--border)] rounded-lg px-4 py-3 text-[var(--text)] focus:border-[var(--accent)] focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-[var(--text-muted)] mb-1">본문 (마크다운)</label>
            <textarea
              placeholder="마크다운으로 글을 작성하세요..."
              value={form.content}
              onChange={(e) => updateForm('content', e.target.value)}
              rows={20}
              className="w-full bg-white/5 border border-[var(--border)] rounded-lg px-4 py-3 text-[var(--text)] font-mono text-sm leading-relaxed focus:border-[var(--accent)] focus:outline-none transition-colors resize-y"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
