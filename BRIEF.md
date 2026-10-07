# 한성교회 홈페이지 설명서 (BRIEF)

> 할 수 있는 일은 직접 하고, 확인까지 마친 뒤 결과만 보고한다.

## 1. 기술 스택
- **Next.js 16 (App Router) + TypeScript + Tailwind v4 + GSAP(ScrollTrigger)**, `output: "export"` 정적 사이트.
- 데이터는 빌드 때 `data/*.json`을 읽어 모든 페이지를 HTML로 미리 만든다. 서버·DB 없음.
- 배포: GitHub Pages(`npm run build:pages`, 하위경로 `/hansung-church`). 최종 목적지는 공식 도메인 hansungchurch.com (`npm run build`, 하위경로 없음).

## 2. 목적과 사용자
- 대한예수교장로회 한성교회(서울 양천구 신정로13길 21, 담임 도원욱 목사) 공식 홈페이지의 전면 개편.
- **처음 오는 사람**: 교회가 어떤 곳인지, 언제 어디서 예배하는지 30초 안에 안다.
- **기존 성도**: 이번 주 설교·찬양·주보·공지를 두 번 클릭 안에 찾는다.

## 3. 행동 목표 (가장 중요)
- 처음 온 사람이 **"이번 주일 예배 오기 → 온라인 새가족 등록"** 버튼을 누르게 만든다.
- 성도는 **설교 재생**과 **주보 열람**으로 바로 들어간다.

## 4. 레퍼런스 (구조·분위기만 참고, 이미지·코드 복제 금지)
| 역할 | 출처 | 가져온 것 |
|---|---|---|
| 레퍼런스 1 | SOUL Church (Awwwards Honorable Mention, Webflow) | 섹션 순서·글자 크기·분위기: 풀블리드 히어로 + 떠 있는 "소식" 카드, 대형 환영 문구, 미션 마퀴, 노이즈 질감 예배 섹션, 가치 마퀴, 하단 고정 예배시간 바 |
| 레퍼런스 2 | Passion City Church | 미디어·리더십 배치: 스타디움 라운드 히어로, 담임목사 소개, 설교 목록 |
| 스킨(getdesign) | **Miro DESIGN.md** (2026-10-07 교체, 이전: Mastercard) | 색·폰트·간격·질감만: 흰 캔버스, 검정 알약 CTA, 캐너리 옐로(로고·강조), 브랜드 블루(행동·링크), 스티키노트 파스텔 카드, 화이트보드 점 격자 |

Webflow 템플릿·Awwwards에서 수집. Savee·Pinterest는 로그인/보안문자 때문에 제외.

## 5. 디자인 토큰 (Miro)
- 스킨 교체 원칙: **구조·섹션 순서·레이아웃·애니메이션·인터랙션은 절대 바꾸지 않고, 색상·폰트·간격·질감만 바꾼다.**
- 색: canvas `#ffffff` · surface `#fafbfc` · ink `#1c1c1e` · charcoal `#2c2c34` · slate `#555a6a` · hairline `#e0e2e8` · blue `#4262ff`(CSS 토큰명 `orange`) · yellow `#ffd02f`(토큰명 `orange-light`) · 파스텔 yellow/coral `#ffc6c6`/rose `#fde0f0`/teal `#c3faf5`/peach `#ffe6cd`
- 옐로는 로고·형광펜 강조(`.hl`)·작은 점에만. 큰 배경·일반 버튼 금지. 주 버튼은 검정 알약, 보조 행동은 블루 알약.
- 글꼴: 한글 Pretendard, 라틴 Figtree(Roobert PRO 대체). 제목 500, 본문 400, 700 안 씀.
- 모서리: 버튼 9999px · 파스텔 카드 28px · CTA 배너 32px · 미디어/목록 카드 16px · 입력창 8px. 그림자는 rgba(5,0,56,…) 낮게.
- 간격: 최대폭 1280px, 섹션 96~128px.
- 질감: 예배 섹션은 화이트보드 점 격자(`.grain`).

