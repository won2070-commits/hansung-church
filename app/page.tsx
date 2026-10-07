import Link from "next/link";
import Hero from "@/components/home/Hero";
import WorshipAccordion from "@/components/home/WorshipAccordion";
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
      <Hero slides={["hero-stage", "hero-festival", "hero-child", "hero-table"].map(img)} news={news} />

      {/* Welcome Home — SOUL의 대형 환영 문구 + 인라인 사진 */}
      <section className="mx-auto max-w-[1280px] px-6 py-24 sm:px-8 md:py-32">
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
