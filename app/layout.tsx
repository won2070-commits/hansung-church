import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ServiceBar from "@/components/ServiceBar";
import Motion from "@/components/Motion";

const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: { default: "한성교회 — 행복한 사람이 행복한 세상을 만듭니다", template: "%s — 한성교회" },
  description: "서울 양천구 신정동 한성교회. 도원욱 담임목사의 설교, 예배 안내, 새가족 등록, 교회 소식을 만나보세요.",
};
export const viewport: Viewport = { themeColor: "#f3f0ee" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={outfit.variable}>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" />
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
