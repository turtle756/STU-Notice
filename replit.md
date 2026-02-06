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
    ├── 행사/                      # Event images (가을축제.png, 창업공모전.png, etc.)
    ├── 동아리/                    # Autonomous club images
    ├── 정규동아리/                 # Official club images
    ├── 엘피스/                    # 엘피스 club sub-images and QR code
    └── 로고/                      # Logo images (인스타그램.png, 페이스북.png)
```

## Key Architecture Decisions
- **Image paths**: Local images use relative paths like `image/캘린더/2월달력.jpg`; external URLs (https://) are also supported
- **imgPrefix**: `script.js` detects if running from `/common/` subfolder and prepends `../` to resolve local image paths
- **Calendar system**: 12-month with on/off toggle per month; months with `status: "off"` don't need image files
- **Official clubs modal**: Supports sub-images (up to 2), Google Form link, QR code, contact info, Instagram/Facebook social links with logo icons
- **Filtering**: Uses `_origIdx` pattern to maintain stable data references during category filtering
- **Page headers**: All pages have configurable `pageTitle` and `pageSubtitle` in their config objects

## Navigation Order
일정 → 행사 & 공모전 → 정규 동아리 → 자율 동아리 & 소모임 → 제휴사

## Recent Changes
- 2026-02-06: Reorganized all images into Korean-named folders (캘린더, 행사, 동아리, 정규동아리, 엘피스, 로고)
- 2026-02-06: Added Instagram/Facebook logo images used as small icons in social link buttons
- 2026-02-06: Generated test images for 엘피스 club (테스트용1~3, 테스트QR코드)
- 2026-02-06: Enhanced official clubs with sub-images, QR code, contact, social links, Google Form
- 2026-02-06: Implemented dynamic page header system configurable through data files

## User Preferences
- All image file names and folder names should be in Korean
- Images organized by usage context (each page/club gets its own folder)
- Data files use comprehensive inline Korean comments for easy editing
