let allData = {};
let hasChanges = false;
let currentTab = 'home';
let autoSaveTimer = null;

/* ── 로딩 오버레이 ── */
function showLoading(title) {
  const el = document.getElementById('loadingOverlay');
  document.getElementById('loadingTitle').textContent = title || '처리 중...';
  document.getElementById('loadingBar').style.width = '0%';
  document.getElementById('loadingPct').textContent = '0%';
  document.getElementById('loadingCount').textContent = '';
  document.getElementById('loadingDesc').textContent = '';
  el.classList.add('show');
  // 자연스러운 프로그레스 애니메이션 시작
  showLoading._interval = setInterval(() => {
    const bar = document.getElementById('loadingBar');
    const pct = document.getElementById('loadingPct');
    const cur = parseFloat(bar.style.width) || 0;
    if (cur < 90) {
      const next = cur + (90 - cur) * 0.08;
      bar.style.width = next + '%';
      pct.textContent = Math.round(next) + '%';
    }
  }, 150);
}
function hideLoading(success) {
  clearInterval(showLoading._interval);
  const bar = document.getElementById('loadingBar');
  const pct = document.getElementById('loadingPct');
  bar.style.width = '100%';
  pct.textContent = '100%';
  document.getElementById('loadingDesc').textContent = success ? '완료!' : '실패';
  setTimeout(() => {
    document.getElementById('loadingOverlay').classList.remove('show');
  }, 400);
}

const TAB_FILE_MAP = {
  home: 'home.js',
  schedule: 'schedule.js',
  events: 'events.js',
  'official-clubs': 'official-clubs.js',
  clubs: 'clubs.js',
  partners: 'partners.js',
  notice: 'notice.js',
  sns: 'sns.js',
};

// waitForInit removed — no longer needed (no GitHub init)

document.querySelectorAll('.admin-nav button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.admin-nav button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    currentTab = btn.dataset.tab;
    document.getElementById(`section-${currentTab}`).classList.add('active');
    if (currentTab === 'files') renderFileManager();
  });
});

async function loadData() {
  const files = ['home.js', 'schedule.js', 'events.js', 'official-clubs.js', 'clubs.js', 'partners.js', 'notice.js', 'sns.js'];
  await Promise.all(files.map(async (file) => {
    try {
      const res = await fetch(`/admin/api/data/${file}`);
      allData[file] = await res.json();
    } catch (e) {
      console.error(`Error loading ${file}:`, e);
    }
  }));
  renderAll();
}

function renderAll() {
  renderHome();
  renderSchedule();
  renderEvents();
  renderOfficialClubs();
  renderClubs();
  renderPartners();
  renderNotice();
  renderSns();
}

function markChanged() {
  hasChanges = true;
  document.getElementById('statusBar').classList.add('show');
  scheduleAutoSave();
}

function scheduleAutoSave() {
  clearTimeout(autoSaveTimer);
  if (currentTab === 'files') return;
  const filename = TAB_FILE_MAP[currentTab];
  if (!filename) return;
  showSaveIndicator('pending');
  autoSaveTimer = setTimeout(() => autoSave(filename), 2000);
}

async function autoSave(filename) {
  showSaveIndicator('saving');
  await saveFile(filename, { silent: true });
}

// Loading overlay and SSE functions removed — no longer needed (local file operations are instant)

function showSaveIndicator(state) {
  const el = document.getElementById('saveIndicator');
  if (!el) return;
  const states = {
    pending: { text: '●', cls: 'pending', title: '저장 대기 중' },
    saving:  { text: '저장 중...', cls: 'saving', title: '' },
    saved:   { text: '저장됨 ✓', cls: 'saved', title: '' },
    error:   { text: '저장 실패 ⚠', cls: 'error', title: '클릭하여 재시도' },
  };
  const s = states[state];
  el.textContent = s.text;
  el.className = `save-indicator ${s.cls}`;
  el.title = s.title;
  el.onclick = null;
  if (state === 'saved') setTimeout(() => { el.textContent = ''; el.className = 'save-indicator'; }, 1500);
  if (state === 'error') el.onclick = () => {
    const f = TAB_FILE_MAP[currentTab];
    if (f) saveFile(f, { silent: true });
  };
}

async function saveFile(filename, { silent = false } = {}) {
  try {
    const res = await fetch(`/admin/api/data/${filename}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(allData[filename])
    });
    if (res.ok) {
      if (!silent) showToast('저장되었습니다!', 'success');
      showSaveIndicator('saved');
      hasChanges = false;
      document.getElementById('statusBar').classList.remove('show');
    } else {
      const err = await res.json();
      if (!silent) showToast('저장 실패: ' + err.error, 'error');
      showSaveIndicator('error');
    }
  } catch (e) {
    if (!silent) showToast('저장 실패: ' + e.message, 'error');
    showSaveIndicator('error');
  }
}

function showToast(msg, type = 'info') {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.className = `toast ${type} show`;
  setTimeout(() => toast.classList.remove('show'), 3000);
}

function resolveImageSrc(imgPath) {
  if (!imgPath) return '';
  if (imgPath.startsWith('http')) return imgPath;
  return `/${imgPath}`;
}

async function uploadImage(file, uploadDir = '', customName = '') {
  const formData = new FormData();
  formData.append('uploadDir', uploadDir);
  if (customName) formData.append('customName', customName);
  formData.append('image', file);
  const res = await fetch('/admin/api/upload', { method: 'POST', body: formData });
  const data = await res.json();
  if (data.success) return data.path;
  throw new Error(data.error);
}

async function loadFolderList() {
  try {
    const res = await fetch('/admin/api/folder-list');
    return await res.json();
  } catch (e) { return ['']; }
}

let editorSelectedDir = '';

function openFolderBrowser(currentDir, onSelect) {
  let browsingPath = currentDir || '';

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay show';
  overlay.style.zIndex = '10001';

  function render() {
    const displayPath = browsingPath ? `image/${browsingPath}` : 'image';
    overlay.innerHTML = `
      <div class="folder-browser-modal">
        <div class="fb-header">
          <h3>📁 폴더 선택</h3>
          <button class="img-editor-close" id="fbClose">&times;</button>
        </div>
        <div class="fb-breadcrumb" id="fbBreadcrumb"></div>
        <div class="fb-grid" id="fbGrid"><div class="empty-state"><div class="empty-icon">⏳</div>로딩 중...</div></div>
        <div class="fb-footer">
          <div class="fb-current-path">📍 <span id="fbCurrentPath">${displayPath}</span></div>
          <div class="fb-actions">
            <button class="btn-add btn-sm" id="fbNewFolder">+ 새 폴더</button>
            <button class="btn-cancel btn-sm" id="fbCancel">취소</button>
            <button class="btn-deploy btn-sm" id="fbSelect">이 폴더 선택</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    const breadcrumb = overlay.querySelector('#fbBreadcrumb');
    const parts = ['image', ...(browsingPath ? browsingPath.split('/') : [])];
    breadcrumb.innerHTML = '';
    parts.forEach((part, i) => {
      const span = document.createElement('span');
      span.textContent = part;
      span.className = 'fb-bc-item' + (i === parts.length - 1 ? ' current' : '');
      if (i < parts.length - 1) {
        span.style.cursor = 'pointer';
        span.onclick = () => {
          if (i === 0) browsingPath = '';
          else browsingPath = parts.slice(1, i + 1).join('/');
          overlay.remove();
          render();
        };
      }
      breadcrumb.appendChild(span);
      if (i < parts.length - 1) {
        const sep = document.createElement('span');
        sep.textContent = ' / ';
        sep.className = 'fb-bc-sep';
        breadcrumb.appendChild(sep);
      }
    });

    loadFolderContents(browsingPath).then(folders => {
      const grid = overlay.querySelector('#fbGrid');
      grid.innerHTML = '';

      if (browsingPath) {
        const upItem = document.createElement('div');
        upItem.className = 'fb-item';
        upItem.innerHTML = `<div class="fb-icon">⬆️</div><div class="fb-name">상위 폴더</div>`;
        upItem.onclick = () => {
          const parentParts = browsingPath.split('/');
          parentParts.pop();
          browsingPath = parentParts.join('/');
          overlay.remove();
          render();
        };
        grid.appendChild(upItem);
      }

      if (folders.length === 0 && !browsingPath) {
        grid.innerHTML = '<div class="fb-empty">폴더가 없습니다</div>';
      }

      folders.forEach(f => {
        const el = document.createElement('div');
        el.className = 'fb-item';
        el.innerHTML = `<div class="fb-icon">📁</div><div class="fb-name">${f.name}</div>`;
        el.onclick = () => {
          browsingPath = f.rel;
          overlay.remove();
          render();
        };
        grid.appendChild(el);
      });
    });

    overlay.querySelector('#fbClose').onclick = () => overlay.remove();
    overlay.querySelector('#fbCancel').onclick = () => overlay.remove();
    overlay.querySelector('#fbSelect').onclick = () => {
      overlay.remove();
      onSelect(browsingPath);
    };
    overlay.querySelector('#fbNewFolder').onclick = async () => {
      const name = prompt('새 폴더 이름을 입력하세요:');
      if (!name) return;
      const folderPath = browsingPath ? `image/${browsingPath}/${name}` : `image/${name}`;
      try {
        await fetch('/admin/api/create-folder', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ folderPath })
        });
        showToast('폴더 생성 완료', 'success');
        overlay.remove();
        browsingPath = browsingPath ? `${browsingPath}/${name}` : name;
        render();
      } catch (e) { showToast('폴더 생성 실패', 'error'); }
    };
  }

  render();
}

async function loadFolderContents(dirPath) {
  try {
    const res = await fetch('/admin/api/image-tree');
    const tree = await res.json();
    if (!dirPath) {
      return tree.filter(i => i.type === 'folder').map(f => ({ name: f.name, rel: f.name }));
    }
    const parts = dirPath.split('/');
    let current = tree;
    for (const part of parts) {
      const found = current.find(item => item.name === part && item.type === 'folder');
      if (!found) return [];
      current = found.children || [];
    }
    return current.filter(i => i.type === 'folder').map(f => ({ name: f.name, rel: dirPath + '/' + f.name }));
  } catch (e) { return []; }
}

function updateEditorFolderDisplay() {
  const display = document.getElementById('imgEditorFolderDisplay');
  if (display) {
    display.textContent = editorSelectedDir ? `image/${editorSelectedDir}` : 'image/ (루트)';
  }
}

function openEditorFolderBrowser() {
  openFolderBrowser(editorSelectedDir, (dir) => {
    editorSelectedDir = dir;
    updateEditorFolderDisplay();
  });
}

function getEditorUploadDir() {
  return editorSelectedDir;
}

function getEditorCustomName() {
  return document.getElementById('imgEditorFileName').value.trim();
}

function openPreview() {
  const pageMap = {
    'home': '',
    'schedule': 'schedule',
    'events': 'events',
    'official-clubs': 'official-clubs',
    'clubs': 'clubs',
    'partners': 'partners',
    'notice': 'notice'
  };
  const target = pageMap[currentTab];
  if (target) window.open(`/admin/preview/${target}`, '_blank');
  else window.open('/admin/preview', '_blank');
}

function showRevertModal() { document.getElementById('revertModal').classList.add('show'); }
function closeRevertModal() { document.getElementById('revertModal').classList.remove('show'); }

async function revertToLive() {
  closeRevertModal();
  showLoading('📥 라이브 데이터로 되돌리는 중...');
  try {
    const res = await fetch('/admin/api/revert', { method: 'POST' });
    const data = await res.json();
    if (data.success) {
      hideLoading(true);
      hasChanges = false;
      document.getElementById('statusBar').classList.remove('show');
      await loadData();
      showToast('라이브 데이터로 되돌리기 완료!', 'success');
    } else {
      hideLoading(false);
      showToast('되돌리기 실패: ' + (data.error || '알 수 없는 오류'), 'error');
    }
  } catch (e) {
    hideLoading(false);
    showToast('되돌리기 실패: ' + e.message, 'error');
  }
}

