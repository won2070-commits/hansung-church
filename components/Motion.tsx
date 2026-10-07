"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * 페이지마다 data 속성으로 모션을 건다.
 *  data-reveal          : 아래에서 떠오름(같은 부모 안에서 순차)
 *  data-scrub           : 단어 단위로 0.12 → 1 스크럽
 *  data-scale           : 들어올 때 0.86 → 1, 나갈 때 어두워짐
 *  data-pin="#target"   : 데스크톱에서 target 구간 동안 고정
 *  data-parallax="-12"  : 스크롤에 따라 y% 이동
 */
export default function Motion() {
  const path = usePathname();
  useEffect(() => {
    document.documentElement.classList.add("js");
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      if (reduce) { gsap.set(reveals, { opacity: 1 }); return; }
      ScrollTrigger.batch(reveals, {
        start: "top 88%",
        once: true,
        onEnter: (els) => gsap.fromTo(els, { opacity: 0, y: 48 }, { opacity: 1, y: 0, duration: 1.1, ease: "expo.out", stagger: 0.09 }),
      });
      gsap.utils.toArray<HTMLElement>("[data-scrub]").forEach((el) => {
        if (!el.dataset.split) {
          el.innerHTML = el.textContent!.split(/(\s+)/).map((w) => (/\s+/.test(w) ? w : `<span class="inline-block">${w}</span>`)).join("");
          el.dataset.split = "1";
        }
        gsap.fromTo(el.querySelectorAll("span"), { opacity: 0.12 }, { opacity: 1, stagger: 0.08, ease: "none", scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true } });
      });
      gsap.utils.toArray<HTMLElement>("[data-scale]").forEach((el) => {
        gsap.fromTo(el, { scale: 0.86, borderRadius: "0px" }, { scale: 1, borderRadius: "0px", ease: "none", scrollTrigger: { trigger: el, start: "top 95%", end: "top 35%", scrub: true } });
        gsap.to(el, { opacity: 0.35, ease: "none", scrollTrigger: { trigger: el, start: "bottom 40%", end: "bottom top", scrub: true } });
      });
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        gsap.to(el, { yPercent: Number(el.dataset.parallax), ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
      });
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        gsap.utils.toArray<HTMLElement>("[data-pin]").forEach((el) => {
          ScrollTrigger.create({ trigger: el.dataset.pin!, start: "top 120px", end: "bottom bottom", pin: el, pinSpacing: false });
        });
      });
    });
    const t = setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => { clearTimeout(t); ctx.revert(); };
  }, [path]);
  return null;
}
