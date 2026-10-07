import PageHero, { Wrap } from "@/components/PageHero";
import Copy from "@/components/Copy";
import { asset, site } from "@/lib/data";

export const metadata = { title: "오시는길" };

export default function Page() {
  const s = site(); const c = s.contact; const L = s.directions.lines;
  const subway = L.slice(1, L.indexOf("버스 이용시 오시는 방법"));
  const bus: { kind: string; rows: string[] }[] = [];
  L.slice(L.indexOf("버스 이용시 오시는 방법") + 1).forEach((l) => (/버스$/.test(l) ? bus.push({ kind: l, rows: [] }) : bus.at(-1)?.rows.push(l)));
  const q = encodeURIComponent("한성교회 " + c.address);
  return (
    <>
      <PageHero en="Visit us" ghost="VISIT" crumbs={[["교회안내", "/about/"], ["오시는길", "/location/"]]}
        title={<>우리,<br />여기서 만나요.</>}
        desc={<><span className="font-medium text-ink">{c.address}</span> (우 {c.zip})<br />대표전화 {c.tel} · 팩스 {c.fax}</>}>
        <div className="flex flex-wrap gap-2">
          <a href={`https://map.kakao.com/link/search/${q}`} target="_blank" rel="noopener" className="pill pill-ink">카카오맵 ↗</a>
          <a href={`https://map.naver.com/p/search/${q}`} target="_blank" rel="noopener" className="pill pill-line">네이버 지도 ↗</a>
          <Copy text={`서울특별시 양천구 신정로13길 21 한성교회`} label="주소 복사" className="pill pill-line" />
          <a href={`tel:${c.tel}`} className="pill pill-line">전화 문의</a>
        </div>
      </PageHero>
      <Wrap className="pb-24">
        <div className="aspect-[4/3] overflow-hidden rounded-[32px] bg-ghost sm:aspect-[21/9]" data-reveal>
          <iframe title="한성교회 위치 지도" src={`https://maps.google.com/maps?q=${q}&z=16&output=embed`} className="h-full w-full grayscale-[35%]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </Wrap>
      <Wrap className="grid gap-16 pb-32 lg:grid-cols-2">
        <section data-reveal>
          <div className="mb-4 flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset(s.directions.maps[0])} alt="" className="h-12 w-12" />
            <p className="eyebrow">Subway</p>
          </div>
          <h2 className="h-section mb-8 text-[clamp(1.8rem,3vw,2.6rem)]">지하철로 오실 때</h2>
          <ul className="space-y-3">
            {subway.map((l) => {
              const [line, ...rest] = l.split(/\s{2,}/);
              return <li key={l} className="flex gap-4 rounded-[16px] border border-dust bg-white p-5"><span className="shrink-0 rounded-full bg-ink px-3 py-1 text-sm font-medium text-canvas">{line}</span><span className="leading-relaxed">{rest.join(" ")}</span></li>;
            })}
          </ul>
        </section>
        <section data-reveal>
          <div className="mb-4 flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset(s.directions.maps[1])} alt="" className="h-12 w-12" />
            <p className="eyebrow">Bus</p>
          </div>
          <h2 className="h-section mb-8 text-[clamp(1.8rem,3vw,2.6rem)]">버스로 오실 때</h2>
          <div className="space-y-8">
            {bus.map((b) => (
              <div key={b.kind}>
                <p className="mb-3 font-medium text-orange">{b.kind}</p>
                <ul className="divide-y divide-dust border-y border-dust">
                  {b.rows.map((r) => { const [stop, nums] = r.split(" - "); return <li key={r} className="flex justify-between gap-4 py-3"><span>{stop}</span><span className="text-right font-medium tabular-nums">{nums}</span></li>; })}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </Wrap>
    </>
  );
}
