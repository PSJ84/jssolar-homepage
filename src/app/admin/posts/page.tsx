'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Plus, Edit2, Trash2, Eye, EyeOff, LogOut } from 'lucide-react';

interface Post {
  id: string;
  title: string;
  slug: string;
  category: string;
  published: boolean;
  createdAt: string;
}

export default function AdminPostsPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/posts')
      .then((res) => {
        if (res.status === 401) {
          router.push('/admin');
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) setPosts(data);
        setLoading(false);
      });
  }, [router]);

  async function handleDelete(id: string, title: string) {
    if (!confirm(`"${title}" 글을 삭제하시겠습니까?`)) return;

    await fetch(`/api/admin/posts/${id}`, { method: 'DELETE' });
    setPosts(posts.filter((p) => p.id !== id));
  }

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin');
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
          <h1 className="text-2xl font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>블로그 관리</h1>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/posts/new"
              className="flex items-center gap-2 bg-[var(--accent)] text-[var(--bg)] px-4 py-2 rounded-lg font-bold text-sm hover:bg-[var(--accent-hover)] transition-colors"
            >
              <Plus size={16} /> 새 글 작성
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
            >
              <LogOut size={14} /> 로그아웃
            </button>
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="glass rounded-2xl p-12 text-center">
            <p className="text-[var(--text-muted)] mb-4">작성된 글이 없습니다.</p>
            <Link
              href="/admin/posts/new"
              className="inline-flex items-center gap-2 bg-[var(--accent)] text-[var(--bg)] px-6 py-3 rounded-lg font-bold hover:bg-[var(--accent-hover)] transition-colors"
            >
              <Plus size={16} /> 첫 글 작성하기
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
              <div key={post.id} className="glass rounded-xl p-4 flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {post.published ? (
                      <Eye size={14} className="text-green-400 shrink-0" />
                    ) : (
                      <EyeOff size={14} className="text-yellow-400 shrink-0" />
                    )}
                    <span className="font-medium truncate">{post.title}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
                    <span>{post.category}</span>
                    <span>{new Date(post.createdAt).toLocaleDateString('ko-KR')}</span>
                    <span className="text-[var(--text-muted)]/60">/{post.slug}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Link
                    href={`/admin/posts/${post.id}`}
                    className="p-2 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                  >
                    <Edit2 size={16} />
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id, post.title)}
                    className="p-2 text-[var(--text-muted)] hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
