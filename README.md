# 서울신학대학교 총학생회 통합 웹사이트

> 행사/공모전, 월간 캘린더, 동아리/소모임 정보를 한 페이지에서 제공하는 순수 HTML 웹사이트

---

## 🚀 **빠른 수정 방법 (구글 사이트 복사-붙여넣기 워크플로우)**

### **📋 복사 → 수정 → 붙여넣기 3단계**

```
1. 구글 사이트에서 Ctrl+A로 HTML 코드 전체 복사
   ↓
2. VSCode 또는 메모장에 붙여넣기
   ↓
3. 필요한 부분 수정 (아래 가이드 참조)
   ↓
4. Ctrl+A로 수정된 코드 전체 복사
   ↓
5. 구글 사이트에 다시 붙여넣기
```

### **권장 편집기**
- **VSCode** (무료, 추천): https://code.visualstudio.com/
- **메모장** (Windows 기본 제공)
- **Sublime Text** (무료): https://www.sublimetext.com/

### **📍 Ctrl+F로 원하는 섹션 빠르게 찾기**
편집기에서 `Ctrl+F`를 누르고 아래 검색어를 입력하세요:

| 수정하고 싶은 내용 | Ctrl+F 검색어 |
|-------------------|--------------|
| 페이지 제목 | `SECTION: HEAD` |
| 상단 메뉴 | `SECTION: NAVIGATION` |
| 캘린더 일정 | `JS: CALENDAR DATA` |
| 행사/공모전 카드 | `SECTION: EVENTS` |
| 동아리/소모임 카드 | `SECTION: COMMUNITY` |
| 모달 설정 | `SECTION: MODAL` |
| 스타일 변경 | `CSS: STYLES` |

---

## 📖 목차

