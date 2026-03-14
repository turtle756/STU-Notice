const fs = require('fs');
const path = require('path');
const vm = require('vm');

const DOCS_DIR = path.join(__dirname, '..', '..', 'docs');
const DRAFT_EDIT_DIR = path.join(__dirname, '..', '..', 'draft', 'edit');
const LIVE_EDIT_DIR = path.join(DOCS_DIR, 'edit');

function ensureDraft() {
  fs.mkdirSync(DRAFT_EDIT_DIR, { recursive: true });
  const draftFiles = fs.readdirSync(DRAFT_EDIT_DIR);
  if (draftFiles.length === 0 && fs.existsSync(LIVE_EDIT_DIR)) {
    const files = fs.readdirSync(LIVE_EDIT_DIR);
    for (const file of files) {
      fs.copyFileSync(path.join(LIVE_EDIT_DIR, file), path.join(DRAFT_EDIT_DIR, file));
    }
  }
}

function readDataFile(filename) {
  ensureDraft();
  const filePath = path.join(DRAFT_EDIT_DIR, filename);
  let content = fs.readFileSync(filePath, 'utf-8');
  content = content.replace(/\bconst\s+/g, 'var ');
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(content, sandbox, { timeout: 3000 });
  return sandbox;
}

function serializeValue(val, indent = 4) {
  if (val === null || val === undefined) return 'null';
  if (typeof val === 'number') return String(val);
  if (typeof val === 'boolean') return String(val);
  if (typeof val === 'string') {
    if (val.includes('\n') || val.includes('`')) {
      return '`' + val.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${') + '`';
    }
    return JSON.stringify(val);
  }
  if (Array.isArray(val)) {
    if (val.length === 0) return '[]';
    const items = val.map(v => serializeValue(v, indent + 2));
    return '[\n' + items.map(i => ' '.repeat(indent + 2) + i).join(',\n') + '\n' + ' '.repeat(indent) + ']';
  }
  if (typeof val === 'object') {
    const entries = Object.entries(val);
    if (entries.length === 0) return '{}';
    const lines = entries.map(([k, v]) => {
      return ' '.repeat(indent + 2) + k + ': ' + serializeValue(v, indent + 2);
    });
    return '{\n' + lines.join(',\n') + '\n' + ' '.repeat(indent) + '}';
  }
  return String(val);
}

function generateScheduleJs(data) {
  const { scheduleConfig, calendarMonths } = data;
  let out = `/*\n================================================================================\n📅 일정 데이터 (캘린더)\n================================================================================\n*/\n\n`;
  out += `const scheduleConfig = {\n`;
  out += `  pageTitle: ${serializeValue(scheduleConfig.pageTitle)},\n`;
  out += `};\n\n`;
  out += `const calendarMonths = [\n`;
  calendarMonths.forEach(m => {
    out += `  { month: ${m.month}, label: ${serializeValue(m.label)}, image: ${serializeValue(m.image)}, status: ${serializeValue(m.status)} },\n`;
  });
  out += `];\n`;
  return out;
}

function generateEventsJs(data) {
  const { eventsData, eventsConfig } = data;
  let out = `/*\n================================================================================\n🎉 행사 & 공모전 데이터\n================================================================================\n*/\n\n`;
  out += `const eventsData = [\n`;
  eventsData.forEach((e, i) => {
    out += `  // @@@@@@@@@@@@@@@@@\n`;
    out += `  {\n`;
    out += `    category: ${serializeValue(e.category)},\n`;
    out += `    image: ${serializeValue(e.image)},\n`;
    out += `    subImage1: ${serializeValue(e.subImage1)},\n`;
    out += `    subImage2: ${serializeValue(e.subImage2)},\n`;
    out += `    title: ${serializeValue(e.title)},\n`;
    out += `    date: ${serializeValue(e.date)},\n`;
    out += `    organizer: ${serializeValue(e.organizer)},\n`;
    out += `    location: ${serializeValue(e.location)},\n`;
    out += `    description: ${serializeValue(e.description)},\n`;
    out += `    link: ${serializeValue(e.link)},\n`;
    out += `    applyLink: ${serializeValue(e.applyLink)},\n`;
    out += `    details: ${serializeValue(e.details || {})},\n`;
    out += `  },\n`;
    out += `  // #####################\n\n`;
  });
  out += `];\n\n`;
  out += `const eventsConfig = {\n`;
  out += `  pageTitle: ${serializeValue(eventsConfig.pageTitle)},\n`;
  out += `  pageSubtitle: ${serializeValue(eventsConfig.pageSubtitle)},\n`;
  out += `  suggestFormLink: ${serializeValue(eventsConfig.suggestFormLink)},\n`;
  out += `  itemsPerPage: ${eventsConfig.itemsPerPage},\n`;
  out += `  categories: ${JSON.stringify(eventsConfig.categories)},\n`;
  out += `};\n`;
  return out;
}

function generateOfficialClubsJs(data) {
  const { officialClubsData, officialClubsConfig } = data;
  let out = `/*\n================================================================================\n🏆 정규 동아리 데이터\n================================================================================\n*/\n\n`;
  out += `const officialClubsData = [\n`;
  officialClubsData.forEach(c => {
    out += `  // @@@@@@@@@@@@@@@@@\n`;
    out += `  {\n`;
    out += `    category: ${serializeValue(c.category)},\n`;
    out += `    image: ${serializeValue(c.image)},\n`;
    out += `    subImage1: ${serializeValue(c.subImage1)},\n`;
    out += `    subImage2: ${serializeValue(c.subImage2)},\n`;
    out += `    title: ${serializeValue(c.title)},\n`;
    out += `    description: ${serializeValue(c.description)},\n`;
    out += `    detail: ${serializeValue(c.detail)},\n`;
    out += `    kakaoLink: ${serializeValue(c.kakaoLink)},\n`;
    out += `    googleFormLink: ${serializeValue(c.googleFormLink)},\n`;
    out += `    qrCodeImage: ${serializeValue(c.qrCodeImage)},\n`;
    out += `    contact: ${serializeValue(c.contact)},\n`;
    out += `    instagram: ${serializeValue(c.instagram)},\n`;
    out += `    facebook: ${serializeValue(c.facebook)},\n`;
    out += `  },\n`;
    out += `  // #####################\n\n`;
  });
  out += `];\n\n`;
  out += `const officialClubsConfig = {\n`;
  out += `  pageTitle: ${serializeValue(officialClubsConfig.pageTitle)},\n`;
  out += `  pageSubtitle: ${serializeValue(officialClubsConfig.pageSubtitle)},\n`;
  if (officialClubsConfig.applyFormLink !== undefined) {
    out += `  applyFormLink: ${serializeValue(officialClubsConfig.applyFormLink)},\n`;
  }
  out += `  itemsPerPage: ${officialClubsConfig.itemsPerPage},\n`;
  out += `  categories: ${JSON.stringify(officialClubsConfig.categories)},\n`;
  out += `};\n`;
  return out;
}

function generateClubsJs(data) {
  const { clubsData, clubsConfig } = data;
  let out = `/*\n================================================================================\n👥 동아리 & 소모임 데이터\n================================================================================\n*/\n\n`;
  out += `const clubsData = [\n`;
  clubsData.forEach(c => {
    out += `  // @@@@@@@@@@@@@@@@@\n`;
    out += `  {\n`;
    out += `    category: ${serializeValue(c.category)},\n`;
    out += `    image: ${serializeValue(c.image)},\n`;
    out += `    subImage1: ${serializeValue(c.subImage1)},\n`;
    out += `    subImage2: ${serializeValue(c.subImage2)},\n`;
    out += `    title: ${serializeValue(c.title)},\n`;
    out += `    description: ${serializeValue(c.description)},\n`;
    out += `    kakaoLink: ${serializeValue(c.kakaoLink)},\n`;
    out += `    detail: ${serializeValue(c.detail)},\n`;
    out += `  },\n`;
    out += `  // #####################\n\n`;
  });
  out += `];\n\n`;
  out += `const clubsConfig = {\n`;
  out += `  pageTitle: ${serializeValue(clubsConfig.pageTitle)},\n`;
  out += `  pageSubtitle: ${serializeValue(clubsConfig.pageSubtitle)},\n`;
  out += `  applyFormLink: ${serializeValue(clubsConfig.applyFormLink)},\n`;
  out += `  itemsPerPage: ${clubsConfig.itemsPerPage},\n`;
  out += `  categories: ${JSON.stringify(clubsConfig.categories)},\n`;
  out += `};\n`;
  return out;
}

function generatePartnersJs(data) {
  const { partnersData, partnersConfig } = data;
  let out = `/*\n================================================================================\n🤝 제휴업체 데이터\n================================================================================\n*/\n\n`;
  out += `const partnersData = [\n`;
  partnersData.forEach(p => {
    out += `  // @@@@@@@@@@@@@@@@@\n`;
    out += `  {\n`;
    out += `    category: ${serializeValue(p.category)},\n`;
    out += `    image: ${serializeValue(p.image)},\n`;
    out += `    title: ${serializeValue(p.title)},\n`;
    out += `    description: ${serializeValue(p.description)},\n`;
    out += `    subImage1: ${serializeValue(p.subImage1)},\n`;
    out += `    subImage2: ${serializeValue(p.subImage2)},\n`;
    out += `    location: ${serializeValue(p.location)},\n`;
    out += `    discount: ${serializeValue(p.discount)},\n`;
    out += `    mapCodeModal: ${serializeValue(p.mapCodeModal)},\n`;
    out += `  },\n`;
    out += `  // #####################\n\n`;
  });
  out += `];\n\n`;
  out += `const partnersConfig = {\n`;
  out += `  pageTitle: ${serializeValue(partnersConfig.pageTitle)},\n`;
  out += `  pageSubtitle: ${serializeValue(partnersConfig.pageSubtitle)},\n`;
  out += `  suggestFormLink: ${serializeValue(partnersConfig.suggestFormLink)},\n`;
  out += `  itemsPerPage: ${partnersConfig.itemsPerPage},\n`;
  out += `  categories: ${JSON.stringify(partnersConfig.categories)},\n`;
  out += `};\n`;
  return out;
}

function generateNoticeJs(data) {
  const { notices, faqs, noticeConfig } = data;
  let out = `/*\n================================================================================\n공지사항 & FAQ 데이터\n================================================================================\n*/\n\n`;
  out += `const notices = [\n`;
  notices.forEach(n => {
    out += `  // @@@@@@@@@@@@@@@@@\n`;
    out += `  {\n`;
    out += `    title: ${serializeValue(n.title)},\n`;
    out += `    date: ${serializeValue(n.date)},\n`;
    out += `    category: ${serializeValue(n.category)},\n`;
    out += `    content: ${serializeValue(n.content)},\n`;
    out += `    poll: ${serializeValue(n.poll)},\n`;
    out += `  },\n`;
    out += `  // #####################\n\n`;
  });
  out += `];\n\n`;
  out += `const faqs = [\n`;
  faqs.forEach(f => {
    out += `  // @@@@@@@@@@@@@@@@@\n`;
    out += `  {\n`;
    out += `    question: ${serializeValue(f.question)},\n`;
    out += `    answer: ${serializeValue(f.answer)},\n`;
    if (f.link !== undefined && f.link !== null) {
      out += `    link: ${serializeValue(f.link)},\n`;
    }
    out += `  },\n`;
    out += `  // #####################\n\n`;
  });
  out += `];\n\n`;
  out += `const noticeConfig = {\n`;
  out += `  pageTitle: ${serializeValue(noticeConfig.pageTitle)},\n`;
  out += `  pageSubtitle: ${serializeValue(noticeConfig.pageSubtitle)},\n`;
  out += `  suggestFormLink: ${serializeValue(noticeConfig.suggestFormLink)},\n`;
  out += `};\n`;
  return out;
}

function generateHomeJs(data) {
  const { homeData } = data;
  let out = `/*\n================================================================================\n메인 페이지 데이터\n================================================================================\n*/\n\n`;
  out += `const homeData = {\n`;
  out += `  introduction: {\n`;
  out += `    title: ${serializeValue(homeData.introduction.title)},\n`;
  out += `    subtitle: ${serializeValue(homeData.introduction.subtitle)},\n`;
  out += `    description: ${serializeValue(homeData.introduction.description)},\n`;
  out += `  },\n`;
  out += `  \n`;
  out += `  sns: [\n`;
  (homeData.sns || []).forEach(s => {
    out += `    {\n`;
    out += `      name: ${serializeValue(s.name)},\n`;
    out += `      icon: ${serializeValue(s.icon)},\n`;
    if (s.iconImage) {
      out += `      iconImage: ${serializeValue(s.iconImage)},\n`;
    }
    out += `      url: ${serializeValue(s.url)},\n`;
    out += `      color: ${serializeValue(s.color)},\n`;
    out += `    },\n`;
  });
  out += `  ],\n`;
  out += `  \n`;
  out += `  suggestLink: ${serializeValue(homeData.suggestLink)},\n`;
  out += `};\n`;
  return out;
}

function generateSnsJs(data) {
  const { snsEmbeds, snsHighlights } = data;
  let out = `/*\n================================================================================\n📱 SNS 피드 데이터\n================================================================================\n*/\n\n`;
  out += `const snsEmbeds = [\n`;
  (snsEmbeds || []).forEach(e => {
    out += `  // @@@@@@@@@@@@@@@@@\n`;
    out += `  {\n`;
    out += `    url: ${serializeValue(e.url)},\n`;
    out += `  },\n`;
    out += `  // #####################\n\n`;
  });
  out += `];\n\n`;
  out += `const snsHighlights = [\n`;
  (snsHighlights || []).forEach(h => {
    out += `  // @@@@@@@@@@@@@@@@@\n`;
    out += `  {\n`;
    out += `    title: ${serializeValue(h.title)},\n`;
    out += `    description: ${serializeValue(h.description)},\n`;
    out += `    image: ${serializeValue(h.image)},\n`;
    out += `    link: ${serializeValue(h.link)},\n`;
    out += `    date: ${serializeValue(h.date)},\n`;
    out += `  },\n`;
    out += `  // #####################\n\n`;
  });
  out += `];\n`;
  return out;
}

const generators = {
  'home.js': generateHomeJs,
  'schedule.js': generateScheduleJs,
  'events.js': generateEventsJs,
  'official-clubs.js': generateOfficialClubsJs,
  'clubs.js': generateClubsJs,
  'partners.js': generatePartnersJs,
  'notice.js': generateNoticeJs,
  'sns.js': generateSnsJs,
};

function writeDataFile(filename, data) {
  ensureDraft();
  const generator = generators[filename];
  if (!generator) throw new Error('Unknown file: ' + filename);
  const content = generator(data);
  const filePath = path.join(DRAFT_EDIT_DIR, filename);
  fs.writeFileSync(filePath, content, 'utf-8');
  return content;
}

function publishDraft() {
  ensureDraft();
  const files = fs.readdirSync(DRAFT_EDIT_DIR).filter(f => f.endsWith('.js'));
  let count = 0;
  for (const file of files) {
    fs.copyFileSync(path.join(DRAFT_EDIT_DIR, file), path.join(LIVE_EDIT_DIR, file));
    count++;
  }
  return count;
}

function revertDraft() {
  const files = fs.readdirSync(LIVE_EDIT_DIR).filter(f => f.endsWith('.js'));
  fs.mkdirSync(DRAFT_EDIT_DIR, { recursive: true });
  let count = 0;
  for (const file of files) {
    fs.copyFileSync(path.join(LIVE_EDIT_DIR, file), path.join(DRAFT_EDIT_DIR, file));
    count++;
  }
  return count;
}

module.exports = { readDataFile, writeDataFile, publishDraft, revertDraft, ensureDraft, DOCS_DIR, DRAFT_EDIT_DIR, LIVE_EDIT_DIR };
