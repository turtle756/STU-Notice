# 서울신학대학교 총학생회 웹사이트

> 행사/공모전, 월간 캘린더, 동아리/소모임 정보를 한 페이지에서 제공하는 웹사이트

---

## 📌 프로젝트 개요

GitHub Pages로 호스팅되는 순수 HTML/CSS/JavaScript 웹사이트입니다.

### 주요 기능
- ✅ **월간 캘린더** (9월~12월, 일정 표시)
- ✅ **행사 & 공모전** (필터 기능, 상세 정보 모달)
- ✅ **동아리 & 소모임** (카테고리별 필터)
- ✅ **완벽한 반응형** (모바일 최적화)

---

## 📁 파일 구조

```
docs/
├── index.html          # 메인 HTML
├── style.css           # 스타일시트
├── script.js           # JavaScript
└── image/              # 이미지 폴더
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

---

## 🚀 GitHub Pages 배포하기

### 1단계: GitHub 저장소 생성

1. GitHub에 로그인
2. 우측 상단 **+** 버튼 → **New repository** 클릭
3. Repository 이름 입력 (예: `student-council`)
4. **Public** 선택
5. **Create repository** 클릭

### 2단계: 파일 업로드

#### 방법 1: GitHub 웹사이트 사용 (초보자 추천)

1. 생성된 저장소 페이지에서 **Add file** → **Upload files** 클릭
2. `docs` 폴더 전체를 드래그 앤 드롭
3. 하단에 커밋 메시지 입력: "Initial commit"
4. **Commit changes** 클릭

#### 방법 2: GitHub Desktop 사용

1. [GitHub Desktop](https://desktop.github.com/) 다운로드 및 설치
2. File → Clone Repository → 본인 저장소 선택
3. `docs` 폴더를 저장소 폴더에 복사
4. GitHub Desktop에서 변경사항 확인 → Commit → Push

### 3단계: GitHub Pages 설정

1. 저장소 페이지 상단 → **Settings** 클릭
2. 왼쪽 메뉴 → **Pages** 클릭
3. Source 섹션:
   - Branch: `main` 선택
   - Folder: `/docs` 선택 ⭐
4. **Save** 버튼 클릭
5. 몇 분 후 상단에 URL 표시:
   ```
   https://본인아이디.github.io/저장소이름/
   ```

🎉 완료! 이 URL로 접속하면 웹사이트를 볼 수 있습니다.

---

## ✏️ 내용 수정하기

### 행사 & 공모전 카드 수정

#### 🔍 빠른 찾기 방법
`docs/index.html` 파일을 열고 **Ctrl+F**로 검색:
- **행사 섹션 전체 찾기**: `<!-- 행사 & 공모전 카드 -->`
- **특정 행사 찾기**: 행사 이름 검색 (예: `가을 축제`)
- **카테고리 찾기**: `data-category="행사"` 또는 `data-category="공모전"`

#### 📝 카드 구조 예시

```html
<div class="event-card" data-category="행사">
  <img src="image/example_festival.png" alt="가을 축제" />
  <div class="event-content">
    <span class="event-category">행사</span>
    <h3>2024 가을 축제</h3>
    <p class="event-date">📅 2024.11.15-16</p>
    <p class="event-organizer">주관: 총학생회</p>
    <p class="event-location">📍 장소: 대운동장</p>
    <p class="event-description">학생들의 화합의 장...</p>
    <a href="https://forms.gle/example" class="apply-button">
      📝 신청하기
    </a>
  </div>
</div>
```

#### 🎯 수정 가능한 항목

| 항목 | 설명 | 예시 |
|------|------|------|
| **data-category** | 필터 카테고리 | `행사` 또는 `공모전` |
| **이미지 경로** | `src="image/파일명.png"` | `example_festival.png` |
| **카테고리 표시** | `<span class="event-category">` | `행사` 또는 `공모전` |
| **제목** | `<h3>` 태그 | `2024 가을 축제` |
| **날짜** | `event-date` 클래스 | `📅 2024.11.15-16` |
| **주관/주최** | `event-organizer` 클래스 | `주관: 총학생회` |
| **장소** | `event-location` 클래스 | `📍 장소: 대운동장` |
| **설명** | `event-description` 클래스 | 짧은 소개 문구 |
| **신청 링크** | `<a href="...">` | Google Forms 링크 등 |

수정 후 GitHub에 다시 업로드하세요!

### 캘린더 일정 수정

`docs/script.js` 파일 열기 → `calendarData` 객체 찾기:

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
- `""` = 파란색 (일반 행사)
- `"contest"` = 빨간색 (공모전)
- `"club"` = 녹색 (동아리 행사)

### 동아리 & 소모임 카드 수정

#### 🔍 빠른 찾기 방법
`docs/index.html` 파일을 열고 **Ctrl+F**로 검색:
- **동아리 섹션 전체 찾기**: `<!-- 동아리 & 소모임 카드 -->`
- **특정 동아리 찾기**: 동아리 이름 검색 (예: `축구 동아리`)
- **카테고리 찾기**: `data-category="스포츠"` (또는 학술/문화예술/취미)

#### 📝 카드 구조 예시

```html
<div class="community-card" data-category="스포츠" 
     data-detail="⏰ 활동: 매주 수요일 17:00 | 💰 회비: 월 10,000원 | 🎯 모집: 1-4학년">
  <img src="image/example_soccer.png" alt="축구 동아리" />
  <div class="community-content">
    <div class="community-header-card">
      <h3>축구 동아리</h3>
      <span class="community-category">스포츠</span>
    </div>
    <p class="community-description">함께 축구하며 친목을 다지는 동아리입니다.</p>
    <a href="https://open.kakao.com/o/example1" class="kakao-button">
      💬 오픈채팅 참여하기
    </a>
  </div>
