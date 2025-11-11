# 서울신학대학교 총학생회 통합 웹사이트

## 프로젝트 개요
서울신학대학교 총학생회를 위한 순수 HTML 단일 페이지 웹사이트로, 행사/공모전 정보, 월간 일정 캘린더, 동아리/소모임 커뮤니티를 한 페이지에서 제공합니다.

## 주요 기능
1. **이번 달 주요 일정 캘린더** (메인 섹션)
   - 월별 네비게이션 버튼 (9월, 10월, 11월, 12월)
   - 월 단위 캘린더 형식으로 일정 표시
   - 날짜별 행사/공모전 일정 표시
   - JavaScript로 동적 캘린더 렌더링
   - 깔끔하고 현대적인 디자인

2. **행사 & 공모전 섹션**
   - 교내 행사와 공모전 정보를 이미지와 텍스트로 표시
   - 행사 카드: 주관, 장소 정보 포함
   - 공모전 카드: 주최 정보, 신청하기 버튼 포함
   - "행사 제안/건의하기" 버튼
   - 필터 기능 (전체/행사/공모전)

3. **동아리 & 소모임 섹션**
   - "동아리 & 소모임 신청하기" 버튼
   - 카카오톡 오픈채팅 링크 제공
   - 필터 기능 (전체/스포츠/학술/문화예술/취미)

4. **스무스 스크롤 네비게이션**
   - 상단 메뉴 순서: 일정 → 행사 & 공모전 → 동아리 & 소모임
   - 각 섹션으로 부드럽게 이동
   - 반응형 디자인 (데스크톱, 태블릿, 모바일 최적화)

## 기술 스택
- **순수 HTML5** (구조)
- **CSS3** (HTML 내부 `<style>` 태그에 포함)
- **Vanilla JavaScript** (HTML 내부 `<script>` 태그에 포함)
- **외부 의존성 없음** (단일 HTML 파일로 완전히 독립적 작동)

## 프로젝트 구조
```
프로젝트 루트/
├── html/                   # 구글 사이트용 (자동 생성)
│   ├── google-site.html    # 빌드 스크립트로 생성된 단일 파일 ⭐
│   └── index.html          # (구버전, 삭제 예정)
│
├── docs/                   # GitHub Pages용 + 마스터 소스 ⭐
│   ├── index.html          # HTML (메인 소스)
│   ├── css/
│   │   └── style.css       # 분리된 CSS (827 라인)
│   ├── js/
│   │   └── script.js       # 분리된 JavaScript (416 라인)
│   └── images/             # GitHub 호스팅 이미지 (9개 예시)
│       ├── autumn-festival.png
│       ├── winter-mt.png
│       ├── writing-contest.png
│       ├── sports-day.png
│       ├── startup-contest.png
│       ├── soccer-club.png
│       ├── coding-club.png
│       ├── band-club.png
│       └── book-club.png
│
├── build_google_site.js    # 빌드 스크립트 (자동화)
├── build_google_site.py    # (사용 안 함 - Python 미설치)
└── README.md               # 사용 설명서
```

**두 버전 전략:**
- `docs/`: **단일 소스** (직접 편집, GitHub Pages 배포)
- `html/google-site.html`: **자동 생성** (빌드 스크립트로 생성, 구글 사이트용)

**빌드 워크플로우:**
```bash
# 1. docs/ 폴더 수정 (HTML, CSS, JS, 이미지)
# 2. 빌드 스크립트 실행
node build_google_site.js
# 3. html/google-site.html 자동 생성 (CSS/JS 인라인, GitHub 절대 경로)
```

## 이미지 설정
- **GitHub 호스팅**: docs/images/ 폴더에 9개 AI 생성 예시 이미지
- **이미지 전략**: 사용자가 같은 파일명으로 복사-붙여넣기 (예: autumn-festival.png 덮어쓰기)
- **권장 이미지 크기**: 400x300 또는 800x600 (비율 4:3)
- **이미지 목록**:
  - **행사**: autumn-festival.png, winter-mt.png, sports-day.png
  - **공모전**: writing-contest.png, startup-contest.png
  - **동아리**: soccer-club.png, coding-club.png, band-club.png, book-club.png
- **경로 형식**:
  - docs/index.html: `images/autumn-festival.png` (상대 경로)
  - google-site.html: `https://turtle756.github.io/STU-Notice/images/autumn-festival.png` (절대 경로)

