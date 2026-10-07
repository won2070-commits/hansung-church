// 임시 워드마크: 오렌지 해(행복) + 한성교회. 공식 로고 파일이 오면 교체.
export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5 leading-none">
      <span className="relative grid h-9 w-9 place-items-center rounded-[9px] bg-ink text-[15px] font-bold text-orange-light" style={{ fontFamily: "var(--font-display)" }}>
        H
        <span className="absolute -right-1 -top-1 h-2.5 w-2.5 bg-orange-light ring-2 ring-ink" />
      </span>
      <span className="flex flex-col">
        <span className={`text-[17px] font-black tracking-[-0.05em] ${light ? "text-canvas" : "text-ink"}`}>한성교회</span>
        <span className={`mt-1 text-[8.5px] font-bold tracking-[0.18em] ${light ? "text-canvas/60" : "text-slate"}`} style={{ fontFamily: "var(--font-display)" }}>HANSUNG CHURCH</span>
      </span>
    </span>
  );
}
