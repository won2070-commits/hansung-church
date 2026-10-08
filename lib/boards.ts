// 클라이언트에서도 쓰는 순수 데이터(파일 읽기 없음)
export type Section = "tv" | "life";
export type BoardMeta = { slug: string; code: string; name: string; section: Section; kind: "video" | "photo" | "text"; blurb: string };

// URL 슬러그 ↔ 공식 게시판 코드. 순서가 메뉴 순서다.
export const BOARDS: BoardMeta[] = [
  { slug: "sunday", code: "worship01_1", name: "주일설교", section: "tv", kind: "video", blurb: "도원욱 담임목사의 주일예배 말씀" },
  { slug: "wednesday", code: "worship01_3", name: "수요예배", section: "tv", kind: "video", blurb: "HUG수요오전예배와 수요저녁예배" },
  { slug: "special", code: "worship01_4", name: "특별집회", section: "tv", kind: "video", blurb: "금요성령집회와 특별집회 말씀" },
  { slug: "youth", code: "worship01_5", name: "청년예배설교", section: "tv", kind: "video", blurb: "청년부 주일예배 말씀" },
  { slug: "tuesday", code: "worship01_7", name: "화요전도예배", section: "tv", kind: "video", blurb: "행복전도대와 함께하는 화요전도예배" },
  { slug: "friday", code: "worship01_2", name: "금요설교", section: "tv", kind: "video", blurb: "금요성령집회 지난 말씀" },
  { slug: "dawn", code: "special02", name: "특새설교", section: "tv", kind: "video", blurb: "특별새벽기도회 지난 말씀" },
  { slug: "praise-sunday", code: "worship02_1", name: "주일찬양", section: "tv", kind: "video", blurb: "주일예배 실황 찬양" },
  { slug: "praise-friday", code: "worship02_2", name: "금요찬양", section: "tv", kind: "video", blurb: "금요성령집회 찬양" },
  { slug: "choir", code: "worship02_3", name: "찬양대", section: "tv", kind: "video", blurb: "주일예배 찬양대 찬양" },
  { slug: "notice", code: "community01", name: "공지사항", section: "life", kind: "text", blurb: "교회의 새 소식과 안내" },
  { slug: "photo", code: "community02", name: "사진게시판", section: "life", kind: "photo", blurb: "행사와 일상의 순간들" },
  { slug: "bulletin", code: "intro04", name: "교회주보", section: "life", kind: "photo", blurb: "매주 발행하는 한성교회 주보" },
  { slug: "hakki", code: "community16", name: "하키TOPIC", section: "life", kind: "photo", blurb: "차세대 연합 주보" },
  { slug: "family", code: "community17", name: "가정예배", section: "life", kind: "photo", blurb: "말씀 한 상, 가정예배 순서지" },
  { slug: "dawn-sketch", code: "special04", name: "특새스케치", section: "life", kind: "photo", blurb: "특별새벽기도회 현장" },
  { slug: "dawn-grace", code: "special01", name: "특새은혜나눔", section: "life", kind: "text", blurb: "특별새벽기도회 은혜 나눔" },
  { slug: "gallery", code: "gallery01", name: "갤러리H", section: "life", kind: "photo", blurb: "교회 안 작은 미술관" },
];


export const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
/** public/ 아래 파일 경로에 basePath를 붙인다. 외부 URL은 그대로. */
export const asset = (p: string) => (/^https?:/.test(p) ? p : `${BASE}/${p.replace(/^\//, "")}`);
export const href = (meta: BoardMeta, seq?: number) => `/${meta.section}/${meta.slug}/${seq ? seq + "/" : ""}`;

export const MENU: { title: string; en: string; items: [string, string][] }[] = [
  { title: "교회안내", en: "About", items: [["담임목사 인사말", "/about/"], ["섬기는이들", "/about/staff/"], ["부서 소개", "/ministries/"], ["예배안내", "/worship/"], ["교회주보", "/life/bulletin/"], ["온라인헌금", "/giving/"], ["오시는길", "/location/"], ["새가족 등록", "/newcomer/"], ["갤러리H", "/life/gallery/"]] },
  { title: "한성TV", en: "Watch", items: BOARDS.filter((b) => b.section === "tv").map((b) => [b.name, href(b)] as [string, string]) },
  { title: "한성LIFE", en: "Life", items: BOARDS.filter((b) => b.section === "life" && !["bulletin", "gallery"].includes(b.slug)).map((b) => [b.name, href(b)] as [string, string]) },
  { title: "함께", en: "Together", items: [["예배생방송", "/live/"], ["행축ON", "/happy/"]] },
];
