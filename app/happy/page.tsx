import PageHero, { Wrap } from "@/components/PageHero";
import { ArrowUpRight } from "@/components/Icons";
import { asset, site } from "@/lib/data";

export const metadata = { title: "행축ON" };

export default function Page() {
  const h = site().happy; const L = h.lines.map((x) => x.replace(/\s{2,}/g, " "));
  const intro = L.slice(0, 5);
  const pillars: { n: string; title: string; body: string[] }[] = [];
  L.slice(6).forEach((l) => {
    if (/^(첫|둘|셋)째,$/.test(l)) pillars.push({ n: l.replace(",", ""), title: "", body: [] });
    else if (pillars.length && !pillars.at(-1)!.title) pillars.at(-1)!.title = l;
    else pillars.at(-1)?.body.push(l);
  });
  return (
    <>
      <PageHero en="Happy people festival" ghost="HAPPY" crumbs={[["행축ON", "/happy/"]]}
        title={<>행복한 사람들의<br /><span className="text-orange">축제</span>, 행축.</>}
        desc={<>{intro[0]} {intro[1]}</>}>
        <div className="flex flex-wrap gap-2">
          {h.links.map(([t, u], i) => <a key={t} href={u} target="_blank" rel="noopener" className={`pill ${i ? "pill-line" : "pill-orange"}`}>{t} <ArrowUpRight /></a>)}
        </div>
      </PageHero>
      <Wrap className="pb-24">
        <div className="relative aspect-[21/9] overflow-hidden rounded-[40px] bg-ink" data-scale>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("assets/home/hero-festival.webp")} alt="행복한 사람들의 축제 현장" className="h-full w-full object-cover" />
        </div>
        <div className="mx-auto mt-24 max-w-4xl space-y-6 text-[clamp(1.3rem,2.2vw,1.9rem)] font-medium leading-[1.6] tracking-[-0.025em]">
          <p data-scrub>{intro.slice(2).join(" ")}</p>
        </div>
      </Wrap>
      <Wrap className="pb-40">
        <ol className="grid gap-4 lg:grid-cols-3">
          {pillars.map((p, i) => (
            <li key={p.n} className={`flex flex-col rounded-[40px] p-9 ${["bg-white", "bg-ink text-canvas", "bg-orange text-white"][i]}`} data-reveal>
              <p className="eyebrow mb-10 opacity-80">{p.n}</p>
              <h2 className="h-section mb-6 text-[clamp(1.7rem,2.6vw,2.3rem)]">{p.title}</h2>
              <div className="space-y-3 leading-relaxed opacity-85">{p.body.map((b) => <p key={b}>{b}</p>)}</div>
            </li>
          ))}
        </ol>
      </Wrap>
    </>
  );
}
