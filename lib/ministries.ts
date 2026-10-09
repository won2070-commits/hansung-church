// 부서 소개(Elevation 구조). 예배 시간·담당 교역자는 site.json(공식 자료)에서 이름·역할 키워드로 자동으로 뽑는다.
// 부서(교회학교 등) 카드: 예배 시간은 match로 site.worship에서, 사진은 사진게시판(photo) 글의 몇 번째 이미지
export type Dept = { name: string; age?: string; match: RegExp; photo?: { seq: number; i: number } };

export type Ministry = {
  id: string; name: string; en: string; tagline: string; depts?: Dept[];
  worship: (name: string) => boolean;   // site.worship 행 이름으로 고름
  roles: string[];                      // 교역자 역할에 이 낱말이 있으면 담당으로 표시
  links: [string, string][];
};

export const MINISTRIES: Ministry[] = [
  { id: "nextgen", name: "차세대", en: "Next Gen", tagline: "영유아부부터 청소년부까지, 아이들이 자기 눈높이의 예배에서 하나님을 만납니다.",
    worship: (n) => /영유아|유치|취학|청소년|캡틴|eKids|더브레이크/.test(n), roles: ["차세대", "영유아", "유치", "유년", "초등", "유초등", "청소년", "고등", "패밀리"],
    depts: [
      { name: "영유아부", age: "0~3세", match: /영유아/, photo: { seq: 521512, i: 5 } },
      { name: "유치부", age: "4~6세", match: /유치부/, photo: { seq: 521148, i: 3 } },
      { name: "취학부", age: "7~12세", match: /취학부/, photo: { seq: 521489, i: 2 } },
      { name: "청소년부", age: "13~18세", match: /청소년부/, photo: { seq: 521216, i: 2 } },
      { name: "eKids 영어예배", age: "4~12세", match: /eKids/ },
      { name: "캡틴 워십", match: /캡틴/ },
      { name: "차세대 더브레이크워십", match: /더브레이크/ },
    ],
    links: [["차세대 주보 하키TOPIC", "/life/hakki/"], ["가정예배 말씀 한 상", "/life/family/"], ["교회학교 예배 시간", "/worship/#w1"]] },
  { id: "young", name: "청년", en: "Young Adults", tagline: "토요일 저녁과 주일 오후, 청년들이 함께 예배하고 말씀 안에서 자랍니다.",
    worship: (n) => /뉴웨이브|젊은이/.test(n), roles: ["청년"],
    links: [["청년예배 설교", "/tv/youth/"]] },
  { id: "adult", name: "교구·다락방", en: "Small Groups", tagline: "교구와 다락방으로 모여 삶과 말씀을 나누고, 새가족을 맞아 함께 세웁니다.",
    worship: (n) => /^[1-6]부 예배|HUG|수요저녁/.test(n), roles: ["교구", "목양", "양육", "새가족", "중보"],
    links: [["H-빌리지 다락방 교안", "https://hansung-h-village.netlify.app/"], ["새가족 안내", "/newcomer/"], ["수요예배 말씀", "/tv/wednesday/"]] },
  { id: "mission", name: "전도·선교", en: "Mission", tagline: "행복한 사람이 행복한 세상을 만들도록, 이웃과 열방에 복음을 전합니다.",
    worship: (n) => /화요전도/.test(n), roles: ["전도", "선교", "행축"],
    links: [["행축ON", "/happy/"], ["화요전도예배 말씀", "/tv/tuesday/"]] },
  { id: "worship", name: "예배·찬양", en: "Worship", tagline: "예배와 찬양, 새벽과 금요일 밤의 기도로 교회의 심장을 뛰게 합니다.",
    worship: (n) => /금요성령|새벽/.test(n), roles: ["예배부", "찬양", "교회음악"],
    links: [["주일찬양", "/tv/praise-sunday/"], ["금요찬양", "/tv/praise-friday/"], ["찬양대", "/tv/choir/"]] },
  { id: "global", name: "다국어 예배", en: "Global", tagline: "영어와 중국어로도 함께 예배합니다. 아이들을 위한 eKids 영어예배도 있습니다.",
    worship: (n) => /영어|중국어/.test(n), roles: ["영어예배", "중국어"],
    links: [["예배 시간 전체", "/worship/"]] },
  { id: "seniors", name: "소망대학", en: "Seniors", tagline: "어르신들의 모임입니다. 매주 목요일 오전, 워십센터 2층 H-홀에 모여 함께 예배하고 배웁니다.",
    worship: (n) => /소망대학/.test(n), roles: ["소망대학"],
    links: [["예배 시간 전체", "/worship/"]] },
  { id: "care", name: "홀리킥 사랑부", en: "Together", tagline: "홀리킥 사랑부에서 함께 예배합니다. 1부는 6~12세, 2부는 13세부터 청장년까지 비전센터 5층에서 모입니다.",
    worship: (n) => /사랑부/.test(n), roles: ["사랑부"],
    links: [["예배 시간 전체", "/worship/"]] },
];
