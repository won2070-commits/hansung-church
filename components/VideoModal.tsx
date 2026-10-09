"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "./Icons";

type V = { id: string; title: string; href: string };

/**
 * 설교·찬양 목록에서 누르면 페이지를 넘기지 않고 그 자리에서 바로 재생.
 * a[data-yt] 링크를 문서 전체에서 가로챈다(새 탭·가운데 클릭 등은 그대로 링크 이동).
 */
export default function VideoModal() {
  const [v, setV] = useState<V | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[data-yt]");
      if (!a) return;
      e.preventDefault();
      lastFocus.current = a;
      setV({ id: a.dataset.yt!, title: a.dataset.title || "", href: a.getAttribute("href") || "#" });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  useEffect(() => {
    if (!v) return;
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setV(null);
    window.addEventListener("keydown", onKey);
    return () => { document.documentElement.style.overflow = ""; window.removeEventListener("keydown", onKey); lastFocus.current?.focus(); };
  }, [v]);

  if (!v) return null;
  return (
    <div role="dialog" aria-modal="true" aria-label={`${v.title} 영상`} className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/90 p-3 backdrop-blur-sm sm:p-8" onClick={(e) => e.target === e.currentTarget && setV(null)}>
      <div className="w-full max-w-5xl">
        <div className="mb-3 flex items-center justify-between gap-4 text-canvas">
          <p className="truncate text-lg font-bold tracking-[-0.02em]">{v.title}</p>
          <button ref={closeRef} onClick={() => setV(null)} aria-label="영상 닫기" className="grid h-11 w-11 shrink-0 place-items-center border border-canvas/40 text-2xl hover:bg-orange-light hover:text-ink">×</button>
        </div>
        <div className="aspect-video border border-canvas/30 bg-black">
          <iframe className="h-full w-full" src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0&playsinline=1`} title={v.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link href={v.href} onClick={() => setV(null)} className="pill pill-orange !py-2.5 text-sm">본문·설교 정보 보기 <ArrowUpRight size={14} /></Link>
          <a href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noopener" className="pill pill-line !py-2.5 text-sm text-canvas">YouTube에서 보기 <ArrowUpRight size={14} /></a>
        </div>
      </div>
    </div>
  );
}
