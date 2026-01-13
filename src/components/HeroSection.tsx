'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Zap } from 'lucide-react';

export default function HeroSection() {
  const steps = ['계약', '설계', '인허가', '시공', '준공'];
  const currentStep = 3;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const }
    }
  };

  return (
    <section className="relative min-h-screen pt-32 pb-16 px-6 flex flex-col justify-center overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[var(--accent)]/10 rounded-full blur-[120px] -z-10 animate-pulse-slow"></div>

      <div className="max-w-7xl mx-auto w-full">
        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6"
        >
          {/* Main Hero Card - Takes 2 columns */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 glass rounded-3xl p-8 lg:p-12 relative overflow-hidden flex flex-col justify-center min-h-[440px] lg:min-h-[540px] group"
          >
            <div className="absolute inset-0 z-0">
              <img
                src="/images/hero-bg.jpg"
                alt="Solar Architecture"
                className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/90 to-[var(--bg)]/60"></div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10"></div>

            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-2 text-[var(--accent)] text-sm font-medium tracking-wider uppercase mb-6 relative z-10"
            >
              <Zap size={16} className="fill-[var(--accent)]" />
              Solar Installation Partner
            </motion.span>

            <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold mb-8 leading-none tracking-tight relative z-10">
              설치만 하고<br />
              <span className="text-white/90">끝이 아닙니다.</span>
            </h1>

            <p className="text-gray-200 text-lg lg:text-xl mb-10 max-w-xl leading-relaxed relative z-10">
              시작부터 준공까지 모든 진행상황을 투명하게.<br />
              <strong className="text-white">고객 전용 포탈</strong>에서 내 프로젝트를 실시간으로 확인하세요.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 relative z-10">
              <a
                href="#contact"
                className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--bg)] px-8 py-4 rounded-xl font-bold text-center transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(45,212,191,0.4)] flex items-center justify-center gap-2"
              >
                무료 상담 신청 <ArrowRight size={20} />
              </a>
              <a
                href="https://portal.jssolar.kr/login"
                className="glass hover:bg-white/10 text-[var(--text)] px-8 py-4 rounded-xl font-bold text-center transition-all hover:border-[var(--accent)]/50"
              >
                시공 포탈 체험하기
              </a>
            </div>
          </motion.div>

          {/* Right Column - 2 Cards */}
          <div className="flex flex-col gap-4 lg:gap-6">
            {/* Response Time Card */}
            <motion.div
              variants={itemVariants}
              className="glass rounded-3xl p-8 border border-[var(--border)] flex-1 flex flex-col justify-center relative overflow-hidden group"
            >
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-[var(--accent)]/10 rounded-full blur-2xl group-hover:bg-[var(--accent)]/20 transition-all"></div>

              <span className="text-[var(--text-muted)] text-sm mb-4">평균 응답 시간</span>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-6xl lg:text-7xl font-bold text-[var(--accent)] tracking-tighter" style={{ fontFamily: 'Syne, sans-serif' }}>
                  1
                </span>
                <span className="text-2xl font-bold">시간</span>
              </div>
              <div className="text-[var(--text-muted)] text-sm flex items-center gap-2">
                <CheckCircle2 size={14} className="text-[var(--accent)]" /> 영업일 기준 빠른 피드백
              </div>
            </motion.div>

            {/* Portal Preview Card */}
            <motion.div
              variants={itemVariants}
              className="glass rounded-3xl p-8 border border-[var(--border)] flex-1 relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-[var(--text)] font-semibold flex items-center gap-2">
                  고객 포탈
                </span>
                <span className="bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[var(--accent)] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]"></span>
                  </span>
                  LIVE
                </span>
              </div>

              <div className="text-[var(--text-muted)] text-sm mb-4 font-medium">영천 태양광 250kW</div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-[var(--text-muted)]">현재 공정률</span>
                  <span className="text-[var(--accent)] font-bold">67%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '67%' }}
                    transition={{ duration: 1.5, delay: 1, ease: "circOut" }}
                    className="h-full bg-[var(--accent)] rounded-full relative"
                  >
                    <div className="absolute top-0 right-0 bottom-0 w-[2px] bg-white shadow-[0_0_10px_white]"></div>
                  </motion.div>
                </div>
              </div>

              {/* Timeline */}
              <div className="flex justify-between items-center px-1">
                {steps.map((step, index) => (
                  <div key={step} className="flex flex-col items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full transition-all duration-500 ${index < currentStep
                        ? 'bg-[var(--accent)] box-shadow-glow'
                        : index === currentStep
                          ? 'bg-[var(--accent)] ring-4 ring-[var(--accent)]/20 scale-125'
                          : 'bg-[var(--border)]'
                        }`}
                    ></div>
                    {index === currentStep && (
                      <span className="text-[10px] text-[var(--accent)] font-bold absolute mt-5 animate-bounce">
                        진행중
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
