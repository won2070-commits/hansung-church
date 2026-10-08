import { asset } from "@/lib/boards";

// 한성교회 공식 로고(단색 블랙판, 원본: 한성교회+그릿시냇가+제이콥스래더logo.ai). 어두운 바탕에선 같은 모양의 흰색판.
export default function Logo({ light = false, className = "h-9" }: { light?: boolean; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={asset(light ? "brand/hansung-logo-white.svg" : "brand/hansung-logo.svg")} alt="한성교회 HANSUNG PRESBYTERIAN CHURCH"
      width={127} height={36} className={`w-auto ${className}`} />
  );
}
