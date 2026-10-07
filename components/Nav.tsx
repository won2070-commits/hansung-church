"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { MENU } from "@/lib/boards";
import { ArrowUpRight } from "./Icons";

const TOP: [string, string][] = [["교회안내", "/about/"], ["한성TV", "/tv/"], ["한성LIFE", "/life/"], ["생방송", "/live/"], ["행축ON", "/happy/"]];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const path = usePathname();
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  useEffect(() => {
    let last = 0;
    const onScroll = () => { const y = window.scrollY; setHidden(y > 240 && y > last); last = y; };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 px-3 pt-3 transition-transform duration-500 sm:px-6 sm:pt-5 ${hidden && !open ? "-translate-y-[130%]" : ""}`}>
        <nav aria-label="주요 메뉴" className="mx-auto flex h-16 max-w-[1280px] items-center justify-between rounded-full bg-white/90 pl-5 pr-2 shadow-[0_4px_12px_rgba(5,0,56,0.06)] backdrop-blur-md sm:pl-7">
          <Link href="/" aria-label="한성교회 홈"><Logo /></Link>
          <ul className="hidden items-center gap-1 lg:flex">
            {TOP.map(([t, h]) => (
              <li key={h}>
                <Link href={h} className={`rounded-full px-4 py-2 text-[15px] font-medium tracking-[-0.02em] transition-colors hover:bg-canvas ${path?.startsWith(h) ? "bg-canvas" : ""}`}>{t}</Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <Link href="/newcomer/" className="pill pill-orange hidden !py-2.5 text-sm sm:inline-flex">새가족 등록</Link>
            <button onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="menu-overlay" className="pill pill-ink whitespace-nowrap !py-2.5 text-sm">
              <span style={{ fontFamily: "var(--font-display)" }}>{open ? "CLOSE" : "MENU"}</span>
              <span className="relative block h-3 w-4" aria-hidden="true">
                <span className={`absolute left-0 h-[1.5px] w-4 bg-current transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0.5"}`} />
                <span className={`absolute left-0 h-[1.5px] w-4 bg-current transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-2.5"}`} />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <div id="menu-overlay" role="dialog" aria-modal="true" aria-label="전체 메뉴" hidden={!open}
        className="fixed inset-0 z-40 overflow-y-auto bg-ink text-canvas">
        <div className="mx-auto grid max-w-[1280px] gap-12 px-6 pb-16 pt-32 sm:px-8 md:grid-cols-2 xl:grid-cols-4">
          {MENU.map((g, gi) => (
            <div key={g.title} className="animate-[fadeUp_.6s_both]" style={{ animationDelay: `${gi * 70}ms` }}>
              <p className="eyebrow mb-5 text-canvas/50">{g.en}</p>
              <p className="mb-6 text-4xl font-medium tracking-[-0.04em] sm:text-5xl">{g.title}</p>
              <ul className="space-y-1">
                {g.items.map(([t, h]) => (
                  <li key={h}>
                    <Link href={h} className="group flex items-center justify-between border-b border-white/10 py-3 text-lg text-canvas/80 transition-colors hover:text-orange-light">
                      {t}<ArrowUpRight className="opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
