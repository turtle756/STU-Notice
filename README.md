# 서울신학대학교 총학생회 웹사이트

GitHub Pages로 호스팅되는 HTML/CSS/JS 웹사이트

---

## 🔍 Ctrl+F 검색어 (복사해서 사용)

**index.html**
```
SECTION: CALENDAR
SECTION: EVENTS
SECTION: COMMUNITY
```

**style.css**
```
CSS: CALENDAR
CSS: CARDS
CSS: MODAL
CSS: RESPONSIVE
```

---

## 📁 파일 구조

```
docs/
├── index.html
├── style.css
├── script.js
└── image/
    ├── calendar/        ← 캘린더 이미지
    └── example_*.png    ← 행사/동아리 이미지
```

---

## 🚀 GitHub Pages 배포

1. GitHub → **New repository** (Public)
2. `docs` 폴더 업로드
3. **Settings** → **Pages** → Branch: `main`, Folder: `/docs`
4. URL: `https://아이디.github.io/저장소이름/`

---

## ✏️ 수정 방법

### 캘린더 이미지

`docs/image/calendar/` 폴더에서 같은 파일명으로 교체
- `calendar_3.jpg` ~ `calendar_6.jpg`

---

### 행사 카드

`docs/index.html` → `SECTION: EVENTS` 검색

수정: 이미지, 제목, 날짜, 주관, 장소, 설명, 신청 링크

---

### 동아리 카드

`docs/index.html` → `SECTION: COMMUNITY` 검색

수정: 이미지, 이름, 카테고리, 설명, 오픈채팅 링크

카테고리: `스포츠` / `학술` / `문화예술` / `취미`

---

## 🖼️ 이미지 교체

1. GitHub → `docs/image/` 폴더
2. 기존 이미지 삭제
3. **같은 파일명**으로 새 이미지 업로드

---

## 🔧 문제해결

**변경사항 안 보임** → `Ctrl + Shift + R` (캐시 삭제)

**404 에러** → Settings → Pages에서 `/docs` 선택 확인

---

## 📝 라이선스

자유롭게 사용 가능
