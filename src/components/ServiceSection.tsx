'use client';

import { motion } from 'framer-motion';
import { AreaChart, Hammer, RefreshCw, ShieldCheck } from 'lucide-react';

export default function ServiceSection() {
  const services = [
    {
      number: '01',
      title: '컨설팅',
      description: '사업성 검토부터 수익 분석까지. 설치 전 예상 수익을 시뮬레이션합니다.',
      features: ['사업성 검토', '수익 분석', '최적 용량 산정', '보조금 안내'],
      icon: AreaChart,
      delay: 0
    },
    {
      number: '02',
      title: '시공',
      description: '설계, 인허가, 설치, 준공까지. 모든 과정을 포탈에서 함께 확인합니다.',
      features: ['설계 및 인허가', '기자재 조달', '설치 공사', '준공 및 등록'],
      icon: Hammer,
      delay: 0.1
    },
    {
      number: '03',
      title: '리파워링',
      description: '노후 발전소 성능 복원 전문. 효율 저하된 설비를 새것처럼.',
      features: ['성능 진단', '모듈 교체', '인버터 업그레이드', '효율 최적화'],
      icon: RefreshCw,
      delay: 0.2
    },
    {
      number: '04',
      title: 'O&M',
      description: '설치 후 유지보수와 모니터링. 발전량 이상 시 즉시 대응합니다.',
      features: ['실시간 모니터링', '정기 점검', '긴급 대응', '성능 분석'],
      icon: ShieldCheck,
      delay: 0.3
    },
  ];

  return (
    <section id="services" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[var(--accent)] text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Our Services</span>
          <h2 className="text-4xl lg:text-5xl font-bold mt-2 mb-6">태양광의 모든 것</h2>
          <p className="text-[var(--text-muted)] max-w-2xl mx-auto text-lg">
            단순 설치를 넘어, 태양광 발전 사업의 성공적인 파트너가 되어드립니다.
          </p>
        </motion.div>

        {/* Service Cards - 2x2 Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {services.map((service) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: service.delay, duration: 0.5 }}
              className="glass p-8 rounded-3xl border border-[var(--border)] hover:border-[var(--accent)]/50 transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-8">
                {/* Icon Box */}
                <div className="w-14 h-14 rounded-2xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] group-hover:scale-110 transition-transform duration-300">
                  <service.icon size={28} />
                </div>
                <span className="text-[var(--text-muted)] text-sm font-bold opacity-50" style={{ fontFamily: 'Syne, sans-serif' }}>
                  {service.number}
                </span>
              </div>

              <h3 className="text-2xl font-bold mb-4 group-hover:text-[var(--accent)] transition-colors">{service.title}</h3>
              <p className="text-[var(--text-muted)] mb-8 leading-relaxed text-lg">{service.description}</p>

              <div className="flex flex-wrap gap-2 text-sm">
                {service.features.map((feature, idx) => (
                  <span key={idx} className="bg-white/5 text-[var(--text-muted)] px-3 py-1.5 rounded-full border border-white/5">
                    {feature}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
