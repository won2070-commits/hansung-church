import Link from "next/link";
import PageHero, { Wrap } from "@/components/PageHero";
import { ArrowUpRight } from "@/components/Icons";
import { asset, site } from "@/lib/data";

export const metadata = { title: "예배안내" };
const EN: Record<string, string> = { "주일 예배": "Sunday", "교회학교": "Next generation", "주중 예배": "Weekdays" };

export default function Page() {
  const w = site().worship;
  return (
    <>
      <PageHero en="Worship" ghost="WORSHIP" crumbs={[["교회안내", "/about/"], ["예배안내", "/worship/"]]}
        title={<>함께 예배하는<br />시간과 자리.</>}
        desc="본당은 워십센터 2층 H-홀입니다. 방문 전 변경 사항은 교회 사무실(02-2603-7200)로 확인해 주세요.">
        <div className="flex flex-wrap gap-2">
          {Object.keys(w).map((k, i) => <a key={k} href={`#w${i}`} className="rounded-full border border-ink/15 bg-white px-4 py-2 text-sm font-medium hover:border-ink">{k}</a>)}
        </div>
      </PageHero>
      <Wrap className="pb-24">
        <div className="mb-24 aspect-[21/9] overflow-hidden rounded-[32px] bg-ink" data-scale>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("assets/home/hero-stage.webp")} alt="H-홀에서 드리는 주일예배" className="h-full w-full object-cover" />
        </div>
        <div className="space-y-24">
          {Object.entries(w).map(([k, rows], i) => (
            <section key={k} id={`w${i}`} className="grid scroll-mt-28 gap-10 lg:grid-cols-[0.6fr_1.4fr]">
              <div data-reveal>
                <p className="eyebrow mb-4">{EN[k]}</p>
                <h2 className="h-section text-[clamp(2rem,3.6vw,3.2rem)]">{k}</h2>
              </div>
              <table className="w-full text-left">
                <thead className="sr-only"><tr><th>예배</th><th>시간</th><th>장소</th></tr></thead>
                <tbody>
                  {rows.map(([n, t, p]) => (
                    <tr key={n} className="border-t border-dust last:border-b" data-reveal>
                      <th scope="row" className="py-5 pr-4 text-lg font-medium tracking-[-0.02em]">{n}</th>
                      <td className="py-5 pr-4 text-lg font-medium text-orange tabular-nums">{t}</td>
                      <td className="hidden py-5 text-slate sm:table-cell">{p}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          ))}
        </div>
      </Wrap>
      <Wrap className="pb-32">
        <div className="grid gap-4 sm:grid-cols-3">
          {[["예배 생방송", "/live/", "현장에 오지 못해도 함께"], ["처음 오셨나요?", "/newcomer/", "온라인 새가족 등록"], ["오시는 길", "/location/", "신정로13길 21"]].map(([t, h, d]) => (
            <Link key={h} href={h} className="group flex items-end justify-between rounded-[28px] border border-dust bg-white p-7 hover:bg-ink hover:text-canvas" data-reveal>
              <div><p className="text-sm text-slate group-hover:text-canvas/60">{d}</p><p className="mt-1 text-2xl font-medium tracking-[-0.03em]">{t}</p></div>
              <ArrowUpRight />
            </Link>
          ))}
        </div>
      </Wrap>
    </>
  );
}
