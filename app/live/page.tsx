import Link from "next/link";
import PageHero, { Wrap } from "@/components/PageHero";
import { ArrowUpRight, Play } from "@/components/Icons";
import { board, site, niceTitle, fmtDate, href, BOARDS } from "@/lib/data";
import InlinePlayer from "@/components/InlinePlayer";

export const metadata = { title: "예배생방송" };

export default function Page() {
  const l = site().live;
  const recent = board("sunday").posts.find((p) => p.youtube[0])!;
  const sundayMeta = BOARDS.find((b) => b.slug === "sunday")!;
  const t = niceTitle(recent, sundayMeta);
  const notes = l.lines.filter((x) => !/^유튜브생방송$|^한성교회 인터넷생방송$/.test(x)).map((x) => x.replace(/^"|"$/g, ""));
  return (
    <>
      <PageHero en="Live" ghost="LIVE" crumbs={[["예배생방송", "/live/"]]}
        title={<>어디에 있든,<br />함께 예배해요.</>} desc={notes[0]}>
        <a href={l.youtube} target="_blank" rel="noopener" className="pill pill-orange !px-7 !py-4 text-lg"><span className="h-2.5 w-2.5 animate-pulse rounded-full bg-white" />유튜브 생방송 보기 <ArrowUpRight /></a>
      </PageHero>
      <Wrap className="grid gap-12 pb-32 lg:grid-cols-[1.2fr_0.8fr]">
        <div data-reveal>
          <InlinePlayer id={recent.youtube[0]} title={t.title} badge="지난 주일예배 다시 보기" />
          <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-slate">주일설교 · {fmtDate(recent.date)}{recent.bible && ` · ${recent.bible}`}</p>
              <p className="mt-1 text-2xl font-black tracking-[-0.03em]">{t.title}</p>
              <p className="mt-1 text-slate">{t.who}</p>
            </div>
            <Link href={href(sundayMeta, recent.seq)} className="pill pill-line !py-2.5 text-sm">설교 정보 <ArrowUpRight size={14} /></Link>
          </div>
        </div>
        <ul className="space-y-4">
          {notes.slice(1).map((n) => <li key={n} className="rounded-none border border-dust bg-white p-6 leading-relaxed" data-reveal>{n}</li>)}
          <li data-reveal><Link href="/tv/" className="pill pill-ink">지난 예배 다시보기 <ArrowUpRight /></Link></li>
        </ul>
      </Wrap>
    </>
  );
}