function showDeployModal() { document.getElementById('deployModal').classList.add('show'); }
function closeDeployModal() { document.getElementById('deployModal').classList.remove('show'); }

async function deploy() {
  closeDeployModal();
  showLoading('✅ 사이트에 적용하는 중...');
  try {
    const res = await fetch('/admin/api/publish', { method: 'POST' });
    const data = await res.json();
    if (data.success) {
      hideLoading(true);
      hasChanges = false;
      document.getElementById('statusBar').classList.remove('show');
      showToast('적용 완료! 사이트에 반영되었습니다.', 'success');
    } else {
      hideLoading(false);
      showToast('적용 실패: ' + (data.error || '알 수 없는 오류'), 'error');
    }
  } catch (e) {
    hideLoading(false);
    showToast('적용 실패: ' + e.message, 'error');
  }
}

function renderHome() {
  const section = document.getElementById('section-home');
  const data = allData['home.js'];
  if (!data) { section.innerHTML = '<p>데이터를 불러올 수 없습니다.</p>'; return; }
  const intro = data.homeData.introduction || {};
  const sns = data.homeData.sns || [];
  const suggestLink = data.homeData.suggestLink || '';

  section.innerHTML = `
    <div class="section-header"><h2>🏠 메인 페이지</h2></div>
    <div class="card" style="margin-bottom:20px">
      <div class="card-header"><h3>소개 영역</h3></div>
      <div id="homeIntroForm"></div>
    </div>
    <div class="card" style="margin-bottom:20px">
      <div class="card-header"><h3>건의사항 링크</h3></div>
      <div id="homeSuggestForm"></div>
    </div>
    <div class="card">
      <div class="card-header"><h3>SNS 목록</h3>
        <button class="btn-add" onclick="addSns()">+ 추가</button>
      </div>
      <div id="homeSnsList"></div>
    </div>
  `;

  const introForm = document.getElementById('homeIntroForm');
  introForm.appendChild(makeFormGroup('제목', 'text', intro.title, v => { data.homeData.introduction.title = v; markChanged(); }));
  introForm.appendChild(makeFormGroup('부제목', 'text', intro.subtitle, v => { data.homeData.introduction.subtitle = v; markChanged(); }));
  introForm.appendChild(makeFormGroup('설명', 'textarea', intro.description, v => { data.homeData.introduction.description = v; markChanged(); }, { rows: 3 }));

  const suggestForm = document.getElementById('homeSuggestForm');
  suggestForm.appendChild(makeFormGroup('건의사항 폼 링크 (구글폼 등)', 'text', suggestLink, v => { data.homeData.suggestLink = v; markChanged(); }));

  renderSnsList();
}

const SNS_BRANDS = [
  { match: ['instagram.com', 'instagr.am'], color: '#E4405F', icon: '📷', name: '인스타그램' },
  { match: ['youtube.com', 'youtu.be'], color: '#FF0000', icon: '▶️', name: '유튜브' },
  { match: ['twitter.com', 'x.com'], color: '#000000', icon: '🐦', name: 'X (트위터)' },
  { match: ['facebook.com', 'fb.com'], color: '#1877F2', icon: '👤', name: '페이스북' },
  { match: ['pf.kakao.com', 'plus.kakao.com', 'open.kakao.com'], color: '#FEE500', icon: '💬', name: '카카오' },
  { match: ['talk.naver.com', 'blog.naver.com', 'naver.com'], color: '#03C75A', icon: '🟢', name: '네이버' },
  { match: ['band.us'], color: '#6EC72D', icon: '🟩', name: '밴드' },
  { match: ['tiktok.com'], color: '#000000', icon: '🎵', name: '틱톡' },
  { match: ['t.me', 'telegram.org'], color: '#0088CC', icon: '✈️', name: '텔레그램' },
  { match: ['discord.gg', 'discord.com'], color: '#5865F2', icon: '🎮', name: '디스코드' },
  { match: ['threads.net'], color: '#000000', icon: '🧵', name: '쓰레드' },
  { match: ['linkedin.com'], color: '#0A66C2', icon: '💼', name: '링크드인' },
];

function detectSnsBrand(url) {
  if (!url) return null;
  const lower = url.toLowerCase();
  return SNS_BRANDS.find(b => b.match.some(m => lower.includes(m))) || null;
}

function autoSetSnsColor(item) {
  const brand = detectSnsBrand(item.url);
  if (brand) {
    item.color = brand.color;
    if (!item.icon || item.icon === '📱') item.icon = brand.icon;
  }
}

function renderSnsList() {
  const container = document.getElementById('homeSnsList');
  if (!container) return;
  const sns = allData['home.js'].homeData.sns || [];
  container.innerHTML = '';
  sns.forEach((item, idx) => {
    const card = document.createElement('div');
    card.className = 'item-card';
    const iconPreview = item.iconImage
      ? `<img src="${resolveImageSrc(item.iconImage)}" style="width:24px;height:24px;border-radius:4px;object-fit:cover" onerror="this.style.display='none'">`
      : (item.icon || '');
    card.innerHTML = `
      <div class="item-header">
        <span class="item-title" style="display:flex;align-items:center;gap:8px">
          <span style="display:inline-block;width:24px;height:24px;border-radius:6px;background:${item.color || '#ccc'}"></span>
          ${iconPreview} ${item.name || '(이름 없음)'}
        </span>
        <div class="item-actions">
          ${idx > 0 ? `<button class="btn-move" onclick="event.stopPropagation();moveSns(${idx},-1)">⬆️</button>` : ''}
          ${idx < sns.length - 1 ? `<button class="btn-move" onclick="event.stopPropagation();moveSns(${idx},1)">⬇️</button>` : ''}
          <button class="btn-edit" onclick="event.stopPropagation();this.closest('.item-card').classList.toggle('editing')">✏️ 편집</button>
          <button class="btn-delete" onclick="event.stopPropagation();if(confirm('삭제하시겠습니까?')){allData['home.js'].homeData.sns.splice(${idx},1);markChanged();renderSnsList()}">🗑️</button>
        </div>
      </div>
    `;
    const form = document.createElement('div');
    form.className = 'edit-form';
    form.appendChild(makeFormGroup('이름', 'text', item.name, v => { item.name = v; markChanged(); }));
    form.appendChild(makeFormGroup('아이콘 (이모지)', 'text', item.icon, v => { item.icon = v; markChanged(); }));

    const iconImgGroup = document.createElement('div');
    iconImgGroup.className = 'form-group';
    const iconImgLabel = document.createElement('label');
    iconImgLabel.innerHTML = `아이콘 이미지 (이모지 대신 사용) <span class="size-hint">권장: 너비 64px · 높이 64px</span>`;
    iconImgGroup.appendChild(iconImgLabel);
    if (item.iconImage) {
      const preview = document.createElement('img');
      preview.src = resolveImageSrc(item.iconImage);
      preview.className = 'field-img-preview';
      preview.onerror = function() { this.style.display = 'none'; };
      iconImgGroup.appendChild(preview);
    }
    const iconPickBtn = document.createElement('button');
    iconPickBtn.textContent = '📷 이미지 선택';
    iconPickBtn.className = 'btn-add';
    iconPickBtn.style.marginTop = '4px';
    iconPickBtn.onclick = () => {
      showImageSourcePicker('로고', '권장: 너비 200px · 높이 200px', (path) => {
        item.iconImage = path;
        markChanged();
        renderSnsList();
      });
    };
    iconImgGroup.appendChild(iconPickBtn);
    if (item.iconImage) {
      const removeBtn = document.createElement('button');
      removeBtn.textContent = '이미지 제거';
      removeBtn.className = 'btn-delete';
      removeBtn.style.marginTop = '4px';
      removeBtn.onclick = () => { item.iconImage = null; markChanged(); renderSnsList(); };
      iconImgGroup.appendChild(removeBtn);
    }
    form.appendChild(iconImgGroup);

    form.appendChild(makeFormGroup('링크 URL', 'text', item.url, v => { item.url = v; markChanged(); }));
    form.appendChild(makeFormGroup('배경색 (HEX)', 'text', item.color, v => { item.color = v; markChanged(); }));
    card.appendChild(form);
    container.appendChild(card);
  });
}

function addSns() {
  if (!allData['home.js']) return;
  allData['home.js'].homeData.sns.push({ name: '', icon: '📱', url: '', color: '#333333', iconImage: null });
  markChanged();
  renderSnsList();
}

function moveSns(idx, dir) {
  const arr = allData['home.js'].homeData.sns;
  const newIdx = idx + dir;
  if (newIdx < 0 || newIdx >= arr.length) return;
  [arr[idx], arr[newIdx]] = [arr[newIdx], arr[idx]];
  markChanged();
  renderSnsList();
}

function sizeHint(text) {
  return `<span class="size-hint">${text}</span>`;
}

function makeFormGroup(label, type, value, onChange, options = {}) {
  const group = document.createElement('div');
  group.className = 'form-group';
  const lbl = document.createElement('label');
  lbl.innerHTML = label + (options.sizeHint ? ` ${sizeHint(options.sizeHint)}` : '');
  group.appendChild(lbl);

  if (type === 'select') {
    const sel = document.createElement('select');
    (options.choices || []).forEach(c => {
      const opt = document.createElement('option');
      opt.value = c;
      opt.textContent = c;
      if (c === value) opt.selected = true;
      sel.appendChild(opt);
    });
    sel.addEventListener('change', () => onChange(sel.value));
    group.appendChild(sel);
  } else if (type === 'textarea') {
    const ta = document.createElement('textarea');
    ta.value = value || '';
    ta.rows = options.rows || 4;
    ta.addEventListener('input', () => onChange(ta.value));
    group.appendChild(ta);
  } else {
    const inp = document.createElement('input');
    inp.type = type;
    inp.value = value || '';
    inp.placeholder = options.placeholder || '';
    inp.addEventListener('input', () => onChange(inp.value));
    group.appendChild(inp);
  }
  return group;
}

function setupDragReorder(card, idx, items, renderFn) {
  card.dataset.idx = idx;
  card.draggable = true;
  card.addEventListener('dragstart', (e) => {
    if (card.classList.contains('editing')) { e.preventDefault(); return; }
    card.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', idx);
  });
  card.addEventListener('dragend', () => card.classList.remove('dragging'));
  card.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    const rect = card.getBoundingClientRect();
    const midY = rect.top + rect.height / 2;
    card.classList.toggle('drag-over-top', e.clientY < midY);
    card.classList.toggle('drag-over-bottom', e.clientY >= midY);
  });
  card.addEventListener('dragleave', () => {
    card.classList.remove('drag-over-top', 'drag-over-bottom');
  });
  card.addEventListener('drop', (e) => {
    e.preventDefault();
    card.classList.remove('drag-over-top', 'drag-over-bottom');
    const fromIdx = parseInt(e.dataTransfer.getData('text/plain'));
    let toIdx = parseInt(card.dataset.idx);
    if (fromIdx === toIdx) return;
    const rect = card.getBoundingClientRect();
    const isTopHalf = e.clientY < rect.top + rect.height / 2;
    const [moved] = items.splice(fromIdx, 1);
    if (fromIdx < toIdx) toIdx--;
    if (!isTopHalf) toIdx++;
    items.splice(toIdx, 0, moved);
    markChanged();
    renderFn();
  });
}

function addMoveButtons(container, idx, items, renderFn) {
  if (idx > 0) {
    const btn = document.createElement('button');
    btn.className = 'btn-move-sm';
    btn.textContent = '▲';
    btn.title = '위로 이동';
    btn.onclick = (e) => { e.stopPropagation(); [items[idx], items[idx-1]] = [items[idx-1], items[idx]]; markChanged(); renderFn(); };
    container.appendChild(btn);
  }
  if (idx < items.length - 1) {
    const btn = document.createElement('button');
    btn.className = 'btn-move-sm';
    btn.textContent = '▼';
    btn.title = '아래로 이동';
    btn.onclick = (e) => { e.stopPropagation(); [items[idx], items[idx+1]] = [items[idx+1], items[idx]]; markChanged(); renderFn(); };
    container.appendChild(btn);
  }
}

