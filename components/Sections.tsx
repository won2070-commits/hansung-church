import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero, { Wrap } from "./PageHero";
import BoardList, { type Item } from "./BoardList";
import { ArrowUpRight, Download, Play } from "./Icons";
import { BOARDS, board, boardsOf, cover, fmtDate, href, niceTitle, asset, ytThumb, type Section, type BoardMeta, type Post } from "@/lib/data";
import { bookOf } from "@/lib/bible";

const toItem = (p: Post, m: BoardMeta): Item => {
  const t = niceTitle(p, m);
  return { seq: p.seq, title: t.title, who: t.who, date: fmtDate(p.date), bible: p.bible, cover: cover(p), href: href(m, p.seq), video: !!p.youtube[0], book: bookOf(p.bible, p.title), board: m.name };
};

const SECTION = {
  tv: { en: "Hansung TV", title: <>말씀과 찬양,<br />언제 어디서나.</>, desc: "주일설교부터 수요·금요·청년·화요전도예배, 그리고 찬양까지. 한성교회의 예배를 다시 만나보세요.", ghost: "WATCH" },
  life: { en: "Hansung life", title: <>예배에서<br />일상으로.</>, desc: "공지사항, 주보, 사진과 은혜의 나눔. 한성교회 공동체의 오늘을 기록합니다.", ghost: "LIFE" },
};

export function hubParams(section: Section) {
  return boardsOf(section).map((b) => ({ slug: b.slug }));
}
export function postParams(section: Section) {
  return boardsOf(section).flatMap((b) => board(b.slug).posts.map((p) => ({ slug: b.slug, seq: String(p.seq) })));
}

