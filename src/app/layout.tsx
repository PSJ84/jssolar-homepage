import type { Metadata } from "next";
import "./styles.css";

export const metadata: Metadata = {
  title: "JS SOLAR | 태양광 설치 전문 파트너",
  description: "태양광 컨설팅, 시공, O&M 전문. 고객 전용 포탈로 프로젝트 진행상황을 실시간 확인하세요. 투명한 소통으로 신뢰를 드립니다.",
  keywords: ["태양광", "태양광 설치", "태양광 시공", "태양광 컨설팅", "O&M", "대구 태양광"],
  openGraph: {
    title: "JS SOLAR | 태양광 설치 전문 파트너",
    description: "태양광 컨설팅, 시공, O&M 전문. 고객 전용 포탈로 프로젝트 진행상황을 실시간 확인하세요.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