function renderSchedule() {
  const section = document.getElementById('section-schedule');
  const data = allData['schedule.js'];
  if (!data) { section.innerHTML = '<div class="empty-state"><div class="empty-icon">⏳</div>로딩 중...</div>'; return; }

  let html = '';
  html += `<div class="config-card"><h3>⚙️ 페이지 설정</h3><div class="form-group"><label>페이지 제목</label><input type="text" value="${data.scheduleConfig.pageTitle}" onchange="allData['schedule.js'].scheduleConfig.pageTitle=this.value;markChanged()"></div></div>`;
  html += `<div class="section-header"><h2>📅 월별 캘린더</h2></div>`;
  html += `<div class="schedule-grid">`;
  data.calendarMonths.forEach((m, i) => {
    const imgSrc = resolveImageSrc(m.image);
    html += `<div class="schedule-item">
      <div class="month-label">${m.label}</div>
      <div class="schedule-img-upload" data-month-idx="${i}">
        <img src="${imgSrc}" onerror="this.style.display='none'" alt="${m.label}">
        <div class="schedule-img-overlay">📷 이미지 변경</div>
      </div>
      <div class="img-path-display">${m.image || '이미지 없음'}</div>
      <div class="size-hint-block">권장: 너비 800px · 높이 600px</div>
      <div class="toggle-row">
        <span style="font-size:0.85rem">${m.status === 'on' ? '표시중' : '숨김'}</span>
        <label class="toggle-switch">
          <input type="checkbox" ${m.status === 'on' ? 'checked' : ''} onchange="allData['schedule.js'].calendarMonths[${i}].status=this.checked?'on':'off';markChanged();renderSchedule()">
          <span class="toggle-slider"></span>
        </label>
      </div>
    </div>`;
  });
  html += `</div>`;
  section.innerHTML = html;

  section.querySelectorAll('.schedule-img-upload').forEach(el => {
    el.addEventListener('click', () => {
      const idx = parseInt(el.dataset.monthIdx);
      showImageSourcePicker('캘린더', '권장: 너비 800px · 높이 1200px', (path) => {
        allData['schedule.js'].calendarMonths[idx].image = path;
        markChanged();
        renderSchedule();
      });
    });
  });
}

function renderItemList(sectionId, filename, dataKey, configKey, fields, title) {
  const section = document.getElementById(`section-${sectionId}`);
  const data = allData[filename];
  if (!data) { section.innerHTML = '<div class="empty-state"><div class="empty-icon">⏳</div>로딩 중...</div>'; return; }

  const items = data[dataKey];
  const config = data[configKey];
  section.innerHTML = '';

  const configCard = document.createElement('div');
  configCard.className = 'config-card';
  configCard.innerHTML = `<h3>⚙️ 페이지 설정</h3>`;
  const configFields = document.createElement('div');
  configFields.className = 'form-row';
  Object.entries(config).forEach(([key, val]) => {
    if (Array.isArray(val)) {
      const g = makeFormGroup(key, 'text', val.join(', '), v => {
        data[configKey][key] = v.split(',').map(s => s.trim()).filter(Boolean);
        markChanged();
      });
      configFields.appendChild(g);
    } else if (typeof val === 'number') {
      const g = makeFormGroup(key, 'number', val, v => {
        data[configKey][key] = parseInt(v) || val;
        markChanged();
      });
      configFields.appendChild(g);
    } else {
      const g = makeFormGroup(key, 'text', val, v => {
        data[configKey][key] = v || null;
        markChanged();
      });
      configFields.appendChild(g);
    }
  });
  configCard.appendChild(configFields);
  section.appendChild(configCard);

  const header = document.createElement('div');
  header.className = 'section-header';
  header.innerHTML = `<h2>${title} (${items.length}개)</h2>`;
  const headerBtns = document.createElement('div');
  headerBtns.style.cssText = 'display:flex;gap:0.5rem';
  const addBtn = document.createElement('button');
  addBtn.className = 'btn-add';
  addBtn.textContent = '+ 새 항목';
  addBtn.onclick = () => {
    const newItem = {};
    fields.forEach(f => {
      if (f.type === 'object') newItem[f.key] = {};
      else newItem[f.key] = f.default !== undefined ? f.default : null;
    });
    items.push(newItem);
    markChanged();
    renderItemList(sectionId, filename, dataKey, configKey, fields, title);
  };
  headerBtns.appendChild(addBtn);
  header.appendChild(headerBtns);
  section.appendChild(header);

  const rerender = () => renderItemList(sectionId, filename, dataKey, configKey, fields, title);

  items.forEach((item, idx) => {
    const card = document.createElement('div');
    card.className = 'item-card';

    setupDragReorder(card, idx, items, rerender);

    const itemHeader = document.createElement('div');
    itemHeader.className = 'item-header';
    const titleDiv = document.createElement('div');
    titleDiv.className = 'item-title';
    titleDiv.innerHTML = `<span class="drag-handle" title="드래그하여 순서 변경">☰</span> ${item.category ? `<span class="badge">${item.category}</span>` : ''} ${item.title || item.question || item.label || `항목 ${idx + 1}`}`;
    const actions = document.createElement('div');
    actions.className = 'item-actions';

    addMoveButtons(actions, idx, items, rerender);

    const editBtn = document.createElement('button');
    editBtn.className = 'btn-edit';
    editBtn.textContent = '✏️ 편집';
    editBtn.onclick = () => {
      const isEditing = card.classList.toggle('editing');
      card.draggable = !isEditing;
    };
    actions.appendChild(editBtn);

    const delBtn = document.createElement('button');
    delBtn.className = 'btn-delete';
    delBtn.textContent = '🗑️';
    delBtn.onclick = () => {
      if (confirm('이 항목을 삭제하시겠습니까?')) {
        items.splice(idx, 1);
        markChanged();
        rerender();
      }
    };
    actions.appendChild(delBtn);

    itemHeader.appendChild(titleDiv);
    itemHeader.appendChild(actions);
    card.appendChild(itemHeader);

    const preview = document.createElement('div');
    preview.className = 'item-preview';
    const imgField = fields.find(f => f.key === 'image');
    if (imgField && item.image) {
      preview.innerHTML = `<img src="${resolveImageSrc(item.image)}" onerror="this.style.display='none'">`;
    }
    const descField = fields.find(f => f.key === 'description' || f.key === 'content' || f.key === 'answer');
    const descText = item.description || item.content || item.answer || '';
    preview.innerHTML += `<div class="preview-text"><div class="preview-desc">${descText.substring(0, 200).replace(/\n/g, ' ')}</div></div>`;
    card.appendChild(preview);

    const form = document.createElement('div');
    form.className = 'edit-form';
    fields.forEach(f => {
      // #2 Category dropdown from config categories
      if (f.key === 'category' && config && Array.isArray(config.categories)) {
        const g = makeFormGroup(f.label, 'select', item[f.key], v => {
          item[f.key] = v || null;
          markChanged();
        }, { choices: config.categories });
        form.appendChild(g);
        return;
      }
      if (f.type === 'image') {
        const g = document.createElement('div');
        g.className = 'form-group';
        const lbl = document.createElement('label');
        lbl.innerHTML = f.label + (f.sizeHint ? ` ${sizeHint(f.sizeHint)}` : '');
        g.appendChild(lbl);
        const row = document.createElement('div');
        row.style.cssText = 'display:flex;gap:0.5rem;align-items:center';
        const inp = document.createElement('input');
        inp.type = 'text';
        inp.value = item[f.key] || '';
        inp.placeholder = 'image/폴더/파일명.jpg';
        inp.style.flex = '1';
        inp.addEventListener('input', () => { item[f.key] = inp.value || null; markChanged(); });
        row.appendChild(inp);
        const uploadBtn = document.createElement('button');
        uploadBtn.textContent = '📷';
        uploadBtn.className = 'btn-add';
        uploadBtn.style.padding = '0.5rem';
        uploadBtn.onclick = () => {
          showImageSourcePicker(f.uploadDir || '', f.sizeHint || '', (path) => {
            item[f.key] = path;
            inp.value = path;
            markChanged();
            renderItemList(sectionId, filename, dataKey, configKey, fields, title);
          });
        };
        row.appendChild(uploadBtn);
        g.appendChild(row);
        if (item[f.key]) {
          const imgPreview = document.createElement('img');
          imgPreview.src = resolveImageSrc(item[f.key]);
          imgPreview.className = 'field-img-preview';
          imgPreview.onerror = function() { this.style.display = 'none'; };
          g.appendChild(imgPreview);
        }
        form.appendChild(g);
      } else if (f.type === 'object') {
        const g = document.createElement('div');
        g.className = 'form-group';
        const lbl = document.createElement('label');
        lbl.textContent = f.label;
        g.appendChild(lbl);
        const subObj = item[f.key] || {};
        (f.subFields || []).forEach(sf => {
          const sg = makeFormGroup(`  ${sf.label}`, 'text', subObj[sf.key] || '', v => {
            if (!item[f.key]) item[f.key] = {};
            item[f.key][sf.key] = v || null;
            markChanged();
          });
          g.appendChild(sg);
        });
        form.appendChild(g);
      } else if (f.type === 'mapcode') {
        const g = document.createElement('div');
        g.className = 'form-group';
        const lbl = document.createElement('label');
        lbl.innerHTML = f.label + ` ${sizeHint(f.sizeHint || '권장: 너비 400px · 높이 300px')}`;
        g.appendChild(lbl);
        const ta = document.createElement('textarea');
        ta.value = item[f.key] || '';
        ta.rows = f.rows || 6;
        ta.addEventListener('input', () => { item[f.key] = ta.value || null; markChanged(); });
        g.appendChild(ta);
        form.appendChild(g);
      } else {
        const inputType = f.type === 'textarea' ? 'textarea' : 'text';
        const g = makeFormGroup(f.label, inputType, item[f.key], v => {
          if (f.nullable && !v) item[f.key] = null;
          else item[f.key] = v;
          markChanged();
        }, { rows: f.rows || 4, placeholder: f.placeholder || '', sizeHint: f.sizeHint || '' });
        form.appendChild(g);
      }
    });

    const formActions = document.createElement('div');
    formActions.className = 'form-actions';
    const closeBtn = document.createElement('button');
    closeBtn.className = 'btn-cancel';
    closeBtn.textContent = '닫기';
    closeBtn.onclick = () => {
      card.classList.remove('editing');
      renderItemList(sectionId, filename, dataKey, configKey, fields, title);
    };
    formActions.appendChild(closeBtn);
    form.appendChild(formActions);
    card.appendChild(form);
    section.appendChild(card);
  });

  if (items.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.innerHTML = '<div class="empty-icon">📭</div><p>항목이 없습니다. "새 항목" 버튼으로 추가하세요.</p>';
    section.appendChild(empty);
  }
}

function renderEvents() {
  renderItemList('events', 'events.js', 'eventsData', 'eventsConfig', [
    { key: 'category', label: '카테고리', type: 'text' },
    { key: 'image', label: '이미지', type: 'image', uploadDir: '행사&공모전', sizeHint: '권장: 너비 800px · 높이 600px' },
    { key: 'subImage1', label: '서브 이미지 1', type: 'image', uploadDir: '행사&공모전', nullable: true, sizeHint: '권장: 너비 600px · 높이 400px' },
    { key: 'subImage2', label: '서브 이미지 2', type: 'image', uploadDir: '행사&공모전', nullable: true, sizeHint: '권장: 너비 600px · 높이 400px' },
    { key: 'title', label: '제목', type: 'text' },
    { key: 'date', label: '날짜', type: 'text', nullable: true, placeholder: '예: 2026.04.25(토) 또는 2026-04-25' },
    { key: 'organizer', label: '주관/주최', type: 'text', nullable: true },
    { key: 'location', label: '장소', type: 'text', nullable: true, placeholder: '없으면 비워두세요' },
    { key: 'description', label: '설명', type: 'textarea', rows: 6 },
    { key: 'link', label: '바로가기 링크', type: 'text', nullable: true },
    { key: 'applyLink', label: '신청 링크', type: 'text', nullable: true },
    { key: 'details', label: '상세정보', type: 'object', subFields: [
      { key: 'target', label: '대상' },
      { key: 'benefits', label: '혜택' },
      { key: 'schedule', label: '일정' },
      { key: 'contact', label: '문의처' },
    ]},
  ], '🎉 행사 & 공모전');
}

