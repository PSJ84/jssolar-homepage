'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Mail, MapPin, Send } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    type: '',
    capacity: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const installTypes = ['주택', '상가·건물', '공장·창고', '기타'];
  const capacities = ['잘 모르겠어요', '3kW 이하', '3-10kW', '10-50kW', '50kW 이상'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', phone: '', type: '', capacity: '', message: '' });
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[var(--accent)] text-xs font-bold tracking-[0.2em] uppercase block mb-4">04 — Contact</span>
          <h2 className="text-4xl lg:text-5xl font-bold">무료 상담 신청</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
          {/* Left - Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-8 lg:p-12"
          >
            <h3 className="text-3xl font-bold mb-6">무엇이든 물어보세요</h3>
            <p className="text-[var(--text-muted)] text-lg mb-10 leading-relaxed">
              복잡한 인허가부터 수익성 분석까지.<br />
              <strong className="text-[var(--text)]">태양광 전문가</strong>가 직접 답변해 드립니다.
            </p>

            <div className="space-y-8">
              {/* KakaoTalk */}
              <div className="flex items-start gap-4 group">
                <div className="w-14 h-14 bg-[var(--accent)]/10 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <MessageSquare className="text-[var(--accent)]" size={24} />
                </div>
                <div>
                  <div className="text-[var(--text-muted)] text-sm mb-1 font-medium">실시간 채팅</div>
                  <a
                    href="https://pf.kakao.com/_jssolar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#FEE500] text-[#3C1E1E] px-5 py-2.5 rounded-xl font-bold hover:bg-[#FDD800] transition-all hover:scale-105"
                  >
                    카카오톡 채널 상담
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 group">
                <div className="w-14 h-14 bg-[var(--accent)]/10 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Mail className="text-[var(--accent)]" size={24} />
                </div>
                <div>
                  <div className="text-[var(--text-muted)] text-sm mb-1 font-medium">이메일</div>
                  <a href="mailto:psj@jssolar.kr" className="text-xl font-bold hover:text-[var(--accent)] transition-colors">
                    psj@jssolar.kr
                  </a>
                </div>
              </div>

              {/* Service Area */}
              <div className="flex items-start gap-4 group">
                <div className="w-14 h-14 bg-[var(--accent)]/10 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <MapPin className="text-[var(--accent)]" size={24} />
                </div>
                <div>
                  <div className="text-[var(--text-muted)] text-sm mb-1 font-medium">서비스 지역</div>
                  <p className="text-xl font-bold">전국 어디든 출동합니다</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-8 lg:p-12 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent)]/5 rounded-full blur-3xl -z-10"></div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-bold mb-2 ml-1">
                  이름 <span className="text-[var(--accent)]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-[var(--text)] placeholder-[var(--text-muted)] focus:border-[var(--accent)] focus:bg-[var(--accent)]/5 focus:outline-none transition-all"
                  placeholder="성함을 입력해주세요"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-bold mb-2 ml-1">
                  연락처 <span className="text-[var(--accent)]">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-[var(--text)] placeholder-[var(--text-muted)] focus:border-[var(--accent)] focus:bg-[var(--accent)]/5 focus:outline-none transition-all"
                  placeholder="010-0000-0000"
                />
              </div>

              {/* Install Type */}
              <div>
                <label className="block text-sm font-bold mb-2 ml-1">설치 유형</label>
                <div className="grid grid-cols-2 gap-3">
                  {installTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({ ...formData, type })}
                      className={`px-4 py-3 rounded-xl border text-sm font-bold transition-all ${formData.type === type
                          ? 'bg-[var(--accent)] border-[var(--accent)] text-[var(--bg)] shadow-lg shadow-[var(--accent)]/20'
                          : 'bg-white/5 border-white/10 text-[var(--text-muted)] hover:bg-white/10 hover:border-white/20'
                        }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-bold mb-2 ml-1">문의 내용</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-[var(--text)] placeholder-[var(--text-muted)] focus:border-[var(--accent)] focus:bg-[var(--accent)]/5 focus:outline-none transition-all resize-none"
                  placeholder="궁금하신 내용을 자유롭게 작성해주세요"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] text-[var(--bg)] px-6 py-5 rounded-xl font-bold text-lg transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-[var(--accent)]/20"
              >
                {isSubmitting ? (
                  '전송 중...'
                ) : (
                  <>
                    상담 신청하기 <Send size={20} />
                  </>
                )}
              </button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-green-400 text-center text-sm font-medium"
                >
                  상담 신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
