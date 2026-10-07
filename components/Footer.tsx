import Link from "next/link";
import Logo from "./Logo";
import { MENU } from "@/lib/boards";
import { site } from "@/lib/data";
import { ArrowUpRight } from "./Icons";

export default function Footer() {
  const c = site().contact;
  return (
    <footer className="bg-ink pb-36 pt-24 text-canvas sm:pb-28">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-8">
        <div className="flex flex-col justify-between gap-10 border-b border-white/15 pb-16 lg:flex-row lg:items-end">
          <p className="h-display max-w-4xl text-[clamp(2.4rem,5.5vw,5rem)]">언제든, 여기서<br />당신을 기다릴게요.</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/newcomer/" className="pill bg-white text-ink hover:bg-yellow">새가족 등록 <ArrowUpRight /></Link>
            <a href={`tel:${c.tel}`} className="pill pill-line">{c.tel}</a>
          </div>
        </div>
        <div className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
          {MENU.map((g) => (
            <div key={g.title}>
              <p className="eyebrow mb-5 text-canvas/45">{g.title}</p>
              <ul className="space-y-2.5 text-[15px] text-canvas/80">
                {g.items.slice(0, 8).map(([t, h]) => <li key={h}><Link className="hover:text-orange-light" href={h}>{t}</Link></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-6 border-t border-white/15 pt-10 text-sm text-canvas/55 lg:flex-row lg:items-center lg:justify-between">
          <Logo light />
          <address className="not-italic leading-7">
            {c.denomination} 한성교회 · (우 {c.zip}) {c.address}<br />
            대표전화 {c.tel} · 팩스 {c.fax} · <a className="hover:text-canvas" href={`mailto:${c.email}`}>{c.email}</a>
          </address>
          <div className="flex gap-2">
            {Object.entries({ YouTube: c.sns.youtube, Instagram: c.sns.instagram, Facebook: c.sns.facebook }).map(([k, v]) => (
              <a key={k} href={v} target="_blank" rel="noopener" className="rounded-full border border-white/25 px-4 py-2 text-canvas/80 hover:border-orange-light hover:text-orange-light">{k}</a>
            ))}
          </div>
        </div>
        <p className="mt-8 text-xs text-canvas/35">© {new Date().getFullYear()} HANSUNG PRESBYTERIAN CHURCH. <a className="underline" href="https://www.hansungchurch.com/html/sub00/privacy.asp" target="_blank" rel="noopener">개인정보처리방침</a></p>
      </div>
    </footer>
  );
}
