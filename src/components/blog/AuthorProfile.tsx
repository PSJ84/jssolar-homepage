import { User } from 'lucide-react';

export default function AuthorProfile() {
  return (
    <div className="glass rounded-2xl p-6 flex items-center gap-4">
      <div className="w-14 h-14 rounded-full bg-[var(--accent)]/20 flex items-center justify-center shrink-0">
        <User size={28} className="text-[var(--accent)]" />
      </div>
      <div>
        <p className="font-bold text-lg text-[var(--text)]">성진</p>
        <p className="text-sm text-[var(--text-muted)]">js솔라 대표</p>
        <p className="text-sm text-[var(--text-muted)] mt-1">
          태양광 EPC·인허가·O&M 전문. 현장 실무 경험을 바탕으로 유용한 정보를 공유합니다.
        </p>
      </div>
    </div>
  );
}
