import Link from "next/link";
import Hero from "@/components/home/Hero";
import WorshipAccordion from "@/components/home/WorshipAccordion";
import SeasonCarousel from "@/components/home/SeasonCarousel";
import ConnectToast from "@/components/home/ConnectToast";
import { ArrowUpRight, Play, Arrow } from "@/components/Icons";
import { asset, board, cover, fmtDate, href, latest, niceTitle, site, BOARDS } from "@/lib/data";

const img = (n: string) => asset(`assets/home/${n}.webp`);

function Marquee({ words, ghost = false, reverse = false, speed = "40s", dot = "bg-orange-light" }: { words: string[]; ghost?: boolean; reverse?: boolean; speed?: string; dot?: string }) {
  const row = [...words, ...words];
  return (
    <div className="marquee-wrap overflow-hidden" aria-hidden="true">
      <div className={`marquee ${reverse ? "marquee-rev" : ""}`} style={{ ["--speed" as string]: speed }}>
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center">
            {row.map((w, i) => (
              <span key={i} className={`flex items-center whitespace-nowrap px-6 text-[clamp(3.2rem,9vw,9rem)] font-black tracking-[-0.06em] ${ghost ? "text-ghost" : ""}`} style={{ fontFamily: "var(--font-display)" }}>
                {w}<span className={`ml-12 inline-block h-[0.32em] w-[0.32em] rounded-full ${dot}`} />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const s = site();
  const news = latest(["notice", "photo", "bulletin", "dawn-sketch", "hakki"], 5).map(({ p, meta }) => ({
    title: niceTitle(p, meta).title, date: fmtDate(p.date), board: meta.name, href: href(meta, p.seq), cover: cover(p),
  }));
  const sunday = board("sunday").posts.find((p) => p.youtube[0])!;
  const sundayMeta = BOARDS.find((b) => b.slug === "sunday")!;
  const more = ["wednesday", "special", "youth", "tuesday", "praise-sunday", "choir"].map((slug) => {
    const b = board(slug); const p = b.posts.find((x) => x.youtube[0])!;
    return { p, meta: b, t: niceTitle(p, b) };
  });
  const photo = board("photo").posts[0];
  const bulletin = board("bulletin").posts[0];
  const notices = board("notice").posts.slice(0, 3);
  const g = s.greeting;
  // 이번 시즌: 이미지가 있는 최근 공지·행사 글 (VOUS Calendar 구조)
  const season = latest(["notice", "photo", "dawn-sketch", "hakki", "family"], 30)
    .filter(({ p }) => cover(p))
    .slice(0, 8)
    .map(({ p, meta }) => ({ title: niceTitle(p, meta).title, date: fmtDate(p.date), board: meta.name, href: href(meta, p.seq), cover: cover(p)!, cta: meta.slug === "notice" ? "안내 보기" : "자세히" }));
  // 당신을 위한 자리 (VOUS "VOUS is for you" 구조) — 모두 공식 자료 근거
  const places = [
    { en: "Small groups", t: "다락방", d: "교구와 다락방으로 모여 삶과 말씀을 나눕니다. 다락방 교안은 H-빌리지에서 볼 수 있습니다.", h: "/ministries/#adult", cta: "교구·다락방 소개", img: img("hero-table"), ext: false },
    { en: "Next generation", t: "차세대", d: "영유아부부터 청소년부까지 주일 오전 10시와 정오에 연령별로 예배합니다. 토요일 저녁엔 더브레이크워십이 있습니다.", h: "/ministries/#nextgen", cta: "차세대 소개", img: img("kids-art"), ext: false },
    { en: "Young adults", t: "청년", d: "토요일 저녁 7시 뉴웨이브워십과 주일 오후 3시 40분 젊은이예배에서 청년들이 함께 예배합니다.", h: "/ministries/#young", cta: "청년부 소개", img: img("praise"), ext: false },
  ];
  const strengths = [
    { t: "삶에 닿는 말씀", d: "설교학을 연구하고 가르쳐 온 도원욱 담임목사가 매주 말씀을 전합니다. 놓친 설교는 한성TV에서 언제든 다시 들을 수 있습니다.", h: "/tv/sunday/" },
    { t: "언제나 열린 예배", d: "주일 여섯 번의 예배와 영어·중국어 예배, 수요예배와 금요성령집회, 월요일부터 금요일까지의 새벽기도. 삶의 시간에 맞는 예배가 있습니다.", h: "/worship/" },
    { t: "전도가 축제가 되는 교회", d: "해마다 여는 ‘행복한 사람들의 축제’, 행축. 한 번의 행사가 아니라 교회의 체질입니다. 이제는 행축아카데미로 다른 교회들과도 이 기쁨을 나눕니다.", h: "/happy/" },
    { t: "모든 세대가 함께 자라는 곳", d: "영유아부부터 청소년부, eKids 영어예배, 청년 뉴웨이브워십까지. 특별새벽기도회에는 아이들은 콰이어로, 부모는 교사로 함께 섭니다.", h: "/worship/#w1" },
    { t: "혼자 두지 않는 공동체", d: "다락방에서 삶을 나누고, 가정예배 ‘말씀 한 상’으로 집에서도 예배합니다. 고등부·청년부 장학생을 세우고, 교회 안 갤러리H에서 작은 쉼을 누립니다.", h: "/life/" },
  ];
  // 후기: 특새 은혜나눔 중 짧은 감사·간증글만(개인 사정·도움 요청 글은 제외)
  const graceMeta = BOARDS.find((b) => b.slug === "dawn-grace")!;
  const grace = [519900, 519896, 519895, 519894, 519897, 519887, 519885, 519904, 519893, 519903]
    .map((seq) => board("dawn-grace").posts.find((p) => p.seq === seq))
    .filter((p): p is NonNullable<typeof p> => !!p)
    .map((p) => {
      const t = p.body.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
      return { title: p.title, date: fmtDate(p.date).slice(0, 7), href: href(graceMeta, p.seq), text: t.length > 92 ? t.slice(0, t.lastIndexOf(" ", 92)) + "…" : t };
    });
  const tones = ["bg-yellow", "bg-rose", "bg-teal", "bg-peach", "bg-coral"];
  const steps = [
    { n: "01", t: "예배에 오세요", d: "주일 오전 8시부터 저녁 8시까지 여섯 번의 예배가 있습니다. 본당은 워십센터 2층 H-홀입니다.", h: "/worship/", cta: "예배 시간 보기", c: "bg-teal" },
    { n: "02", t: "온라인으로 가등록", d: s.newcomer.lines[2], h: "/newcomer/", cta: "등록 설문지", c: "bg-yellow" },
    { n: "03", t: "등록 심방", d: s.newcomer.lines[4] + " " + s.newcomer.lines[5].replace(/^\*/, ""), h: "/newcomer/", cta: "새가족 안내", c: "bg-rose" },
    { n: "04", t: "함께 행복해져요", d: "예수를 만나 행복해지고, 예수를 누림으로 그 행복이 깊어지며, 예수를 전함으로 더 큰 행복을 만듭니다.", h: "/happy/", cta: "행축 이야기", c: "bg-peach" },
  ];

  return (
    <>
      <Hero slides={["hero-stage", "hero-festival", "hero-child", "hero-table"].map(img)} news={news} sns={s.contact.sns} />
      <ConnectToast />

      {/* Welcome Home — SOUL의 대형 환영 문구 + 인라인 사진 */}
      <section id="welcome" className="mx-auto max-w-[1280px] scroll-mt-24 px-6 pb-20 pt-24 sm:px-8 md:pt-32">
        <p className="eyebrow mb-10" data-reveal>Welcome home</p>
        <h2 className="h-display max-w-6xl text-[clamp(2.6rem,6.4vw,6.6rem)]" data-reveal>
          처음이어도 괜찮아요<span className="mx-3 inline-block h-[0.78em] w-[1.9em] translate-y-[0.08em] rounded-full bg-cover bg-center align-baseline" style={{ backgroundImage: `url(${img("mom-child")})` }} aria-hidden="true" />
          여기가 당신의 <span className="hl">집</span>입니다<span className="mx-3 inline-block h-[0.78em] w-[1.9em] translate-y-[0.08em] rounded-full bg-cover bg-center align-baseline" style={{ backgroundImage: `url(${img("smile")})` }} aria-hidden="true" />
        </h2>
        <div className="mt-20 grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div className="flex flex-wrap items-start gap-3" data-reveal>
            <Link href="/newcomer/" className="pill pill-ink">처음 오셨나요? <ArrowUpRight /></Link>
            <Link href="/about/" className="pill pill-line">담임목사 인사말</Link>
          </div>
          <p className="text-[clamp(1.35rem,2.3vw,2.1rem)] font-bold leading-[1.55] tracking-[-0.025em]" data-scrub>
            예수님을 만남으로 행복하고, 예수님을 누림으로 행복은 깊어지고, 예수님을 전함으로 더 큰 행복을 만드는 새 사람. 한성교회는 언제나 화사한 봄날 같은 새 인생을 함께 시작하는 행복한 사람들의 축제입니다.
          </p>
        </div>
      </section>

      {/* 소개 — 한성교회의 강점과 따뜻함 (모든 문장은 공식 자료 근거: 인사말·예배안내·행축·특새 나눔·공지) */}
      <section className="mx-auto max-w-[1280px] px-6 pb-24 sm:px-8 md:pb-32" aria-labelledby="about-title">
        <div className="grid gap-12 border-t-2 border-ink pt-16 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <p className="eyebrow mb-6" data-reveal>Who we are</p>
            <h2 id="about-title" className="h-display text-[clamp(2.2rem,4.6vw,4.4rem)]" data-reveal>행복을 먼저 받은 사람들이,<br />그 행복을 <span className="hl">나누는</span> 교회.</h2>
          </div>
          <div className="space-y-6 text-[17px] leading-[1.95] text-charcoal lg:pt-14">
            <p data-reveal>한성교회는 서울 양천구 신정동에 자리한 대한예수교장로회 교회입니다. 우리가 붙든 고백은 단순합니다. 예수님을 만나면 사람이 행복해지고, 행복한 사람이 행복한 세상을 만든다는 것입니다.</p>
            <p data-reveal>그래서 이곳의 주일은 축제처럼 북적입니다. 아기를 안고 오는 부모, 친구 손을 잡고 오는 아이, 토요일 밤 찬양으로 한 주를 여는 청년, 새벽마다 본당의 불을 켜는 성도들. 서로 다른 자리에서 왔지만 한 식탁에 둘러앉습니다.</p>
            <p className="font-bold text-ink" data-reveal>교회가 처음이어도, 오랜만에 다시 오는 걸음이어도 괜찮습니다. 담임목사님의 축복처럼, 여기서 화사한 봄날 같은 새 인생이 시작되기를 바랍니다.</p>
          </div>
        </div>
        <ol className="mt-20 border-t-2 border-ink">
          {strengths.map((x, i) => (
            <li key={x.t} data-reveal>
              <Link href={x.h} className="group grid grid-cols-[44px_1fr_32px] items-start gap-x-4 gap-y-2 border-b border-ink/40 py-8 transition-all duration-300 hover:bg-ink hover:pl-4 hover:text-orange-light sm:grid-cols-[90px_0.9fr_1.1fr_48px] sm:items-center sm:gap-8">
                <span className="pt-1 text-[13px] sm:pt-0" style={{ fontFamily: "var(--font-display)" }}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className="h-section text-[clamp(1.5rem,2.6vw,2.4rem)]">{x.t}</h3>
                <p className="col-start-2 text-[15px] leading-relaxed text-charcoal transition-colors group-hover:text-canvas/80 sm:col-start-auto">{x.d}</p>
                <span className="row-start-1 col-start-3 text-2xl transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 sm:col-start-auto sm:row-start-auto sm:text-right" aria-hidden="true">↗</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {/* Mission marquee — SOUL "LOVE IN ACTION" 자리 */}
      <section className="overflow-hidden border-y-2 border-ink bg-orange-light py-10" aria-label="한성교회의 비전">
        <Marquee words={["행복한 사람이", "행복한 세상을 만듭니다"]} speed="46s" dot="bg-ink" />
      </section>

      {/* How we do church — 노이즈 질감 섹션 */}
      <section className="grain bg-lifted py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-8">
          <div className="mb-16 grid gap-8 lg:grid-cols-2 lg:items-end">
            <div>
              <p className="eyebrow mb-6" data-reveal>How we worship</p>
              <h2 className="h-display text-[clamp(2.4rem,5vw,4.8rem)]" data-reveal>이번 주,<br />함께 예배해요.</h2>
            </div>
            <div className="space-y-6 lg:pb-3" data-reveal>
              <p className="max-w-xl text-lg leading-relaxed text-charcoal">주일 여섯 번의 예배와 교회학교, 주중 예배와 새벽기도까지. 모든 세대가 각자의 자리에서 하나님을 만납니다. 본당은 워십센터 2층 H-홀입니다.</p>
              <Link href="/worship/" className="pill pill-ink">전체 예배 시간과 장소 <ArrowUpRight /></Link>
            </div>
          </div>
          <div data-reveal>
            <WorshipAccordion panels={[
              { key: "sun", title: "주일 예배", en: "Sunday", img: img("hero-stage"), rows: s.worship["주일 예배"] },
              { key: "kids", title: "교회학교", en: "Next generation", img: img("kids-art"), rows: s.worship["교회학교"] },
              { key: "week", title: "주중 예배", en: "Weekdays", img: img("praise"), rows: s.worship["주중 예배"] },
            ]} />
          </div>
        </div>
      </section>

      {/* 이번 시즌 — VOUS Calendar식 가로 캐러셀 */}
      <section className="mx-auto max-w-[1280px] px-6 pt-24 sm:px-8 md:pt-32" aria-labelledby="season-title">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-6" data-reveal>This season</p>
            <h2 id="season-title" className="h-display text-[clamp(2.4rem,5vw,4.8rem)]" data-reveal>지금 한성교회는.</h2>
          </div>
          <Link href="/life/notice/" className="pill pill-line" data-reveal>공지 전체 <ArrowUpRight /></Link>
        </div>
        <div data-reveal><SeasonCarousel items={season} /></div>
      </section>

      {/* 말씀 — 왼쪽 고정, 오른쪽 스크롤 (Passion City 미디어 배치) */}
      <section id="word" className="mx-auto max-w-[1280px] px-6 py-24 sm:px-8 md:py-32">
        <div className="grid gap-16 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <div data-pin="#word">
              <p className="eyebrow mb-6" data-reveal>This week&apos;s word</p>
              <h2 className="h-display mb-10 text-[clamp(2.4rem,5vw,4.8rem)]" data-reveal>오늘을 살아갈<br />말씀.</h2>
              <Link href={href(sundayMeta, sunday.seq)} className="group block" data-reveal>
                <div className="relative aspect-video overflow-hidden rounded-none bg-ink">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`https://i.ytimg.com/vi/${sunday.youtube[0]}/maxresdefault.jpg`} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute bottom-5 left-5 grid h-16 w-16 place-items-center rounded-full bg-yellow text-ink transition-transform group-hover:scale-110"><Play /></span>
                </div>
                <p className="mt-6 text-sm text-slate" style={{ fontFamily: "var(--font-display)" }}>주일예배 · {fmtDate(sunday.date)} · {sunday.bible}</p>
                <p className="mt-2 text-3xl font-bold tracking-[-0.035em] group-hover:text-orange">{niceTitle(sunday, sundayMeta).title}</p>
                <p className="mt-1 text-slate">{sunday.preacher}</p>
              </Link>
            </div>
          </div>
          <ul className="space-y-4">
            {more.map(({ p, meta, t }) => (
              <li key={meta.slug} data-reveal>
                <Link href={href(meta, p.seq)} className="group grid grid-cols-[132px_1fr] items-center gap-5 rounded-none border border-dust bg-white p-3 pr-6 transition-colors hover:bg-lifted sm:grid-cols-[200px_1fr_auto]">
                  <div className="relative aspect-video overflow-hidden rounded-none bg-ink">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`https://i.ytimg.com/vi/${p.youtube[0]}/hqdefault.jpg`} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="min-w-0">
                    <p className="eyebrow mb-2 !text-[11px] text-slate">{meta.name}</p>
                    <p className="line-clamp-2 text-lg font-bold leading-snug tracking-[-0.03em] group-hover:text-orange">{t.title}</p>
                    <p className="mt-1 truncate text-sm text-slate">{[t.who, fmtDate(p.date)].filter(Boolean).join(" · ")}</p>
                  </div>
                  <span className="satellite hidden !h-12 !w-12 bg-canvas sm:grid"><Arrow size={18} /></span>
                </Link>
              </li>
            ))}
            <li data-reveal>
              <Link href="/tv/" className="pill pill-ink mt-6">한성TV 전체 보기 <ArrowUpRight /></Link>
            </li>
          </ul>
        </div>
      </section>

      {/* 담임목사 — 원형 초상 + 위성 버튼 + 오렌지 궤도선 + 고스트 워터마크 */}
      <section className="relative overflow-hidden bg-lifted py-24 md:py-32">
        <p className="pointer-events-none absolute -left-4 top-16 select-none whitespace-nowrap text-[clamp(6rem,17vw,17rem)] font-bold leading-none tracking-[-0.05em] text-ghost" aria-hidden="true" data-parallax="-30">HAPPY MAKER</p>
        <svg className="pointer-events-none absolute inset-x-0 top-1/2 hidden w-full -translate-y-1/2 lg:block" viewBox="0 0 1440 520" fill="none" aria-hidden="true">
          <path d="M-40 420 C 260 120, 620 60, 860 250 S 1300 520, 1500 160" stroke="#fcb900" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        <div className="relative mx-auto grid max-w-[1280px] items-center gap-16 px-6 sm:px-8 lg:grid-cols-[auto_1fr]">
          <Link href="/about/" className="group relative mx-auto block w-[min(78vw,420px)]" data-reveal aria-label="담임목사 인사말 보기">
            <div className="aspect-square overflow-hidden rounded-full bg-ghost shadow-[0_12px_32px_-4px_rgba(5,0,56,0.08)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset("assets/pastor-dowonuk.webp")} alt="도원욱 담임목사" loading="lazy" className="h-full w-full object-cover object-[50%_22%] transition-transform duration-700 group-hover:scale-105" />
            </div>
            <span className="satellite absolute bottom-[8%] right-[2%] !h-20 !w-20 shadow-lg"><Arrow size={26} /></span>
          </Link>
          <div className="max-w-2xl">
            <p className="eyebrow mb-6" data-reveal>Senior pastor</p>
            <h2 className="h-display mb-8 text-[clamp(2.2rem,4.4vw,4.2rem)]" data-reveal>“이 세상에서 가장 행복한 사람은 누구일까요?”</h2>
            <p className="mb-8 text-lg leading-relaxed text-charcoal" data-reveal>{g.paragraphs[1]}</p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4" data-reveal>
              <p className="text-xl font-bold tracking-[-0.03em]">도원욱 담임목사</p>
              <Link href="/about/" className="pill pill-ink">인사말 전문 <ArrowUpRight /></Link>
              <Link href="/about/staff/" className="pill pill-line">섬기는 이들</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 후기 — 성도들의 은혜 나눔, 끝없이 흐르는 카드 두 줄 */}
      <section className="overflow-hidden py-24 md:py-32" aria-labelledby="grace-title">
        <div className="mx-auto mb-14 flex max-w-[1280px] flex-wrap items-end justify-between gap-6 px-6 sm:px-8">
          <div>
            <p className="eyebrow mb-6" data-reveal>Stories of grace</p>
            <h2 id="grace-title" className="h-display text-[clamp(2.4rem,5vw,4.8rem)]" data-reveal>성도들이 나눈<br /><span className="hl">은혜</span>의 고백.</h2>
          </div>
          <Link href="/life/dawn-grace/" className="pill pill-line" data-reveal>은혜나눔 전체 <ArrowUpRight /></Link>
        </div>
        <div className="space-y-4">
          {[0, 1].map((row) => {
            const items = grace.filter((_, i) => i % 2 === row);
            return (
              <div key={row} className="marquee-wrap overflow-hidden">
                <ul className={`marquee gap-4 pr-4 ${row ? "marquee-rev" : ""}`} style={{ ["--speed" as string]: row ? "70s" : "60s" }}>
                  {[...items, ...items].map((q, i) => (
                    <li key={i} className={`w-[min(82vw,400px)] shrink-0 rounded-none border border-ink p-7 ${tones[(i + row * 2) % tones.length]}`} aria-hidden={i >= items.length}>
                      <Link href={q.href} tabIndex={i >= items.length ? -1 : 0} className="flex h-full flex-col justify-between gap-8">
                        <p className="text-[17px] leading-relaxed text-charcoal">“{q.text}”</p>
                        <div className="flex items-end justify-between gap-4">
                          <div className="min-w-0">
                            <p className="truncate font-bold">{q.title}</p>
                            <p className="mt-1 text-sm text-ink/60">특새 은혜나눔 · {q.date}</p>
                          </div>
                          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/80"><ArrowUpRight size={16} /></span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* 한성 LIFE — 빈칸 없는 벤토 (4열 × 3행 = 12칸: 4+2+1+1+2+1+1) */}
      <section className="mx-auto max-w-[1280px] px-6 py-24 sm:px-8 md:py-32">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-6" data-reveal>Hansung life</p>
            <h2 className="h-display text-[clamp(2.4rem,5vw,4.8rem)]" data-reveal>예배에서 일상으로.</h2>
          </div>
          <Link href="/life/" className="pill pill-line" data-reveal>한성LIFE 전체 <ArrowUpRight /></Link>
        </div>
        <div className="grid grid-flow-dense auto-rows-[260px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link href={href(BOARDS.find((b) => b.slug === "photo")!, photo.seq)} className="group relative overflow-hidden rounded-none bg-ink sm:col-span-2 lg:row-span-2" data-reveal>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={cover(photo) ?? img("hall")} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-7 text-canvas">
              <p className="eyebrow mb-3 text-canvas/70">사진게시판 · {fmtDate(photo.date)}</p>
              <p className="max-w-lg text-2xl font-bold tracking-[-0.03em] sm:text-3xl">{photo.title}</p>
            </div>
          </Link>
          <Link href={href(BOARDS.find((b) => b.slug === "bulletin")!, bulletin.seq)} className="group relative overflow-hidden rounded-none border border-dust bg-white p-6 lg:row-span-2" data-reveal>
            <p className="eyebrow mb-2">교회주보</p>
            <p className="text-xl font-bold tracking-[-0.03em]">{bulletin.title}</p>
            <div className="absolute inset-x-6 bottom-0 top-28 overflow-hidden rounded-t-[22px] shadow-[0_12px_32px_-4px_rgba(5,0,56,0.08)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cover(bulletin) ?? ""} alt="이번 주 주보 표지" loading="lazy" className="w-full object-cover object-top transition-transform duration-700 group-hover:-translate-y-3" />
            </div>
          </Link>
          <Link href="/live/" className="group flex flex-col justify-between rounded-none bg-coral p-7 text-ink" data-reveal>
            <span className="flex items-center gap-2 text-sm font-bold"><span className="h-2.5 w-2.5 animate-pulse rounded-full bg-orange" />LIVE</span>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-bold leading-tight tracking-[-0.035em]">예배<br />생방송</p>
              <span className="satellite !h-12 !w-12 !bg-white !text-ink"><Play size={18} /></span>
            </div>
          </Link>
          <Link href="/giving/" className="group flex flex-col justify-between rounded-none bg-ink p-7 text-canvas" data-reveal>
            <p className="eyebrow text-canvas/60">Giving</p>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-bold leading-tight tracking-[-0.035em]">온라인<br />헌금</p>
              <span className="satellite !h-12 !w-12"><Arrow size={18} /></span>
            </div>
          </Link>
          <div className="rounded-none border border-dust bg-white p-7 sm:col-span-2" data-reveal>
            <div className="mb-4 flex items-center justify-between">
              <p className="eyebrow">공지사항</p>
              <Link href="/life/notice/" className="text-sm text-slate hover:text-orange">전체 보기</Link>
            </div>
            <ul className="divide-y divide-dust">
              {notices.map((p) => (
                <li key={p.seq}>
                  <Link href={href(BOARDS.find((b) => b.slug === "notice")!, p.seq)} className="flex items-center justify-between gap-4 py-3.5 hover:text-orange">
                    <span className="truncate font-bold tracking-[-0.02em]">{p.title}</span>
                    <span className="shrink-0 text-sm text-slate tabular-nums" style={{ fontFamily: "var(--font-display)" }}>{fmtDate(p.date).slice(5)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Link href="/happy/" className="group relative overflow-hidden rounded-none bg-ink p-7 text-canvas" data-reveal>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img("hero-festival")} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-50 transition-transform duration-700 group-hover:scale-105" />
            <div className="relative flex h-full flex-col justify-between">
              <p className="eyebrow text-canvas/80">Happy festival</p>
              <p className="text-3xl font-bold tracking-[-0.035em]">행축ON</p>
            </div>
          </Link>
          <Link href="/location/" className="group flex flex-col justify-between rounded-none bg-teal p-7" data-reveal>
            <p className="eyebrow">Visit</p>
            <div>
              <p className="text-3xl font-bold tracking-[-0.035em]">오시는 길</p>
              <p className="mt-2 text-sm text-slate">{s.contact.address}</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Values marquee — SOUL 가치 마퀴 */}
      <section className="overflow-hidden bg-ink py-12 text-canvas" aria-label="행복의 세 걸음">
        <Marquee words={["예수를 만나 행복", "예수를 누려 깊어지는 행복", "예수를 전해 더 큰 행복"]} reverse speed="52s" />
      </section>

      {/* 당신을 위한 자리 — VOUS "VOUS is for you" 구조 */}
      <section className="mx-auto max-w-[1280px] px-6 pt-24 sm:px-8 md:pt-32" aria-labelledby="places-title">
        <p className="eyebrow mb-6" data-reveal>Hansung is for you</p>
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <h2 id="places-title" className="h-display text-[clamp(2.4rem,5vw,4.8rem)]" data-reveal>당신을 위한 자리가<br />있습니다.</h2>
          <Link href="/ministries/" className="pill pill-line" data-reveal>모든 부서 보기 <ArrowUpRight /></Link>
        </div>
        <ul className="grid gap-5 md:grid-cols-3">
          {places.map((x) => {
            const inner = (
              <>
                <div className="aspect-[4/3] overflow-hidden border-b border-ink bg-ink">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={x.img} alt="" loading="lazy" className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0" />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <p className="eyebrow mb-4">{x.en}</p>
                  <h3 className="h-section text-[clamp(1.8rem,3vw,2.6rem)]">{x.t}</h3>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-charcoal">{x.d}</p>
                  <span className="mt-8 flex items-center justify-between border-t border-ink pt-4 text-[13px] font-bold">{x.cta}<span className="text-xl transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true">↗</span></span>
                </div>
              </>
            );
            const cls = "group flex h-full flex-col border border-ink bg-white transition-colors hover:bg-orange-light";
            return (
              <li key={x.t} data-reveal>
                {x.ext ? <a href={x.h} target="_blank" rel="noopener" className={cls}>{inner}</a> : <Link href={x.h} className={cls}>{inner}</Link>}
              </li>
            );
          })}
        </ul>
      </section>

      {/* 프로세스 — 처음 오신 분의 네 걸음, 스크롤하면 카드가 차곡차곡 쌓인다 */}
      <section className="mx-auto max-w-[1280px] px-6 pt-24 sm:px-8 md:pt-32" aria-labelledby="steps-title">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="eyebrow mb-6" data-reveal>Your first steps</p>
            <h2 id="steps-title" className="h-display text-[clamp(2.4rem,5vw,4.8rem)]" data-reveal>처음 오신 분의<br />네 걸음.</h2>
            <p className="mt-6 max-w-md text-lg text-slate" data-reveal>예배에 한 번 오시는 것부터 시작입니다. 다음 걸음은 저희가 함께하겠습니다.</p>
          </div>
          <ol className="space-y-6 pb-8">
            {steps.map((st, i) => (
              <li key={st.n} className={`sticky rounded-none border-2 border-ink p-8 sm:p-10 ${st.c}`} style={{ top: `${110 + i * 22}px` }}>
                <div className="flex items-start justify-between gap-6">
                  <span className="text-[clamp(3rem,6vw,5rem)] font-bold leading-none tracking-[-0.04em]" style={{ fontFamily: "var(--font-display)" }}>{st.n}</span>
                  <Link href={st.h} className="pill pill-ink !py-2.5 text-sm">{st.cta} <ArrowUpRight size={15} /></Link>
                </div>
                <h3 className="h-section mt-10 text-[clamp(1.7rem,3vw,2.4rem)]">{st.t}</h3>
                <p className="mt-3 max-w-xl text-lg leading-relaxed text-charcoal">{st.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Action — 새가족 */}
      <section className="mx-auto max-w-[1280px] px-6 py-24 sm:px-8 md:py-32">
        <div className="relative overflow-hidden rounded-none border-2 border-ink bg-orange-light px-7 py-20 text-ink sm:px-16 md:py-28" data-scale>
          <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full border border-ink/25" aria-hidden="true" />
          <div className="absolute -right-6 top-24 h-64 w-64 rounded-full border border-ink/20" aria-hidden="true" />
          <p className="eyebrow mb-8 [&::before]:bg-ink">New here?</p>
          <h2 className="h-display max-w-5xl text-[clamp(2.6rem,6.4vw,6.4rem)]">이번 주일,<br />한성교회에서 만나요.</h2>
          <p className="mt-8 max-w-xl text-lg text-ink/75">설문지를 작성하시면 가등록이 되고, 교역자의 등록 심방 후 등록이 확정됩니다. 새가족부에서 안내 전화를 드립니다.</p>
          <div className="mt-12 flex flex-wrap gap-3">
            <Link href="/newcomer/" className="pill pill-ink">온라인 새가족 등록 <ArrowUpRight /></Link>
            <Link href="/location/" className="pill pill-line">오시는 길</Link>
          </div>
        </div>
      </section>
    </>
  );
}
