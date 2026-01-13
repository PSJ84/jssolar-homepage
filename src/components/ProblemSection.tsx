export default function ProblemSection() {
  const problems = [
    {
      question: '인허가는 언제?',
      answer: '인허가 현황 투명 공개',
    },
    {
      question: '연락이 안 돼요',
      answer: '대표 직접 소통, 평균 1시간 응답',
    },
    {
      question: '서류가 어디있지?',
      answer: '클라우드에서 언제든 확인',
    },
    {
      question: '수익이 얼마나?',
      answer: '맞춤 수익분석 시뮬레이션',
    },
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-[var(--accent)] text-sm font-medium tracking-wider uppercase">01 — Problem</span>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {/* Main Problem Card - Takes 2 columns and 2 rows */}
          <div className="md:col-span-2 md:row-span-2 bg-[var(--bg-card)] rounded-2xl p-8 lg:p-10 border border-[var(--border)] flex flex-col justify-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight">
              &ldquo;지금 어디까지<br />된 거지?&rdquo;
            </h2>
            <p className="text-[var(--text-muted)] text-lg leading-relaxed mb-6">
              태양광 설치, 시작은 쉬운데 진행상황을 알기 어려웠습니다.
              인허가는 얼마나 걸리는지, 지금 어느 단계인지 물어봐도 명확한 답을 듣기 힘들죠.
            </p>
            <p className="text-[var(--text)] text-lg leading-relaxed">
              <span className="text-[var(--accent)] font-semibold">JS SOLAR</span>는 다릅니다.
              고객 전용 포탈에서 실시간으로 프로젝트 현황을 확인하세요.
              투명한 소통이 신뢰의 시작입니다.
            </p>
          </div>

          {/* Problem Cards */}
          {problems.map((problem, index) => (
            <div
              key={index}
              className="bg-[var(--bg-card)] rounded-2xl p-6 border border-[var(--border)] hover:border-[var(--accent)]/50 transition-colors"
            >
              <h3 className="text-xl font-bold mb-3 text-[var(--text)]">{problem.question}</h3>
              <p className="text-[var(--text-muted)]">{problem.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
