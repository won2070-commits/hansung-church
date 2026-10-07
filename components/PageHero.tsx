import Link from "next/link";

// 서브페이지 머리: eyebrow + 대형 제목 + 크림 위 고스트 워터마크
export default function PageHero({ en, title, desc, crumbs, ghost, children }: {
  en: string; title: React.ReactNode; desc?: React.ReactNode; crumbs?: [string, string][]; ghost?: string; children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden px-6 pb-16 pt-36 sm:px-8 sm:pt-44 md:pb-24">
      {ghost && <p className="pointer-events-none absolute -right-6 top-24 select-none whitespace-nowrap text-[clamp(5rem,15vw,15rem)] font-bold leading-none tracking-[-0.05em] text-ghost" aria-hidden="true" style={{ fontFamily: "var(--font-display)" }}>{ghost}</p>}
      <div className="relative mx-auto max-w-[1280px]">
        {crumbs && (
          <nav aria-label="현재 위치" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate animate-[fadeUp_.8s_both]">
            <Link href="/" className="hover:text-orange">홈</Link>
            {crumbs.map(([t, h]) => <span key={h} className="flex items-center gap-2"><span className="text-dust">/</span><Link href={h} className="hover:text-orange">{t}</Link></span>)}
          </nav>
        )}
        <p className="eyebrow mb-6 animate-[fadeUp_.8s_.05s_both]">{en}</p>
        <h1 className="h-display max-w-6xl text-[clamp(2.6rem,6.4vw,6.2rem)] animate-[fadeUp_1s_.1s_both]">{title}</h1>
        {desc && <div className="mt-8 max-w-2xl text-lg leading-relaxed text-charcoal animate-[fadeUp_1s_.2s_both]">{desc}</div>}
        {children && <div className="mt-10 animate-[fadeUp_1s_.3s_both]">{children}</div>}
      </div>
    </section>
  );
}

export function Wrap({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-[1280px] px-6 sm:px-8 ${className}`}>{children}</div>;
}