function renderOfficialClubs() {
  renderItemList('official-clubs', 'official-clubs.js', 'officialClubsData', 'officialClubsConfig', [
    { key: 'category', label: '카테고리', type: 'text' },
    { key: 'image', label: '대표 이미지', type: 'image', uploadDir: '정규동아리', sizeHint: '권장: 너비 800px · 높이 600px' },
    { key: 'subImage1', label: '서브 이미지 1', type: 'image', uploadDir: '정규동아리', nullable: true, sizeHint: '권장: 너비 600px · 높이 400px' },
    { key: 'subImage2', label: '서브 이미지 2', type: 'image', uploadDir: '정규동아리', nullable: true, sizeHint: '권장: 너비 600px · 높이 400px' },
    { key: 'title', label: '동아리명', type: 'text' },
    { key: 'description', label: '소개', type: 'textarea', rows: 5 },
    { key: 'detail', label: '상세 설명', type: 'textarea', rows: 3, nullable: true },
    { key: 'kakaoLink', label: '카카오톡 링크', type: 'text', nullable: true },
    { key: 'googleFormLink', label: '구글폼 링크', type: 'text', nullable: true },
    { key: 'qrCodeImage', label: 'QR코드 이미지', type: 'image', uploadDir: '정규동아리', nullable: true, sizeHint: '권장: 너비 200px · 높이 200px' },
    { key: 'contact', label: '연락처', type: 'text', nullable: true },
    { key: 'instagram', label: '인스타그램', type: 'text', nullable: true },
    { key: 'facebook', label: '페이스북', type: 'text', nullable: true },
  ], '🏆 정규 동아리');
}

function renderClubs() {
  renderItemList('clubs', 'clubs.js', 'clubsData', 'clubsConfig', [
    { key: 'category', label: '카테고리', type: 'text' },
    { key: 'image', label: '이미지', type: 'image', uploadDir: '자율동아리&소모임', sizeHint: '권장: 너비 800px · 높이 600px' },
    { key: 'subImage1', label: '서브 이미지 1', type: 'image', uploadDir: '자율동아리&소모임', nullable: true, sizeHint: '권장: 너비 600px · 높이 400px' },
    { key: 'subImage2', label: '서브 이미지 2', type: 'image', uploadDir: '자율동아리&소모임', nullable: true, sizeHint: '권장: 너비 600px · 높이 400px' },
    { key: 'title', label: '동아리명', type: 'text' },
    { key: 'description', label: '소개', type: 'textarea', rows: 3 },
    { key: 'kakaoLink', label: '카카오톡 링크', type: 'text', nullable: true },
    { key: 'detail', label: '상세 설명', type: 'textarea', rows: 4, nullable: true },
  ], '👥 자율 동아리 & 소모임');
}

function renderPartners() {
  renderItemList('partners', 'partners.js', 'partnersData', 'partnersConfig', [
    { key: 'category', label: '카테고리', type: 'text' },
    { key: 'image', label: '이미지', type: 'image', uploadDir: '제휴업체', sizeHint: '권장: 너비 800px · 높이 600px' },
    { key: 'title', label: '업체명', type: 'text' },
    { key: 'description', label: '설명', type: 'textarea', rows: 2 },
    { key: 'subImage1', label: '서브 이미지 1', type: 'image', uploadDir: '제휴업체', nullable: true, sizeHint: '권장: 너비 800px · 높이 600px' },
    { key: 'subImage2', label: '서브 이미지 2', type: 'image', uploadDir: '제휴업체', nullable: true, sizeHint: '권장: 너비 800px · 높이 600px' },
    { key: 'location', label: '위치', type: 'text' },
    { key: 'discount', label: '할인 정보', type: 'text' },
    { key: 'mapCodeModal', label: '카카오맵 코드', type: 'mapcode', rows: 6, nullable: true, sizeHint: '권장: 너비 560px · 높이 300px' },
  ], '🤝 제휴업체');
}

function renderNotice() {
  const section = document.getElementById('section-notice');
  const data = allData['notice.js'];
  if (!data) { section.innerHTML = '<div class="empty-state"><div class="empty-icon">⏳</div>로딩 중...</div>'; return; }
  // Migrate poll from string to object if needed
  if (data.notices) data.notices.forEach(n => {
    if (typeof n.poll === 'string') n.poll = { title: '바로가기', description: '', link: n.poll };
  });
  section.innerHTML = '';

  const configCard = document.createElement('div');
  configCard.className = 'config-card';
  configCard.innerHTML = `<h3>⚙️ 페이지 설정</h3>`;
  const configFields = document.createElement('div');
  configFields.className = 'form-row';
  Object.entries(data.noticeConfig).forEach(([key, val]) => {
    const g = makeFormGroup(key, 'text', val, v => { data.noticeConfig[key] = v; markChanged(); });
    configFields.appendChild(g);
  });
  configCard.appendChild(configFields);
  section.appendChild(configCard);

  const noticeHeader = document.createElement('div');
  noticeHeader.className = 'section-header';
  noticeHeader.innerHTML = `<h2>📢 공지사항 (${data.notices.length}개)</h2>`;
  const addNoticeBtn = document.createElement('button');
  addNoticeBtn.className = 'btn-add';
  addNoticeBtn.textContent = '+ 새 공지';
  addNoticeBtn.onclick = () => {
    data.notices.push({ title: '새 공지사항', date: new Date().toISOString().slice(0, 10), category: '공지', content: '', poll: null });
    markChanged();
    renderNotice();
  };
  noticeHeader.appendChild(addNoticeBtn);
  section.appendChild(noticeHeader);

  data.notices.forEach((n, idx) => {
    const card = document.createElement('div');
    card.className = 'item-card';
    setupDragReorder(card, idx, data.notices, renderNotice);
    card.innerHTML = `
      <div class="item-header">
        <div class="item-title"><span class="drag-handle" title="드래그하여 순서 변경">☰</span> <span class="badge">${n.category}</span> ${n.title}</div>
        <div class="item-actions"></div>
      </div>
      <div class="item-preview"><div class="preview-text"><span style="color:#999">${n.date}</span> · ${(n.content || '').substring(0, 100).replace(/\n/g, ' ')}</div></div>
    `;
    const actions = card.querySelector('.item-actions');
    addMoveButtons(actions, idx, data.notices, renderNotice);
    const editBtn = document.createElement('button');
    editBtn.className = 'btn-edit';
    editBtn.textContent = '✏️ 편집';
    editBtn.onclick = () => { const isEditing = card.classList.toggle('editing'); card.draggable = !isEditing; };
    actions.appendChild(editBtn);
    const delBtn = document.createElement('button');
    delBtn.className = 'btn-delete';
    delBtn.textContent = '🗑️';
    delBtn.onclick = () => { if (confirm('삭제?')) { data.notices.splice(idx, 1); markChanged(); renderNotice(); } };
    actions.appendChild(delBtn);
    const form = document.createElement('div');
    form.className = 'edit-form';
    form.appendChild(makeFormGroup('제목', 'text', n.title, v => { n.title = v; markChanged(); }));
    const row = document.createElement('div');
    row.className = 'form-row';
    row.appendChild(makeFormGroup('날짜', 'text', n.date, v => { n.date = v; markChanged(); }));
    row.appendChild(makeFormGroup('카테고리', 'select', n.category, v => { n.category = v; markChanged(); }, { choices: ['공지', '안내'] }));
    form.appendChild(row);
    form.appendChild(makeFormGroup('내용', 'textarea', n.content, v => { n.content = v; markChanged(); }, { rows: 5 }));
    // Poll (structured: {title, description, link} or null)
    const pollGroup = document.createElement('div');
    pollGroup.className = 'form-group';
    const pollLabel = document.createElement('label');
    pollLabel.textContent = '📎 링크 버튼 (선택사항)';
    pollGroup.appendChild(pollLabel);
    const pollToggle = document.createElement('label');
    pollToggle.style.cssText = 'display:flex;align-items:center;gap:0.5rem;font-size:0.85rem;margin-bottom:0.5rem;cursor:pointer';
    const pollCheck = document.createElement('input');
    pollCheck.type = 'checkbox';
    pollCheck.checked = !!n.poll;
    pollToggle.appendChild(pollCheck);
    pollToggle.appendChild(document.createTextNode('링크 버튼 사용'));
    pollGroup.appendChild(pollToggle);
    const pollFields = document.createElement('div');
    pollFields.className = 'form-row-3';
    pollFields.style.display = n.poll ? '' : 'none';
    const pObj = n.poll || { title: '바로가기', description: '', link: '' };
    pollFields.appendChild(makeFormGroup('버튼 텍스트', 'text', pObj.title, v => { pObj.title = v; if(n.poll) n.poll.title = v; markChanged(); }, { placeholder: '바로가기' }));
    pollFields.appendChild(makeFormGroup('설명', 'text', pObj.description, v => { pObj.description = v; if(n.poll) n.poll.description = v; markChanged(); }, { placeholder: '선택사항' }));
    pollFields.appendChild(makeFormGroup('URL', 'text', pObj.link, v => { pObj.link = v; if(n.poll) n.poll.link = v; markChanged(); }, { placeholder: 'https://...' }));
    pollGroup.appendChild(pollFields);
    pollCheck.addEventListener('change', () => {
      if (pollCheck.checked) {
        n.poll = { title: pObj.title || '바로가기', description: pObj.description || '', link: pObj.link || '' };
        pollFields.style.display = '';
      } else {
        n.poll = null;
        pollFields.style.display = 'none';
      }
      markChanged();
    });
    form.appendChild(pollGroup);
    card.appendChild(form);
    section.appendChild(card);
  });

  const faqHeader = document.createElement('div');
  faqHeader.className = 'section-header';
  faqHeader.style.marginTop = '2rem';
  faqHeader.innerHTML = `<h2>❓ FAQ (${data.faqs.length}개)</h2>`;
  const addFaqBtn = document.createElement('button');
  addFaqBtn.className = 'btn-add';
  addFaqBtn.textContent = '+ 새 FAQ';
  addFaqBtn.onclick = () => {
    data.faqs.push({ question: '새 질문', answer: '', category: '일반', link: null });
    markChanged();
    renderNotice();
  };
  faqHeader.appendChild(addFaqBtn);
  section.appendChild(faqHeader);

  data.faqs.forEach((f, idx) => {
    const card = document.createElement('div');
    card.className = 'item-card';
    setupDragReorder(card, idx, data.faqs, renderNotice);
    card.innerHTML = `
      <div class="item-header">
        <div class="item-title"><span class="drag-handle" title="드래그하여 순서 변경">☰</span> ${f.category ? `<span class="badge">${f.category}</span>` : ''} ${f.question}</div>
        <div class="item-actions"></div>
      </div>
      <div class="item-preview"><div class="preview-text">${(f.answer || '').substring(0, 100).replace(/\n/g, ' ')}</div></div>
    `;
    const actions = card.querySelector('.item-actions');
    addMoveButtons(actions, idx, data.faqs, renderNotice);
    const editBtn = document.createElement('button');
    editBtn.className = 'btn-edit';
    editBtn.textContent = '✏️ 편집';
    editBtn.onclick = () => { const isEditing = card.classList.toggle('editing'); card.draggable = !isEditing; };
    actions.appendChild(editBtn);
    const delBtn = document.createElement('button');
    delBtn.className = 'btn-delete';
    delBtn.textContent = '🗑️';
    delBtn.onclick = () => { if (confirm('삭제?')) { data.faqs.splice(idx, 1); markChanged(); renderNotice(); } };
    actions.appendChild(delBtn);
    const form = document.createElement('div');
    form.className = 'edit-form';
    form.appendChild(makeFormGroup('질문', 'text', f.question, v => { f.question = v; markChanged(); }));
    form.appendChild(makeFormGroup('답변', 'textarea', f.answer, v => { f.answer = v; markChanged(); }, { rows: 5 }));
    const frow = document.createElement('div');
    frow.className = 'form-row';
    frow.appendChild(makeFormGroup('카테고리', 'text', f.category, v => { f.category = v; markChanged(); }));
    frow.appendChild(makeFormGroup('바로가기 링크', 'text', f.link, v => { f.link = v || null; markChanged(); }, { placeholder: '없으면 비워두세요' }));
    form.appendChild(frow);
    card.appendChild(form);
    section.appendChild(card);
  });
}

