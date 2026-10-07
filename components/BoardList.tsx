"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Play, ArrowUpRight } from "./Icons";

export type Item = { seq: number; title: string; who: string; date: string; bible: string; cover: string | null; href: string; video: boolean };

const PAGE = 24;

export default function BoardList({ items, kind }: { items: Item[]; kind: "video" | "photo" | "text" }) {
  const [q, setQ] = useState("");
  const [n, setN] = useState(PAGE);
  useEffect(() => { const p = new URLSearchParams(location.search).get("q"); if (p) setQ(p); }, []);
  const found = useMemo(() => {
    const k = q.trim().replace(/\s+/g, " ");
    return k ? items.filter((i) => [i.title, i.who, i.bible, i.date].join(" ").includes(k)) : items;
  }, [q, items]);
  const shown = found.slice(0, n);

  return (
    <div>
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <label className="relative w-full max-w-md">
          <span className="sr-only">게시물 검색</span>
          <input value={q} onChange={(e) => { setQ(e.target.value); setN(PAGE); }} type="search" placeholder="제목, 설교자, 본문으로 찾기"
            className="h-11 w-full rounded-none border border-[var(--hairline-strong)] bg-white px-4 text-[15px] outline-none transition focus:border-2 focus:border-orange" />
        </label>
        <p className="text-sm text-slate" aria-live="polite">{q ? `검색 결과 ${found.length}건` : `전체 ${items.length}건`}</p>
      </div>

      {found.length === 0 && <p className="rounded-none border border-dust bg-white p-10 text-center text-slate">찾는 글이 없습니다. 다른 낱말로 검색해 보세요.</p>}

      {kind === "text" ? (
        <ul className="divide-y divide-dust border-y border-dust">
          {shown.map((i) => (
            <li key={i.seq}>
              <Link href={i.href} className="group grid grid-cols-[1fr_auto] items-center gap-6 py-6 sm:grid-cols-[120px_1fr_auto]">
                <span className="hidden text-sm text-slate tabular-nums sm:block" style={{ fontFamily: "var(--font-display)" }}>{i.date}</span>
                <span className="text-lg font-bold tracking-[-0.025em] group-hover:text-orange sm:text-xl">{i.title}</span>
                <ArrowUpRight className="text-slate transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-orange" />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <ul className={`grid gap-x-5 gap-y-10 sm:grid-cols-2 ${kind === "video" ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
          {shown.map((i) => (
            <li key={i.seq}>
              <Link href={i.href} className="group block">
                <div className={`relative overflow-hidden rounded-none bg-ghost ${kind === "video" ? "aspect-video" : "aspect-[4/5]"}`}>
                  {i.cover
                    // eslint-disable-next-line @next/next/no-img-element
                    ? <img src={i.cover} alt="" loading="lazy" className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${kind === "video" && i.cover.includes("ytimg") ? "" : ""}`} />
                    : <div className="grid h-full place-items-center text-sm text-slate">이미지 없음</div>}
                  {i.video && <span className="absolute bottom-4 left-4 grid h-12 w-12 place-items-center rounded-full bg-white/95 text-ink transition-colors group-hover:bg-yellow"><Play size={18} /></span>}
                </div>
                <p className="mt-4 text-[13px] text-slate tabular-nums" style={{ fontFamily: "var(--font-display)" }}>{[i.date, i.bible].filter(Boolean).join(" · ")}</p>
                <p className="mt-1.5 line-clamp-2 text-lg font-bold leading-snug tracking-[-0.03em] group-hover:text-orange">{i.title}</p>
                {i.who && <p className="mt-1 text-sm text-slate">{i.who}</p>}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {found.length > n && (
        <div className="mt-16 text-center">
          <button onClick={() => setN((x) => x + PAGE)} className="pill pill-ink">더 보기 ({found.length - n}건 남음)</button>
        </div>
      )}
    </div>
  );
}
