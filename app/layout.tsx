import type { Metadata, Viewport } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ServiceBar from "@/components/ServiceBar";
import Motion from "@/components/Motion";


export const metadata: Metadata = {
  title: { default: "한성교회 — 행복한 사람이 행복한 세상을 만듭니다", template: "%s — 한성교회" },
  description: "서울 양천구 신정동 한성교회. 도원욱 담임목사의 설교, 예배 안내, 새가족 등록, 교회 소식을 만나보세요.",
};
export const viewport: Viewport = { themeColor: "#090909" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Noto+Sans+KR:wght@400;500;700;800;900&display=swap" />
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-canvas">본문 바로가기</a>
        <Nav />
        <main id="main" className="w-full max-w-full overflow-x-clip">{children}</main>
        <Footer />
        <ServiceBar />
        <Motion />
      </body>
    </html>
  );
}
