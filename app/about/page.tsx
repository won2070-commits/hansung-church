import Link from "next/link";
import PageHero, { Wrap } from "@/components/PageHero";
import { ArrowUpRight } from "@/components/Icons";
import { asset, site } from "@/lib/data";
import { PASTOR_STORY as S } from "@/lib/pastor";

export const metadata = { title: "담임목사 소개", description: "행복을 설교하는 사람, 한성교회 도원욱 담임목사의 사역 이야기와 인사말" };

export default function Page() {
  const g = site().greeting;
  const [q, a, ...rest] = g.paragraphs;
  return (
    <>
      <PageHero en="Senior pastor" ghost="PASTOR" crumbs={[["교회안내", "/about/"], ["담임목사 소개", "/about/"]]}
        title={<>{S.title},<br /><span className="hl">도원욱 목사</span>.</>} desc={S.lead} />
      <Wrap className="grid gap-16 pb-24 lg:grid-cols-[0.85fr_1.15fr]">
        <figure className="lg:sticky lg:top-28 lg:self-start" data-reveal>
          <div className="overflow-hidden rounded-none bg-ghost">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset("assets/pastor-dowonuk.webp")} alt="한성교회 도원욱 담임목사" width={1200} height={1600} className="w-full" />
          </div>
          <figcaption className="mt-6">
            <p className="text-2xl font-bold tracking-[-0.03em]">도원욱 담임목사</p>
            <ul className="mt-4 space-y-1.5 text-[15px] text-slate">
              {g.credentials.map((c) => <li key={c} className="flex gap-3"><span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-none bg-yellow" />{c.replace(/^(전|현),\s*/, "$1 ")}</li>)}
            </ul>
          </figcaption>
        </figure>
        <div className="max-w-2xl">
          <ol className="border-t-2 border-ink">
            {S.timeline.map((t) => (
              <li key={t.age} className="grid grid-cols-1 gap-y-3 border-b border-ink/40 py-8 sm:grid-cols-[120px_1fr] sm:gap-x-5" data-reveal>
                <span className="text-[clamp(2rem,4vw,3.2rem)] leading-none tracking-[-0.05em]" style={{ fontFamily: "var(--font-display)" }}>{t.age}</span>
                <div>
                  <h2 className="text-xl font-black tracking-[-0.03em] sm:text-2xl"><span className="hl">{t.kicker}</span></h2>
                  <p className="mt-3 text-[17px] leading-[1.9] text-charcoal">{t.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-14 space-y-6 text-[17px] leading-[1.95] text-charcoal">
            {S.essay.map((p) => <p key={p} data-reveal>{p}</p>)}
          </div>
          <div className="mt-14 border-2 border-ink bg-orange-light p-8 sm:p-10" data-reveal>
            <p className="h-section text-[clamp(1.6rem,2.8vw,2.3rem)]">{S.closing[0]}</p>
            <p className="mt-4 text-lg leading-relaxed text-ink/80">{S.closing[1]}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              <Link href="/newcomer/" className="pill pill-ink">처음 오셨나요? <ArrowUpRight /></Link>
              <Link href="/tv/sunday/" className="pill pill-line">주일설교 듣기</Link>
              <Link href="/worship/" className="pill pill-line">예배 시간</Link>
            </div>
          </div>
          <p className="mt-6 text-[12px] text-slate">{S.sources}</p>
        </div>
      </Wrap>
      <Wrap className="grid gap-16 border-t-2 border-ink pb-32 pt-20 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="eyebrow mb-4" data-reveal>Greeting</p>
          <h2 className="h-display text-[clamp(2rem,4vw,3.4rem)]" data-reveal>담임목사<br />인사말</h2>
        </div>
        <div className="max-w-2xl lg:col-start-2">
          <p className="h-section mb-3 text-[clamp(1.8rem,3.2vw,2.8rem)]" data-reveal>{q}</p>
          <p className="h-section mb-14 text-[clamp(1.8rem,3.2vw,2.8rem)] text-orange" data-reveal>{a}</p>
          <div className="space-y-6 text-lg leading-[1.9] text-charcoal">
            {rest.slice(0, 2).map((p) => <p key={p} data-reveal>{p}</p>)}
            <blockquote className="my-12 rounded-none bg-yellow p-8 text-xl font-bold leading-relaxed tracking-[-0.02em] text-ink sm:p-10" data-reveal>
              {rest.slice(2, 5).map((p) => <span key={p} className="block">{p}</span>)}
            </blockquote>
            {rest.slice(5).map((p) => <p key={p} data-reveal>{p}</p>)}
          </div>
          <p className="mt-12 text-right text-xl font-bold tracking-[-0.02em]" data-reveal>한성교회 담임목사 도원욱</p>
          <div className="mt-14 flex flex-wrap gap-3" data-reveal>
            <Link href="/tv/sunday/" className="pill pill-ink">주일설교 보기 <ArrowUpRight /></Link>
            <Link href="/happy/" className="pill pill-line">행축 이야기</Link>
            <Link href="/about/staff/" className="pill pill-line">섬기는 이들</Link>
          </div>
        </div>
      </Wrap>
    </>
  );
}
