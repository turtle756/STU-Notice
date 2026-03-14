# 서울신학대학교 총학생회 웹사이트

**사이트 주소:** https://stuseed.site

**관리자 페이지:** https://stuseed.site/admin

---

## 구조

```
STU-Notice/
├── server/                    ← Express 통합 서버
│   ├── index.js               ← 엔트리포인트 (공개 사이트 + 관리자)
│   ├── lib/
│   │   ├── data-engine.js     ← 데이터 읽기/쓰기/적용/되돌리기
│   │   └── github-sync.js     ← 적용 시 GitHub 백업 동기화
│   └── public/                ← 관리자 UI
│       ├── admin.html
│       ├── admin.js
│       ├── admin.css
│       └── login.html
├── docs/                      ← 공개 사이트 (정적 파일)
│   ├── index.html             ← 메인 홈 페이지
│   ├── common/                ← HTML/CSS/JS (수정 불필요)
│   ├── edit/                  ← 라이브 데이터 파일 (*.js)
│   └── image/                 ← 이미지 파일
├── draft/                     ← 관리자 작업 영역 (.gitignore)
│   └── edit/                  ← 수정 중인 데이터
├── package.json
└── .gitignore
```

---

## 데이터 플로우

```
[관리자 편집] → draft/edit/*.js에 자동저장
      ↓
[미리보기]   → 적용 전 변경사항 확인
      ↓
[적용하기]   → draft/edit/ → docs/edit/ 복사 + GitHub 동기화
      ↓
[공개 사이트] → docs/ 기반으로 서빙
```

---

## 로컬 실행

```bash
npm install
npm start
# http://localhost:5000/       ← 공개 사이트
# http://localhost:5000/admin  ← 관리자 페이지
```

---

## 환경변수

| 변수 | 설명 | 기본값 |
|------|------|--------|
| `PORT` | 서버 포트 | `5000` |
| `ADMIN_PASSWORD` | 관리자 비밀번호 | `admin1911` |
| `SESSION_SECRET` | 세션 암호화 키 | 랜덤 생성 |
| `DATA_ROOT` | 영구 저장소 경로 (Railway Volume) | 미설정 시 docs/ 사용 |
| `GITHUB_TOKEN` | GitHub PAT (적용 시 동기화) | 미설정 시 동기화 안 함 |
| `GITHUB_REPO` | GitHub 저장소 | `turtle756/STU-Notice` |
| `NODE_ENV` | 환경 (`production`에서 secure 쿠키) | - |

---

## 데이터 파일 (edit/*.js)

| 파일 | 내용 |
|------|------|
| `home.js` | 메인 페이지 소개글, SNS 링크 |
| `schedule.js` | 캘린더 월별 탭 데이터 |
| `events.js` | 행사 & 공모전 카드 |
| `official-clubs.js` | 정규 동아리 카드 |
| `clubs.js` | 자율 동아리 & 소모임 카드 |
| `partners.js` | 제휴업체 카드 |
| `notice.js` | 공지사항 & FAQ |
| `sns.js` | SNS 피드 |

---

## 제작자 문의

- **이메일:** rlarlgu5333@naver.com
- **카톡:** turtle753