let fileManagerCurrentPath = 'image';

function renderSns() {
  const section = document.getElementById('section-sns');
  const data = allData['sns.js'];
  if (!data) { section.innerHTML = '<p>데이터를 불러올 수 없습니다.</p>'; return; }
  if (!data.snsEmbeds) data.snsEmbeds = [];
  if (!data.snsHighlights) data.snsHighlights = [];

  section.innerHTML = `
    <div class="section-header"><h2>📸 SNS 피드</h2></div>
    <div class="card" style="margin-bottom:20px">
      <div class="card-header"><h3>📌 인스타그램 임베드 (기본 표시)</h3>
        <button class="btn-add" onclick="addSnsEmbed()">+ 추가</button>
      </div>
      <p style="color:#888;font-size:0.85rem;padding:0 1rem;margin-bottom:0.5rem">인스타그램 게시물 URL을 넣으면 자동으로 임베드되어 표시됩니다.</p>
      <div id="snsEmbedsList"></div>
    </div>
    <div class="card">
      <div class="card-header"><h3>⭐ 하이라이트 게시물 (수동 등록)</h3>
        <button class="btn-add" onclick="addSnsHighlight()">+ 추가</button>
      </div>
      <p style="color:#888;font-size:0.85rem;padding:0 1rem;margin-bottom:0.5rem">강조하고 싶은 게시물을 직접 등록합니다. 임베드 위에 카드 형태로 표시됩니다.</p>
      <div id="snsHighlightsList"></div>
    </div>
  `;

  renderSnsEmbedsList();
  renderSnsHighlightsList();
}

function renderSnsEmbedsList() {
  const container = document.getElementById('snsEmbedsList');
  if (!container) return;
  const embeds = allData['sns.js'].snsEmbeds || [];
  container.innerHTML = '';
  if (embeds.length === 0) {
    container.innerHTML = '<div class="empty-state" style="padding:1rem"><p style="color:#aaa">등록된 임베드가 없습니다.</p></div>';
    return;
  }
  embeds.forEach((item, idx) => {
    const card = document.createElement('div');
    card.className = 'item-card';
    const shortUrl = item.url ? item.url.replace(/https?:\/\/(www\.)?/, '').substring(0, 40) + '...' : '(URL 없음)';
    card.innerHTML = `
      <div class="item-header">
        <span class="item-title">📷 ${shortUrl}</span>
        <div class="item-actions">
          ${idx > 0 ? `<button class="btn-move" onclick="event.stopPropagation();moveSnsEmbed(${idx},-1)">⬆️</button>` : ''}
          ${idx < embeds.length - 1 ? `<button class="btn-move" onclick="event.stopPropagation();moveSnsEmbed(${idx},1)">⬇️</button>` : ''}
          <button class="btn-edit" onclick="event.stopPropagation();this.closest('.item-card').classList.toggle('editing')">✏️ 편집</button>
          <button class="btn-delete" onclick="event.stopPropagation();if(confirm('삭제하시겠습니까?')){allData['sns.js'].snsEmbeds.splice(${idx},1);markChanged();renderSnsEmbedsList()}">🗑️</button>
        </div>
      </div>
    `;
    const form = document.createElement('div');
    form.className = 'edit-form';
    form.appendChild(makeFormGroup('인스타그램 게시물 URL', 'text', item.url, v => { item.url = v; markChanged(); }, { placeholder: 'https://www.instagram.com/p/XXXXX/' }));
    if (item.url) {
      const preview = document.createElement('div');
      preview.style.cssText = 'margin:0.5rem 0;padding:0.5rem;background:#f9f9f9;border-radius:8px;font-size:0.8rem;color:#666';
      preview.innerHTML = `<a href="${item.url}" target="_blank" style="color:#E4405F">🔗 게시물 열기</a>`;
      form.appendChild(preview);
    }
    card.appendChild(form);
    container.appendChild(card);
  });
}

function renderSnsHighlightsList() {
  const container = document.getElementById('snsHighlightsList');
  if (!container) return;
  const highlights = allData['sns.js'].snsHighlights || [];
  container.innerHTML = '';
  if (highlights.length === 0) {
    container.innerHTML = '<div class="empty-state" style="padding:1rem"><p style="color:#aaa">등록된 하이라이트가 없습니다.</p></div>';
    return;
  }
  highlights.forEach((item, idx) => {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.innerHTML = `
      <div class="item-header">
        <span class="item-title" style="display:flex;align-items:center;gap:8px">
          ${item.image ? `<img src="${resolveImageSrc(item.image)}" style="width:32px;height:32px;border-radius:6px;object-fit:cover" onerror="this.style.display='none'">` : ''}
          ⭐ ${item.title || '(제목 없음)'}
        </span>
        <div class="item-actions">
          ${idx > 0 ? `<button class="btn-move" onclick="event.stopPropagation();moveSnsHighlight(${idx},-1)">⬆️</button>` : ''}
          ${idx < highlights.length - 1 ? `<button class="btn-move" onclick="event.stopPropagation();moveSnsHighlight(${idx},1)">⬇️</button>` : ''}
          <button class="btn-edit" onclick="event.stopPropagation();this.closest('.item-card').classList.toggle('editing')">✏️ 편집</button>
          <button class="btn-delete" onclick="event.stopPropagation();if(confirm('삭제하시겠습니까?')){allData['sns.js'].snsHighlights.splice(${idx},1);markChanged();renderSnsHighlightsList()}">🗑️</button>
        </div>
      </div>
    `;
    const form = document.createElement('div');
    form.className = 'edit-form';
    form.appendChild(makeFormGroup('제목', 'text', item.title, v => { item.title = v; markChanged(); }));
    form.appendChild(makeFormGroup('설명', 'textarea', item.description, v => { item.description = v; markChanged(); }, { rows: 2 }));
    form.appendChild(makeFormGroup('링크 URL', 'text', item.link, v => { item.link = v; markChanged(); }, { placeholder: 'https://www.instagram.com/p/XXXXX/' }));
    form.appendChild(makeFormGroup('날짜', 'text', item.date, v => { item.date = v; markChanged(); }, { placeholder: '2026.02.20' }));

    const imgGroup = document.createElement('div');
    imgGroup.className = 'form-group';
    const imgLabel = document.createElement('label');
    imgLabel.innerHTML = `이미지 <span class="size-hint">권장: 정사각형 (1:1 비율)</span>`;
    imgGroup.appendChild(imgLabel);
    if (item.image) {
      const preview = document.createElement('img');
      preview.src = resolveImageSrc(item.image);
      preview.className = 'field-img-preview';
      preview.onerror = function() { this.style.display = 'none'; };
      imgGroup.appendChild(preview);
    }
    const imgPickBtn = document.createElement('button');
    imgPickBtn.textContent = '📷 이미지 선택';
    imgPickBtn.className = 'btn-add';
    imgPickBtn.style.marginTop = '4px';
    imgPickBtn.onclick = () => {
      showImageSourcePicker('SNS', '권장: 정사각형 (1:1 비율)', (path) => {
        item.image = path;
        markChanged();
        renderSnsHighlightsList();
      });
    };
    imgGroup.appendChild(imgPickBtn);
    if (item.image) {
      const removeBtn = document.createElement('button');
      removeBtn.textContent = '이미지 제거';
      removeBtn.className = 'btn-delete';
      removeBtn.style.marginTop = '4px';
      removeBtn.onclick = () => { item.image = null; markChanged(); renderSnsHighlightsList(); };
      imgGroup.appendChild(removeBtn);
    }
    form.appendChild(imgGroup);

    card.appendChild(form);
    container.appendChild(card);
  });
}

function addSnsEmbed() {
  if (!allData['sns.js']) return;
  allData['sns.js'].snsEmbeds.push({ url: '' });
  markChanged();
  renderSnsEmbedsList();
  setTimeout(() => {
    const cards = document.querySelectorAll('#snsEmbedsList .item-card');
    if (cards.length) cards[cards.length - 1].classList.add('editing');
  }, 50);
}

function addSnsHighlight() {
  if (!allData['sns.js']) return;
  allData['sns.js'].snsHighlights.push({ title: '', description: '', image: null, link: '', date: '' });
  markChanged();
  renderSnsHighlightsList();
  setTimeout(() => {
    const cards = document.querySelectorAll('#snsHighlightsList .item-card');
    if (cards.length) cards[cards.length - 1].classList.add('editing');
  }, 50);
}

function moveSnsEmbed(idx, dir) {
  const arr = allData['sns.js'].snsEmbeds;
  const newIdx = idx + dir;
  if (newIdx < 0 || newIdx >= arr.length) return;
  [arr[idx], arr[newIdx]] = [arr[newIdx], arr[idx]];
  markChanged();
  renderSnsEmbedsList();
}

function moveSnsHighlight(idx, dir) {
  const arr = allData['sns.js'].snsHighlights;
  const newIdx = idx + dir;
  if (newIdx < 0 || newIdx >= arr.length) return;
  [arr[idx], arr[newIdx]] = [arr[newIdx], arr[idx]];
  markChanged();
  renderSnsHighlightsList();
}

function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

const fmState = { selected: new Map(), clipboard: [], clipboardMode: '' };

function fmToggleSelect(path, type, el) {
  if (fmState.selected.has(path)) {
    fmState.selected.delete(path);
    el.classList.remove('fm-selected');
  } else {
    fmState.selected.set(path, type);
    el.classList.add('fm-selected');
  }
  updateFmToolbar();
}

function fmClearSelection() {
  fmState.selected.clear();
  document.querySelectorAll('.fm-selected').forEach(el => el.classList.remove('fm-selected'));
  updateFmToolbar();
}

function updateFmToolbar() {
  const toolbar = document.getElementById('fmToolbar');
  if (!toolbar) return;
  const count = fmState.selected.size;
  const clipCount = fmState.clipboard.length;
  toolbar.style.display = (count > 0 || clipCount > 0) ? 'flex' : 'none';
  const info = toolbar.querySelector('.fm-toolbar-info');
  if (info) info.textContent = count > 0 ? `${count}개 선택됨` : '';
  const moveBtn = toolbar.querySelector('#fmBulkMove');
  const copyBtn = toolbar.querySelector('#fmBulkCopy');
  const delBtn = toolbar.querySelector('#fmBulkDelete');
  const pasteBtn = toolbar.querySelector('#fmPaste');
  const renameBtn = toolbar.querySelector('#fmRename');
  const deselectBtn = toolbar.querySelector('#fmDeselect');
  if (moveBtn) moveBtn.style.display = count > 0 ? '' : 'none';
  if (copyBtn) copyBtn.style.display = count > 0 ? '' : 'none';
  if (delBtn) delBtn.style.display = count > 0 ? '' : 'none';
  if (renameBtn) renameBtn.style.display = count === 1 ? '' : 'none';
  if (deselectBtn) deselectBtn.style.display = count > 0 ? '' : 'none';
  if (pasteBtn) pasteBtn.style.display = clipCount > 0 ? '' : 'none';
  if (pasteBtn && clipCount > 0) {
    pasteBtn.textContent = fmState.clipboardMode === 'copy' ? `📋 붙여넣기 (${clipCount})` : `📋 여기로 이동 (${clipCount})`;
  }
}

