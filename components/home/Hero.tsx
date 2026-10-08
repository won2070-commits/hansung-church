"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "../Icons";

export type News = { title: string; date: string; board: string; href: string; cover: string | null };

// SOUL Church 히어로 구조: 풀블리드 사진 + 하단에 떠 있는 "소식" 카드(화살표·점·CTA)
const SnsIcon = ({ k }: { k: string }) =>
  k === "youtube" ? <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8ZM9.8 15.1V8.9L15.2 12Z" /></svg>
  : k === "instagram" ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>
  : <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 8.5V6.7c0-.8.5-1 .9-1H17V2.1L14 2c-3.3 0-4 2.4-4 4v2.5H7.7V12H10v10h4V12h2.7l.4-3.5Z" /></svg>;

export default function Hero({ slides, news, sns }: { slides: string[]; news: News[]; sns: Record<string, string> }) {
  const [s, setS] = useState(0);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setS((i) => (i + 1) % slides.length), 6500);
    return () => clearInterval(t);
  }, [slides.length]);
  const cur = news[n];
  const go = (d: number) => setN((i) => (i + d + news.length) % news.length);

  return (
    <section className="px-3 pt-3 sm:px-6 sm:pt-5" aria-label="한성교회에 오신 것을 환영합니다">
      <div className="relative mx-auto h-[calc(100svh-24px)] min-h-[640px] max-w-[1440px] overflow-hidden rounded-none bg-ink sm:h-[calc(100svh-40px)] ">
        {slides.map((src, i) => (
          <div key={src} className={`absolute inset-0 transition-opacity duration-[1600ms] ${i === s ? "opacity-100" : "opacity-0"}`} aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" className={`h-full w-full object-cover grayscale contrast-[1.08] ${i === s ? "kenburns" : ""}`} fetchPriority={i === 0 ? "high" : "low"} />
          </div>
        ))}
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_20%_100%,rgba(28,28,30,.85),rgba(28,28,30,.25)_55%,rgba(28,28,30,.1))]" />

        {/* VOUS Church식 세로 레일: 왼쪽 FOLLOW + SNS, 오른쪽 아래로 */}
        <div className="absolute left-5 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center gap-5 text-canvas lg:flex">
          {(["youtube", "instagram", "facebook"] as const).map((k) => (
            <a key={k} href={sns[k]} target="_blank" rel="noopener" aria-label={`한성교회 ${k}`} className="transition-colors hover:text-orange-light"><SnsIcon k={k} /></a>
          ))}
          <span className="h-16 w-px bg-canvas/50" aria-hidden="true" />
          <span className="text-[11px] font-bold tracking-[0.3em] [writing-mode:vertical-rl]" style={{ fontFamily: "var(--font-display)" }}>FOLLOW</span>
        </div>
        <a href="#welcome" className="absolute right-5 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center gap-4 text-canvas transition-colors hover:text-orange-light lg:flex" aria-label="아래로 둘러보기">
          <span className="text-[11px] font-bold tracking-[0.3em] [writing-mode:vertical-rl]" style={{ fontFamily: "var(--font-display)" }}>DISCOVER</span>
          <span className="h-16 w-px bg-current opacity-60" aria-hidden="true" />
          <span className="animate-bounce text-lg" aria-hidden="true">↓</span>
        </a>

        <div className="relative flex h-full flex-col justify-end px-5 pb-[320px] pt-28 sm:px-12 sm:pb-[340px] lg:px-20 lg:pb-[340px]">
          <p className="eyebrow mb-6 text-canvas/80 animate-[fadeUp_1s_.2s_both]">Hansung Church · Seoul</p>
          <h1 className="h-display max-w-6xl text-[clamp(2.7rem,7.2vw,7.4rem)] text-canvas animate-[fadeUp_1.1s_.35s_both]">
            행복한 사람이<br />행복한 세상을 <span className="text-orange-light">만듭니다.</span>
          </h1>
        </div>

        {cur && (
          <div className="absolute inset-x-3 bottom-[68px] sm:inset-x-6 sm:bottom-6 lg:left-auto lg:right-8 lg:bottom-8 lg:w-[620px] animate-[fadeUp_1s_.7s_both]">
            <div className="flex items-stretch gap-4 rounded-none border border-ink bg-canvas p-3 sm:p-4">
              {cur.cover && (
                <Link href={cur.href} className="hidden w-36 shrink-0 overflow-hidden rounded-none sm:block" tabIndex={-1} aria-hidden="true">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={cur.cover} alt="" className="h-full w-full object-cover" />
                </Link>
              )}
              <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 py-1 pl-2 sm:pl-0">
                <div className="flex items-center justify-between">
                  <span className="eyebrow !text-[11px]">What&apos;s on · {cur.board}</span>
                  <div className="flex gap-1.5" role="tablist" aria-label="소식 선택">
                    {news.map((_, i) => (
                      <button key={i} role="tab" aria-selected={i === n} aria-label={`${i + 1}번째 소식`} onClick={() => setN(i)}
                        className={`h-1.5 rounded-full transition-all ${i === n ? "w-6 bg-ink" : "w-1.5 bg-dust"}`} />
                    ))}
                  </div>
                </div>
                <Link href={cur.href} className="line-clamp-2 text-[19px] font-bold leading-snug tracking-[-0.03em] hover:text-orange sm:text-[22px]" aria-live="polite">{cur.title}</Link>
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-slate tabular-nums" style={{ fontFamily: "var(--font-display)" }}>{cur.date}</span>
                  <div className="flex items-center gap-2">
                    <button onClick={() => go(-1)} aria-label="이전 소식" className="grid h-9 w-9 place-items-center rounded-full border border-ink/20 hover:bg-ink hover:text-canvas"><ChevronLeft /></button>
                    <button onClick={() => go(1)} aria-label="다음 소식" className="grid h-9 w-9 place-items-center rounded-full border border-ink/20 hover:bg-ink hover:text-canvas"><ChevronRight /></button>
                    <Link href={cur.href} className="pill pill-ink !px-4 !py-2 text-[13px]">자세히 <ArrowUpRight size={15} /></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
