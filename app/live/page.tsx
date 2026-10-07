import Link from "next/link";
import PageHero, { Wrap } from "@/components/PageHero";
import { ArrowUpRight, Play } from "@/components/Icons";
import { board, site, ytThumb } from "@/lib/data";

export const metadata = { title: "예배생방송" };

export default function Page() {
  const l = site().live;
  const recent = board("sunday").posts.find((p) => p.youtube[0])!;
  const notes = l.lines.filter((x) => !/^유튜브생방송$|^한성교회 인터넷생방송$/.test(x)).map((x) => x.replace(/^"|"$/g, ""));
  return (
    <>
      <PageHero en="Live" ghost="LIVE" crumbs={[["예배생방송", "/live/"]]}
        title={<>어디에 있든,<br />함께 예배해요.</>} desc={notes[0]}>
        <a href={l.youtube} target="_blank" rel="noopener" className="pill pill-orange !px-7 !py-4 text-lg"><span className="h-2.5 w-2.5 animate-pulse rounded-full bg-white" />유튜브 생방송 보기 <ArrowUpRight /></a>
      </PageHero>
      <Wrap className="grid gap-12 pb-40 lg:grid-cols-[1.2fr_0.8fr]">
        <a href={l.youtube} target="_blank" rel="noopener" className="group relative block aspect-video overflow-hidden rounded-[40px] bg-ink" data-reveal>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ytThumb(recent.youtube[0], "maxres")} alt="" className="h-full w-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-105" />
          <span className="absolute inset-0 grid place-items-center"><span className="grid h-24 w-24 place-items-center rounded-full bg-orange text-white transition-transform group-hover:scale-110"><Play size={34} /></span></span>
          <span className="absolute left-6 top-6 rounded-full bg-white px-4 py-1.5 text-sm font-semibold">한성교회 YouTube</span>
        </a>
        <ul className="space-y-4">
          {notes.slice(1).map((n) => <li key={n} className="rounded-[24px] bg-white p-6 leading-relaxed" data-reveal>{n}</li>)}
          <li data-reveal><Link href="/tv/" className="pill pill-ink">지난 예배 다시보기 <ArrowUpRight /></Link></li>
        </ul>
      </Wrap>
    </>
  );
}
