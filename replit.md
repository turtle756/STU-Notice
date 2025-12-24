# 서울신학대학교 총학생회 웹사이트

## 프로젝트 개요
GitHub Pages로 호스팅되는 4페이지 웹사이트입니다. 일정, 행사/공모전, 동아리/소모임, 제휴사 정보를 제공합니다.

## 주요 기능
1. **일정 페이지** - 월간 캘린더 이미지 (3~6월)
2. **행사 & 공모전** - 필터 기능, 모달 상세보기
3. **동아리 & 소모임** - 카테고리별 필터, 오픈채팅 링크
4. **제휴사** - 학생 할인/혜택 정보
5. **반응형 디자인** - 데스크톱, 태블릿, 모바일 최적화

## 기술 스택
- **HTML5** - 구조
- **CSS3** - 스타일 (Flexbox, Grid)
- **Vanilla JavaScript** - 동적 기능
- **GitHub Pages** - 무료 호스팅

## 프로젝트 구조
```
docs/
├── index.html              # 메인 페이지 (일정)
├── common/                 # 공통 파일 (수정 불필요)
│   ├── style.css           # CSS 스타일시트
│   ├── script.js           # JavaScript
│   ├── events.html         # 행사 & 공모전 페이지
│   ├── clubs.html          # 동아리 & 소모임 페이지
│   └── partners.html       # 제휴사 페이지
├── edit/                   # 수정 파일 (여기만 수정!)
│   ├── schedule.js         # 캘린더 데이터
│   ├── events.js           # 행사/공모전 데이터
│   ├── clubs.js            # 동아리/소모임 데이터
│   └── partners.js         # 제휴사 데이터
└── image/                  # 이미지 폴더
    ├── calendar/           # 캘린더 이미지 (월별)
    └── example_*.png       # 카드 이미지
```

## 콘텐츠 수정 방법 (edit/ 폴더만 수정)

### 1. 캘린더 일정 수정
**파일**: `docs/edit/schedule.js`
```javascript
const calendarMonths = [
  { month: 3, label: "3월", image: "image/calendar/calendar_3.jpg" },
  // 월 추가/삭제/순서 변경 가능
];
```

### 2. 행사 & 공모전 수정
**파일**: `docs/edit/events.js`
```javascript
const eventsData = [
  {
    title: "행사명",
    category: "행사",  // 또는 "공모전"
    date: "2025.01.01",
    organizer: "주관: 총학생회",
    location: "대강당",
    description: "설명...",
    image: "image/example_festival.png",
    applyLink: "https://forms.gle/...",  // 선택사항
  }
];
```

### 3. 동아리 & 소모임 수정
**파일**: `docs/edit/clubs.js`
```javascript
const clubsData = [
  {
    title: "동아리명",
    category: "스포츠",  // 스포츠/학술/문화예술/취미
    description: "짧은 설명",
    detail: "상세 설명 (모달에 표시)",
    image: "image/example_soccer.png",
    kakaoLink: "https://open.kakao.com/...",
  }
];
```

### 4. 제휴사 수정
**파일**: `docs/edit/partners.js`
```javascript
const partnersData = [
  {
    title: "업체명",
    category: "음식",  // 음식/카페/문화/기타
    discount: "학생증 제시 10% 할인",
    location: "학교 앞 200m",
    description: "상세 정보",
    image: "image/partner_restaurant.png",
  }
];
```

### 5. 건의/신청 폼 링크 수정
각 데이터 파일의 `Config` 객체에서 수정:
```javascript
const eventsConfig = { suggestFormLink: "https://forms.gle/..." };
const clubsConfig = { applyFormLink: "https://forms.gle/..." };
const partnersConfig = { suggestFormLink: "https://forms.gle/..." };
```

## 이미지 변경
1. `docs/image/` 폴더에 이미지 업로드
2. 데이터 파일에서 경로 수정: `image: "image/파일명.png"`

## 실행 방법
**워크플로우**: `npx http-server docs -p 5000 --cors -c-1`

## GitHub Pages 호스팅
1. GitHub Settings → Pages → `/docs` 선택
2. URL: `https://아이디.github.io/저장소이름/`

## 최근 변경사항
- 2024-12-24: **멀티페이지 + 데이터 분리 구조로 변경**
  - 4개 페이지 분리 (일정, 행사, 동아리, 제휴사)
  - edit/ 폴더로 콘텐츠 관리 분리
  - common/ 폴더에 공통 파일 정리
  - 카드 동적 렌더링 시스템 도입
- 2024-12-20: 캘린더를 이미지로 변경
- 2024-11-11: 프로젝트 간소화
