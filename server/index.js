const express = require('express');
const session = require('express-session');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const { readDataFile, writeDataFile, publishDraft, revertDraft, ensureDraft, initPersistentData, DOCS_DIR, DRAFT_EDIT_DIR, LIVE_EDIT_DIR, IMAGE_DIR } = require('./lib/data-engine');
const { syncToGithub, isEnabled: isGithubEnabled } = require('./lib/github-sync');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

const SESSION_SECRET = process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex');
app.set('trust proxy', 1);
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production' }
}));

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin1911';
const DATA_FILES = ['home.js', 'schedule.js', 'events.js', 'official-clubs.js', 'clubs.js', 'partners.js', 'notice.js', 'sns.js'];

// ============================================================
// Public site — serves docs/ directly (no auth)
// ============================================================

// Serve edit/*.js and common/ for the public site
app.use('/edit', express.static(LIVE_EDIT_DIR));
app.use('/common', express.static(path.join(DOCS_DIR, 'common')));
app.use('/image', express.static(IMAGE_DIR));
// Fallback to git images for static assets (og-image, favicon, etc.)
app.use('/image', express.static(path.join(DOCS_DIR, 'image')));

app.get('/', (req, res) => {
  let html = fs.readFileSync(path.join(DOCS_DIR, 'index.html'), 'utf-8');
  // Fix links: common/page.html → /page
  html = html.replace(/href="common\/([a-z-]+)\.html(#[^"]*)?"/g, 'href="/$1$2"');
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.send(html);
});

// Sub-pages like /schedule, /events etc. → serve from docs/common/
const PUBLIC_PAGES = ['schedule', 'events', 'official-clubs', 'clubs', 'partners', 'notice'];
const PAGE_OG = {
  schedule: { title: '일정', desc: '서울신학대학교 총학생회 월별 일정 캘린더' },
  events: { title: '행사 & 공모전', desc: '서울신학대학교 교내 행사 및 공모전 정보' },
  'official-clubs': { title: '정규 동아리', desc: '서울신학대학교 공식 승인 정규 동아리 소개' },
  clubs: { title: '자율 동아리 & 소모임', desc: '서울신학대학교 자율 동아리 및 소모임 안내' },
  partners: { title: '제휴업체', desc: '서울신학대학교 학생 제휴업체 할인 혜택 안내' },
  notice: { title: '공지사항', desc: '서울신학대학교 총학생회 공지사항 및 자주 묻는 질문' },
};
PUBLIC_PAGES.forEach(page => {
  app.get(`/${page}`, (req, res) => {
    const htmlPath = path.join(DOCS_DIR, 'common', `${page}.html`);
    if (!fs.existsSync(htmlPath)) return res.status(404).send('Page not found');
    let html = fs.readFileSync(htmlPath, 'utf-8');
    // Fix relative paths for top-level serving
    html = html.replace(/href="style\.css"/g, 'href="/common/style.css"');
    html = html.replace(/src="script\.js"/g, 'src="/common/script.js"');
    html = html.replace(/\.\.\/edit\//g, '/edit/');
    html = html.replace(/"\.\.\/index\.html"/g, '"/"');
    html = html.replace(/href="([a-z-]+)\.html"/g, 'href="/$1"');
    html = html.replace(/\.\.\/image\//g, '/image/');
    // Inject OG tags
    const og = PAGE_OG[page];
    if (og) {
      const ogTags = `<meta property="og:title" content="서울신학대학교 총학생회 - ${og.title}"><meta property="og:description" content="${og.desc}"><meta property="og:type" content="website"><meta property="og:url" content="https://stuseed.site/${page}"><meta property="og:image" content="https://stuseed.site/image/og-image.jpg"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">`;
      html = html.replace('</head>', ogTags + '</head>');
    }
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.send(html);
  });
});

// Redirect old common/*.html paths to clean URLs (preserving query/hash)
app.get('/common/:page.html', (req, res) => {
  const page = req.params.page;
  const qs = req.originalUrl.split('?')[1];
  res.redirect(301, `/${page}${qs ? '?' + qs : ''}`);
});

// Serve index.html with fixed paths
app.get('/index.html', (req, res) => res.redirect('/'));

// 404 page
app.get('/404.html', (req, res) => {
  const p = path.join(DOCS_DIR, '404.html');
  if (fs.existsSync(p)) res.sendFile(p);
  else res.status(404).send('Not found');
});

// ============================================================
// Admin auth
// ============================================================

function adminAuth(req, res, next) {
  if (req.session && req.session.authenticated) return next();
  if (req.path === '/admin/login' || req.path === '/admin/api/login') return next();
  res.redirect('/admin/login');
}

// ============================================================
// Admin routes
// ============================================================

app.get('/admin/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/admin/api/login', (req, res) => {
  if (req.body.password === ADMIN_PASSWORD) {
    req.session.authenticated = true;
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: '비밀번호가 틀립니다.' });
  }
});

