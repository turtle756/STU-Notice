# 서울신학대학교 총학생회 웹사이트

**사이트:** https://turtle756.github.io/STU-Notice/index.html

---

## 📁 파일 구조

| 폴더 | 설명 |
|------|------|
| `docs/common/` | 코드 파일 (수정 불필요) |
| `docs/edit/` | 데이터 파일 (정기 수정) |
| `docs/image/calendar/` | 월별 캘린더 이미지 |

---

## 📝 데이터 수정 가이드

카드 구분선: `@@@@@@@@@@@@@@@@@` (시작) / `#####################` (끝)

### schedule.js - 캘린더
```javascript
{ month: 3, label: "3월", image: "image/calendar/calendar_3.jpg" }
```
- 학기별 자동 표시: 1학기(3~6월), 2학기(9~12월)

### events.js - 행사/공모전
- `category`, `title`, `date`, `description`, `details` 등
- `categories` 배열로 필터 버튼 관리

### clubs.js - 동아리/소모임
- `category`, `title`, `description`, `kakaoLink`, `detail`
- `categories` 배열로 필터 버튼 관리

### partners.js - 제휴사
- `category`, `title`, `description`, `location`, `discount`, `mapCodeModal`
- `categories` 배열로 필터 버튼 관리

### home.js - 메인 페이지
- `introduction` (타이틀/설명), `sns` (SNS 링크), `suggestLink`

### notice.js - 공지/FAQ
- 공지: `title`, `date`, `category`, `content`, `poll`
- FAQ: `question`, `answer`

---

## 📞 제작자 문의

- **이메일:** rlarlgu5333@naver.com
- **카톡:** turtle753
