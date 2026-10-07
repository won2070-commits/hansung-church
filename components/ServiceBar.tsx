import Link from "next/link";
import { latest, niceTitle, href } from "@/lib/data";

// SOUL Church의 하단 고정 바 구조: 예배시간 | 생방송 | 흐르는 소식
export default function ServiceBar() {
  const news = latest(["notice", "photo", "bulletin"], 6);
  const ticker = news.map(({ p, meta }) => ({ t: niceTitle(p, meta).title, h: href(meta, p.seq) }));
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 px-3 pb-3 sm:px-6 sm:pb-5">
      <div className="pointer-events-auto mx-auto flex h-12 max-w-[1280px] items-center overflow-hidden border border-ink bg-canvas/95 pl-5 text-[12.5px] font-bold shadow-[0_4px_12px_rgba(5,0,56,0.06)] backdrop-blur-md">
        <Link href="/worship/" className="flex shrink-0 items-center gap-3 whitespace-nowrap pr-4 hover:text-orange">
          <span className="eyebrow !text-[11px]">주일예배</span>
          <span className="hidden tabular-nums md:inline" style={{ fontFamily: "var(--font-display)" }}>8:00 · 10:00 · 12:00 · 14:00 · 15:40 · 20:00</span>
          <span className="tabular-nums md:hidden" style={{ fontFamily: "var(--font-display)" }}>8 · 10 · 12 · 14 · 15:40 · 20시</span>
        </Link>
        <Link href="/live/" className="hidden shrink-0 items-center gap-2 border-l border-dust px-4 hover:text-orange sm:flex">
          <span className="h-2 w-2 animate-pulse rounded-full bg-orange" />생방송
        </Link>
        <div className="marquee-wrap relative hidden min-w-0 flex-1 overflow-hidden border-l border-dust lg:block">
          <div className="marquee" style={{ ["--speed" as string]: "60s" }}>
            {[...ticker, ...ticker].map((n, i) => (
              <Link key={i} href={n.h} className="whitespace-nowrap px-6 text-slate hover:text-orange">{n.t}<span className="pl-6 text-dust">—</span></Link>
            ))}
          </div>
        </div>
        <Link href="/newcomer/" className="ml-auto mr-1.5 shrink-0 bg-ink px-4 py-2 text-canvas hover:bg-orange-light hover:text-ink sm:hidden">새가족</Link>
      </div>
    </div>
  );
}
