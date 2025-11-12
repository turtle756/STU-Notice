# 서울신학대학교 총학생회 웹사이트

## 프로젝트 개요
GitHub Pages로 호스팅되는 순수 HTML 웹사이트로, 행사/공모전 정보, 월간 일정 캘린더, 동아리/소모임 커뮤니티를 제공합니다.

## 주요 기능
1. **월간 캘린더** (9월~12월, 날짜별 일정 표시)
2. **행사 & 공모전** (필터 기능, 모달 상세보기)
3. **동아리 & 소모임** (카테고리별 필터, 오픈채팅 링크)
4. **반응형 디자인** (데스크톱, 태블릿, 모바일 최적화)

## 기술 스택
- **HTML5** - 구조
- **CSS3** - 스타일 (Flexbox, Grid)
- **Vanilla JavaScript** - 동적 기능
- **GitHub Pages** - 무료 호스팅

## 프로젝트 구조
```
docs/
├── index.html          # 메인 HTML (585라인)
├── style.css           # CSS 스타일시트 (827라인)
├── script.js           # JavaScript (416라인)
└── image/              # 이미지 폴더 (9개 예시)
    ├── example_festival.png
    ├── example_winter.png
    ├── example_contest.png
    ├── example_sports.png
    ├── example_startup.png
    ├── example_soccer.png
    ├── example_coding.png
    ├── example_band.png
    └── example_book.png
```

## 이미지 설정
- **폴더명**: `docs/image/` (단수형)
- **파일명 형식**: `example_간단이름.png` (예: example_festival.png)
- **전략**: 사용자가 같은 파일명으로 덮어쓰기 (GitHub 웹 UI 사용)
- **권장 크기**: 800x600 (비율 4:3)
- **총 9개 AI 생성 예시 이미지**:
  - 행사: example_festival.png, example_winter.png, example_sports.png
  - 공모전: example_contest.png, example_startup.png
  - 동아리: example_soccer.png, example_coding.png, example_band.png, example_book.png

## 실행 방법
웹사이트는 현재 자동으로 실행 중입니다. 화면 상단의 웹뷰에서 확인할 수 있습니다.

**워크플로우**: `npx http-server docs -p 5000 --cors -c-1`
- 캐시 비활성화로 변경사항 즉시 반영

## 수정 방법

### 행사 및 공모전 정보 수정
`docs/index.html` 파일에서:
- 이미지 경로 (image/example_파일명.png)
- 행사명, 날짜, 설명
- 주관/주최 정보
- 장소, 카테고리 (행사/공모전)
- 공모전 신청 링크

### 캘린더 일정 수정
`docs/script.js` 파일의 `calendarData` 객체에서:
- `firstDay`: 1일의 요일 (0=일, 1=월, ... 6=토)
- `daysInMonth`: 해당 월의 총 일수 (28/29/30/31)
- `events`: 날짜별 일정 추가
- `type`: "" (파란색), "contest" (빨간색), "club" (녹색)

### 동아리 및 소모임 정보 수정
`docs/index.html` 파일에서:
- 동아리/소모임 이름, 설명
- 카카오톡 오픈채팅방 링크
- 카테고리 (스포츠/학술/문화예술/취미)
- data-detail 속성: 활동 시간, 회비 등 상세 정보

### 스타일 변경
`docs/style.css` 파일에서 CSS를 수정할 수 있습니다.

### 이미지 변경
GitHub 웹사이트에서:
1. `docs/image/` 폴더 이동
2. 교체할 이미지 삭제
3. 같은 파일명으로 새 이미지 업로드

## GitHub Pages 호스팅
- **배포 폴더**: `docs/` (GitHub Settings → Pages → `/docs` 선택)
- **URL 형식**: `https://본인아이디.github.io/저장소이름/`
- **이미지 URL**: `https://본인아이디.github.io/저장소이름/image/example_festival.png`

## 최근 변경사항
- 2024-11-11: **프로젝트 간소화 (GitHub Pages 전용)** ⭐
  - 폴더 구조 평면화 (css/, js/ 폴더 제거)
  - 이미지 폴더 images → image로 변경
  - 파일명 형식 통일 (example_간단이름.png)
  - 불필요한 파일 삭제 (html/, build 스크립트)
  - 동아리 인원수 표시 제거
  - README.md 대폭 간소화 (GitHub Pages 호스팅 가이드만)
- 2024-11-11: GitHub Pages 호스팅 구조 추가
- 2024-11-08: 초기 프로젝트 설정
- 2024-11-08: 순수 HTML/CSS/JavaScript 버전으로 전환
- 2024-11-08: 모바일 반응형 디자인 개선
- 2024-11-08: 월간 캘린더 기능 추가
- 2024-11-08: 모달 확대 보기 기능 추가
