import Link from "next/link";
import PageHero, { Wrap } from "@/components/PageHero";
import { ArrowUpRight } from "@/components/Icons";
import { site } from "@/lib/data";
import { MINISTRIES } from "@/lib/ministries";

export const metadata = { title: "처음 오셨나요? 새가족 안내" };

// Life.Church의 새가족 흐름: 누구나 초대 → 무엇을 기대하면 될까 → 등록 → 처음 오신 분 FAQ → 모두를 위한 자리
export default function Page() {
  const s = site(); const n = s.newcomer; const c = s.contact;
  const steps = [[n.lines[1], n.lines[2]], [n.lines[3], n.lines[4]]];
  const newcomerStaff = s.pastors.flatMap((g) => g.members).find((m) => m.role.includes("새가족"));
  const expect = [
    { t: "현장 예배", en: "In person", tone: "bg-white", items: [
      "주일 오전 8시부터 저녁 8시까지, 하루 여섯 번 예배가 있습니다.",
      "본당은 워십센터 2층 H-홀입니다.",
      "주일 오전 10시와 정오에는 아이들을 위한 연령별 교회학교 예배가 함께 열립니다.",
      "영어·중국어 예배와 eKids 영어예배도 있습니다.",
    ], cta: ["예배 시간과 장소", "/worship/"] },
    { t: "온라인 예배", en: "Online", tone: "bg-orange-light", items: [
      "주일예배(1부~5부)·수요예배·금요성령집회를 유튜브로 생방송합니다.",
      "생방송은 예배 시작 5분 전부터 찬양과 함께 시작됩니다.",
      "주일예배는 화요일, 수요저녁예배는 목요일, 금요성령집회는 토요일 오전 10시 이후 다시 볼 수 있습니다.",
      "헌금 시간에는 온라인 헌금을 이용하시면 됩니다.",
    ], cta: ["생방송 보기", "/live/"] },
  ];
  const faq: [string, React.ReactNode][] = [
    ["처음 가면 어디로 가면 되나요?", <>주일예배는 <b>워십센터 2층 H-홀</b>에서 드립니다. 예배 시간보다 조금 일찍 오시면 편안하게 자리를 잡으실 수 있습니다. 시간은 <Link className="underline" href="/worship/">예배 안내</Link>에서 확인하세요.</>],
    ["아이와 함께 가도 되나요?", <>물론입니다. 주일 오전 10시와 정오에 비전센터에서 연령별 교회학교 예배가 열립니다. 영유아부(0~3세)·유치부(4~6세)는 3층, 취학부(7~12세)는 1층, 청소년부(13~18세)는 2층입니다. 영어로 예배하는 eKids(4~12세)도 있습니다.</>],
    ["어떻게 등록하나요?", <>{n.lines[2]} {n.lines[4]} {n.lines[5].replace(/^\*/, "")}</>],
    ["궁금한 것은 누구에게 물어보면 되나요?", <>교회 사무실 대표전화 <a className="underline" href={`tel:${c.tel}`}>{c.tel}</a> 또는 <a className="underline" href={`mailto:${c.email}`}>{c.email}</a>로 연락 주세요.{newcomerStaff && <> 새가족부는 {newcomerStaff.name}가 섬기고 있습니다.</>}</>],
    ["교회까지 어떻게 가나요?", <>지하철 2호선 신정네거리역 4번 출구나 5호선 목동역 5번 출구에서 양천03 버스를 타고 ‘한성교회앞’에서 내리시면 됩니다. 다른 노선은 <Link className="underline" href="/location/">오시는 길</Link>에 있습니다.</>],
    ["주차할 수 있나요?", <>주차와 현장 안내는 교회 사무실(<a className="underline" href={`tel:${c.tel}`}>{c.tel}</a>)로 문의해 주세요.</>],
    ["먼저 온라인으로 둘러보고 싶어요.", <>좋습니다. <Link className="underline" href="/tv/">한성TV</Link>에서 설교와 찬양을, <Link className="underline" href="/live/">예배 생방송</Link>에서 실시간 예배를 만나실 수 있습니다.</>],
  ];
  const places = MINISTRIES.filter((m) => ["nextgen", "young", "adult", "global"].includes(m.id));

  return (
    <>
      <PageHero en="Everyone's invited" ghost="WELCOME" crumbs={[["교회안내", "/about/"], ["새가족 안내", "/newcomer/"]]}
        title={<>누구나, <span className="hl">있는 모습 그대로</span><br />오세요.</>}
        desc="믿음이 처음이어도, 다시 시작하는 마음이어도 괜찮습니다. 어디쯤 걷고 계시든, 한성교회에는 당신의 자리가 있습니다.">
        <div className="flex flex-wrap gap-2">
          <a href={n.form} target="_blank" rel="noopener" className="pill pill-ink !px-7 !py-4 text-base">온라인 새가족 등록 <ArrowUpRight /></a>
          <a href="#expect" className="pill pill-line !px-7 !py-4 text-base">무엇을 기대하면 될까요?</a>
        </div>
      </PageHero>

      {/* What to expect: 현장 / 온라인 */}
      <Wrap className="pb-24">
        <h2 id="expect" className="h-display mb-10 scroll-mt-28 text-[clamp(2rem,4vw,3.6rem)]" data-reveal>무엇을 기대하면 될까요?</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {expect.map((e) => (
            <div key={e.t} className={`flex flex-col border-2 border-ink p-8 sm:p-10 ${e.tone}`} data-reveal>
              <p className="eyebrow mb-4 [&::before]:bg-ink">{e.en}</p>
              <h3 className="h-section mb-6 text-[clamp(1.8rem,3vw,2.6rem)]">{e.t}</h3>
              <ul className="flex-1 space-y-3 border-t border-ink pt-6">
                {e.items.map((x) => <li key={x} className="flex gap-3 leading-relaxed"><span className="mt-2.5 h-2 w-2 shrink-0 bg-ink" />{x}</li>)}
              </ul>
              <Link href={e.cta[1]} className="pill pill-ink mt-8 w-fit">{e.cta[0]} <ArrowUpRight /></Link>
            </div>
          ))}
        </div>
      </Wrap>

      {/* 등록 두 걸음 */}
      <Wrap className="pb-24">
        <h2 className="h-display mb-10 text-[clamp(2rem,4vw,3.6rem)]" data-reveal>등록은 두 걸음이면 됩니다.</h2>
        <ol className="grid gap-4 md:grid-cols-2">
          {steps.map(([k, v], i) => (
            <li key={k} className={`rounded-none border-2 border-ink p-10 sm:p-14 ${i ? "bg-ink text-canvas" : "bg-white"}`} data-reveal>
              <p className="text-[clamp(4rem,8vw,7rem)] leading-none tracking-[-0.05em] text-orange-light [-webkit-text-stroke:1.5px_#090909]" style={{ fontFamily: "var(--font-display)" }}>0{i + 1}</p>
              <p className="eyebrow mt-8">{k}</p>
              <p className="mt-4 text-2xl font-bold leading-snug tracking-[-0.03em]">{v}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4" data-reveal>
          <p className="text-slate">{n.lines[5].replace(/^\*/, "")}</p>
          <a href={n.form} target="_blank" rel="noopener" className="pill pill-ink">등록 설문지 작성 <ArrowUpRight /></a>
        </div>
      </Wrap>

      {/* 처음 오신 분 FAQ */}
      <Wrap className="grid gap-12 pb-24 lg:grid-cols-[0.7fr_1.3fr]">
        <div data-reveal>
          <p className="eyebrow mb-6">First time FAQ</p>
          <h2 className="h-display text-[clamp(2rem,4vw,3.6rem)]">처음 오시는 분들이<br />자주 묻는 것.</h2>
        </div>
        <div className="border-t-2 border-ink">
          {faq.map(([q, a]) => (
            <details key={q} className="group border-b border-ink/40" data-reveal>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-bold tracking-[-0.02em] hover:bg-orange-light [&::-webkit-details-marker]:hidden">
                {q}<span className="text-2xl transition-transform group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <p className="pb-6 pr-8 leading-[1.9] text-charcoal">{a}</p>
            </details>
          ))}
        </div>
      </Wrap>

      {/* 모두를 위한 자리 */}
      <Wrap className="pb-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <h2 className="h-display text-[clamp(2rem,4vw,3.6rem)]" data-reveal>모두를 위한 자리가 있어요.</h2>
          <Link href="/ministries/" className="pill pill-line" data-reveal>모든 부서 <ArrowUpRight /></Link>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {places.map((m) => (
            <li key={m.id} data-reveal>
              <Link href={`/ministries/#${m.id}`} className="group flex h-full flex-col justify-between gap-8 border border-ink bg-white p-7 hover:bg-orange-light">
                <div><p className="eyebrow mb-4">{m.en}</p><p className="text-2xl font-bold tracking-[-0.03em]">{m.name}</p><p className="mt-3 text-[15px] leading-relaxed text-charcoal">{m.tagline}</p></div>
                <span className="text-xl transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true">↗</span>
              </Link>
            </li>
          ))}
        </ul>
      </Wrap>

      <Wrap className="pb-32">
        <div className="grid items-center gap-10 rounded-none border-2 border-ink bg-orange-light p-8 text-ink sm:p-14 lg:grid-cols-2" data-reveal>
          <div>
            <h2 className="h-display text-[clamp(2.2rem,4.4vw,4rem)]">이번 주일,<br />기다리고 있을게요.</h2>
            <p className="mt-6 text-ink/75">주일예배 오전 8:00 · 10:00 · 정오 12:00 · 오후 2:00 · 3:40(젊은이예배) · 저녁 8:00<br />워십센터 2층 H-홀</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <a href={n.form} target="_blank" rel="noopener" className="pill pill-ink">등록 설문지 작성 <ArrowUpRight /></a>
            <Link href="/location/" className="pill pill-line">오시는 길</Link>
          </div>
        </div>
      </Wrap>
    </>
  );
}
