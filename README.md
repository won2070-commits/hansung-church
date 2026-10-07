# 한성교회 홈페이지 리디자인

GPT 코워크(Codex)에서 기획 → 디자인 제작 → 색상·실제 사진·움직임 보완 3단계로 만든 반응형 시안을 2026-10-07 이 폴더(`Cowork/한성교회홈페이지`)로 이관해 이어서 작업한다. 별도 패키지 설치 없이 HTML/CSS/JavaScript로 실행된다. 원본 폴더: `~/Documents/ChatGPT/한성교회 홈 페이지`.

## 실행

- 미리보기: `node server.cjs` → http://localhost:5225 (`.claude/launch.json` 프리뷰명 "한성교회홈페이지")
- 정적 호스팅: index.html, pastor.html, style.css, app.js, assets/ 를 그대로 업로드

## 구성과 기능

- 처음 방문하는 사람: 교회 소개 → 목회자와 설교 → 예배와 방문 안내
- 기존 성도: 예배 시간표, 온라인 예배, 주보, 소식, 찬양, 헌금 안내
- YouTube 설교 재생 대화상자 및 YouTube 직접 보기
- 최근 설교 3편(`app.js`의 `sermons`) 검색과 공식 게시물 연결
- 주일·주중·다음 세대·청년 시간표 탭(`app.js`의 `schedules`), 방향키 이동
- 모바일 메뉴, FAQ, 지도·전화·주소 복사
- 스크롤 등장 효과, 움직임 줄이기 설정 존중, 키보드 초점 표시
- 담임목사 인사말 별도 페이지 `pastor.html`

## 자료와 출처 (2026-10-07 확인)

- 교회: https://www.hansungchurch.com/html/main.asp
- 목회자: https://www.hansungchurch.com/html/sub01/01.asp
- 예배: https://www.hansungchurch.com/html/sub01/03.asp
- 설교: https://www.hansungchurch.com/EZ/rb/board.asp?BoardModule=Media&tbcode=worship01_1
- 사진: 담임목사 사진(사용자 제공) + 공식 홈페이지 공동체·설교 이미지

## 갱신 방법

- 설교가 바뀌면 `index.html`의 대표 설교(제목·본문·날짜·`data-video` YouTube ID·`assets/hansung-sermon-*.jpg`)와 `app.js`의 `sermons` 배열(공식 게시판 seq)을 손으로 바꾼다. 자동 갱신 없음.
- 예배 시간은 `app.js`의 `schedules`.
- 로고는 임시 워드마크(`.brand-mark`). 공식 로고로 교체 가능.

## 운영 범위

로컬 시안이며 교회 공식 서버·도메인에는 배포하지 않았다. 주보·소식·등록 등은 공식 홈페이지 링크로 연결한다. `official-site-replacement/`는 공식 사이트 담임목사 사진 교체용 산출물(미업로드).
