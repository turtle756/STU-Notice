# Seoul Theological University Student Council Website

## Overview
A multi-page, data-driven website for the Seoul Theological University (서울신학대학교) Student Council, designed for GitHub Pages deployment. All content is separated into editable data files (`edit/` folder) and static code (`common/` folder).

## Project Structure
```
docs/
├── index.html                    # Landing page
├── edit/                         # Editable data files (user modifies these)
│   ├── schedule.js               # Calendar/schedule data
│   ├── events.js                 # Events & contests data
│   ├── official-clubs.js         # Official clubs (정규 동아리) data
│   ├── clubs.js                  # Autonomous clubs & groups (자율 동아리) data
│   ├── partners.js               # Partnership stores data
│   └── notice.js                 # Notice & FAQ data
├── common/                       # Static code (don't edit unless changing functionality)
│   ├── script.js                 # Main shared JavaScript
│   ├── style.css                 # Main shared CSS
│   ├── schedule.html             # Calendar page
│   ├── events.html               # Events & contests page
│   ├── official-clubs.html       # Official clubs page
│   ├── clubs.html                # Autonomous clubs page
│   ├── partners.html             # Partnerships page
│   └── notice.html               # Notice & FAQ page
└── image/                        # All image assets (Korean-named folders)
    ├── 캘린더/                    # Calendar images (1월달력.jpg, 2월달력.jpg, etc.)
    ├── 행사&공모전/               # Events & contests category folder
    │   ├── 2024가을축제/          # 2024 가을 축제 이미지
    │   ├── 창업아이디어공모전/     # 창업 아이디어 공모전 이미지
    │   ├── 겨울MT/                # 겨울 MT 이미지
    │   ├── 글쓰기경진대회/        # 글쓰기 경진대회 이미지
    │   └── 체육대회/              # 체육대회 이미지
    ├── 정규동아리/                # Official clubs category folder
    │   ├── 증인들/                # 증인들 동아리 이미지
    │   └── 엘피스/                # 엘피스 동아리 이미지 (서브이미지, QR코드 포함)
    ├── 자율동아리&소모임/         # Autonomous clubs category folder
    │   ├── 축구동아리/            # 축구 동아리 이미지
    │   ├── 코딩스터디/            # 코딩 스터디 이미지
    │   ├── 밴드동아리/            # 밴드 동아리 이미지
    │   └── 독서토론/              # 독서 토론 모임 이미지
    ├── 제휴업체/                  # Partner businesses image folder
    └── 로고/                      # Logo images (인스타그램.png, 페이스북.png)
```

## Key Architecture Decisions
- **Image paths**: Local images use relative paths like `image/행사&공모전/2024가을축제/가을축제.png`; external URLs (https://) are also supported
- **Image folder structure**: Category folders (행사&공모전, 정규동아리, 자율동아리&소모임, 제휴업체) contain item-specific subfolders; standalone folders (캘린더, 로고) stay directly under image/
- **imgPrefix**: `script.js` detects if running from `/common/` subfolder and prepends `../` to resolve local image paths
- **Calendar system**: 12-month with on/off toggle per month; months with `status: "off"` don't need image files
- **Official clubs modal**: Supports sub-images (up to 2), Google Form link, QR code, contact info, Instagram/Facebook social links with logo icons
- **Filtering**: Uses `_origIdx` pattern to maintain stable data references during category filtering
- **Page headers**: All pages have configurable `pageTitle` and `pageSubtitle` in their config objects

## Navigation Order
일정 → 행사 & 공모전 → 정규 동아리 → 자율 동아리 & 소모임 → 제휴업체

## Recent Changes
- 2026-02-06: Reorganized images into category/item hierarchy (행사&공모전/2024가을축제/, 정규동아리/엘피스/, etc.)
- 2026-02-06: Renamed "제휴사" to "제휴업체" across all navigation, data files, and HTML pages
- 2026-02-06: Fixed notice.js syntax errors (missing commas between FAQ items)
- 2026-02-06: Added Instagram/Facebook logo images used as small icons in social link buttons
- 2026-02-06: Generated test images for 엘피스 club (테스트용1~3, 테스트QR코드)
- 2026-02-06: Enhanced official clubs with sub-images, QR code, contact, social links, Google Form
- 2026-02-06: Implemented dynamic page header system configurable through data files

## User Preferences
- All image file names and folder names should be in Korean
- Images organized in category/item hierarchy (category folder → item folder → image files)
- Standalone image folders (캘린더, 로고) stay directly under image/
- Data files use comprehensive inline Korean comments for easy editing
