import Link from "next/link";
import PageHero, { Wrap } from "@/components/PageHero";
import { ArrowUpRight } from "@/components/Icons";
import { asset, site } from "@/lib/data";
import { MINISTRIES } from "@/lib/ministries";

export const metadata = { title: "부서 소개" };

export default function Page() {
  const s = site();
  const rows = Object.values(s.worship).flat();
  const staff = s.pastors.flatMap((g) => g.members).filter((m) => !/원로목사|담임목사/.test(m.name));
  return (
    <>
      <PageHero en="Ministries" ghost="TOGETHER" crumbs={[["교회안내", "/about/"], ["부서 소개", "/ministries/"]]}
        title={<>모든 세대,<br /><span className="hl">모든 자리</span>.</>}
        desc="한성교회에는 나이와 삶의 자리에 맞는 예배와 공동체가 있습니다. 관심 있는 부서를 골라 보세요." />

      {/* Elevation식 탭: 화면 위에 붙는 부서 바로가기 */}
      <nav aria-label="부서 바로가기" className="sticky top-[84px] z-20 border-y border-ink bg-canvas/95 backdrop-blur sm:top-[92px]">
        <ul className="mx-auto flex max-w-[1280px] gap-1 overflow-x-auto px-6 py-2 [scrollbar-width:none] sm:px-8 [&::-webkit-scrollbar]:hidden">
          {MINISTRIES.map((m) => (
            <li key={m.id}><a href={`#${m.id}`} className="block whitespace-nowrap px-4 py-2 text-[14px] font-bold hover:bg-orange-light">{m.name}</a></li>
          ))}
        </ul>
      </nav>

      <Wrap className="space-y-28 py-24">
        {MINISTRIES.map((m, i) => {
          const w = rows.filter(([n]) => m.worship(n));
          const people = staff.filter((p) => m.roles.some((r) => p.role.includes(r)));
          return (
            <section key={m.id} id={m.id} className="scroll-mt-40" aria-labelledby={`${m.id}-t`}>
              {/* Elevation의 부서 배너 → 도도식 대형 타이포 블록 */}
              <div className={`relative mb-12 overflow-hidden border-2 border-ink px-6 py-12 sm:px-10 sm:py-16 ${i % 2 ? "bg-ink text-canvas" : "bg-orange-light text-ink"}`} data-reveal>
                <p className="pointer-events-none absolute -bottom-6 -right-2 select-none whitespace-nowrap text-[clamp(4rem,13vw,11rem)] leading-none tracking-[-0.06em] opacity-15" style={{ fontFamily: "var(--font-display)" }} aria-hidden="true">{m.en.toUpperCase()}</p>
                <p className={`eyebrow mb-5 ${i % 2 ? "" : "[&::before]:bg-ink"}`}>{String(i + 1).padStart(2, "0")} · {m.en}</p>
                <h2 id={`${m.id}-t`} className="h-display text-[clamp(2.4rem,6vw,5.4rem)]">{m.name}</h2>
                <p className={`mt-5 max-w-2xl text-lg leading-relaxed ${i % 2 ? "text-canvas/80" : "text-ink/80"}`}>{m.tagline}</p>
              </div>

              <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
                <div data-reveal>
                  <h3 className="mb-4 text-[12px] font-bold uppercase tracking-[0.18em]">예배 시간과 장소</h3>
                  {w.length ? (
                    <table className="w-full border-t-2 border-ink text-left">
                      <tbody>
                        {w.map(([n, t, p]) => (
                          <tr key={n} className="border-b border-ink/30">
                            <th scope="row" className="py-4 pr-3 font-bold">{n}</th>
                            <td className="py-4 pr-3 font-bold tabular-nums">{t}</td>
                            <td className="hidden py-4 text-slate sm:table-cell">{p}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : <p className="border-t-2 border-ink pt-4 text-slate">부서 모임 안내는 교회 사무실(02-2603-7200)로 문의해 주세요.</p>}
                  <div className="mt-8 flex flex-wrap gap-2">
                    {m.links.map(([t, h]) => h.startsWith("http")
                      ? <a key={h} href={h} target="_blank" rel="noopener" className="pill pill-line !py-2.5 text-[13px]">{t} <ArrowUpRight size={14} /></a>
                      : <Link key={h} href={h} className="pill pill-line !py-2.5 text-[13px]">{t} <ArrowUpRight size={14} /></Link>)}
                  </div>
                </div>
                {people.length > 0 && (
                  <div data-reveal>
                    <h3 className="mb-4 text-[12px] font-bold uppercase tracking-[0.18em]">섬기는 교역자</h3>
                    <ul className="grid grid-cols-2 gap-4 border-t-2 border-ink pt-6 sm:grid-cols-3">
                      {people.map((p) => (
                        <li key={p.name + p.photo} className="flex items-center gap-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={asset(p.photo)} alt="" loading="lazy" className="h-14 w-14 shrink-0 rounded-full border border-ink object-cover object-top" />
                          <span className="min-w-0"><span className="block truncate font-bold">{p.name}</span><span className="block truncate text-[12px] text-slate">{p.role}</span></span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </Wrap>
    </>
  );
}