</div>
```

#### 🎯 수정 가능한 항목

| 항목 | 설명 | 예시 |
|------|------|------|
| **data-category** | 필터 카테고리 | `스포츠` / `학술` / `문화예술` / `취미` |
| **data-detail** | 모달 클릭 시 상세 정보 | `⏰ 활동: 매주 수요일...` |
| **이미지 경로** | `src="image/파일명.png"` | `example_soccer.png` |
| **제목** | `<h3>` 태그 | `축구 동아리` |
| **카테고리 표시** | `<span class="community-category">` | `스포츠` |
| **설명** | `community-description` 클래스 | 짧은 소개 문구 |
| **오픈채팅 링크** | `<a href="...">` | 카카오톡 오픈채팅 링크 |

#### 💡 동아리 이미지 없을 때
동아리 카드에 `<img>` 태그가 없으면, 모달 클릭 시 **무작위 이미지**가 표시됩니다.  
특정 이미지를 사용하려면 카드에 `<img src="image/파일명.png">` 태그를 추가하세요!

---

## 🖼️ 이미지 변경 방법

### 방법 1: GitHub 웹사이트에서 교체

1. GitHub 저장소 → `docs/image/` 폴더 이동
2. 교체할 이미지 클릭 (예: `example_festival.png`)
3. 휴지통 아이콘 클릭 → 삭제
4. `docs/image/` 폴더로 돌아가기
5. **Add file** → **Upload files**
6. 같은 파일명으로 새 이미지 업로드

### 방법 2: 로컬에서 작업

1. `docs/image/` 폴더에서 이미지 교체
2. GitHub Desktop으로 Commit & Push

**권장 이미지 크기:** 800x600 (비율 4:3)

**이미지 파일명 예시:**
- `example_festival.png` (행사)
- `example_contest.png` (공모전)
- `example_soccer.png` (동아리)

---

## 🎨 스타일 변경

`docs/style.css` 파일에서 CSS 수정:

**배경색 변경:**
```css
body {
  background-color: #f5f5f5;  /* 원하는 색상으로 변경 */
}
```

**메인 색상 변경:**
```css
.month-btn.active {
  background-color: #3498db;  /* 파란색 */
}
```

---

## 🔗 링크 변경

**"행사 제안/건의하기" 버튼:**
```html
<a href="https://forms.gle/your-form-id" class="action-button primary">
  ✍️ 행사 제안 / 건의하기
</a>
```

**동아리 신청 버튼:**
```html
<a href="https://forms.gle/your-form-id" class="action-button">
  📋 동아리 & 소모임 신청하기
</a>
```

---

## 🔧 문제해결

### Q. 변경사항이 반영되지 않아요!

**A:** 브라우저 캐시를 지워주세요.
- **Windows/Linux**: `Ctrl + Shift + R`
- **Mac**: `Cmd + Shift + R`

### Q. GitHub Pages URL이 404 에러를 표시해요!

**A:** 다음을 확인하세요:
1. Settings → Pages에서 `/docs` 폴더를 선택했는지 확인
2. 5~10분 정도 기다린 후 다시 접속
3. `docs/index.html` 파일이 존재하는지 확인

---

## 💡 유용한 정보

**GitHub Pages URL 형식:**
```
https://본인아이디.github.io/저장소이름/
```

**이미지 절대 경로:**
```
https://본인아이디.github.io/저장소이름/image/example_festival.png
```

---

## 🎯 기술 스택

- **HTML5** - 구조
- **CSS3** - 스타일 (Flexbox, Grid)
- **Vanilla JavaScript** - 동적 기능
- **GitHub Pages** - 무료 호스팅

---

## 📝 라이선스

이 프로젝트는 자유롭게 사용 가능합니다.

---

**🎉 이제 웹사이트를 자유롭게 커스터마이징할 수 있습니다!**
