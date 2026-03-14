'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Eye, EyeOff } from 'lucide-react';

const categories = ['기술 해설', '시공 사례', '규정 정리', 'O&M'];

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: '',
    slug: '',
    description: '',
    content: '',
    category: '기술 해설',
    tags: '',
    published: false,
  });

  useEffect(() => {
    fetch(`/api/admin/posts/${params.id}`)
      .then((res) => {
        if (res.status === 401) {
          router.push('/admin');
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          setForm({
            title: data.title,
            slug: data.slug,
            description: data.description,
            content: data.content,
            category: data.category,
            tags: (data.tags || []).join(', '),
            published: data.published,
          });
        }
        setLoading(false);
      });
  }, [params.id, router]);

  function updateForm(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSave(publish?: boolean) {
    setSaving(true);
    const res = await fetch(`/api/admin/posts/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        published: publish !== undefined ? publish : form.published,
        tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      }),
    });

    if (res.status === 401) {
      router.push('/admin');
      return;
    }

    if (res.ok) {
      if (publish !== undefined) setForm((prev) => ({ ...prev, published: publish }));
      alert('저장되었습니다.');
    }
    setSaving(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[var(--text-muted)]">로딩 중...</p>
      </div>
    );
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
              onClick={() => handleSave()}
              disabled={saving}
              className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium glass text-[var(--text-muted)] hover:text-[var(--text)] transition-colors disabled:opacity-50"
            >
              <Save size={14} /> 저장
            </button>
            {form.published ? (
              <button
                onClick={() => handleSave(false)}
                disabled={saving}
                className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 transition-colors disabled:opacity-50"
              >
                <EyeOff size={14} /> 비공개
              </button>
            ) : (
              <button
                onClick={() => handleSave(true)}
                disabled={saving}
                className="flex items-center gap-1 bg-[var(--accent)] text-[var(--bg)] px-4 py-2 rounded-lg text-sm font-bold hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-50"
              >
                <Eye size={14} /> 발행
              </button>
            )}
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
                value={form.slug}
                onChange={(e) => updateForm('slug', e.target.value)}
                className="w-full bg-white/5 border border-[var(--border)] rounded-lg px-4 py-3 text-[var(--text)] focus:border-[var(--accent)] focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-[var(--text-muted)] mb-1">태그 (쉼표 구분)</label>
              <input
                type="text"
                value={form.tags}
                onChange={(e) => updateForm('tags', e.target.value)}
                className="w-full bg-white/5 border border-[var(--border)] rounded-lg px-4 py-3 text-[var(--text)] focus:border-[var(--accent)] focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-[var(--text-muted)] mb-1">본문 (마크다운)</label>
            <textarea
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