async function fmBulkMove() {
  const items = [...fmState.selected.entries()];
  if (items.length === 0) return;
  openFolderBrowser(fileManagerCurrentPath.replace(/^image\/?/, ''), async (targetDir) => {
    let ok = 0, fail = 0;
    for (const [fromPath, itemType] of items) {
      const name = fromPath.split('/').pop();
      const toPath = targetDir ? `image/${targetDir}/${name}` : `image/${name}`;
      if (toPath === fromPath) continue;
      try {
        const endpoint = itemType === 'folder' ? '/admin/api/rename-folder' : '/admin/api/move-image';
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ from: fromPath, to: toPath })
        });
        const data = await res.json();
        if (data.success) ok++; else fail++;
      } catch (e) { fail++; }
    }
    fmState.selected.clear();
    showToast(`${ok}개 이동 완료${fail > 0 ? `, ${fail}개 실패` : ''}`, ok > 0 ? 'success' : 'error');
    renderFileManager();
  });
}

function fmBulkCopy() {
  fmState.clipboard = [...fmState.selected.entries()].map(([p, t]) => ({ path: p, type: t }));
  fmState.clipboardMode = 'copy';
  showToast(`${fmState.clipboard.length}개 복사됨 - 원하는 폴더에서 붙여넣기`, 'success');
  fmClearSelection();
}

function fmCut() {
  fmState.clipboard = [...fmState.selected.entries()].map(([p, t]) => ({ path: p, type: t }));
  fmState.clipboardMode = 'cut';
  showToast(`${fmState.clipboard.length}개 잘라내기 - 원하는 폴더에서 붙여넣기`, 'success');
  fmClearSelection();
}

async function fmPaste() {
  if (fmState.clipboard.length === 0) return;
  const targetDir = fileManagerCurrentPath.replace(/^image\/?/, '');
  const mode = fmState.clipboardMode;
  let ok = 0, fail = 0;
  for (const item of fmState.clipboard) {
    const fromPath = item.path;
    const name = fromPath.split('/').pop();
    const toPath = targetDir ? `image/${targetDir}/${name}` : `image/${name}`;
    if (toPath === fromPath) continue;
    try {
      let endpoint;
      if (item.type === 'folder') {
        endpoint = mode === 'copy' ? '/admin/api/copy-folder' : '/admin/api/rename-folder';
      } else {
        endpoint = mode === 'copy' ? '/admin/api/copy-image' : '/admin/api/move-image';
      }
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ from: fromPath, to: toPath })
      });
      const data = await res.json();
      if (data.success) ok++; else { fail++; if (data.error) showToast(data.error, 'error'); }
    } catch (e) { fail++; }
  }
  fmState.clipboard = [];
  fmState.clipboardMode = '';
  showToast(`${ok}개 ${mode === 'copy' ? '복사' : '이동'} 완료${fail > 0 ? `, ${fail}개 실패` : ''}`, ok > 0 ? 'success' : 'error');
  renderFileManager();
}

async function fmBulkDelete() {
  const items = [...fmState.selected.entries()];
  if (!confirm(`${items.length}개 항목을 삭제하시겠습니까?`)) return;
  let ok = 0, fail = 0;
  for (const [itemPath, itemType] of items) {
    try {
      const endpoint = itemType === 'folder' ? `/admin/api/folder/${itemPath}` : `/admin/api/images/${itemPath}`;
      const res = await fetch(endpoint, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) ok++; else fail++;
    } catch (e) { fail++; }
  }
  fmState.selected.clear();
  showToast(`${ok}개 삭제 완료${fail > 0 ? `, ${fail}개 실패` : ''}`, ok > 0 ? 'success' : 'error');
  renderFileManager();
}

async function fmRename() {
  const entry = [...fmState.selected.entries()][0];
  if (!entry) return;
  const [itemPath, itemType] = entry;
  const oldName = itemPath.split('/').pop();
  const isFolder = itemType === 'folder';
  const newName = prompt(`새 이름을 입력하세요:`, oldName);
  if (!newName || newName === oldName) return;
  const parentPath = itemPath.substring(0, itemPath.lastIndexOf('/'));
  const newPath = `${parentPath}/${newName}`;
  try {
    const endpoint = isFolder ? '/admin/api/rename-folder' : '/admin/api/move-image';
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: itemPath, to: newPath })
    });
    const data = await res.json();
    if (data.success) {
      showToast('이름 변경 완료', 'success');
      fmState.selected.clear();
      renderFileManager();
    } else {
      showToast('이름 변경 실패: ' + data.error, 'error');
    }
  } catch (e) { showToast('이름 변경 실패: ' + e.message, 'error'); }
}

async function renderFileManager() {
  const section = document.getElementById('section-files');
  section.innerHTML = '<div class="empty-state"><div class="empty-icon">⏳</div>로딩 중...</div>';

  try {
    const [treeRes, unusedRes] = await Promise.all([
      fetch('/admin/api/image-tree'),
      fetch('/admin/api/unused-images')
    ]);
    const tree = await treeRes.json();
    const unusedData = await unusedRes.json();
    const unusedSet = new Set(unusedData.unused || []);

    section.innerHTML = '';
    fmState.selected.clear();

    const header = document.createElement('div');
    header.className = 'section-header';
    const unusedCount = unusedData.unused ? unusedData.unused.length : 0;
    header.innerHTML = `<h2>📁 이미지 파일 관리</h2><span style="font-size:0.85rem;color:#888;margin-left:0.5rem">${unusedData.total || 0}개 파일 중 ${unusedCount}개 미사용</span>`;
    const headerBtns = document.createElement('div');
    headerBtns.style.cssText = 'display:flex;gap:0.5rem';

    const uploadBtn = document.createElement('button');
    uploadBtn.className = 'btn-add';
    uploadBtn.textContent = '📷 업로드';
    uploadBtn.onclick = () => {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
      fileInput.multiple = true;
      fileInput.onchange = async () => {
        const currentDir = fileManagerCurrentPath.replace(/^image\/?/, '');
        if (fileInput.files.length === 1) {
          openImageEditorForUpload(fileInput.files[0], '', currentDir, () => {
            renderFileManager();
          });
        } else {
          for (const file of fileInput.files) {
            try {
              await uploadImage(file, currentDir);
            } catch (e) { showToast('업로드 실패: ' + e.message, 'error'); }
          }
          showToast(`${fileInput.files.length}개 파일 업로드 완료`, 'success');
          renderFileManager();
        }
      };
      fileInput.click();
    };
    headerBtns.appendChild(uploadBtn);

    const newFolderBtn = document.createElement('button');
    newFolderBtn.className = 'btn-add';
    newFolderBtn.style.background = '#27ae60';
    newFolderBtn.textContent = '📁 새 폴더';
    newFolderBtn.onclick = async () => {
      const name = prompt('폴더 이름을 입력하세요:');
      if (!name) return;
      try {
        await fetch('/admin/api/create-folder', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ folderPath: `${fileManagerCurrentPath}/${name}` })
        });
        showToast('폴더 생성 완료', 'success');
        renderFileManager();
      } catch (e) { showToast('폴더 생성 실패', 'error'); }
    };
    headerBtns.appendChild(newFolderBtn);
    header.appendChild(headerBtns);
    section.appendChild(header);

    const toolbar = document.createElement('div');
    toolbar.id = 'fmToolbar';
    toolbar.className = 'fm-toolbar';
    toolbar.style.display = 'none';
    toolbar.innerHTML = `
      <span class="fm-toolbar-info"></span>
      <button id="fmRename" class="fm-tb-btn" onclick="fmRename()" style="display:none">✏️ 이름 변경</button>
      <button id="fmBulkMove" class="fm-tb-btn" onclick="fmBulkMove()" style="display:none">📦 이동</button>
      <button id="fmBulkCopy" class="fm-tb-btn" onclick="fmBulkCopy()" style="display:none">📋 복사</button>
      <button id="fmBulkDelete" class="fm-tb-btn fm-tb-btn-danger" onclick="fmBulkDelete()" style="display:none">🗑️ 삭제</button>
      <button id="fmPaste" class="fm-tb-btn fm-tb-btn-paste" onclick="fmPaste()" style="display:none">📋 붙여넣기</button>
      <button id="fmDeselect" class="fm-tb-btn" onclick="fmClearSelection()" style="display:none">✕ 선택 해제</button>
    `;
    section.appendChild(toolbar);

    const breadcrumb = document.createElement('div');
    breadcrumb.className = 'fm-breadcrumb';
    const parts = fileManagerCurrentPath.split('/');
    parts.forEach((part, i) => {
      const span = document.createElement('span');
      span.textContent = part;
      span.className = 'fm-breadcrumb-item';
      if (i < parts.length - 1) {
        span.style.cursor = 'pointer';
        span.onclick = () => {
          fileManagerCurrentPath = parts.slice(0, i + 1).join('/');
          renderFileManager();
        };
      } else {
        span.classList.add('current');
      }
      breadcrumb.appendChild(span);
      if (i < parts.length - 1) {
        const sep = document.createElement('span');
        sep.textContent = ' / ';
        sep.className = 'fm-breadcrumb-sep';
        breadcrumb.appendChild(sep);
      }
    });
    section.appendChild(breadcrumb);

    // Drag-and-drop upload zone
    const dropzone = document.createElement('div');
    dropzone.className = 'fm-dropzone';
    dropzone.textContent = '📷 이미지를 여기에 드래그하여 업로드';
    ['dragenter', 'dragover'].forEach(evt => {
      dropzone.addEventListener(evt, (e) => { e.preventDefault(); dropzone.classList.add('drag-active'); });
    });
    ['dragleave', 'drop'].forEach(evt => {
      dropzone.addEventListener(evt, () => dropzone.classList.remove('drag-active'));
    });
    dropzone.addEventListener('drop', async (e) => {
      e.preventDefault();
      const files = [...e.dataTransfer.files].filter(f => f.type.startsWith('image/'));
      if (files.length === 0) { showToast('이미지 파일만 업로드 가능합니다', 'error'); return; }
      const currentDir = fileManagerCurrentPath.replace(/^image\/?/, '');
      if (files.length === 1) {
        openImageEditorForUpload(files[0], '', currentDir, () => renderFileManager());
      } else {
        dropzone.textContent = `⏳ ${files.length}개 파일 업로드 중...`;
        for (const file of files) {
          try { await uploadImage(file, currentDir); } catch (err) { showToast('업로드 실패: ' + err.message, 'error'); }
        }
        showToast(`${files.length}개 파일 업로드 완료`, 'success');
        renderFileManager();
      }
    });
    section.appendChild(dropzone);

    if (fmState.clipboard.length > 0) updateFmToolbar();

    function getItemsForPath(tree, targetPath) {
      if (targetPath === 'image') return tree;
      const pathParts = targetPath.replace(/^image\//, '').split('/');
      let current = tree;
      for (const part of pathParts) {
        const found = current.find(item => item.name === part && item.type === 'folder');
        if (!found) return [];
        current = found.children || [];
      }
      return current;
    }

    const currentItems = getItemsForPath(tree, fileManagerCurrentPath);

    const grid = document.createElement('div');
    grid.className = 'fm-grid';

    if (fileManagerCurrentPath !== 'image') {
      const upItem = document.createElement('div');
      upItem.className = 'fm-item fm-folder';
      upItem.innerHTML = `<div class="fm-icon">⬆️</div><div class="fm-name">상위 폴더</div>`;
      upItem.onclick = () => {
        const parentParts = fileManagerCurrentPath.split('/');
        parentParts.pop();
        fileManagerCurrentPath = parentParts.join('/') || 'image';
        renderFileManager();
      };
      grid.appendChild(upItem);
    }

    const folders = currentItems.filter(i => i.type === 'folder');
    const files = currentItems.filter(i => i.type === 'file');

    folders.forEach(folder => {
      const el = document.createElement('div');
      const folderUnused = countUnusedInFolder(folder, unusedSet);
      el.className = 'fm-item fm-folder' + (folderUnused > 0 ? ' fm-folder-has-unused' : '');
      const count = countFiles(folder);
      el.innerHTML = `
        <div class="fm-select-check"></div>
        <div class="fm-icon">📁</div>
        ${folderUnused > 0 ? `<span class="fm-folder-unused-badge">⚠️ ${folderUnused}</span>` : ''}
        <div class="fm-name">${folder.name}</div>
        <div class="fm-meta">${count}개 파일</div>
      `;
      el.querySelector('.fm-select-check').onclick = (e) => {
        e.stopPropagation();
        fmToggleSelect(folder.path, 'folder', el);
      };
      el.ondblclick = () => {
        fileManagerCurrentPath = folder.path;
        renderFileManager();
      };
      el.onclick = (e) => {
        if (e.target.closest('.fm-select-check')) return;
        if (e.ctrlKey || e.metaKey) {
          fmToggleSelect(folder.path, 'folder', el);
        } else {
          fileManagerCurrentPath = folder.path;
          renderFileManager();
        }
      };
      grid.appendChild(el);
    });

    files.forEach(file => {
      const el = document.createElement('div');
      const isUnused = unusedSet.has(file.path);
      el.className = 'fm-item fm-file' + (isUnused ? ' fm-unused' : '');
      el.innerHTML = `
        <div class="fm-select-check"></div>
        <div class="fm-img-wrap"><img src="${resolveImageSrc(file.path)}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%2250%25%22 x=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-size=%2240%22>🖼️</text></svg>'"></div>
        ${isUnused ? '<span class="fm-unused-badge" title="데이터 파일에서 참조되지 않는 이미지">⚠️ 미사용</span>' : ''}
        <div class="fm-name" title="${file.name}">${file.name}</div>
        <div class="fm-meta">${formatFileSize(file.size)}</div>
        <div class="fm-path-copy" title="경로 복사">${file.path}</div>
      `;
      el.querySelector('.fm-select-check').onclick = (e) => {
        e.stopPropagation();
        fmToggleSelect(file.path, 'file', el);
      };
      el.querySelector('.fm-path-copy').onclick = (e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(file.path).then(() => showToast('경로가 복사되었습니다', 'success'));
      };
      el.onclick = (e) => {
        if (e.target.closest('.fm-select-check') || e.target.closest('.fm-path-copy')) return;
        fmToggleSelect(file.path, 'file', el);
      };
      grid.appendChild(el);
    });

    if (folders.length === 0 && files.length === 0) {
      grid.innerHTML = '<div class="empty-state" style="grid-column:1/-1"><div class="empty-icon">📭</div><p>이 폴더는 비어있습니다.</p></div>';
    }

    section.appendChild(grid);
  } catch (e) {
    section.innerHTML = `<div class="empty-state"><div class="empty-icon">❌</div><p>파일 목록 로딩 실패: ${e.message}</p></div>`;
  }
}

