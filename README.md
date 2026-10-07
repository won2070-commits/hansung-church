# 한성교회 홈페이지 (전면 개편판)

공식 홈페이지 https://www.hansungchurch.com 의 자료를 옮겨 새 디자인으로 다시 만든 Next.js 정적 사이트.
기획·레퍼런스·디자인 규칙은 [BRIEF.md](BRIEF.md)에 있다.

- 배포 주소(시안): https://won2070-commits.github.io/hansung-church/
- `main`에 push하면 GitHub Actions가 빌드해 자동 배포한다(`.github/workflows/deploy.yml`).

## 명령

| 할 일 | 명령 |
|---|---|
| 미리보기 | `npm run dev` → http://localhost:5225 |
| 공식 사이트에서 자료 다시 가져오기 | `npm run scrape` (게시판 수집 → 안내 페이지 추출 → 사진 WebP 축소) |
| GitHub Pages용 빌드 | `npm run build:pages` → `out/` |
| 공식 도메인용 빌드 | `npm run build` → `out/` 폴더를 웹서버 루트에 올린다 |

## 구조

- `app/` 페이지: 홈, `about`(인사말·섬기는이들), `worship`, `giving`, `location`, `newcomer`, `live`, `happy`(행축ON), `tv/[게시판]/[글]`, `life/[게시판]/[글]`
- `data/*.json` 수집 자료(게시판별 글, `site.json`은 안내 페이지)
- `public/media/` 게시물 사진·첨부(WebP 축소본). 원본은 `../한성교회홈페이지_원본미디어/`
- `tools/` 수집기(`scrape.py`, `extract_static.py`, `shrink.py`)
- `_v1/` 1차 시안(GPT 코워크 작업분) 보관

## 옮긴 범위 (2026-10-07 수집)

- 안내 페이지 전부: 담임목사 인사말, 섬기는이들(교역자·청지기 사진 포함), 예배안내, 온라인헌금, 오시는길, 새가족 등록, 예배생방송, 행축ON
- 게시판 18개의 2025-01-01 이후 글 전부(멈춘 게시판은 최근 20건): 설교·찬양 영상, 공지, 사진, 주보, 하키TOPIC, 가정예배, 특새, 갤러리H
- 그 이전 글은 각 글 하단 "공식 게시판 원문" 링크와 공식 사이트에 남아 있다.
- 로그인·회원가입·성경필사 같은 서버 기능은 옮기지 않았다(정적 사이트).
