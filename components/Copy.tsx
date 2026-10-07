"use client";
import { useState } from "react";

export default function Copy({ text, label = "복사", className = "" }: { text: string; label?: string; className?: string }) {
  const [done, setDone] = useState(false);
  return (
    <button type="button" className={className} aria-live="polite"
      onClick={async () => {
        try { await navigator.clipboard.writeText(text); } catch { window.prompt("복사해 주세요", text); }
        setDone(true); setTimeout(() => setDone(false), 1800);
      }}>
      {done ? "복사됨" : label}
    </button>
  );
}