function countFiles(folder) {
  let count = 0;
  if (folder.children) {
    folder.children.forEach(child => {
      if (child.type === 'file') count++;
      else if (child.type === 'folder') count += countFiles(child);
    });
  }
  return count;
}

function countUnusedInFolder(folder, unusedSet) {
  let count = 0;
  if (folder.children) {
    folder.children.forEach(child => {
      if (child.type === 'file' && unusedSet.has(child.path)) count++;
      else if (child.type === 'folder') count += countUnusedInFolder(child, unusedSet);
    });
  }
  return count;
}

function showAskPullModal() { document.getElementById('askPullModal').classList.add('show'); }
function closeAskPullModal() { document.getElementById('askPullModal').classList.remove('show'); }

async function acceptPull() {
  closeAskPullModal();
  try {
    const res = await fetch('/admin/api/revert', { method: 'POST' });
    const data = await res.json();
    if (data.success) {
      showToast('라이브 데이터로 동기화 완료!', 'success');
      await loadData();
    } else {
      showToast('동기화 실패: ' + (data.error || '알 수 없는 오류'), 'error');
    }
  } catch (e) {
    showToast('동기화 실패: ' + e.message, 'error');
  }
}

async function declinePull() {
  closeAskPullModal();
  showToast('작업 중인 데이터를 유지합니다.', 'info');
}

const imgEditor = {
  file: null,
  img: null,
  canvas: null,
  ctx: null,
  scale: 1,
  cropMode: false,
  crop: { x: 0, y: 0, w: 0, h: 0 },
  sizeHint: '',
  recW: 0,
  recH: 0,
  uploadDir: '',
  onComplete: null,
  dragging: null,
  dragStart: { x: 0, y: 0 },
  cropStart: { x: 0, y: 0, w: 0, h: 0 },
  edited: false
};

