"use client";
import { useState } from "react";
import { Play } from "./Icons";

// 썸네일을 누르면 그 자리에서 유튜브 영상으로 바뀌어 바로 재생된다(다른 페이지로 나가지 않음).
export default function InlinePlayer({ id, title, badge }: { id: string; title: string; badge?: string }) {
  const [on, setOn] = useState(false);
  return (
    <div className="relative aspect-video overflow-hidden border border-ink bg-ink">
      {on ? (
        <iframe className="absolute inset-0 h-full w-full" src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`} title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
      ) : (
        <button type="button" onClick={() => setOn(true)} aria-label={`${title} 재생`} className="group absolute inset-0 block h-full w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`} alt="" className="h-full w-full object-cover opacity-75 transition-transform duration-700 group-hover:scale-105" />
          <span className="absolute inset-0 grid place-items-center">
            <span className="grid h-24 w-24 place-items-center rounded-full bg-yellow text-ink transition-transform group-hover:scale-110"><Play size={34} /></span>
          </span>
          {badge && <span className="absolute left-6 top-6 bg-white px-4 py-1.5 text-sm font-bold text-ink">{badge}</span>}
        </button>
      )}
    </div>
  );
}
