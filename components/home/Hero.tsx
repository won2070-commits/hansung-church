"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "../Icons";

export type News = { title: string; date: string; board: string; href: string; cover: string | null };

// SOUL Church 히어로 구조: 풀블리드 사진 + 하단에 떠 있는 "소식" 카드(화살표·점·CTA)
export default function Hero({ slides, news }: { slides: string[]; news: News[] }) {
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
      <div className="relative mx-auto h-[calc(100svh-24px)] min-h-[640px] max-w-[1600px] overflow-hidden rounded-[28px] bg-ink sm:h-[calc(100svh-40px)] sm:rounded-[40px]">
        {slides.map((src, i) => (
          <div key={src} className={`absolute inset-0 transition-opacity duration-[1600ms] ${i === s ? "opacity-100" : "opacity-0"}`} aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" className={`h-full w-full object-cover ${i === s ? "kenburns" : ""}`} fetchPriority={i === 0 ? "high" : "low"} />
          </div>
        ))}
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_20%_100%,rgba(20,20,19,.85),rgba(20,20,19,.25)_55%,rgba(20,20,19,.1))]" />

        <div className="relative flex h-full flex-col justify-end px-5 pb-[300px] pt-28 sm:px-12 sm:pb-[270px] lg:pb-[320px]">
          <p className="eyebrow mb-6 text-canvas/80 animate-[fadeUp_1s_.2s_both]">Hansung Church · Seoul</p>
          <h1 className="h-display max-w-6xl text-[clamp(2.7rem,7.2vw,7.4rem)] text-canvas animate-[fadeUp_1.1s_.35s_both]">
            행복한 사람이<br />행복한 세상을 <span className="text-orange-light">만듭니다.</span>
          </h1>
        </div>

        {cur && (
          <div className="absolute inset-x-3 bottom-[68px] sm:inset-x-6 sm:bottom-6 lg:left-auto lg:right-8 lg:bottom-8 lg:w-[620px] animate-[fadeUp_1s_.7s_both]">
            <div className="flex items-stretch gap-4 rounded-[28px] bg-canvas/95 p-3 shadow-[0_24px_48px_rgba(0,0,0,0.18)] backdrop-blur sm:p-4">
              {cur.cover && (
                <Link href={cur.href} className="hidden w-36 shrink-0 overflow-hidden rounded-[20px] sm:block" tabIndex={-1} aria-hidden="true">
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
                        className={`h-1.5 rounded-full transition-all ${i === n ? "w-6 bg-orange" : "w-1.5 bg-dust"}`} />
                    ))}
                  </div>
                </div>
                <Link href={cur.href} className="line-clamp-2 text-[19px] font-semibold leading-snug tracking-[-0.03em] hover:text-orange sm:text-[22px]" aria-live="polite">{cur.title}</Link>
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
