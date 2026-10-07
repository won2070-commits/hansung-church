import PageHero, { Wrap } from "@/components/PageHero";
import Copy from "@/components/Copy";
import { site } from "@/lib/data";

export const metadata = { title: "온라인헌금" };

export default function Page() {
  const g = site().giving;
  return (
    <>
      <PageHero en="Giving" ghost="GIVING" crumbs={[["교회안내", "/about/"], ["온라인헌금", "/giving/"]]}
        title={<>기쁨으로 드리는<br />온라인 헌금.</>} desc={g.note} />
      <Wrap className="pb-24">
        <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {g.accounts.map((a, i) => (
            <li key={a.no} className={`flex flex-col justify-between gap-12 rounded-none p-8 text-ink ${["bg-yellow", "bg-rose", "bg-teal", "bg-peach"][i % 4]}`} data-reveal>
              <div className="flex items-center justify-between">
                <p className="eyebrow text-ink/70">{a.label}</p>
                <span className="rounded-full bg-white/70 px-3 py-1 text-sm">{a.bank}</span>
              </div>
              <div>
                <p className="text-[clamp(1.6rem,2.6vw,2.1rem)] font-bold tabular-nums tracking-[-0.02em]" style={{ fontFamily: "var(--font-display)" }}>{a.no}</p>
                <p className="mt-1 text-ink/60">예금주 한성교회</p>
              </div>
              <Copy text={`${a.bank} ${a.no} 한성교회`} label="계좌번호 복사" className="pill pill-ink w-fit !py-2.5 text-sm" />
            </li>
          ))}
        </ul>
      </Wrap>
      <Wrap className="grid gap-16 pb-32 lg:grid-cols-[0.6fr_1.4fr]">
        <div data-reveal>
          <p className="eyebrow mb-4">How to write</p>
          <h2 className="h-section text-[clamp(1.8rem,3vw,2.6rem)]">헌금 항목별<br />기재 방법</h2>
          <p className="mt-6 text-slate">송금자명 = 이름 + 휴대폰 뒷번호 + 기재항목<br />예) 홍길동1977감사</p>
        </div>
        <div>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {g.items.map(([k, v]) => (
              <li key={k} className="rounded-none border border-dust bg-white p-5" data-reveal>
                <p className="text-sm text-slate">{k}</p>
                <p className="mt-1 text-xl font-bold text-orange">{v}</p>
              </li>
            ))}
          </ul>
          <p className="eyebrow mb-4 mt-16">은행 바로가기</p>
          <div className="flex flex-wrap gap-2">
            {g.banks.map(([t, h]) => <a key={t} href={h} target="_blank" rel="noopener" className="rounded-full border border-ink/15 bg-white px-4 py-2 text-sm font-bold hover:border-ink">{t} ↗</a>)}
          </div>
        </div>
      </Wrap>
    </>
  );
}
