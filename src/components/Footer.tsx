export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-2xl font-bold tracking-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
            JS SOLAR
          </div>
          <div className="text-[var(--text-muted)] text-sm text-center md:text-right">
            <p>&copy; {new Date().getFullYear()} JS SOLAR. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
