import Link from "next/link";
import PageHero, { Wrap } from "@/components/PageHero";
import { ArrowUpRight } from "@/components/Icons";
import { asset, site } from "@/lib/data";

export const metadata = { title: "담임목사 인사말" };

export default function Page() {
  const g = site().greeting;
  const [q, a, ...rest] = g.paragraphs;
  return (
    <>
      <PageHero en="Senior pastor" ghost="GREETING" crumbs={[["교회안내", "/about/"], ["담임목사 인사말", "/about/"]]}
        title={<>행복한 사람이<br /><span className="hl">행복한 세상</span>을 만듭니다.</>} />
      <Wrap className="grid gap-16 pb-32 lg:grid-cols-[0.85fr_1.15fr]">
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