// Elevation식: 맨 위 최신 설교 배너
function LatestBanner() {
  const m = BOARDS.find((b) => b.slug === "sunday")!;
  const p = board("sunday").posts.find((x) => x.youtube[0])!;
  const t = niceTitle(p, m);
  return (
    <section className="px-3 pt-24 sm:px-6 sm:pt-28" aria-label="최신 주일설교">
      <div className="relative mx-auto aspect-[4/5] max-w-[1440px] overflow-hidden border border-ink bg-ink text-canvas sm:aspect-[21/9]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={ytThumb(p.youtube[0], "maxres")} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-6 p-6 sm:p-10">
          <div>
            <p className="eyebrow mb-4 text-canvas/80">Watch the latest sermon</p>
            <p className="h-display text-[clamp(2.2rem,5vw,4.6rem)]">{t.title}</p>
            <p className="mt-3 text-canvas/75">{[p.bible, t.who, fmtDate(p.date)].filter(Boolean).join(" · ")}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href={href(m, p.seq)} className="pill bg-orange-light text-ink hover:bg-white"><Play size={16} /> 설교 보기</Link>
            <a href="https://www.youtube.com/channel/UCwg1mSaYYvY4zzxyCnjgo7A" target="_blank" rel="noopener" className="pill pill-line text-canvas">예배 전체 · 유튜브 <ArrowUpRight size={15} /></a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Hub({ section }: { section: Section }) {
  const s = SECTION[section];
  const sermons = section === "tv"
    ? boardsOf("tv").filter((m) => !m.slug.startsWith("praise") && m.slug !== "choir").flatMap((m) => board(m.slug).posts.map((p) => toItem(p, m))).sort((a, b) => b.date.localeCompare(a.date))
    : [];
  return (
    <>
      {section === "tv" && <LatestBanner />}
      <PageHero en={s.en} title={s.title} desc={s.desc} ghost={s.ghost} compact={section === "tv"} crumbs={[[section === "tv" ? "한성TV" : "한성LIFE", `/${section}/`]]}>
        <div className="flex flex-wrap gap-2">
          {boardsOf(section).map((b) => <Link key={b.slug} href={href(b)} className="rounded-full border border-ink/15 bg-white px-4 py-2 text-sm font-bold hover:border-ink">{b.name}</Link>)}
        </div>
      </PageHero>
      {section === "tv" && (
        <Wrap className="pb-24">
          <div className="mb-10 border-t-2 border-ink pt-10">
            <p className="eyebrow mb-4">Find a sermon</p>
            <h2 className="h-section text-[clamp(1.9rem,3.4vw,3rem)]">지금 내 시간에 필요한 말씀을 찾아보세요.</h2>
            <p className="mt-3 text-slate">예배, 설교자, 연도, 성경으로 골라 볼 수 있습니다. 2025년 이후 설교 {sermons.length}편.</p>
          </div>
          <BoardList items={sermons} kind="video" filters />
        </Wrap>
      )}
      <Wrap className="space-y-24 pb-32">
        {boardsOf(section).map((m) => {
          const b = board(m.slug);
          const items = b.posts.slice(0, m.kind === "video" ? 3 : 4);
          return (
            <section key={m.slug} aria-labelledby={`h-${m.slug}`}>
              <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-t border-dust pt-8" data-reveal>
                <div>
                  <h2 id={`h-${m.slug}`} className="h-section text-[clamp(1.8rem,3vw,2.6rem)]">{m.name}</h2>
                  <p className="mt-2 text-slate">{m.blurb} · {b.posts.length}건</p>
                </div>
                <Link href={href(m)} className="pill pill-line !py-2.5 text-sm">전체 보기 <ArrowUpRight size={15} /></Link>
              </div>
              <ul className={`grid gap-5 sm:grid-cols-2 ${m.kind === "video" ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
                {items.map((p) => {
                  const t = niceTitle(p, m); const c = cover(p);
                  return (
                    <li key={p.seq} data-reveal>
                      <Link href={href(m, p.seq)} className="group block">
                        {m.kind !== "text" && (
                          <div className={`relative mb-4 overflow-hidden rounded-none bg-ghost ${m.kind === "video" ? "aspect-video" : "aspect-[4/5]"}`}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            {c && <img src={c} alt="" loading="lazy" className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${c.includes("ytimg") ? "" : ""}`} />}
                            {p.youtube[0] && <span className="absolute bottom-4 left-4 grid h-11 w-11 place-items-center rounded-full bg-white/95 group-hover:bg-yellow"><Play size={16} /></span>}
                          </div>
                        )}
                        <p className="text-[13px] text-slate" style={{ fontFamily: "var(--font-display)" }}>{fmtDate(p.date)}</p>
                        <p className={`mt-1 line-clamp-2 font-bold leading-snug tracking-[-0.03em] group-hover:text-orange ${m.kind === "text" ? "rounded-none border border-dust bg-white p-6 text-lg" : "text-lg"}`}>{t.title}</p>
                        {t.who && <p className="mt-1 text-sm text-slate">{t.who}</p>}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </Wrap>
    </>
  );
}

export function BoardPage({ section, slug }: { section: Section; slug: string }) {
  const m = BOARDS.find((b) => b.slug === slug && b.section === section);
  if (!m) notFound();
  const b = board(slug);
  const items: Item[] = b.posts.map((p) => toItem(p, m));
  return (
    <>
      <PageHero en={m.section === "tv" ? "Hansung TV" : "Hansung life"} title={m.name} desc={m.blurb}
        crumbs={[[section === "tv" ? "한성TV" : "한성LIFE", `/${section}/`], [m.name, href(m)]]}>
        <div className="flex flex-wrap gap-2">
          {boardsOf(section).map((x) => (
            <Link key={x.slug} href={href(x)} aria-current={x.slug === slug ? "page" : undefined}
              className={`rounded-full px-4 py-2 text-sm font-bold ${x.slug === slug ? "bg-ink text-canvas" : "border border-ink/15 bg-white hover:border-ink"}`}>{x.name}</Link>
          ))}
        </div>
      </PageHero>
      <Wrap className="pb-32"><BoardList items={items} kind={m.kind} filters={m.section === "tv"} /></Wrap>
    </>
  );
}

export function PostPage({ section, slug, seq }: { section: Section; slug: string; seq: string }) {
  const m = BOARDS.find((b) => b.slug === slug && b.section === section);
  if (!m) notFound();
  const posts = board(slug).posts;
  const i = posts.findIndex((p) => String(p.seq) === seq);
  if (i < 0) notFound();
  const p = posts[i]; const t = niceTitle(p, m);
  const newer = posts[i - 1]; const older = posts[i + 1];
  const official = `https://www.hansungchurch.com/EZ/rb/view.asp?seq=${p.seq}&BoardModule=${m.section === "tv" ? "Media" : "Board"}&tbcode=${m.code}`;
  return (
    <article className="pb-32">
      <header className="mx-auto max-w-5xl px-6 pb-12 pt-36 sm:px-8 sm:pt-44">
        <nav aria-label="현재 위치" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate">
          <Link href="/" className="hover:text-orange">홈</Link><span className="text-dust">/</span>
          <Link href={`/${section}/`} className="hover:text-orange">{section === "tv" ? "한성TV" : "한성LIFE"}</Link><span className="text-dust">/</span>
          <Link href={href(m)} className="hover:text-orange">{m.name}</Link>
        </nav>
        <p className="eyebrow mb-5">{m.name}</p>
        <h1 className="h-display text-[clamp(2.1rem,4.6vw,4rem)]">{t.title}</h1>
        <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-[15px] text-slate">
          {p.bible && <div className="flex gap-2"><dt className="font-bold text-ink">본문</dt><dd>{p.bible}</dd></div>}
          {t.who && <div className="flex gap-2"><dt className="font-bold text-ink">{m.slug.startsWith("praise") || m.slug === "choir" ? "인도" : "설교"}</dt><dd>{t.who}</dd></div>}
          <div className="flex gap-2"><dt className="font-bold text-ink">날짜</dt><dd style={{ fontFamily: "var(--font-display)" }}>{fmtDate(p.date)}</dd></div>
        </dl>
      </header>

      {p.youtube.map((id) => (
        <div key={id} className="mx-auto mb-10 max-w-6xl px-3 sm:px-6">
          <div className="aspect-video overflow-hidden rounded-none bg-ink ">
            <iframe className="h-full w-full" src={`https://www.youtube-nocookie.com/embed/${id}?rel=0`} title={t.title} loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
          </div>
        </div>
      ))}

      <div className="mx-auto max-w-3xl px-6 sm:px-8">
        {p.body && <div className="prose-post" dangerouslySetInnerHTML={{ __html: p.body }} />}
        {!p.body && !p.youtube[0] && <p className="rounded-none border border-dust bg-white p-8 text-slate">이 글은 영상 또는 본문이 옮겨지지 않았습니다. <a className="text-orange underline" href={official} target="_blank" rel="noopener">공식 게시판에서 보기</a></p>}

        {p.files.length > 0 && (
          <div className="mt-12 rounded-none border border-dust bg-white p-6">
            <p className="eyebrow mb-4">첨부파일</p>
            <ul className="space-y-2">
              {p.files.map((f) => (
                <li key={f.url}><a href={asset(f.url)} download={f.name} className="flex items-center justify-between gap-4 rounded-full bg-canvas px-5 py-3 hover:bg-ghost"><span className="truncate">{f.name}</span><Download /></a></li>
              ))}
            </ul>
          </div>
        )}

        <nav aria-label="다른 글" className="mt-16 grid gap-3 border-t border-dust pt-10 sm:grid-cols-2">
          {older ? <Link href={href(m, older.seq)} className="rounded-none border border-dust bg-white p-6 hover:bg-lifted"><span className="text-sm text-slate">이전 글</span><span className="mt-1 line-clamp-2 block font-bold">{niceTitle(older, m).title}</span></Link> : <span />}
          {newer ? <Link href={href(m, newer.seq)} className="rounded-none border border-dust bg-white p-6 text-right hover:bg-lifted"><span className="text-sm text-slate">다음 글</span><span className="mt-1 line-clamp-2 block font-bold">{niceTitle(newer, m).title}</span></Link> : <span />}
        </nav>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <Link href={href(m)} className="pill pill-ink">{m.name} 목록</Link>
          <a href={official} target="_blank" rel="noopener" className="text-sm text-slate hover:text-orange">공식 게시판 원문 ↗</a>
        </div>
      </div>
    </article>
  );
}
