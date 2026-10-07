import Link from "next/link";
import PageHero, { Wrap } from "@/components/PageHero";
import { ArrowUpRight } from "@/components/Icons";
import { asset, site } from "@/lib/data";

export const metadata = { title: "온라인 새가족 등록" };

export default function Page() {
  const n = site().newcomer;
  const steps = [[n.lines[1], n.lines[2]], [n.lines[3], n.lines[4]]];
  return (
    <>
      <PageHero en="New here?" ghost="WELCOME" crumbs={[["교회안내", "/about/"], ["새가족 등록", "/newcomer/"]]}
        title={<>한성교회의<br /><span className="text-orange">새 가족</span>이 되어 주세요.</>}
        desc="믿음이 처음이어도, 다시 시작하는 마음이어도 괜찮습니다. 두 단계면 충분합니다.">
        <a href={n.form} target="_blank" rel="noopener" className="pill pill-orange !px-7 !py-4 text-lg">온라인 새가족 등록하기 <ArrowUpRight /></a>
      </PageHero>
      <Wrap className="pb-24">
        <ol className="grid gap-4 md:grid-cols-2">
          {steps.map(([k, v], i) => (
            <li key={k} className={`rounded-[40px] p-10 sm:p-14 ${i ? "bg-ink text-canvas" : "bg-white"}`} data-reveal>
              <p className="text-[clamp(4rem,8vw,7rem)] font-semibold leading-none tracking-[-0.05em] text-orange-light" style={{ fontFamily: "var(--font-display)" }}>0{i + 1}</p>
              <p className="eyebrow mt-8">{k}</p>
              <p className="mt-4 text-2xl font-semibold leading-snug tracking-[-0.03em]">{v}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-center text-slate" data-reveal>{n.lines[5].replace(/^\*/, "")}</p>
      </Wrap>
      <Wrap className="pb-40">
        <div className="grid items-center gap-10 rounded-[40px] bg-orange p-8 text-white sm:p-14 lg:grid-cols-2" data-reveal>
          <div>
            <h2 className="h-display text-[clamp(2.2rem,4.4vw,4rem)]">이번 주일,<br />기다리고 있을게요.</h2>
            <p className="mt-6 text-white/85">주일예배 오전 8:00 · 10:00 · 정오 12:00 · 오후 2:00 · 3:40(젊은이예배) · 저녁 8:00<br />워십센터 2층 H-홀</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <a href={n.form} target="_blank" rel="noopener" className="pill bg-white text-ink hover:bg-ink hover:text-white">등록 설문지 작성 <ArrowUpRight /></a>
            <Link href="/location/" className="pill pill-line">오시는 길</Link>
          </div>
        </div>
      </Wrap>
    </>
  );
}
