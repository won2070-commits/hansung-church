"use client";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "../Icons";

const KEY = "hs-connect-dismissed";
const URL = "https://hansung-h-village.netlify.app/";

// VOUS Church의 "Connect with Us" 카드 → 한성교회 H-빌리지 안내. 히어로를 지나면 뜨고, 닫으면 다시 뜨지 않는다.
export default function ConnectToast() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let dismissed = false;
    try { dismissed = localStorage.getItem(KEY) === "1"; } catch {}
    if (dismissed) return;
    // 첫 화면(히어로)을 지나 내려왔을 때 한 번 띄운다
    const onScroll = () => { if (window.scrollY > window.innerHeight * 0.9) { setShow(true); window.removeEventListener("scroll", onScroll); } };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  const close = () => { setShow(false); try { localStorage.setItem(KEY, "1"); } catch {} };
  return (
    <aside aria-label="H-빌리지 안내" className="fixed bottom-20 right-3 z-30 w-[min(calc(100vw-24px),360px)] animate-[fadeUp_.6s_both] border border-ink bg-canvas p-5 shadow-[6px_6px_0_#090909] sm:bottom-24 sm:right-6">
      <button onClick={close} aria-label="안내 닫기" className="absolute right-3 top-3 grid h-8 w-8 place-items-center text-lg hover:bg-orange-light">×</button>
      <p className="eyebrow mb-3">Stay connected</p>
      <p className="pr-6 text-lg font-bold leading-snug tracking-[-0.03em]">한성교회의 모든 이야기를 한눈에, H-빌리지</p>
      <p className="mt-2 text-[14px] leading-relaxed text-charcoal">교회 소식, 다락방 교안, 담임목사님의 서재까지. 앱 설치 없이 휴대폰 홈 화면에 추가해 쓰면 됩니다.</p>
      <a href={URL} target="_blank" rel="noopener" onClick={close} className="pill pill-ink mt-4 !py-2.5 text-[13px]">H-빌리지 열기 <ArrowUpRight size={14} /></a>
    </aside>
  );
}