## 6. 하지 말 것
- "SECTION 01" 같은 메타 라벨, 이모지, 의미 없는 장식 배지.
- 레퍼런스 이미지·문구 복제. 공식 자료에 없는 사실(인원·연혁·수치) 지어내기.
- 4줄 넘는 히어로 제목, 빈칸 남는 벤토 그리드, 가로 스크롤 생기는 애니메이션.

## 7. 자료 규칙
- 모든 이미지·첨부는 `public/media/<게시판코드>/` (WebP, 긴 변 1200px). 원본은 `../한성교회홈페이지_원본미디어/`에 보관.
- 갱신: `npm run scrape` → 공식 사이트에서 2025-01-01 이후 글(멈춘 게시판은 최근 20건) 다시 수집 → `public/media` 축소본 생성.
- 예배시간표는 공식 페이지가 JS로 그려 `tools/extract_static.py`의 `WORSHIP`에 수동 반영(2026-10-07 확인본).
- 헌금 계좌 4개(신한 십일조·새마을 주정·새마을·농협). 농협 계좌는 공식 헌금 페이지엔 숨김이지만 사용자 확인으로 포함(2026-10-07).

## 8. 영상 속 5단계 워크플로 적용 현황 (2026-10-07)
| 단계 | 내용 | 상태 |
|---|---|---|
| 1. 레퍼런스 3장 | 레이아웃 = 현재 히어로(H-홀 예배 사진, `public/assets/home/hero-stage.webp`) · 디자인 요소 = 추상 원형 링 · 톤 = Miro 팔레트 | 준비됨 |
| 2. Higgsfield 자산 재구성 | 아래 프롬프트 1 (이미지 1장 0.25크레딧) | **크레딧 0 — 충전 필요** |
| 3. Seedance 배경 애니메이션 | 아래 프롬프트 2 (5초 영상 35크레딧) + 부메랑 루프 | **크레딧 0 — 충전 필요** |
| 4. 폰트·HEX 명시 | 아래 표 | 완료 |
| 5. 섹션 확장 | 특징(예배) → 후기(은혜나눔 흐르는 카드) → 포트폴리오(LIFE 벤토) → 프로세스(처음 오신 분의 네 걸음, 쌓이는 카드) | 완료 |

**폰트 로딩 경로**
- 한글: Pretendard Variable — `https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css` (본문 400, 제목 500)
- 라틴: Figtree — Google Fonts, `next/font/google`의 `Figtree({ weight: ["400","500","600"] })` (변수 `--font-figtree`)

**정확한 HEX**: ink `#1c1c1e` · canvas `#ffffff` · surface `#fafbfc` · hairline `#e0e2e8` · blue `#4262ff` · yellow `#ffd02f` · coral `#ffc6c6` · rose `#fde0f0` · teal `#c3faf5` · peach `#ffe6cd`

**프롬프트 1 — Higgsfield (gpt_image_2_5, 16:9)**
> 주니어 디자이너에게 지시하듯: 첫 번째 이미지(한성교회 H-홀 예배 사진)의 구도와 무대 배치는 그대로 유지해. 무대 위 조명 빔만 두 번째 이미지 같은 부드러운 추상 원형 링(겹쳐 도는 고리)으로 바꿔. 전체 색감은 세 번째 팔레트(#ffffff, #ffd02f, #4262ff, 파스텔)로 맞춰. 글자·로고·버튼은 절대 넣지 말 것. 8K 수준 디테일.

**프롬프트 2 — Seedance (seedance_2_5, image-to-video, 5초)**
> 프롬프트 1 결과를 시작 프레임으로. 카메라는 거의 고정, 원형 링이 천천히 회전하고 빛이 부드럽게 흐른다. 사람·글자는 움직이거나 생기지 않는다. 마지막 프레임이 첫 프레임과 비슷하게 끝난다.
> 부메랑: 받은 영상을 정방향+역방향으로 이어 붙여 끊김 없는 루프로 만든 뒤(`ffmpeg -i in.mp4 -filter_complex "[0]reverse[r];[0][r]concat=n=2:v=1:a=0" -an hero-loop.mp4`), 히어로 사진 자리에 `<video autoplay muted loop playsinline poster>`로 넣는다.
