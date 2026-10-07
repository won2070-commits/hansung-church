"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "../Icons";

type Panel = { key: string; title: string; en: string; img: string; rows: [string, string, string][] };

// 가로 아코디언: 마우스를 올린 조각이 넓게 펼쳐지며 시간표가 드러난다. 모바일은 세로로 쌓임.
export default function WorshipAccordion({ panels }: { panels: Panel[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="flex flex-col gap-3 lg:h-[600px] lg:flex-row">
      {panels.map((p, i) => {
        const on = open === i;
        return (
          <div key={p.key} onMouseEnter={() => setOpen(i)} onFocus={() => setOpen(i)}
            className={`group relative overflow-hidden rounded-[32px] bg-ink text-canvas transition-[flex-grow] duration-700 ease-[cubic-bezier(.2,.8,.2,1)] lg:min-w-[120px] lg:basis-0 ${on ? "lg:grow-[3.2]" : "lg:grow"}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.img} alt="" loading="lazy" className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${on ? "scale-100 opacity-45" : "scale-110 opacity-70 grayscale"}`} />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
            <div className="relative flex h-full min-h-[380px] flex-col justify-between p-7 sm:p-9">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="eyebrow mb-3 text-canvas/70">{p.en}</p>
                  <h3 className="h-section whitespace-nowrap text-[clamp(1.9rem,3vw,2.8rem)]">{p.title}</h3>
                </div>
                <span className="text-sm text-canvas/60 tabular-nums" style={{ fontFamily: "var(--font-display)" }}>{String(p.rows.length).padStart(2, "0")}</span>
              </div>
              <ul className={`mt-8 space-y-0 transition-all duration-500 ${on ? "opacity-100" : "lg:pointer-events-none lg:opacity-0"}`}>
                {p.rows.slice(0, 8).map(([name, time, place]) => (
                  <li key={name} className="grid grid-cols-[1fr_auto] gap-x-4 border-t border-white/15 py-2.5 text-[15px] sm:grid-cols-[1.3fr_1fr_1fr]">
                    <span className="font-semibold">{name}</span>
                    <span className="text-right tabular-nums text-orange-light sm:text-left">{time.replace(/^주일\s/, "")}</span>
                    <span className="hidden text-canvas/60 sm:block">{place}</span>
                  </li>
                ))}
              </ul>
              {p.rows.length > 8 && on && <Link href="/worship/" className="mt-4 inline-flex items-center gap-1 text-sm text-canvas/70 hover:text-orange-light">전체 {p.rows.length}개 보기 <ArrowUpRight size={14} /></Link>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
