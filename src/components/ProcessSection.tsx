export default function ProcessSection() {
  const steps = [
    {
      number: '01',
      title: '상담',
      description: '전화, 이메일, 폼으로 문의',
      portal: '문의 내용 기록',
    },
    {
      number: '02',
      title: '현장실사',
      description: '설치 환경 확인',
      portal: '현장 사진 공유',
    },
    {
      number: '03',
      title: '견적',
      description: '맞춤 견적 및 수익 분석',
      portal: '견적서 열람',
    },
    {
      number: '04',
      title: '계약',
      description: '계약 체결',
      portal: '계약서 보관',
    },
    {
      number: '05',
      title: '인허가',
      description: '9종 인허가 진행',
      portal: '인허가 현황 실시간',
    },
    {
      number: '06',
      title: '시공',
      description: '설치 공사 진행',
      portal: '시공 사진 업데이트',
    },
    {
      number: '07',
      title: '준공',
      description: '준공 및 계통연계',
      portal: '완료 서류 제공',
    },
  ];

  return (
    <section id="process" className="py-20 px-6 bg-[var(--bg-card)]/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-[var(--accent)] text-sm font-medium tracking-wider uppercase">03 — Process</span>
          <h2 className="text-3xl lg:text-4xl font-bold mt-4">진행 과정</h2>
          <p className="text-[var(--text-muted)] mt-4 max-w-2xl mx-auto">
            모든 단계가 고객 포탈에서 실시간으로 공유됩니다
          </p>
        </div>

        {/* Process Timeline */}
        <div className="relative">
          {/* Desktop Timeline Line */}
          <div className="hidden lg:block absolute top-[60px] left-0 right-0 h-0.5 bg-[var(--border)]"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4 lg:gap-2">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {/* Step Card */}
                <div className="bg-[var(--bg-card)] rounded-xl p-4 lg:p-5 border border-[var(--border)] hover:border-[var(--accent)]/50 transition-colors h-full">
                  {/* Number Circle */}
                  <div className="w-10 h-10 rounded-full bg-[var(--accent)] text-[var(--bg)] flex items-center justify-center font-bold text-sm mb-4 mx-auto lg:mx-0" style={{ fontFamily: 'Syne, sans-serif' }}>
                    {step.number}
                  </div>

                  <h3 className="text-lg font-bold mb-2 text-center lg:text-left">{step.title}</h3>
                  <p className="text-[var(--text-muted)] text-sm mb-3 text-center lg:text-left">{step.description}</p>

                  {/* Portal Badge */}
                  <div className="bg-[var(--accent)]/10 rounded-lg px-3 py-2">
                    <span className="text-[var(--accent)] text-xs font-medium block text-center lg:text-left">
                      {step.portal}
                    </span>
                  </div>
                </div>

                {/* Arrow for mobile/tablet */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-2">
                    <svg className="w-6 h-6 text-[var(--border)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