## 실행 방법
웹사이트는 현재 자동으로 실행 중입니다. 화면 상단의 웹뷰에서 확인할 수 있습니다.

**워크플로우 명령**: `npx http-server html -p 5000 --cors -c-1`
- `-c-1`: 캐시 비활성화로 변경사항 즉시 반영

HTML 파일을 브라우저에서 직접 열어도 작동합니다.

## 수정 방법

⭐ **중요**: docs/ 폴더만 편집하세요! 수정 후 빌드 스크립트를 실행하면 html/google-site.html이 자동 생성됩니다.

### 1단계: docs/ 폴더 수정

#### 행사 및 공모전 정보 수정
`docs/index.html` 파일의 "행사 & 공모전" 섹션에서:
- 이미지 경로 (images/파일명.png)
- 행사명, 날짜, 설명
- 주관/주최 정보
- 장소 정보
- 카테고리 (행사/공모전)
- 공모전 신청 링크

**상세 정보 추가 (data-* 속성):**
- `data-target`: 참가 대상 (예: "전체 재학생")
- `data-benefits`: 참가 혜택 (예: "대상 200만원, 멘토링 제공")
- `data-requirements`: 준비물/제출물 (예: "사업계획서 10페이지 이내")
- `data-schedule`: 상세 일정 (예: "신청 마감: 11/20, 발표: 12/1")
- `data-contact`: 문의처 (예: "총학생회 010-XXXX-XXXX")

#### 캘린더 일정 수정
`docs/js/script.js` 파일의 `calendarData` 객체에서:

**일정 추가 예시:**
```javascript
11: {  // 11월
  month: "2024년 11월",
  firstDay: 5,  // 1일의 요일 (0=일, 1=월, ... 6=토)
  daysInMonth: 30,  // 해당 월의 총 일수
  events: {
    15: [{ name: "가을 축제", type: "" }],  // 파란색 일반 행사
    20: [{ name: "창업 공모전", type: "contest" }],  // 빨간색 공모전
    25: [{ name: "동아리 박람회", type: "club" }],  // 녹색 동아리
  },
}
```

**이벤트 타입:**
- `''` (빈 문자열) = 파란색 (일반 행사)
- `'contest'` = 빨간색 (공모전)
- `'club'` = 녹색 (동아리 행사)

#### 동아리 및 소모임 정보 수정
`docs/index.html` 파일의 "동아리 & 소모임" 섹션에서:
- 동아리/소모임 이름, 설명
- 참여 인원 수 (💡 **인원수는 수동 업데이트 필요** - "약 XX명" 형식 권장)
- 카카오톡 오픈채팅방 링크
- 카테고리 (스포츠/학술/문화예술/취미)

**상세 정보 추가 (data-detail 속성):**
- `data-detail`: 활동 시간, 회비, 모집 대상 등 상세 설명
- 예: `data-detail="매주 화/목 저녁 7시, 회비 월 1만원"`

#### 스타일 변경
`docs/css/style.css` 파일에서 CSS를 수정할 수 있습니다.

#### 이미지 변경
`docs/images/` 폴더에 새 이미지를 업로드하세요.
- 기존 파일명과 동일하게 저장하면 자동으로 교체됩니다.
- 예: `autumn-festival.png` 덮어쓰기

### 2단계: 빌드 스크립트 실행

터미널에서 다음 명령어를 실행하세요:
```bash
node build_google_site.js
```

이 스크립트는:
- CSS/JS를 인라인으로 삽입
- 이미지 경로를 GitHub 절대 URL로 변환
- `html/google-site.html` 파일 자동 생성

### 3단계: 결과 확인

- `html/google-site.html` 파일 열기
- Ctrl+A → 전체 복사
- 구글 사이트에 붙여넣기

## GitHub Pages 호스팅
- **docs/ 폴더**: GitHub Pages 배포용 버전
- **설정 방법**: README.md의 "GitHub Pages 호스팅 가이드" 참조
- **배포 방식**: GitHub Settings → Pages → `/docs` 폴더 선택
- **URL 형식**: `https://본인아이디.github.io/저장소이름/`
- **이미지 호스팅**: `docs/images/` 폴더에 업로드 후 상대 경로 사용

