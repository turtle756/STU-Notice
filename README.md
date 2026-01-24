# 서울신학대학교 총학생회 웹사이트

**사이트 주소:** https://turtle756.github.io/STU-Notice/index.html

---

## 📁 파일 구조

```
docs/
├── index.html                      ← 메인 홈 페이지
│
├── common/                         ← 수정 불필요 (코드 파일)
│   ├── style.css                   ← 전체 스타일
│   ├── script.js                   ← 전체 기능
│   ├── schedule.html               ← 일정 페이지
│   ├── events.html                 ← 행사/공모전 페이지
│   ├── clubs.html                  ← 동아리/소모임 페이지
│   ├── partners.html               ← 제휴사 페이지
│   └── notice.html                 ← 공지사항/FAQ 페이지
│
├── edit/                           ← 정기 수정 파일
│   ├── schedule.js                 ← 캘린더 월별 탭 데이터
│   ├── events.js                   ← 행사/공모전 카드 데이터
│   ├── clubs.js                    ← 동아리/소모임 카드 데이터
│   ├── partners.js                 ← 제휴사 카드 데이터
│   ├── home.js                     ← 메인 페이지 소개글/SNS 데이터
│   └── notice.js                   ← 공지사항/FAQ 데이터
│
└── image/                          ← 이미지 저장 폴더
    └── calendar/                   ← 월별 캘린더 이미지
```

---

## 📝 카드 수정 방법

모든 데이터 파일은 동일한 구분선 형식을 사용합니다:
- `@@@@@@@@@@@@@@@@@` → 카드 시작선
- `#####################` → 카드 끝선

---

> ### 📅 schedule.js
> 캘린더 월별 탭 데이터

```javascript
{ month: 3, label: "3월", image: "image/calendar/calendar_3.jpg" }
```
- `month` ← 월 숫자 (자동 선택용)
- `label` ← 탭에 표시될 이름
- `image` ← 캘린더 이미지 경로

```
이미지 변경: docs/image/calendar/ 폴더에서 같은 파일명으로 교체
```

---

> ### 🎉 events.js
> 행사 & 공모전 카드 데이터

```javascript
// @@@@@@@@@@@@@@@@@
{
  category: "행사",                              ← "행사" 또는 "공모전"
  image: "image/example_festival.png",           ← 이미지 경로
  title: "2024 가을 축제",                        ← 제목
  date: "2024.11.15 - 2024.11.16",               ← 날짜
  organizer: "주관: 학생회",                      ← 주관/주최
  location: "중앙운동장",                         ← 장소 (행사만)
  description: "가을 축제에 초대합니다!",          ← 간단한 설명
  link: "https://example.com",                   ← 바로가기 링크 (없으면 null)
  applyLink: null,                               ← 신청 링크 (공모전만, 없으면 null)
  details: {
    target: "전체 재학생",                        ← 대상
    benefits: "무료 먹거리, 경품 추첨",            ← 혜택
    schedule: "11/15(금) 17:00-22:00",           ← 일정
    contact: "총학생회 010-XXXX-XXXX"             ← 문의처
  }
}
// #####################
```

- `suggestFormLink` ← 건의/신청하기 버튼 링크
- `itemsPerPage` ← 한 페이지에 표시할 카드 수 (기본 15개)
- `categories` ← 카테고리 목록 (추가/삭제/변경 가능)

---

> ### 👥 clubs.js
> 동아리 & 소모임 카드 데이터

```javascript
// @@@@@@@@@@@@@@@@@
{
  category: "스포츠",                             ← categories 목록 중 하나
  image: "image/example_soccer.png",             ← 이미지 경로
  title: "축구 동아리",                           ← 동아리/소모임 이름
  description: "함께 축구하며 친목을 다지는 동아리",  ← 간단한 설명
  kakaoLink: "https://open.kakao.com/o/example", ← 카카오톡 오픈채팅 링크
  detail: "매주 화/목요일 저녁 7시에 만나 축구"     ← 상세 설명 (모달용)
}
// #####################
```

- `applyFormLink` ← 신청하기 버튼 링크
- `itemsPerPage` ← 한 페이지에 표시할 카드 수 (기본 15개)
- `categories` ← 카테고리 목록 (추가/삭제/변경 가능)

---

> ### 🤝 partners.js
> 제휴사 카드 데이터

```javascript
// @@@@@@@@@@@@@@@@@
{
  category: "음식",                              ← "음식", "카페", "문화", "기타" 등
  image: "https://picsum.photos/400/300?1",      ← 이미지 경로
  title: "맛있는 식당",                           ← 제휴사 이름
  description: "학생증 제시 시 10% 할인",          ← 혜택 설명
  location: "정문 앞 100m",                       ← 위치
  discount: "10% 할인",                          ← 할인 정보
  mapCodeModal: `여기에 카카오맵 코드`             ← 카카오맵 퍼가기 코드 (모달용)
}
// #####################
```

```
지도 추가 방법:
1. 카카오맵(map.kakao.com)에서 장소 검색
2. 공유 → 지도 퍼가기 클릭
3. 크기: 560x300 설정
4. 생성된 코드 전체를 mapCodeModal에 그대로 복붙
```

- `suggestFormLink` ← 제안하기 버튼 링크
- `itemsPerPage` ← 한 페이지에 표시할 카드 수 (기본 15개)
- `categories` ← 카테고리 목록 (추가/삭제/변경 가능)

---

> ### 🏠 home.js
> 메인 페이지 소개글/SNS 데이터

```javascript
const homeData = {
  introduction: {
    title: "서울신학대학교 제42대 시드 총학생회",               ← 메인 타이틀
    subtitle: "학우분들의 편하고 즐거운 학교 생활을 위한 포털입니다.",        ← 서브타이틀
    description: "시드 총학생회는 학우분들의 더 나은 학교 생활을 위해 노력하겠습니다."          ← 소개 설명
  },
  
  sns: [
    {
      name: "Instagram",                         ← SNS 이름
      icon: "📷",                                 ← 아이콘
      url: "https://instagram.com",              ← 링크
      color: "#E4405F"                           ← 버튼 색상
    }
  ],
  
  suggestLink: "https://forms.gle/example"       ← 건의사항 링크
};
```

---

> ### 📢 notice.js
> 공지사항 & FAQ 데이터

**공지사항:**
```javascript
// @@@@@@@@@@@@@@@@@
{
  title: "2025학년도 1학기 학생회비 사용 안내",     ← 공지 제목
  date: "2025-01-15",                            ← 날짜
  category: "공지",                               ← "공지" 또는 "안내"
  content: "학생회비 집행 내역을 안내드립니다.",     ← 내용
  poll: {                                        ← 링크 (없으면 null)
    title: "투표 제목",                            ← 링크 제목
    description: "투표 참여 부탁드립니다.",         ← 링크 설명
    link: "https://forms.gle/example"            ← 구글폼 또는 외부 링크
  }
}
// #####################
```

**FAQ:**
```javascript
// @@@@@@@@@@@@@@@@@
{
  question: "학생회비는 어디에 사용되나요?",        ← 질문
  answer: "체육대회, 축제, 동아리 지원 등에..."    ← 답변
}
// #####################
```

---

## 📞 제작자 문의

- **이메일:** rlarlgu5333@naver.com
- **카톡:** turtle753

기능 추가 및 기능 오류에 대해서 이메일로 보내주시면 해결해드리겠습니다.
개인 일정 때문에 시간이 걸릴 수 있는 점 양해부탁드립니다.
