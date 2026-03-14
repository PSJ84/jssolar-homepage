'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      router.push('/admin/posts');
    } else {
      setError(data.error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="glass rounded-2xl p-8 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
          JS SOLAR
        </h1>
        <p className="text-sm text-[var(--text-muted)] text-center mb-8">블로그 관리</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-[var(--text-muted)] mb-1">아이디</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-white/5 border border-[var(--border)] rounded-lg px-4 py-3 text-[var(--text)] focus:border-[var(--accent)] focus:outline-none transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-[var(--text-muted)] mb-1">비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-[var(--border)] rounded-lg px-4 py-3 text-[var(--text)] focus:border-[var(--accent)] focus:outline-none transition-colors"
              required
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--accent)] text-[var(--bg)] py-3 rounded-lg font-bold hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-50"
          >
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>
      </div>
    </div>
  );
}
