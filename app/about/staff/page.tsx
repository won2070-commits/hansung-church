import Link from "next/link";
import PageHero, { Wrap } from "@/components/PageHero";
import { asset, BOARDS, site, href, type Person } from "@/lib/data";

export const metadata = { title: "섬기는이들" };

function Card({ m, big }: { m: Person; big?: boolean }) {
  const b = m.sermons && BOARDS.find((x) => x.code === m.sermons!.board);
  const plain = m.name.replace(/\s*(원로목사|담임목사|목사|강도사|전도사|간사)$/, "");
  return (
    <li className="group" data-reveal>
      <div className={`mx-auto aspect-square overflow-hidden rounded-full bg-ghost ${big ? "w-[min(70vw,280px)]" : "w-full max-w-[220px]"}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset(m.photo)} alt={m.name} loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
      </div>
      <div className="mt-5 text-center">
        <p className={`font-semibold tracking-[-0.03em] ${big ? "text-2xl" : "text-lg"}`}>{m.name}</p>
        <p className="mt-1 text-sm text-slate">{m.role}</p>
        {m.email && <a href={`mailto:${m.email}`} className="mt-1 block truncate text-[13px] text-slate/80 hover:text-orange" style={{ fontFamily: "var(--font-display)" }}>{m.email}</a>}
        {b && <Link href={`${href(b)}?q=${encodeURIComponent(plain)}`} className="mt-3 inline-flex rounded-full border border-ink/15 px-3.5 py-1.5 text-[13px] font-semibold hover:border-orange hover:text-orange">설교 영상</Link>}
      </div>
    </li>
  );
}

export default function Page() {
  const s = site();
  return (
    <>
      <PageHero en="Our team" ghost="TEAM" crumbs={[["교회안내", "/about/"], ["섬기는이들", "/about/staff/"]]}
        title={<>함께 섬기는<br />사람들.</>} desc="교역자와 청지기가 한 몸이 되어 한성교회를 섬기고 있습니다." />
      <Wrap className="space-y-28 pb-40">
        {[...s.pastors, ...s.stewards.map((g) => ({ ...g, group: "청지기" }))].map((g, gi) => (
          <section key={g.group} aria-labelledby={`g${gi}`}>
            <h2 id={`g${gi}`} className="h-section mb-12 border-t border-dust pt-8 text-[clamp(1.6rem,2.6vw,2.2rem)]" data-reveal>{g.group}</h2>
            <ul className={`grid gap-x-6 gap-y-14 ${gi === 0 ? "sm:grid-cols-2 lg:mx-auto lg:max-w-3xl" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"}`}>
              {g.members.map((m) => <Card key={m.name + m.photo} m={m} big={gi === 0} />)}
            </ul>
          </section>
        ))}
      </Wrap>
    </>
  );
}