function openImageEditor(file, options = {}) {
  return new Promise(async (resolve) => {
    imgEditor.file = file;
    imgEditor.uploadDir = options.uploadDir || '';
    imgEditor.sizeHint = options.sizeHint || '';
    imgEditor.onComplete = resolve;
    imgEditor.cropMode = false;
    imgEditor.edited = false;

    const match = (imgEditor.sizeHint || '').match(/(\d+)\s*px\s*[·x×]\s*.*?(\d+)\s*px/i);
    imgEditor.recW = match ? parseInt(match[1]) : 0;
    imgEditor.recH = match ? parseInt(match[2]) : 0;

    const hintEl = document.getElementById('imgEditorSizeHint');
    hintEl.textContent = imgEditor.sizeHint ? `(${imgEditor.sizeHint})` : '';

    const resizeBtn = document.getElementById('btnResize');
    resizeBtn.style.display = (imgEditor.recW && imgEditor.recH) ? '' : 'none';

    document.getElementById('cropOverlay').style.display = 'none';
    document.getElementById('btnCropMode').textContent = '✂ 자르기';
    document.getElementById('imgEditorCropSize').style.display = 'none';

    editorSelectedDir = imgEditor.uploadDir;
    updateEditorFolderDisplay();

    const baseName = file.name.replace(/\.[^/.]+$/, '');
    document.getElementById('imgEditorFileName').value = baseName;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        imgEditor.img = img;
        drawEditorCanvas();
        document.getElementById('imgEditorOrigSize').textContent = `원본: ${img.naturalWidth} × ${img.naturalHeight}px`;
        document.getElementById('imageEditorModal').classList.add('show');
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

function drawEditorCanvas() {
  const canvas = document.getElementById('imgEditorCanvas');
  const ctx = canvas.getContext('2d');
  imgEditor.canvas = canvas;
  imgEditor.ctx = ctx;

  const img = imgEditor.img;
  const maxW = 700, maxH = window.innerHeight * 0.5;
  let w = img.naturalWidth, h = img.naturalHeight;
  const ratio = Math.min(maxW / w, maxH / h, 1);
  w = Math.round(w * ratio);
  h = Math.round(h * ratio);
  imgEditor.scale = ratio;

  canvas.width = w;
  canvas.height = h;
  ctx.drawImage(img, 0, 0, w, h);

  imgEditor.crop = { x: Math.round(w * 0.1), y: Math.round(h * 0.1), w: Math.round(w * 0.8), h: Math.round(h * 0.8) };
}

function closeImageEditor() {
  document.getElementById('imageEditorModal').classList.remove('show');
  if (imgEditor.onComplete) imgEditor.onComplete(null);
  imgEditor.onComplete = null;
}

function toggleCropMode() {
  imgEditor.cropMode = !imgEditor.cropMode;
  const overlay = document.getElementById('cropOverlay');
  const btn = document.getElementById('btnCropMode');
  if (imgEditor.cropMode) {
    overlay.style.display = 'block';
    btn.textContent = '✂ 자르기 적용';
    btn.style.background = '#3498db';
    btn.style.color = '#fff';
    updateCropBox();
    initCropDrag();
  } else {
    applyCrop();
  }
}

function updateCropBox() {
  const box = document.getElementById('cropBox');
  const c = imgEditor.crop;
  box.style.left = c.x + 'px';
  box.style.top = c.y + 'px';
  box.style.width = c.w + 'px';
  box.style.height = c.h + 'px';

  const realW = Math.round(c.w / imgEditor.scale);
  const realH = Math.round(c.h / imgEditor.scale);
  const sizeEl = document.getElementById('imgEditorCropSize');
  sizeEl.textContent = `선택: ${realW} × ${realH}px`;
  sizeEl.style.display = '';
}

function initCropDrag() {
  const overlay = document.getElementById('cropOverlay');
  const box = document.getElementById('cropBox');

  function getPos(e) {
    const r = overlay.getBoundingClientRect();
    const t = e.touches ? e.touches[0] : e;
    return { x: t.clientX - r.left, y: t.clientY - r.top };
  }

  function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

  function onStart(e) {
    e.preventDefault();
    const pos = getPos(e);
    const target = e.target.closest('.crop-handle');
    if (target) {
      imgEditor.dragging = target.dataset.dir;
    } else if (e.target === box || box.contains(e.target)) {
      imgEditor.dragging = 'move';
    } else {
      imgEditor.dragging = 'new';
      imgEditor.crop = { x: pos.x, y: pos.y, w: 0, h: 0 };
    }
    imgEditor.dragStart = pos;
    imgEditor.cropStart = { ...imgEditor.crop };
  }

  function onMove(e) {
    if (!imgEditor.dragging) return;
    e.preventDefault();
    const pos = getPos(e);
    const dx = pos.x - imgEditor.dragStart.x;
    const dy = pos.y - imgEditor.dragStart.y;
    const s = imgEditor.cropStart;
    const cw = imgEditor.canvas.width;
    const ch = imgEditor.canvas.height;

    if (imgEditor.dragging === 'move') {
      imgEditor.crop.x = clamp(s.x + dx, 0, cw - s.w);
      imgEditor.crop.y = clamp(s.y + dy, 0, ch - s.h);
    } else if (imgEditor.dragging === 'new') {
      const x2 = clamp(pos.x, 0, cw);
      const y2 = clamp(pos.y, 0, ch);
      imgEditor.crop.x = Math.min(s.x, x2);
      imgEditor.crop.y = Math.min(s.y, y2);
      imgEditor.crop.w = Math.abs(x2 - s.x);
      imgEditor.crop.h = Math.abs(y2 - s.y);
    } else {
      let { x, y, w, h } = s;
      const dir = imgEditor.dragging;
      if (dir.includes('e')) { w = clamp(s.w + dx, 20, cw - s.x); }
      if (dir.includes('w')) { const nx = clamp(s.x + dx, 0, s.x + s.w - 20); w = s.w + (s.x - nx); x = nx; }
      if (dir.includes('s')) { h = clamp(s.h + dy, 20, ch - s.y); }
      if (dir.includes('n')) { const ny = clamp(s.y + dy, 0, s.y + s.h - 20); h = s.h + (s.y - ny); y = ny; }
      imgEditor.crop = { x, y, w, h };
    }
    updateCropBox();
  }

  function onEnd() { imgEditor.dragging = null; }

  overlay.onmousedown = onStart;
  overlay.onmousemove = onMove;
  overlay.onmouseup = onEnd;
  overlay.onmouseleave = onEnd;
  overlay.ontouchstart = onStart;
  overlay.ontouchmove = onMove;
  overlay.ontouchend = onEnd;
}

function applyCrop() {
  const c = imgEditor.crop;
  const sc = imgEditor.scale;
  if (c.w < 10 || c.h < 10) {
    showToast('자를 영역을 선택해주세요', 'error');
    return;
  }
  const sx = Math.round(c.x / sc), sy = Math.round(c.y / sc);
  const sw = Math.round(c.w / sc), sh = Math.round(c.h / sc);

  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = sw;
  tempCanvas.height = sh;
  tempCanvas.getContext('2d').drawImage(imgEditor.img, sx, sy, sw, sh, 0, 0, sw, sh);

  tempCanvas.toBlob((blob) => {
    imgEditor.file = new File([blob], imgEditor.file.name, { type: blob.type });
    imgEditor.edited = true;
  }, imgEditor.file.type.includes('png') ? 'image/png' : 'image/jpeg', 0.92);

  const newImg = new Image();
  newImg.onload = () => {
    imgEditor.img = newImg;
    drawEditorCanvas();
    document.getElementById('imgEditorOrigSize').textContent = `크기: ${sw} × ${sh}px (자름)`;
  };
  newImg.src = tempCanvas.toDataURL('image/png');

  imgEditor.cropMode = false;
  document.getElementById('cropOverlay').style.display = 'none';
  document.getElementById('btnCropMode').textContent = '✂ 자르기';
  document.getElementById('btnCropMode').style.background = '';
  document.getElementById('btnCropMode').style.color = '';
  document.getElementById('imgEditorCropSize').style.display = 'none';
}

function canvasToBlob(canvas, type = 'image/png') {
  return new Promise(resolve => canvas.toBlob(resolve, type, 0.92));
}

async function editorFinish(canvas) {
  const blob = await canvasToBlob(canvas, imgEditor.file.type.includes('png') ? 'image/png' : 'image/jpeg');
  const newFile = new File([blob], imgEditor.file.name, { type: blob.type });

  document.getElementById('imageEditorModal').classList.remove('show');
  try {
    const dir = getEditorUploadDir();
    const name = getEditorCustomName();
    const path = await uploadImage(newFile, dir, name);
    if (imgEditor.onComplete) imgEditor.onComplete(path);
    imgEditor.onComplete = null;
    showToast('이미지 업로드 완료', 'success');
  } catch (e) {
    showToast('업로드 실패: ' + e.message, 'error');
    if (imgEditor.onComplete) imgEditor.onComplete(null);
    imgEditor.onComplete = null;
  }
}

async function applyOriginal() {
  document.getElementById('imageEditorModal').classList.remove('show');
  try {
    const dir = getEditorUploadDir();
    const name = getEditorCustomName();
    const path = await uploadImage(imgEditor.file, dir, name);
    if (imgEditor.onComplete) imgEditor.onComplete(path);
    imgEditor.onComplete = null;
    showToast('이미지 업로드 완료 (원본)', 'success');
  } catch (e) {
    showToast('업로드 실패: ' + e.message, 'error');
    if (imgEditor.onComplete) imgEditor.onComplete(null);
    imgEditor.onComplete = null;
  }
}

async function applyResize() {
  if (!imgEditor.recW || !imgEditor.recH) return;
  const canvas = document.createElement('canvas');
  canvas.width = imgEditor.recW;
  canvas.height = imgEditor.recH;

  const img = imgEditor.img;
  const srcRatio = img.naturalWidth / img.naturalHeight;
  const dstRatio = imgEditor.recW / imgEditor.recH;
  let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;
  if (srcRatio > dstRatio) {
    sw = Math.round(img.naturalHeight * dstRatio);
    sx = Math.round((img.naturalWidth - sw) / 2);
  } else {
    sh = Math.round(img.naturalWidth / dstRatio);
    sy = Math.round((img.naturalHeight - sh) / 2);
  }
  canvas.getContext('2d').drawImage(img, sx, sy, sw, sh, 0, 0, imgEditor.recW, imgEditor.recH);
  await editorFinish(canvas);
}

function openImageEditorForUpload(file, sizeHint, uploadDir, callback) {
  openImageEditor(file, { sizeHint, uploadDir }).then(path => {
    if (path && callback) callback(path);
  });
}

function showImageSourcePicker(uploadDir, sizeHint, callback) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay show';
  overlay.style.zIndex = '10000';
  overlay.innerHTML = `
    <div class="img-source-picker">
      <div class="isp-header">
        <h3>이미지 선택</h3>
        <button class="img-editor-close" id="ispClose">&times;</button>
      </div>
      <div class="isp-options">
        <button class="isp-option" id="ispServer">
          <span class="isp-icon">📁</span>
          <span class="isp-title">서버에서 선택</span>
          <span class="isp-desc">이미 업로드된 이미지 중에서 선택</span>
        </button>
        <button class="isp-option" id="ispUpload">
          <span class="isp-icon">💻</span>
          <span class="isp-title">컴퓨터에서 업로드</span>
          <span class="isp-desc">새 이미지 파일을 업로드</span>
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  overlay.querySelector('#ispClose').onclick = () => overlay.remove();
  overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };

  overlay.querySelector('#ispServer').onclick = () => {
    overlay.remove();
    openImageBrowser(uploadDir, callback);
  };

  overlay.querySelector('#ispUpload').onclick = () => {
    overlay.remove();
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = () => {
      if (fileInput.files[0]) {
        openImageEditorForUpload(fileInput.files[0], sizeHint, uploadDir, callback);
      }
    };
    fileInput.click();
  };
}

function openImageBrowser(defaultDir, callback) {
  let browsingPath = defaultDir || '';

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay show';
  overlay.style.zIndex = '10001';

  function render() {
    const displayPath = browsingPath ? `image/${browsingPath}` : 'image';
    overlay.innerHTML = `
      <div class="image-browser-modal">
        <div class="fb-header">
          <h3>📁 이미지 선택</h3>
          <button class="img-editor-close" id="ibClose">&times;</button>
        </div>
        <div class="fb-breadcrumb" id="ibBreadcrumb"></div>
        <div class="ib-grid" id="ibGrid"><div class="empty-state"><div class="empty-icon">⏳</div>로딩 중...</div></div>
      </div>
    `;
    document.body.appendChild(overlay);

    overlay.querySelector('#ibClose').onclick = () => overlay.remove();

    const breadcrumb = overlay.querySelector('#ibBreadcrumb');
    const parts = ['image', ...(browsingPath ? browsingPath.split('/') : [])];
    breadcrumb.innerHTML = '';
    parts.forEach((part, i) => {
      const span = document.createElement('span');
      span.textContent = part;
      span.className = 'fb-bc-item' + (i === parts.length - 1 ? ' current' : '');
      if (i < parts.length - 1) {
        span.style.cursor = 'pointer';
        span.onclick = () => {
          if (i === 0) browsingPath = '';
          else browsingPath = parts.slice(1, i + 1).join('/');
          overlay.remove();
          render();
        };
      }
      breadcrumb.appendChild(span);
      if (i < parts.length - 1) {
        const sep = document.createElement('span');
        sep.textContent = ' / ';
        sep.className = 'fb-bc-sep';
        breadcrumb.appendChild(sep);
      }
    });

    fetch('/admin/api/image-tree').then(r => r.json()).then(tree => {
      let current = tree;
      if (browsingPath) {
        const pathParts = browsingPath.split('/');
        for (const part of pathParts) {
          const found = current.find(item => item.name === part && item.type === 'folder');
          if (!found) { current = []; break; }
          current = found.children || [];
        }
      }

      const grid = overlay.querySelector('#ibGrid');
      grid.innerHTML = '';

      if (browsingPath) {
        const upItem = document.createElement('div');
        upItem.className = 'fb-item';
        upItem.innerHTML = `<div class="fb-icon">⬆️</div><div class="fb-name">상위 폴더</div>`;
        upItem.onclick = () => {
          const pp = browsingPath.split('/');
          pp.pop();
          browsingPath = pp.join('/');
          overlay.remove();
          render();
        };
        grid.appendChild(upItem);
      }

      const folders = current.filter(i => i.type === 'folder');
      const files = current.filter(i => i.type === 'file');

      folders.forEach(f => {
        const el = document.createElement('div');
        el.className = 'fb-item';
        el.innerHTML = `<div class="fb-icon">📁</div><div class="fb-name">${f.name}</div>`;
        el.onclick = () => {
          browsingPath = browsingPath ? `${browsingPath}/${f.name}` : f.name;
          overlay.remove();
          render();
        };
        grid.appendChild(el);
      });

      files.forEach(f => {
        const el = document.createElement('div');
        el.className = 'ib-file-item';
        el.innerHTML = `
          <div class="ib-thumb"><img src="${resolveImageSrc(f.path)}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%2250%25%22 x=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-size=%2240%22>🖼️</text></svg>'"></div>
          <div class="ib-file-name">${f.name}</div>
        `;
        el.onclick = () => {
          overlay.remove();
          callback(f.path);
        };
        grid.appendChild(el);
      });

      if (folders.length === 0 && files.length === 0) {
        grid.innerHTML += '<div class="fb-empty">이 폴더는 비어있습니다.</div>';
      }
    });
  }

  render();
}

async function showMoveModal(file) {
  const currentFolder = file.path.replace(/^image\//, '').split('/').slice(0, -1).join('/');
  let moveTargetDir = currentFolder;

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay show';
  overlay.innerHTML = `
    <div class="modal-content" style="max-width:450px">
      <h3>📦 이미지 이동</h3>
      <p style="margin:0.5rem 0;color:#666;font-size:0.9rem">${file.name}</p>
      <div style="margin:1rem 0">
        <label style="font-weight:600;font-size:0.9rem;display:block;margin-bottom:0.4rem">이동할 폴더</label>
        <button type="button" class="fb-trigger-btn" id="moveFolderBtn">
          <span class="fb-trigger-icon">📁</span>
          <span id="moveFolderDisplay">${currentFolder ? `image/${currentFolder}` : 'image/ (루트)'}</span>
          <span class="fb-trigger-arrow">▸</span>
        </button>
      </div>
      <div style="margin:1rem 0">
        <label style="font-weight:600;font-size:0.9rem;display:block;margin-bottom:0.4rem">파일 이름</label>
        <input type="text" id="moveFileName" value="${file.name}" style="width:100%;padding:0.5rem;border:1px solid #ddd;border-radius:6px;font-size:0.9rem;box-sizing:border-box">
      </div>
      <div class="modal-actions">
        <button class="btn-cancel" id="moveCancelBtn">취소</button>
        <button class="btn-deploy" id="moveConfirmBtn">이동</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  overlay.querySelector('#moveFolderBtn').onclick = () => {
    openFolderBrowser(moveTargetDir, (dir) => {
      moveTargetDir = dir;
      overlay.querySelector('#moveFolderDisplay').textContent = dir ? `image/${dir}` : 'image/ (루트)';
    });
  };

  overlay.querySelector('#moveCancelBtn').onclick = () => overlay.remove();

  overlay.querySelector('#moveConfirmBtn').onclick = async () => {
    const newName = overlay.querySelector('#moveFileName').value.trim() || file.name;
    const toPath = moveTargetDir ? `image/${moveTargetDir}/${newName}` : `image/${newName}`;
    if (toPath === file.path) {
      showToast('같은 위치입니다', 'error');
      return;
    }
    try {
      const res = await fetch('/admin/api/move-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ from: file.path, to: toPath })
      });
      const data = await res.json();
      if (data.success) {
        showToast('이미지 이동 완료', 'success');
        overlay.remove();
        renderFileManager();
      } else {
        showToast('이동 실패: ' + data.error, 'error');
      }
    } catch (e) { showToast('이동 실패: ' + e.message, 'error'); }
  };
}

// #1 beforeunload warning
window.addEventListener('beforeunload', (e) => {
  if (hasChanges) {
    e.preventDefault();
    e.returnValue = '';
  }
});

async function initApp() {
  const params = new URLSearchParams(window.location.search);
  if (params.get('askPull') === '1') {
    window.history.replaceState({}, '', '/admin');
    showAskPullModal();
  }
  await loadData();
}
initApp();
