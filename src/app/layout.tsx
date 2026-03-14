import type { Metadata } from "next";
import "./styles.css";

export const metadata: Metadata = {
  title: "JS SOLAR | 태양광 설치 전문 파트너",
  description: "태양광 컨설팅, 시공, O&M 전문. 고객 전용 포탈로 프로젝트 진행상황을 실시간 확인하세요. 투명한 소통으로 신뢰를 드립니다.",
  keywords: ["태양광", "태양광 설치", "태양광 시공", "태양광 컨설팅", "O&M", "대구 태양광"],
  metadataBase: new URL("https://jssolar.kr"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "JS SOLAR | 태양광 설치 전문 파트너",
    description: "태양광 컨설팅, 시공, O&M 전문. 고객 전용 포탈로 프로젝트 진행상황을 실시간 확인하세요.",
    type: "website",
    url: "https://jssolar.kr",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "JS SOLAR 로고",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JS SOLAR | 태양광 설치 전문 파트너",
    description: "태양광 컨설팅, 시공, O&M 전문. 고객 전용 포탈로 프로젝트 진행상황을 실시간 확인하세요.",
    images: ["/images/logo.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "JS SOLAR (제이에스솔라)",
  description: "태양광 컨설팅, 시공, O&M 전문",
  url: "https://jssolar.kr",
  email: "psj@jssolar.kr",
  address: {
    "@type": "PostalAddress",
    streetAddress: "경상감영길 111, 5층 501호내 514-1호",
    addressLocality: "대구광역시 중구",
    addressCountry: "KR",
  },
  areaServed: "대한민국",
  serviceType: ["태양광 컨설팅", "태양광 시공", "태양광 O&M", "리파워링"],
  sameAs: ["https://pf.kakao.com/_Lxgvxon"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