app.get('/admin/api/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/admin/login');
});

// Everything below requires auth
app.use('/admin', adminAuth);

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.use('/admin/static', express.static(path.join(__dirname, 'public')));

// ============================================================
// Admin API — data (reads/writes draft/)
// ============================================================

app.get('/admin/api/data/:file', (req, res) => {
  try {
    const filename = req.params.file;
    if (!DATA_FILES.includes(filename)) return res.status(404).json({ error: 'File not found' });
    const data = readDataFile(filename);
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.put('/admin/api/data/:file', (req, res) => {
  try {
    const filename = req.params.file;
    if (!DATA_FILES.includes(filename)) return res.status(404).json({ error: 'File not found' });
    writeDataFile(filename, req.body);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ============================================================
// Admin API — publish & revert
// ============================================================

app.post('/admin/api/publish', async (req, res) => {
  try {
    const count = publishDraft();
    // GitHub sync in background (don't block response)
    if (isGithubEnabled()) {
      syncToGithub(LIVE_EDIT_DIR)
        .then(r => console.log(`[github-sync] ${r.filessynced} files synced`))
        .catch(e => console.error('[github-sync] Error:', e.message));
    }
    res.json({ success: true, filesPublished: count });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/admin/api/revert', (req, res) => {
  try {
    const count = revertDraft();
    res.json({ success: true, filesReverted: count });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ============================================================
// Admin API — image upload & management
// ============================================================

function safePath(basePath, userPath) {
  const resolved = path.resolve(basePath, userPath);
  if (!resolved.startsWith(path.resolve(basePath) + path.sep) && resolved !== path.resolve(basePath)) {
    return null;
  }
  return resolved;
}

function isValidUtf8Name(name) {
  const buf = Buffer.from(name, 'utf-8');
  return !buf.includes(Buffer.from([0xef, 0xbf, 0xbd]));
}

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadDir = req.body.uploadDir || '';
      const targetDir = safePath(IMAGE_DIR, uploadDir);
      if (!targetDir) return cb(new Error('Invalid upload directory'));
      fs.mkdirSync(targetDir, { recursive: true });
      cb(null, targetDir);
    },
    filename: function (req, file, cb) {
      const customName = req.body.customName;
      if (customName) {
        const sanitized = path.basename(customName).replace(/[<>:"/\\|?*]/g, '_');
        if (!sanitized || sanitized === '.' || sanitized === '..') {
          return cb(null, Buffer.from(file.originalname, 'latin1').toString('utf8'));
        }
        const ext = path.extname(Buffer.from(file.originalname, 'latin1').toString('utf8'));
        const nameWithExt = sanitized.includes('.') ? sanitized : sanitized + ext;
        cb(null, nameWithExt);
      } else {
        const originalName = Buffer.from(file.originalname, 'latin1').toString('utf8');
        cb(null, originalName);
      }
    }
  }),
  limits: { fileSize: 10 * 1024 * 1024 }
});

app.post('/admin/api/upload', upload.single('image'), (req, res) => {
  try {
    const uploadDir = req.body.uploadDir || '';
    const savedName = req.file.filename;
    const relativePath = `image/${uploadDir ? uploadDir + '/' : ''}${savedName}`;
    res.json({ success: true, path: relativePath });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/admin/api/move-image', (req, res) => {
  try {
    const { from, to } = req.body;
    if (!from || !to) return res.status(400).json({ error: '경로가 필요합니다.' });
    if (!from.startsWith('image/') || !to.startsWith('image/')) return res.status(400).json({ error: 'Invalid path' });
    const toFileName = path.basename(to);
    if (!toFileName || toFileName === '.' || toFileName === '..' || /[<>:"/\\|?*]/.test(toFileName)) {
      return res.status(400).json({ error: '잘못된 파일 이름입니다.' });
    }
    const fromRel = from.replace(/^image\//, '');
    const toRel = to.replace(/^image\//, '');
    const fromFull = safePath(IMAGE_DIR, fromRel);
    const toFull = safePath(IMAGE_DIR, toRel);
    if (!fromFull || !toFull) return res.status(400).json({ error: 'Invalid path' });
    if (!fs.existsSync(fromFull)) return res.status(404).json({ error: '파일을 찾을 수 없습니다.' });
    if (fs.existsSync(toFull)) return res.status(400).json({ error: '같은 이름의 파일이 이미 존재합니다.' });
    const toDir = path.dirname(toFull);
    fs.mkdirSync(toDir, { recursive: true });
    fs.renameSync(fromFull, toFull);
    res.json({ success: true, newPath: to });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/admin/api/copy-image', (req, res) => {
  try {
    const { from, to } = req.body;
    if (!from || !to) return res.status(400).json({ error: '경로가 필요합니다.' });
    if (!from.startsWith('image/') || !to.startsWith('image/')) return res.status(400).json({ error: 'Invalid path' });
    const toFileName = path.basename(to);
    if (!toFileName || toFileName === '.' || toFileName === '..' || /[<>:"/\\|?*]/.test(toFileName)) {
      return res.status(400).json({ error: '잘못된 파일 이름입니다.' });
    }
    const fromRel = from.replace(/^image\//, '');
    const toRel = to.replace(/^image\//, '');
    const fromFull = safePath(IMAGE_DIR, fromRel);
    const toFull = safePath(IMAGE_DIR, toRel);
    if (!fromFull || !toFull) return res.status(400).json({ error: 'Invalid path' });
    if (!fs.existsSync(fromFull)) return res.status(404).json({ error: '파일을 찾을 수 없습니다.' });
    if (fs.existsSync(toFull)) return res.status(400).json({ error: '같은 이름의 파일이 이미 존재합니다.' });
    const toDir = path.dirname(toFull);
    fs.mkdirSync(toDir, { recursive: true });
    fs.copyFileSync(fromFull, toFull);
    res.json({ success: true, newPath: to });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/admin/api/folder-list', (req, res) => {
  try {
    const folders = [''];
    function walk(dir, prefix) {
      if (!fs.existsSync(dir)) return;
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.isDirectory() && isValidUtf8Name(entry.name)) {
          const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
          folders.push(rel);
          walk(path.join(dir, entry.name), rel);
        }
      }
    }
    walk(IMAGE_DIR, '');
    res.json(folders);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/admin/api/images', (req, res) => {
  try {
    const result = [];
    function walk(dir, prefix) {
      if (!fs.existsSync(dir)) return;
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
        if (entry.isDirectory()) {
          walk(path.join(dir, entry.name), rel);
        } else if (/\.(jpg|jpeg|png|gif|webp)$/i.test(entry.name)) {
          result.push(`image/${rel}`);
        }
      }
    }
    walk(IMAGE_DIR, '');
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/admin/api/image-tree', (req, res) => {
  try {
    function buildTree(dir, prefix) {
      if (!fs.existsSync(dir)) return [];
      const entries = fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => {
        if (a.isDirectory() && !b.isDirectory()) return -1;
        if (!a.isDirectory() && b.isDirectory()) return 1;
        return a.name.localeCompare(b.name);
      });
      return entries.filter(entry => isValidUtf8Name(entry.name)).map(entry => {
        const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
        if (entry.isDirectory()) {
          return { name: entry.name, type: 'folder', path: `image/${rel}`, children: buildTree(path.join(dir, entry.name), rel) };
        } else if (/\.(jpg|jpeg|png|gif|webp)$/i.test(entry.name)) {
          const stat = fs.statSync(path.join(dir, entry.name));
          return { name: entry.name, type: 'file', path: `image/${rel}`, size: stat.size };
        }
        return null;
      }).filter(Boolean);
    }
    res.json(buildTree(IMAGE_DIR, ''));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/admin/api/unused-images', (req, res) => {
  try {
    const usedPaths = new Set();
    // Scan draft edit files
    const draftDir = DRAFT_EDIT_DIR;
    if (fs.existsSync(draftDir)) {
      const editFiles = fs.readdirSync(draftDir).filter(f => f.endsWith('.js'));
      for (const file of editFiles) {
        const content = fs.readFileSync(path.join(draftDir, file), 'utf-8');
        const quoted = content.match(/["'`](image\/[^"'`\n\r]+?\.(jpg|jpeg|png|gif|webp))/gi) || [];
        quoted.forEach(m => usedPaths.add(m.slice(1)));
      }
    }
    // Also scan live edit files
    const liveDir = path.join(DOCS_DIR, 'edit');
    if (fs.existsSync(liveDir)) {
      const editFiles = fs.readdirSync(liveDir).filter(f => f.endsWith('.js'));
      for (const file of editFiles) {
        const content = fs.readFileSync(path.join(liveDir, file), 'utf-8');
        const quoted = content.match(/["'`](image\/[^"'`\n\r]+?\.(jpg|jpeg|png|gif|webp))/gi) || [];
        quoted.forEach(m => usedPaths.add(m.slice(1)));
      }
    }

    const allImages = [];
    function scan(dir, prefix) {
      if (!fs.existsSync(dir)) return;
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        if (!isValidUtf8Name(entry.name)) continue;
        const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
        if (entry.isDirectory()) {
          scan(path.join(dir, entry.name), rel);
        } else if (/\.(jpg|jpeg|png|gif|webp)$/i.test(entry.name)) {
          allImages.push(`image/${rel}`);
        }
      }
    }
    scan(IMAGE_DIR, '');

    const unused = allImages.filter(p => !usedPaths.has(p));
    res.json({ total: allImages.length, used: allImages.length - unused.length, unused });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/admin/api/create-folder', (req, res) => {
  try {
    const { folderPath } = req.body;
    if (!folderPath || !folderPath.startsWith('image/')) return res.status(400).json({ error: 'Invalid folder path' });
    const relativePart = folderPath.replace(/^image\//, '');
    const fullPath = safePath(IMAGE_DIR, relativePart);
    if (!fullPath) return res.status(400).json({ error: 'Invalid folder path' });
    fs.mkdirSync(fullPath, { recursive: true });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/admin/api/rename-folder', (req, res) => {
  try {
    const { from, to } = req.body;
    if (!from || !to) return res.status(400).json({ error: '경로가 필요합니다.' });
    if (!from.startsWith('image/') || !to.startsWith('image/')) return res.status(400).json({ error: 'Invalid path' });
    const newName = path.basename(to);
    if (!newName || newName === '.' || newName === '..' || /[<>:"/\\|?*]/.test(newName)) {
      return res.status(400).json({ error: '잘못된 폴더 이름입니다.' });
    }
    const fromRel = from.replace(/^image\//, '');
    const toRel = to.replace(/^image\//, '');
    const fromFull = safePath(IMAGE_DIR, fromRel);
    const toFull = safePath(IMAGE_DIR, toRel);
    if (!fromFull || !toFull) return res.status(400).json({ error: 'Invalid path' });
    if (!fs.existsSync(fromFull)) return res.status(404).json({ error: '폴더를 찾을 수 없습니다.' });
    if (fs.existsSync(toFull)) return res.status(400).json({ error: '같은 이름의 폴더가 이미 존재합니다.' });
    fs.renameSync(fromFull, toFull);
    res.json({ success: true, newPath: to });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/admin/api/copy-folder', (req, res) => {
  try {
    const { from, to } = req.body;
    if (!from || !to) return res.status(400).json({ error: '경로가 필요합니다.' });
    if (!from.startsWith('image/') || !to.startsWith('image/')) return res.status(400).json({ error: 'Invalid path' });
    const newName = path.basename(to);
    if (!newName || newName === '.' || newName === '..' || /[<>:"/\\|?*]/.test(newName)) {
      return res.status(400).json({ error: '잘못된 폴더 이름입니다.' });
    }
    const fromRel = from.replace(/^image\//, '');
    const toRel = to.replace(/^image\//, '');
    const fromFull = safePath(IMAGE_DIR, fromRel);
    const toFull = safePath(IMAGE_DIR, toRel);
    if (!fromFull || !toFull) return res.status(400).json({ error: 'Invalid path' });
    if (!fs.existsSync(fromFull)) return res.status(404).json({ error: '폴더를 찾을 수 없습니다.' });
    if (fs.existsSync(toFull)) return res.status(400).json({ error: '같은 이름의 폴더가 이미 존재합니다.' });
    fs.cpSync(fromFull, toFull, { recursive: true });
    res.json({ success: true, newPath: to });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.delete('/admin/api/images/:path(*)', (req, res) => {
  try {
    const imgPath = req.params.path;
    if (!imgPath.startsWith('image/')) return res.status(400).json({ error: 'Invalid path' });
    const relativePart = imgPath.replace(/^image\//, '');
    const fullPath = safePath(IMAGE_DIR, relativePart);
    if (!fullPath) return res.status(400).json({ error: 'Invalid path' });
    if (!fs.existsSync(fullPath)) return res.status(404).json({ error: 'File not found' });
    fs.unlinkSync(fullPath);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.delete('/admin/api/folder/:path(*)', (req, res) => {
  try {
    const folderPath = req.params.path;
    if (!folderPath.startsWith('image/')) return res.status(400).json({ error: 'Invalid path' });
    const relativePart = folderPath.replace(/^image\//, '');
    const fullPath = safePath(IMAGE_DIR, relativePart);
    if (!fullPath) return res.status(400).json({ error: 'Invalid path' });
    if (!fs.existsSync(fullPath)) return res.status(404).json({ error: 'Folder not found' });
    fs.rmSync(fullPath, { recursive: true });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ============================================================
// Admin preview — serves docs/ HTML with draft/ data
// ============================================================

const exitBtnHtml = `<a id="previewExitBtn" href="/admin" style="position:fixed;top:12px;right:16px;z-index:99999;background:#e74c3c;color:#fff;padding:7px 18px;border-radius:8px;font-size:14px;font-weight:600;text-decoration:none;box-shadow:0 2px 8px rgba(0,0,0,.25);cursor:pointer;transition:background .2s" onmouseover="this.style.background='#c0392b'" onmouseout="this.style.background='#e74c3c'">✕ 미리보기 나가기</a>`;

// Serve draft edit files and images for preview
app.use('/admin/preview-data/edit', express.static(DRAFT_EDIT_DIR));
app.use('/admin/preview/image', express.static(IMAGE_DIR));

app.get('/admin/preview', (req, res) => {
  const htmlPath = path.join(DOCS_DIR, 'index.html');
  if (!fs.existsSync(htmlPath)) return res.status(404).send('Page not found');
  let html = fs.readFileSync(htmlPath, 'utf-8');
  html = html.replace(/href="common\/style\.css"/g, 'href="/common/style.css"');
  html = html.replace(/src="common\/script\.js"/g, 'src="/common/script.js"');
  html = html.replace(/src="edit\//g, 'src="/admin/preview-data/edit/');
  html = html.replace(/href="common\/notice\.html#faq"/g, 'href="/admin/preview/notice#faq"');
  html = html.replace(/href="common\/([a-z-]+)\.html"/g, 'href="/admin/preview/$1"');
  html = html.replace(/href="index\.html"/g, 'href="/admin/preview"');
  html = html.replace('</body>', exitBtnHtml + '</body>');
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.send(html);
});

app.get('/admin/preview/:page', (req, res) => {
  const page = req.params.page;
  if (!PUBLIC_PAGES.includes(page)) return res.status(404).send('Page not found');
  const htmlPath = path.join(DOCS_DIR, 'common', `${page}.html`);
  if (!fs.existsSync(htmlPath)) return res.status(404).send('Page not found');
  let html = fs.readFileSync(htmlPath, 'utf-8');
  html = html.replace(/href="style\.css"/g, 'href="/common/style.css"');
  html = html.replace(/src="script\.js"/g, 'src="/common/script.js"');
  html = html.replace(/\.\.\/edit\//g, '/admin/preview-data/edit/');
  html = html.replace(/"\.\.\/index\.html"/g, '"/admin/preview"');
  html = html.replace(/href="([a-z-]+)\.html"/g, 'href="/admin/preview/$1"');
  html = html.replace('</body>', exitBtnHtml + '</body>');
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.send(html);
});

// ============================================================
// Serve images for admin (same image dir)
// ============================================================
app.use('/admin/image', express.static(IMAGE_DIR));
app.use('/docs/image', express.static(IMAGE_DIR));
app.use('/docs/common', express.static(path.join(DOCS_DIR, 'common')));
app.use('/docs/edit', express.static(LIVE_EDIT_DIR));

// ============================================================
// Init & start
// ============================================================

initPersistentData();
ensureDraft();
console.log('[init] Data initialized.');

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
  console.log(`  Public site: http://localhost:${PORT}/`);
  console.log(`  Admin panel: http://localhost:${PORT}/admin`);
});