1. [프로젝트 개요](#프로젝트-개요)
2. [파일 구조](#파일-구조)
3. [섹션별 수정 가이드](#섹션별-수정-가이드)
   - [행사 & 공모전 추가/수정](#1-행사--공모전-추가수정)
   - [캘린더 일정 추가/수정](#2-캘린더-일정-추가수정)
   - [동아리 & 소모임 추가/수정](#3-동아리--소모임-추가수정)
4. [이미지 변경 방법](#이미지-변경-방법)
5. [Ctrl+F 검색어 전체 목록](#ctrlf-검색어-전체-목록)
6. [문제해결 (FAQ)](#문제해결-faq)
7. [기술 스택](#기술-스택)

---

## 📌 프로젝트 개요

이 웹사이트는 **단일 HTML 파일**로 작동하며, 외부 의존성이 전혀 없습니다.

### 주요 기능
- ✅ **이번 달 주요 일정 캘린더** (9월~12월, 월별 네비게이션)
- ✅ **행사 & 공모전 섹션** (필터 기능: 전체/행사/공모전)
- ✅ **동아리 & 소모임 섹션** (필터 기능: 전체/스포츠/학술/문화예술/취미)
- ✅ **카드 클릭 시 모달 확대** (상세 정보 표시)
- ✅ **완벽한 반응형** (데스크톱, 태블릿, 모바일 최적화)

### 특징
- 🎯 **Ctrl+F로 쉽게 수정**: 각 섹션마다 명확한 주석 제공
- 💾 **단일 파일**: HTML, CSS, JavaScript 모두 한 파일에 포함
- 🚀 **빠른 로딩**: 외부 라이브러리 없음
- 📱 **모바일 최적화**: 2열 그리드, 터치 친화적 UI

---

## 📁 파일 구조

```
html/
  └── index.html        # 모든 기능이 포함된 단일 파일
```

**`index.html` 하나로 모든 기능이 작동합니다!**

---

## 🛠️ 섹션별 수정 가이드

### **1. 행사 & 공모전 추가/수정**

#### **🔍 Ctrl+F 검색어: `SECTION: EVENTS`**

#### **행사 카드 추가 예시**
```html
<!-- //////////////////////////////////////////////////////////////////////////////// -->
<!-- 새로운 행사 카드 -->
<!-- //////////////////////////////////////////////////////////////////////////////// -->
<div class="event-card" data-category="행사"
     data-target="전체 재학생"
     data-benefits="무료 먹거리 제공, 경품 추첨"
     data-schedule="11/25(토) 13:00-18:00"
     data-contact="총학생회 010-1234-5678">
  <img
    src="https://picsum.photos/400/300"
    alt="체육대회"
  />
  <div class="event-content">
    <span class="event-category">행사</span>
    <h3>가을 체육대회</h3>
    <p class="event-date">📅 2024.11.25</p>
    <p class="event-organizer">주관: 학생회</p>
    <p class="event-location">📍 장소: 운동장</p>
    <p class="event-description">
      학과 대항 체육대회에 참여하세요!
    </p>
  </div>
</div>
```

#### **공모전 카드 추가 예시**
```html
<div class="event-card" data-category="공모전"
     data-target="전체 재학생 및 휴학생"
     data-benefits="대상 300만원, 최우수상 150만원"
     data-requirements="제출물: 기획서 15페이지, PPT"
     data-schedule="신청 마감: 12/10, 발표: 12/20"
     data-contact="기획처 02-1234-5678">
  <img
    src="https://picsum.photos/400/300"
    alt="아이디어 공모전"
  />
  <div class="event-content">
    <span class="event-category">공모전</span>
    <h3>캠퍼스 혁신 아이디어 공모전</h3>
    <p class="event-date">📅 2024.12.10</p>
    <p class="event-organizer">주최: 기획처</p>
    <p class="event-description">
      캠퍼스를 바꿀 아이디어를 제안하세요!
    </p>
    <a
      href="https://forms.gle/example"
      target="_blank"
      class="apply-button"
      >📝 신청하기</a
    >
  </div>
</div>
```

#### **data-* 속성 설명 (모달에 표시됨)**

| 속성 | 설명 | 예시 |
|------|------|------|
| `data-target` | 참가 대상 | `"전체 재학생"` |
| `data-benefits` | 참가 혜택 | `"대상 200만원, 멘토링 제공"` |
| `data-requirements` | 준비물/제출물 | `"사업계획서 10페이지 이내"` |
| `data-schedule` | 상세 일정 | `"신청 마감: 11/20, 발표: 12/1"` |
| `data-contact` | 문의처 | `"총학생회 010-XXXX-XXXX"` |

---

### **2. 캘린더 일정 추가/수정**

#### **🔍 Ctrl+F 검색어: `JS: CALENDAR DATA`**

#### **일정 추가 방법**
```javascript
11: {  // 11월 데이터
  month: "2024년 11월",
  firstDay: 5,  // 1일의 요일 (0=일요일, 1=월요일, ... 6=토요일)
  daysInMonth: 30,  // 11월은 30일까지
  events: {
    15: [{ name: "가을 축제", type: "" }],  // 15일: 파란색 일반 행사
    20: [{ name: "창업 공모전", type: "contest" }],  // 20일: 빨간색 공모전
    25: [{ name: "동아리 박람회", type: "club" }],  // 25일: 녹색 동아리
  },
}
```

#### **이벤트 타입 (색상 지정)**

| type 값 | 색상 | 용도 |
|---------|------|------|
| `""` (빈 문자열) | 파란색 | 일반 행사 |
| `"contest"` | 빨간색 | 공모전 |
| `"club"` | 녹색 | 동아리 행사 |

#### **하루에 여러 일정 추가**
```javascript
15: [
  { name: "가을 축제", type: "" },
  { name: "창업 설명회", type: "contest" },
  { name: "동아리 공연", type: "club" }
]
```

#### **월 정보 확인 방법**

**1. 웹 캘린더 사용**
   - https://calendar.google.com 방문
   - 원하는 월 선택
   - 1일이 무슨 요일인지 확인

**2. firstDay 값 입력**
   - 일요일 = 0
   - 월요일 = 1
   - 화요일 = 2
   - 수요일 = 3
   - 목요일 = 4
   - 금요일 = 5
   - 토요일 = 6

**3. daysInMonth 값 입력**
   - 1월, 3월, 5월, 7월, 8월, 10월, 12월 = 31일
   - 4월, 6월, 9월, 11월 = 30일
   - 2월 = 28일 (윤년: 29일)

---

### **3. 동아리 & 소모임 추가/수정**

#### **🔍 Ctrl+F 검색어: `SECTION: COMMUNITY`**

#### **동아리 카드 추가 예시**
```html
<div class="community-card" data-category="스포츠"
     data-detail="매주 화/목 저녁 7시, 회비 월 1만원, 초보자 환영">
  <div class="community-header-card">
    <h3>배드민턴 동아리</h3>
    <span class="community-category">스포츠</span>
  </div>
  <p class="community-members">👥 약 30명</p>
  <p class="community-description">
    함께 운동하며 친목을 다지는 배드민턴 동아리입니다.
  </p>
  <a
    href="https://open.kakao.com/o/example"
    target="_blank"
    rel="noopener noreferrer"
    class="kakao-button"
  >
    💬 오픈채팅 참여하기
  </a>
</div>
```

#### **카테고리 종류**
- `data-category="스포츠"`
- `data-category="학술"`
- `data-category="문화예술"`
- `data-category="취미"`

#### **💡 인원수 업데이트 방법**
- **인원수는 실시간 연동 불가** (수동 업데이트 필요)
- "약 XX명" 형식 권장
- 예: `<p class="community-members">👥 약 25명</p>`

#### **상세 정보 (data-detail)**
- 활동 시간, 회비, 모집 대상 등을 자유롭게 작성
- 모달 클릭 시 이 정보가 표시됩니다
- 예: `data-detail="매주 화/목 저녁 7시, 회비 월 1만원, 초보자 환영"`

---

## 🖼️ 이미지 변경 방법

### **1. 구글 드라이브 이미지 사용**

#### **Step 1: 구글 드라이브에 이미지 업로드**
1. 구글 드라이브에 이미지 업로드
2. 이미지 우클릭 → "공유" 클릭
3. "링크가 있는 모든 사용자" 선택
4. 링크 복사

#### **Step 2: 파일 ID 추출**
```
공유 링크 예시:
https://drive.google.com/file/d/1ABC123XYZ456/view?usp=sharing

파일 ID: 1ABC123XYZ456 (중간 부분)
```

#### **Step 3: HTML에 적용**
```html
<img
  src="https://drive.google.com/u/0/drive-viewer/파일ID=s2560"
  alt="행사 이미지"
/>
```

**전체 예시:**
```html
<img
  src="https://drive.google.com/u/0/drive-viewer/1ABC123XYZ456=s2560"
  alt="가을 축제"
/>
```

### **2. 외부 이미지 URL 사용**

```html
<img
  src="https://example.com/image.jpg"
  alt="이미지 설명"
/>
```

### **3. 권장 이미지 크기**
- **카드 이미지**: 400x300 또는 800x600
- **비율**: 4:3 권장
- **용량**: 500KB 이하 권장 (빠른 로딩)

---

## 🔍 Ctrl+F 검색어 전체 목록

### **HTML 섹션**

| 섹션 | Ctrl+F 검색어 | 설명 |
|------|--------------|------|
| 문서 헤더 | `SECTION: HEAD` | 페이지 제목, 메타 태그 |
| 상단 네비게이션 | `SECTION: NAVIGATION` | 로고, 메뉴 항목 |
| 캘린더 | `SECTION: CALENDAR` | 월간 일정 캘린더 |
| 행사/공모전 | `SECTION: EVENTS` | 행사 및 공모전 카드 |
| 동아리/소모임 | `SECTION: COMMUNITY` | 동아리 카드 |
| 모달 | `SECTION: MODAL` | 확대 모달 |

### **CSS 섹션**

| 스타일 | Ctrl+F 검색어 | 설명 |
|--------|--------------|------|
| 기본 레이아웃 | `CSS: LAYOUT` | 전역 스타일 |
| 네비게이션 바 | `CSS: NAVIGATION` | 상단 메뉴 스타일 |
| 캘린더 | `CSS: CALENDAR` | 캘린더 디자인 |
| 카드 | `CSS: CARDS` | 행사/동아리 카드 스타일 |
| 모달 | `CSS: MODAL` | 모달 팝업 스타일 |
| 반응형 | `CSS: RESPONSIVE` | 모바일 최적화 |

### **JavaScript 섹션**

| 기능 | Ctrl+F 검색어 | 설명 |
|------|--------------|------|
| 캘린더 데이터 | `JS: CALENDAR DATA` | **일정 수정은 여기서!** |
| 캘린더 렌더링 | `JS: CALENDAR RENDER` | 캘린더 그리기 함수 |
| 필터 기능 | `JS: FILTERS` | 필터 버튼 로직 |
| 모달 기능 | `JS: MODAL` | 모달 팝업 제어 |
| 스크롤 | `JS: SCROLL` | 네비게이션 스크롤 |

---

## 🔧 문제해결 (FAQ)

### **Q1. 변경사항이 화면에 반영되지 않아요!**

**A:** 브라우저 캐시를 지워주세요.

**방법 1: 강력 새로고침**
- **Windows/Linux**: `Ctrl + Shift + R`
- **Mac**: `Cmd + Shift + R`

**방법 2: 캐시 삭제**
1. 브라우저에서 `F12` 키 (개발자 도구 열기)
2. 새로고침 버튼 우클릭
3. "캐시 비우기 및 강력 새로고침" 선택

---

### **Q2. 이미지가 깨져서 나와요!**

**A:** 이미지 URL이 잘못되었거나, 구글 드라이브 공유 설정이 잘못되었습니다.

**체크리스트:**
1. ✅ 구글 드라이브 공유: "링크가 있는 모든 사용자" 확인
2. ✅ 파일 ID 정확히 복사했는지 확인
3. ✅ URL 형식: `https://drive.google.com/u/0/drive-viewer/파일ID=s2560`

---

### **Q3. 캘린더 일정이 표시되지 않아요!**

**A:** `calendarData` 객체를 확인하세요.

**체크리스트:**
1. ✅ `firstDay` 값이 0~6 사이인지 확인
2. ✅ `daysInMonth` 값이 해당 월의 일수와 맞는지 확인
3. ✅ `events` 객체에 일정이 올바른 형식으로 입력되었는지 확인
4. ✅ JavaScript 문법 오류 확인 (쉼표, 중괄호 등)

**올바른 예시:**
```javascript
events: {
  15: [{ name: "가을 축제", type: "" }],
  20: [{ name: "공모전", type: "contest" }],
}
```

**잘못된 예시:**
```javascript
events: {
  15: [{ name: "가을 축제" type: "" }],  // ❌ 쉼표 누락
  20: [{ name: "공모전", type: "contest" }]  // ❌ 마지막 쉼표 있으면 안됨
}
```

---

### **Q4. 모달에 상세 정보가 표시되지 않아요!**

**A:** `data-*` 속성이 제대로 추가되었는지 확인하세요.

**올바른 예시:**
```html
<div class="event-card" data-category="행사"
     data-target="전체 재학생"
     data-benefits="무료 먹거리"
     data-schedule="11/15 17:00"
     data-contact="010-1234-5678">
```

**주의사항:**
- 속성 이름은 정확히 입력 (`data-target`, `data-benefits` 등)
- 따옴표 안에 값 입력
- 여러 줄로 나눌 때는 들여쓰기 유지

---

### **Q5. 필터가 작동하지 않아요!**

**A:** `data-category` 속성을 확인하세요.

**행사/공모전:**
- `data-category="행사"`
- `data-category="공모전"`

**동아리:**
- `data-category="스포츠"`
- `data-category="학술"`
- `data-category="문화예술"`
- `data-category="취미"`

**중요:** 카테고리 이름은 정확히 일치해야 합니다! (띄어쓰기, 오타 주의)

---

### **Q6. 인원수를 실시간으로 업데이트할 수 있나요?**

**A:** 불가능합니다. 이 웹사이트는 순수 HTML이므로 실시간 데이터 연동이 불가능합니다.

**해결 방법:**
- 정기적으로 수동 업데이트
- "약 XX명" 형식으로 표시
- 예: `👥 약 25명`

---

### **Q7. Ctrl+F가 작동하지 않아요!**

**A:** 편집기에서 파일을 열어야 합니다.

**올바른 방법:**
1. VSCode나 메모장에서 파일 열기
2. `Ctrl + F` 단축키 (Windows/Linux) 또는 `Cmd + F` (Mac)
3. 검색어 입력 (예: `SECTION: EVENTS`)

---

### **Q8. 구글 드라이브 이미지가 로딩이 느려요!**

**A:** 이것은 정상입니다. 구글 드라이브는 이미지 호스팅용이 아니므로 로딩 속도가 느릴 수 있습니다.

**해결 방법:**
1. 이미지 용량을 500KB 이하로 압축
2. 외부 이미지 호스팅 서비스 사용 (Imgur, Cloudinary 등)
3. 이미지를 base64로 인코딩하여 HTML에 직접 삽입 (고급)

---

## 🎨 스타일 변경

### **배경색 변경**

🔍 **Ctrl+F 검색어: `CSS: LAYOUT`**

```css
body {
  background-color: #f5f5f5;  /* 여기를 원하는 색상으로 변경 */
}
```

### **메인 테마 색상 변경**

🔍 **Ctrl+F 검색어: `CSS: NAVIGATION`**

```css
.nav-logo:hover {
  color: #3498db;  /* 네비게이션 호버 색상 */
}

.month-btn.active {
  background-color: #3498db;  /* 활성 버튼 색상 */
}
```

**주요 색상 코드:**
- 파란색: `#3498db`
- 빨간색: `#e74c3c`
- 녹색: `#27ae60`
- 노란색: `#f39c12`
- 보라색: `#9b59b6`

---

## 🔗 버튼 링크 변경

### **"행사 제안/건의하기" 버튼**

🔍 **Ctrl+F 검색어: `SECTION: EVENTS`**

```html
<a
  href="https://forms.gle/example"  <!-- 여기에 구글 폼 링크 입력 -->
  target="_blank"
  class="action-button primary"
  >✍️ 행사 제안 / 건의하기</a
>
```

### **"동아리 & 소모임 신청하기" 버튼**

🔍 **Ctrl+F 검색어: `SECTION: COMMUNITY`**

```html
<a
  href="https://forms.gle/community-apply"  <!-- 신청 폼 링크 -->
  target="_blank"
  class="action-button"
  >📋 동아리 & 소모임 신청하기</a
>
```

### **공모전 "신청하기" 버튼**

각 공모전 카드 안에서:

```html
<a
  href="https://forms.gle/example1"  <!-- 공모전별 신청 링크 -->
  target="_blank"
  class="apply-button"
  >📝 신청하기</a
>
```

### **카카오톡 "오픈채팅 참여하기" 버튼**

각 동아리 카드 안에서:

```html
<a
  href="https://open.kakao.com/o/example1"  <!-- 오픈채팅방 링크 -->
  target="_blank"
  rel="noopener noreferrer"
  class="kakao-button"
>
  💬 오픈채팅 참여하기
</a>
```

---

## 💻 기술 스택

### **프론트엔드**
- **HTML5**: 문서 구조
- **CSS3**: 스타일링 (Flexbox, Grid, 미디어 쿼리)
- **Vanilla JavaScript**: 동적 기능 (필터링, 캘린더, 모달)

### **특징**
- ✅ **외부 의존성 없음**: React, jQuery 등 라이브러리 불필요
- ✅ **단일 파일 아키텍처**: 모든 코드가 하나의 HTML 파일에 포함
- ✅ **완벽한 반응형**: 데스크톱, 태블릿, 모바일 최적화
- ✅ **SEO 친화적**: 시맨틱 HTML 사용
- ✅ **접근성**: ARIA 라벨, 키보드 네비게이션 지원

---

## 📞 지원

### **문제가 해결되지 않나요?**

1. **FAQ 섹션 확인**: 위의 문제해결 FAQ를 먼저 확인하세요
2. **주석 확인**: HTML 파일 내부의 주석을 읽어보세요
3. **Ctrl+F 활용**: 검색어를 사용하여 원하는 섹션을 정확히 찾으세요

---

## 📄 라이선스

이 프로젝트는 서울신학대학교 총학생회를 위해 제작되었습니다.

---

## ✨ 마지막 팁

### **수정 전 백업 필수!**
- 수정하기 전에 항상 원본 파일을 복사해 두세요
- `index-backup.html` 같은 이름으로 저장

### **한 번에 하나씩 수정**
- 여러 곳을 동시에 수정하지 말고, 하나씩 테스트하며 수정하세요

### **브라우저 개발자 도구 활용**
- `F12` 키를 눌러 오류 메시지를 확인할 수 있습니다
- Console 탭에서 JavaScript 오류를 볼 수 있습니다

### **Ctrl+F 마스터하기**
- 이 가이드의 검색어를 적극 활용하세요
- 편집기에서 `Ctrl+F`는 가장 강력한 도구입니다!

---

**🎉 이제 웹사이트를 자유롭게 커스터마이징할 수 있습니다!**
