'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '서비스', href: '#services' },
    { name: '프로세스', href: '#process' },
    { name: '신뢰도', href: '#trust' },
    { name: '문의하기', href: '#contact' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" as const }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'glass-heavy py-3'
          : 'bg-transparent py-5'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="relative group">
            <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-[var(--text-muted)] group-hover:to-[var(--accent)] transition-all duration-300" style={{ fontFamily: 'Syne, sans-serif' }}>
              JS SOLAR
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[var(--accent)] transition-all duration-300 group-hover:w-full"></span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-4 left-1/2 w-1 h-1 bg-[var(--accent)] rounded-full opacity-0 -translate-x-1/2 transition-all group-hover:opacity-100 group-hover:-bottom-2"></span>
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <a
              href="#contact"
              className="relative overflow-hidden bg-[var(--accent)] text-[var(--bg)] px-6 py-2.5 rounded-full font-bold text-sm hover:bg-[var(--accent-hover)] transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(45,212,191,0.4)]"
            >
              상담 신청
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[var(--text)]"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-[var(--bg)]/95 backdrop-blur-xl md:hidden"
          >
            <div className="p-6 flex justify-between items-center border-b border-[var(--border)]">
              <span className="text-2xl font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>JS SOLAR</span>
              <button onClick={() => setMobileMenuOpen(false)} className="text-[var(--text-muted)] hover:text-[var(--text)]">
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col p-8 gap-6 text-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-semibold text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 bg-[var(--accent)] text-[var(--bg)] px-8 py-4 rounded-xl font-bold text-lg"
              >
                상담 신청
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
