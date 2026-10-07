import fs from "node:fs";
import path from "node:path";

export type Post = {
  seq: number; title: string; date: string; views: number;
  bible: string; preacher: string; youtube: string[];
  body: string; files: { name: string; url: string }[]; images: string[];
};
export type Board = { code: string; name: string; group: string; posts: Post[] };
import { BOARDS, asset, href, type BoardMeta, type Section } from "./boards";
export { BOARDS, asset, href, BASE, MENU, type BoardMeta, type Section } from "./boards";

const ROOT = process.cwd();
const cache = new Map<string, Board>();


function clean(p: Post): Post {
  let body = p.body
    .replace(/<img[^>]+src="https?:[^"]*"[^>]*>/g, "") // 원본에서도 깨진(404) 이미지
    .replace(/\son\w+="[^"]*"/g, "")
    .replace(/href="javascript:[^"]*"/g, 'href="#"')
    .replace(/src="(media\/[^"]+)"/g, (_, m) => `src="${asset(m)}" loading="lazy"`)
    .replace(/<a href="(?!https?:|#|mailto:)[^"]*"/g, '<a href="#"');
  if (!/<img/.test(body) && body.replace(/<[^>]+>|&nbsp;|\s/g, "") === "") body = "";
  return { ...p, body, images: p.images.filter((i) => i.startsWith("media/")) };
}

export function board(slug: string): BoardMeta & { posts: Post[] } {
  const meta = BOARDS.find((b) => b.slug === slug);
  if (!meta) throw new Error("unknown board " + slug);
  if (!cache.has(meta.code)) {
    const raw = JSON.parse(fs.readFileSync(path.join(ROOT, "data", meta.code + ".json"), "utf8")) as Board;
    cache.set(meta.code, { ...raw, posts: raw.posts.map(clean) });
  }
  return { ...meta, posts: cache.get(meta.code)!.posts };
}

export const boardsOf = (s: Section) => BOARDS.filter((b) => b.section === s && board(b.slug).posts.length);

export const ytThumb = (id: string, q: "hq" | "maxres" = "hq") => `https://i.ytimg.com/vi/${id}/${q}default.jpg`;

/** 목록·카드용 대표 이미지 */
export function cover(p: Post): string | null {
  if (p.youtube[0]) return ytThumb(p.youtube[0]);
  return p.images[0] ? asset(p.images[0]) : null;
}

/** "[한성교회 주일예배 도원욱 목사 설교] 죽을 때 산다_2026.10.4" → { title: "죽을 때 산다", who: "" } */
export function niceTitle(p: Post, meta: BoardMeta): { title: string; who: string } {
  let t = p.title.trim();
  if (meta.section !== "tv") return { title: t, who: "" };
  t = t.replace(/^\[[^\]]*\]\s*/, "").replace(/^\d{6}\s+/, "");
  const parts = t.split(/\s*_\s*/);
  let main = parts[0];
  const who = parts.slice(1).find((x) => /(목사|전도사|간사|찬양대|강도사|교수)/.test(x))?.replace(/\s*\(.*$/, "") ?? "";
  main = main.replace(/\s*\([^)]*\d+:\d+[^)]*\)\s*$/, "").trim();
  return { title: main || p.title, who: who || p.preacher };
}

export const fmtDate = (d: string) => d.replace(/-/g, ".");

export type Site = {
  greeting: { credentials: string[]; headline: string; paragraphs: string[] };
  pastors: { group: string; members: Person[] }[];
  stewards: { group: string; members: Person[] }[];
  worship: Record<string, [string, string, string][]>;
  giving: { note: string; accounts: { label: string; bank: string; no: string }[]; items: [string, string][]; banks: [string, string][] };
  directions: { lines: string[]; maps: string[] };
  newcomer: { lines: string[]; form: string; images: string[] };
  live: { lines: string[]; youtube: string };
  happy: { lines: string[]; links: [string, string][] };
  home: { slides: string[]; video: string };
  contact: { zip: string; address: string; denomination: string; tel: string; fax: string; email: string; sns: Record<string, string> };
};
export type Person = { name: string; role: string; email: string; photo: string; sermons: { board: string; code: string } | null };

let siteCache: Site | null = null;
export function site(): Site {
  return (siteCache ??= JSON.parse(fs.readFileSync(path.join(ROOT, "data", "site.json"), "utf8")));
}

/** 홈 화면용: 여러 게시판에서 최신 글을 날짜순으로 */
export function latest(slugs: string[], n: number) {
  return slugs
    .flatMap((s) => board(s).posts.slice(0, n).map((p) => ({ p, meta: BOARDS.find((b) => b.slug === s)! })))
    .sort((a, b) => b.p.date.localeCompare(a.p.date) || b.p.seq - a.p.seq)
    .slice(0, n);
}

