'use client';

import { motion } from 'framer-motion';

export default function TrustSection() {
  return (
    <section id="trust" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-[var(--accent)] text-xs font-bold tracking-[0.2em] uppercase">03 — Trust</span>
        </motion.div>

        {/* Full Width Image with Overlay */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-[400px] lg:h-[600px] rounded-3xl overflow-hidden glass border border-[var(--border)] group"
        >
          {/* Image Placeholder or Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)]/10 to-[var(--bg)]">
            <img
              src="/images/trust-bg.jpg"
              alt="Trustworthy Construction"
              className="w-full h-full object-cover opacity-80"
            />
          </div>

          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl lg:text-6xl font-bold text-[var(--text)] max-w-3xl leading-tight mb-6"
            >
              투명한 소통,<br />
              <span className="text-[var(--accent)]">검증된 기술력</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-[var(--text-muted)] text-xl max-w-xl leading-relaxed"
            >
              고객 전용 포탈을 통해 모든 공정을 실시간으로 공유하며,<br />
              데이터 기반의 정확한 시공으로 최상의 발전 효율을 약속합니다.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
