"use client";
import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "../Icons";

export type SeasonItem = { title: string; date: string; board: string; href: string; cover: string; cta: string };

// VOUS Church의 Calendar 구조: 가로로 넘기는 행사·소식 카드 + 화살표
export default function SeasonCarousel({ items }: { items: SeasonItem[] }) {
  const ref = useRef<HTMLUListElement>(null);
  const go = (d: number) => ref.current?.scrollBy({ left: d * (ref.current.clientWidth * 0.8), behavior: "smooth" });
  return (
    <div>
      <ul ref={ref} className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 [scrollbar-width:none] sm:-mx-8 sm:px-8 [&::-webkit-scrollbar]:hidden">
        {items.map((it) => (
          <li key={it.href} className="w-[min(78vw,380px)] shrink-0 snap-start">
            <Link href={it.href} className="group block h-full border border-ink bg-white">
              <div className="aspect-[4/3] overflow-hidden border-b border-ink bg-ghost">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={it.cover} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="flex min-h-[190px] flex-col justify-between gap-6 p-6">
                <div>
                  <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-slate">{it.board} · {it.date}</p>
                  <p className="mt-2 line-clamp-2 text-xl font-bold leading-snug tracking-[-0.03em]">{it.title}</p>
                </div>
                <span className="inline-flex w-fit items-center gap-2 border border-ink px-4 py-2 text-[13px] font-bold transition-colors group-hover:bg-orange-light">{it.cta} <ArrowUpRight size={14} /></span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex gap-2">
        <button onClick={() => go(-1)} aria-label="이전 소식" className="grid h-11 w-11 place-items-center border border-ink hover:bg-orange-light"><ChevronLeft /></button>
        <button onClick={() => go(1)} aria-label="다음 소식" className="grid h-11 w-11 place-items-center border border-ink hover:bg-orange-light"><ChevronRight /></button>
      </div>
    </div>
  );
}