## 최근 변경사항
- 2024-11-11: **자동화 빌드 시스템 구축** ⭐
  - **빌드 스크립트 추가**: `build_google_site.js` (Node.js)
    - docs/index.html을 기반으로 google-site.html 자동 생성
    - CSS/JS 인라인 삽입 (단일 파일 생성)
    - 이미지 경로를 GitHub 절대 URL로 자동 변환
  - **9개 AI 예시 이미지 생성** (docs/images/)
    - 행사 3개, 공모전 2개, 동아리 4개
    - 사용자가 같은 파일명으로 덮어쓰기 가능
  - **docs/index.html 이미지 경로 수정**
    - 구글 드라이브/picsum → GitHub 상대 경로 (images/...)
    - 동아리 섹션에 이미지 추가
  - **docs/css/style.css 업데이트**
    - .community-card img 스타일 추가 (200px 높이, object-fit: cover)
    - .community-content 래퍼 추가 (패딩 분리)
  - **README.md 전면 개편**
    - 빌드 스크립트 사용법 추가
    - 파일 구조 섹션 업데이트 (google-site.html)
    - 자동화 워크플로우 체크리스트 작성
  - **단일 소스 전략**: docs/ = 마스터, google-site.html = 빌드 결과물
- 2024-11-11: **GitHub Pages 호스팅 구조 추가**
  - docs/ 폴더 생성 (GitHub Pages 배포용)
  - docs/css/style.css: CSS 분리 (811 라인 → 827 라인)
  - docs/js/script.js: JavaScript 분리 (416 라인)
  - docs/index.html: 외부 CSS/JS 링크로 생성
  - docs/images/: 이미지 폴더 생성
  - README에 GitHub 업로드 및 Pages 설정 가이드 추가
- 2024-11-08: 초기 프로젝트 설정 및 React 버전 구현
- 2024-11-08: 순수 HTML/CSS/JavaScript 버전 추가
- 2024-11-08: 모바일 반응형 디자인 개선
- 2024-11-08: CSS와 JavaScript를 HTML 파일 내부로 통합
- 2024-11-08: React 버전 및 모든 외부 의존성 제거
- 2024-11-08: 단일 HTML 파일로 통합 (행사/공모전 + 캘린더 + 동아리/소모임)
- 2024-11-08: 행사에 주관/장소 정보 추가, 공모전에 주최/신청하기 버튼 추가
- 2024-11-08: 월간 캘린더 기능 추가
- 2024-11-08: 구글 드라이브 이미지 링크 통합
- 2024-11-08: **일정 섹션을 페이지 최상단으로 이동**
- 2024-11-08: **월별 네비게이션 버튼 추가 (9월~12월)**
- 2024-11-08: **JavaScript 동적 캘린더 렌더링 기능 구현**
- 2024-11-08: **로고에 "서울신학대학교" 추가**
- 2024-11-08: **이미지 URL 업데이트** (가을축제: 구글 드라이브, 나머지: picsum.photos)
- 2024-11-08: **권장 이미지 크기 주석 추가** (400x300 또는 800x600)
- 2024-11-08: **캐시 방지 설정 추가** (메타 태그 + http-server -c-1 옵션)
- 2024-11-08: **페이지 타이틀 업데이트** ("서울신학대학교 총학생회")
- 2024-11-08: **불필요한 파일 삭제** (attached_assets, community.html)
- 2024-11-08: **모바일 반응형 레이아웃 문제 해결**
  - 전역 overflow-x 방지 (html, body)
  - 캘린더 스크롤 래퍼 추가
  - 한국어 텍스트 자동 줄바꿈 지원 (overflow-wrap: anywhere)
  - 캘린더 이벤트 2줄 제한 (-webkit-line-clamp)
  - 모바일 폰트/패딩 최적화 (320px 작은 화면까지 지원)
  - 일정 캘린더가 화면 밖으로 튀어나오는 문제 해결
- 2024-11-08: **모바일 카드 레이아웃 개선 및 모달 기능 추가**
  - 모바일에서 행사/동아리 카드 2열 그리드로 표시
  - 카드 크기 축소 (이미지 120px, 폰트 크기 조정)
  - 카드 클릭 시 모달로 확대 보기 기능
  - 모달: 이미지, 제목, 상세 정보, 신청/카카오톡 버튼
  - ESC 키, 배경 클릭, 닫기 버튼으로 모달 닫기
  - 모달 열림 시 스크롤 잠금
  - 부드러운 애니메이션 (fade-in + scale)
