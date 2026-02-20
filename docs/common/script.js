/*
================================================================================
공통 스크립트 (수정 불필요)
================================================================================
*/

// 햄버거 메뉴 토글
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // 메뉴 항목 클릭 시 메뉴 닫기
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}

// 이미지 경로 prefix (페이지 위치에 따라 다름)
const isInCommon = window.location.pathname.includes('/common/');
const imgPrefix = isInCommon ? '../' : '';


/*
================================================================================
📝 페이지 제목/부제목 동적 적용
================================================================================
*/
function applyPageHeader(config) {
  if (!config) return;
  const header = document.querySelector('.page-header');
  const calendarHeader = document.querySelector('.calendar-header h2');
  if (header) {
    if (config.pageTitle) header.querySelector('h1').textContent = config.pageTitle;
    if (config.pageSubtitle) header.querySelector('p').textContent = config.pageSubtitle;
  }
  if (calendarHeader && config.pageTitle) {
    calendarHeader.textContent = config.pageTitle;
  }
}

if (typeof eventsConfig !== 'undefined') applyPageHeader(eventsConfig);
if (typeof clubsConfig !== 'undefined') applyPageHeader(clubsConfig);
if (typeof officialClubsConfig !== 'undefined') applyPageHeader(officialClubsConfig);
if (typeof partnersConfig !== 'undefined') applyPageHeader(partnersConfig);
if (typeof noticeConfig !== 'undefined') applyPageHeader(noticeConfig);
if (typeof scheduleConfig !== 'undefined') applyPageHeader(scheduleConfig);

/*
================================================================================
📄 페이지네이션 유틸리티
================================================================================
*/
function createPagination(containerId, totalItems, itemsPerPage, currentPage, onPageChange) {
  const container = document.getElementById(containerId);
  if (!container || totalItems <= itemsPerPage) {
    if (container) container.innerHTML = '';
    return;
  }
  
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  container.innerHTML = '';
  
  const prevBtn = document.createElement('button');
  prevBtn.className = 'pagination-btn';
  prevBtn.innerHTML = '◀';
  prevBtn.disabled = currentPage === 1;
  prevBtn.addEventListener('click', () => onPageChange(currentPage - 1));
  container.appendChild(prevBtn);
  
  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }
  
  if (startPage > 1) {
    const firstBtn = document.createElement('button');
    firstBtn.className = 'pagination-btn';
    firstBtn.textContent = '1';
    firstBtn.addEventListener('click', () => onPageChange(1));
    container.appendChild(firstBtn);
    if (startPage > 2) {
      const dots = document.createElement('span');
      dots.textContent = '...';
      dots.style.padding = '0 0.5rem';
      container.appendChild(dots);
    }
  }
  
  for (let i = startPage; i <= endPage; i++) {
    const pageBtn = document.createElement('button');
    pageBtn.className = 'pagination-btn' + (i === currentPage ? ' active' : '');
    pageBtn.textContent = i;
    pageBtn.addEventListener('click', () => onPageChange(i));
    container.appendChild(pageBtn);
  }
  
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      const dots = document.createElement('span');
      dots.textContent = '...';
      dots.style.padding = '0 0.5rem';
      container.appendChild(dots);
    }
    const lastBtn = document.createElement('button');
    lastBtn.className = 'pagination-btn';
    lastBtn.textContent = totalPages;
    lastBtn.addEventListener('click', () => onPageChange(totalPages));
    container.appendChild(lastBtn);
  }
  
  const nextBtn = document.createElement('button');
  nextBtn.className = 'pagination-btn';
  nextBtn.innerHTML = '▶';
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.addEventListener('click', () => onPageChange(currentPage + 1));
  container.appendChild(nextBtn);
}

/*
================================================================================
📅 캘린더 렌더링 (일정 페이지)
================================================================================
*/
if (typeof calendarMonths !== 'undefined') {
  const monthButtonsContainer = document.getElementById('monthButtons');
  const calendarImage = document.getElementById('calendarImage');
  const currentMonth = new Date().getMonth() + 1; // 1-12
  
  // status가 "on"인 월만 필터링
  const activeMonths = calendarMonths.filter(m => m.status === 'on');
  
  // 이미지 프리로드 (jpg 실패 시 png로 대체)
  const calendarImageCache = {};
  activeMonths.forEach(m => {
    const img = new Image();
    const basePath = imgPrefix + m.image.replace(/\.(jpg|png)$/i, '');
    img.src = basePath + '.jpg';
    img.onerror = function() {
      this.onerror = null;
      this.src = basePath + '.png';
    };
    calendarImageCache[m.month] = img;
  });
  
  // 이미지 로드 함수 (jpg 실패 시 png로 대체)
  function loadCalendarImage(month) {
    const m = activeMonths.find(item => item.month === month);
    if (!m) return;
    const basePath = imgPrefix + m.image.replace(/\.(jpg|png)$/i, '');
    calendarImage.src = basePath + '.jpg';
    calendarImage.onerror = function() {
      this.onerror = null;
      this.src = basePath + '.png';
    };
  }
  
  // 월 버튼 생성
  activeMonths.forEach((m, index) => {
    const btn = document.createElement('button');
    btn.className = 'month-btn';
    btn.textContent = m.label;
    btn.dataset.month = m.month;
    btn.addEventListener('click', function() {
      document.querySelectorAll('.month-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      loadCalendarImage(m.month);
    });
    monthButtonsContainer.appendChild(btn);
  });
  
  // 현재 월에 맞는 탭 자동 선택 (현재 월이 off면 가장 가까운 on인 월로 이동)
  function findNearestActiveMonth() {
    // 현재 월이 on인지 확인
    const currentMonthIndex = activeMonths.findIndex(m => m.month === currentMonth);
    if (currentMonthIndex !== -1) {
      return currentMonthIndex;
    }
    
    // 현재 월이 off인 경우, 가장 가까운 on인 월 찾기
    let nearestIndex = 0;
    let minDistance = Infinity;
    
    activeMonths.forEach((m, index) => {
      // 순환 거리 계산 (12월과 1월은 가까움)
      let distance = Math.abs(m.month - currentMonth);
      if (distance > 6) distance = 12 - distance;
      
      if (distance < minDistance) {
        minDistance = distance;
        nearestIndex = index;
      }
    });
    
    return nearestIndex;
  }
  
  const initialIndex = findNearestActiveMonth();
  
  // 초기 활성 탭 설정
  if (activeMonths.length > 0) {
    const buttons = monthButtonsContainer.querySelectorAll('.month-btn');
    buttons.forEach((btn, i) => {
      btn.classList.toggle('active', i === initialIndex);
    });
    loadCalendarImage(activeMonths[initialIndex].month);
  }
}

/*
================================================================================
🎉 행사 & 공모전 렌더링
================================================================================
*/
let eventsCurrentFilter = '전체';
let eventsCurrentPage = 1;

if (typeof eventsData !== 'undefined') {
  const eventGrid = document.getElementById('eventGrid');
  const suggestButton = document.getElementById('suggestButton');
  const eventsPerPage = eventsConfig?.itemsPerPage || 15;
  
  if (suggestButton && eventsConfig) {
    suggestButton.href = eventsConfig.suggestFormLink;
  }
  
  window.renderEvents = function(page, filter) {
    if (filter !== undefined) eventsCurrentFilter = filter;
    eventsCurrentPage = page;
    eventGrid.innerHTML = '';
    
    const filteredData = eventsCurrentFilter === '전체' 
      ? eventsData 
      : eventsData.filter(e => e.category === eventsCurrentFilter);
    
    const start = (page - 1) * eventsPerPage;
    const end = start + eventsPerPage;
    const pageEvents = filteredData.slice(start, end);
    
    pageEvents.forEach(event => {
      const card = document.createElement('div');
      card.className = 'event-card';
      card.dataset.category = event.category;
      
      if (event.details) {
        if (event.details.target) card.dataset.target = event.details.target;
        if (event.details.benefits) card.dataset.benefits = event.details.benefits;
        if (event.details.requirements) card.dataset.requirements = event.details.requirements;
        if (event.details.schedule) card.dataset.schedule = event.details.schedule;
        if (event.details.contact) card.dataset.contact = event.details.contact;
      }
      
      const imageSrc = event.image.startsWith('http') ? event.image : imgPrefix + event.image;

      const eventDescText = event.description || '';
      const eventDescFlat = eventDescText.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim();
      const eventTruncatedDesc = eventDescFlat.length > 80 ? eventDescFlat.substring(0, 80) + '...' : eventDescFlat;
      card.dataset.fullDesc = eventDescText;
      
      card.innerHTML = `
        <img src="${imageSrc}" alt="${event.title}" />
        <div class="event-content">
          <span class="event-category">${event.category}</span>
          <h3>${event.title}</h3>
          <p class="event-date">📅 ${event.date}</p>
          <p class="event-organizer">${event.organizer}</p>
          ${event.location ? `<p class="event-location">📍 장소: ${event.location}</p>` : ''}
          <p class="event-description">${eventTruncatedDesc}</p>
          ${eventDescText.length > 80 ? '<span class="desc-more-hint">더보기</span>' : ''}
          <div class="event-buttons">
            ${event.link ? `<a href="${event.link}" target="_blank" class="link-button">🔗 바로가기</a>` : ''}
            ${event.applyLink ? `<a href="${event.applyLink}" target="_blank" class="apply-button">📝 신청하기</a>` : ''}
          </div>
        </div>
      `;
      
      eventGrid.appendChild(card);
    });
    
    createPagination('eventPagination', filteredData.length, eventsPerPage, page, (p) => window.renderEvents(p));
    setupCardListeners();
  }
  
  window.renderEvents(1);
}

/*
================================================================================
👥 동아리 & 소모임 렌더링
================================================================================
*/
let clubsCurrentFilter = '전체';
let clubsCurrentPage = 1;

if (typeof clubsData !== 'undefined') {
  const communityGrid = document.getElementById('communityGrid');
  const applyButton = document.getElementById('applyButton');
  const clubsPerPage = clubsConfig?.itemsPerPage || 15;
  
  if (applyButton && clubsConfig) {
    applyButton.href = clubsConfig.applyFormLink;
  }
  
  window.renderClubs = function(page, filter) {
    if (filter !== undefined) clubsCurrentFilter = filter;
    clubsCurrentPage = page;
    communityGrid.innerHTML = '';
    
    const filteredData = clubsCurrentFilter === '전체'
      ? clubsData
      : clubsData.filter(c => c.category === clubsCurrentFilter);
    
    const start = (page - 1) * clubsPerPage;
    const end = start + clubsPerPage;
    const pageClubs = filteredData.slice(start, end);
    
    pageClubs.forEach(club => {
      const card = document.createElement('div');
      card.className = 'community-card';
      card.dataset.category = club.category;
      if (club.detail) card.dataset.detail = club.detail;
      card.dataset.fullDesc = club.description || '';
      
      const imageSrc = club.image.startsWith('http') ? club.image : imgPrefix + club.image;

      const clubDescText = club.description || '';
      const clubDescFlat = clubDescText.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim();
      const clubTruncatedDesc = clubDescFlat.length > 80 ? clubDescFlat.substring(0, 80) + '...' : clubDescFlat;
      
      card.innerHTML = `
        <img src="${imageSrc}" alt="${club.title}" />
        <div class="community-content">
          <div class="community-header-card">
            <h3>${club.title}</h3>
            <span class="community-category">${club.category}</span>
          </div>
          <p class="community-description">${clubTruncatedDesc}</p>
          ${clubDescText.length > 80 ? '<span class="desc-more-hint">더보기</span>' : ''}
          <a href="${club.kakaoLink}" target="_blank" rel="noopener noreferrer" class="kakao-button">💬 참여하기</a>
        </div>
      `;
      
      communityGrid.appendChild(card);
    });
    
    createPagination('communityPagination', filteredData.length, clubsPerPage, page, (p) => window.renderClubs(p));
    setupCardListeners();
  }
  
  window.renderClubs(1);
}

/*
================================================================================
🏆 정규 동아리 렌더링
================================================================================
*/
let officialClubsCurrentFilter = '전체';
let officialClubsCurrentPage = 1;

if (typeof officialClubsData !== 'undefined') {
  const officialClubsGrid = document.getElementById('officialClubsGrid');
  const officialClubsApplyButton = document.getElementById('applyButton');
  const officialClubsPerPage = officialClubsConfig?.itemsPerPage || 15;
  
  if (officialClubsApplyButton) {
    if (officialClubsConfig?.applyFormLink) {
      officialClubsApplyButton.href = officialClubsConfig.applyFormLink;
      officialClubsApplyButton.style.display = '';
    } else {
      officialClubsApplyButton.style.display = 'none';
    }
  }
  
  window.renderOfficialClubs = function(page, filter) {
    if (filter !== undefined) officialClubsCurrentFilter = filter;
    officialClubsCurrentPage = page;
    officialClubsGrid.innerHTML = '';
    
    const filteredData = officialClubsCurrentFilter === '전체'
      ? officialClubsData.map((c, i) => ({...c, _origIdx: i}))
      : officialClubsData.map((c, i) => ({...c, _origIdx: i})).filter(c => c.category === officialClubsCurrentFilter);
    
    const start = (page - 1) * officialClubsPerPage;
    const end = start + officialClubsPerPage;
    const pageClubs = filteredData.slice(start, end);
    
    pageClubs.forEach((club, idx) => {
      const card = document.createElement('div');
      card.className = 'community-card official-club-card';
      card.dataset.category = club.category;
      card.dataset.officialIndex = club._origIdx;
      if (club.detail) card.dataset.detail = club.detail;
      
      const imageSrc = club.image.startsWith('http') ? club.image : imgPrefix + club.image;
      
      let cardButtonHtml = '';
      if (club.googleFormLink) {
        cardButtonHtml = `<a href="${club.googleFormLink}" target="_blank" rel="noopener noreferrer" class="card-google-form-button">📋 바로가기</a>`;
      } else if (club.kakaoLink) {
        cardButtonHtml = `<a href="${club.kakaoLink}" target="_blank" rel="noopener noreferrer" class="kakao-button">💬 참여하기</a>`;
      }

      const descText = club.description || '';
      const descFlat = descText.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim();
      const truncatedDesc = descFlat.length > 80 ? descFlat.substring(0, 80) + '...' : descFlat;

      card.innerHTML = `
        <img src="${imageSrc}" alt="${club.title}" />
        <div class="community-content">
          <div class="community-header-card">
            <h3>${club.title}</h3>
            <span class="community-category">${club.category}</span>
          </div>
          <p class="community-description">${truncatedDesc}</p>
          ${descText.length > 80 ? '<span class="desc-more-hint">더보기</span>' : ''}
          ${cardButtonHtml}
        </div>
      `;
      
      officialClubsGrid.appendChild(card);
    });
    
    createPagination('officialClubsPagination', filteredData.length, officialClubsPerPage, page, (p) => window.renderOfficialClubs(p));
    setupCardListeners();
  }
  
  window.renderOfficialClubs(1);
}

/*
================================================================================
🤝 제휴업체 렌더링
================================================================================
*/
let partnersCurrentFilter = '전체';
let partnersCurrentPage = 1;

if (typeof partnersData !== 'undefined') {
  const partnerGrid = document.getElementById('partnerGrid');
  const suggestButton = document.getElementById('suggestButton');
  const partnersPerPage = partnersConfig?.itemsPerPage || 15;
  
  if (suggestButton && partnersConfig) {
    suggestButton.href = partnersConfig.suggestFormLink;
  }
  
  window.renderPartners = function(page, filter) {
    if (filter !== undefined) partnersCurrentFilter = filter;
    partnersCurrentPage = page;
    partnerGrid.innerHTML = '';
    
    const filteredData = partnersCurrentFilter === '전체'
      ? partnersData
      : partnersData.filter(p => p.category === partnersCurrentFilter);
    
    const start = (page - 1) * partnersPerPage;
    const end = start + partnersPerPage;
    const pagePartners = filteredData.slice(start, end);
    
    pagePartners.forEach((partner) => {
      const card = document.createElement('div');
      card.className = 'partner-card';
      card.dataset.category = partner.category;
      card.dataset.index = partnersData.indexOf(partner);
      
      const imageSrc = partner.image.startsWith('http') ? partner.image : imgPrefix + partner.image;

      const partnerDescText = partner.description || '';
      const partnerDescFlat = partnerDescText.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim();
      const partnerTruncatedDesc = partnerDescFlat.length > 80 ? partnerDescFlat.substring(0, 80) + '...' : partnerDescFlat;
      card.dataset.fullDesc = partnerDescText;
      
      card.innerHTML = `
        <img src="${imageSrc}" alt="${partner.title}" />
        <div class="partner-content">
          <div class="partner-header-card">
            <h3>${partner.title}</h3>
            <span class="partner-category">${partner.category}</span>
          </div>
          <p class="partner-discount">${partner.discount}</p>
          <p class="partner-location">📍 ${partner.location}</p>
          <p class="partner-description">${partnerTruncatedDesc}</p>
          ${partnerDescText.length > 80 ? '<span class="desc-more-hint">더보기</span>' : ''}
        </div>
      `;
      
      partnerGrid.appendChild(card);
    });
    
    createPagination('partnerPagination', filteredData.length, partnersPerPage, page, (p) => window.renderPartners(p));
    setupCardListeners();
  }
  
  window.renderPartners(1);
}

/*
================================================================================
🔍 필터 기능 (동적 카테고리 생성)
================================================================================
*/
function createFilterButtons(containerId, categories, section, renderFn) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  container.innerHTML = '';
  
  const allBtn = document.createElement('button');
  allBtn.className = 'filter-btn active';
  allBtn.dataset.filter = '전체';
  allBtn.dataset.section = section;
  allBtn.textContent = '전체';
  container.appendChild(allBtn);
  
  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn';
    btn.dataset.filter = cat;
    btn.dataset.section = section;
    btn.textContent = cat;
    container.appendChild(btn);
  });
  
  container.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      container.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      renderFn(1, filter);
    });
  });
}

if (typeof eventsConfig !== 'undefined' && eventsConfig.categories) {
  createFilterButtons('eventsFilterButtons', eventsConfig.categories, 'events', window.renderEvents);
}
if (typeof clubsConfig !== 'undefined' && clubsConfig.categories) {
  createFilterButtons('clubsFilterButtons', clubsConfig.categories, 'community', window.renderClubs);
}
if (typeof officialClubsConfig !== 'undefined' && officialClubsConfig.categories) {
  createFilterButtons('officialClubsFilterButtons', officialClubsConfig.categories, 'official-clubs', window.renderOfficialClubs);
}
if (typeof partnersConfig !== 'undefined' && partnersConfig.categories) {
  createFilterButtons('partnersFilterButtons', partnersConfig.categories, 'partners', window.renderPartners);
}

/*
================================================================================
🪟 모달 기능
================================================================================
*/
const modal = document.getElementById('cardModal');
const modalClose = document.getElementById('modalClose');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalCategory = document.getElementById('modalCategory');
const modalMeta = document.getElementById('modalMeta');
const modalDescription = document.getElementById('modalDescription');
const modalButton = document.getElementById('modalButton');
const modalMap = document.getElementById('modalMap');
const modalSubImages = document.getElementById('modalSubImages');
const modalContact = document.getElementById('modalContact');
const modalSocialLinks = document.getElementById('modalSocialLinks');
const modalQrCode = document.getElementById('modalQrCode');

function openModal(cardData) {
  modalImage.src = cardData.image;
  modalImage.onclick = function() { openLightbox(this.src); };
  modalTitle.textContent = cardData.title;
  modalCategory.textContent = cardData.category;
  modalCategory.style.backgroundColor = cardData.categoryColor;

  const modalTitleSocial = document.getElementById('modalTitleSocial');
  if (modalTitleSocial) {
    let titleSocialHtml = '';
    if (cardData.instagram) {
      titleSocialHtml += `<a href="${cardData.instagram}" target="_blank" rel="noopener noreferrer" class="modal-title-social-link"><img src="${imgPrefix}image/로고/인스타그램.png" alt="Instagram" class="modal-title-social-icon"></a>`;
    }
    modalTitleSocial.innerHTML = titleSocialHtml;
  }
  
  modalMeta.innerHTML = cardData.meta.map(item => 
    `<p class="modal-meta-item">${item}</p>`
  ).join('');
  
  modalDescription.textContent = cardData.description;
  
  if (cardData.details && cardData.details.length > 0) {
    const detailsHtml = cardData.details.map(detail => 
      `<p class="modal-detail">${detail}</p>`
    ).join('');
    modalDescription.innerHTML = modalDescription.textContent + '<br><br>' + detailsHtml;
  }

  if (modalSubImages) {
    if (cardData.subImages && cardData.subImages.length > 0) {
      modalSubImages.innerHTML = cardData.subImages.map(src =>
        `<img src="${src}" alt="서브 이미지" class="modal-sub-image" onclick="openLightbox(this.src)" />`
      ).join('');
      modalSubImages.style.display = 'flex';
    } else {
      modalSubImages.innerHTML = '';
      modalSubImages.style.display = 'none';
    }
  }

  if (modalContact) {
    if (cardData.contact) {
      const contactLines = cardData.contact.split('\n').filter(l => l.trim());
      const contactHtml = contactLines.map(line => `<span class="modal-contact-value">${line.trim()}</span>`).join('');
      modalContact.innerHTML = `<div class="modal-contact-block"><span class="modal-contact-label">📞 연락처</span>${contactHtml}</div>`;
      modalContact.style.display = 'block';
    } else {
      modalContact.innerHTML = '';
      modalContact.style.display = 'none';
    }
  }

  if (modalSocialLinks) {
    modalSocialLinks.innerHTML = '';
    modalSocialLinks.style.display = 'none';
  }

  if (modalQrCode) {
    if (cardData.qrCodeImage) {
      const qrSrc = cardData.qrCodeImage.startsWith('http') ? cardData.qrCodeImage : imgPrefix + cardData.qrCodeImage;
      modalQrCode.innerHTML = `<p class="modal-qr-label">QR 코드</p><img src="${qrSrc}" alt="QR 코드" class="modal-qr-image" />`;
      modalQrCode.style.display = 'block';
    } else {
      modalQrCode.innerHTML = '';
      modalQrCode.style.display = 'none';
    }
  }

  let buttonsHtml = '';
  if (cardData.googleFormLink) {
    buttonsHtml += `<a href="${cardData.googleFormLink}" target="_blank" class="modal-button google-form">📋 구글폼 바로가기</a>`;
  }
  if (cardData.buttonUrl) {
    const buttonClass = cardData.buttonType === 'kakao' ? 'modal-button kakao' : 'modal-button';
    buttonsHtml += `<a href="${cardData.buttonUrl}" target="_blank" class="${buttonClass}">${cardData.buttonText}</a>`;
  }
  modalButton.innerHTML = buttonsHtml;
  
  if (modalMap) {
    if (cardData.mapCodeModal && cardData.mapCodeModal.trim()) {
      // 카카오맵 로더 스크립트가 없으면 한 번만 로드
      if (!window.kakaoMapLoaderLoaded) {
        const loaderScript = document.createElement('script');
        loaderScript.src = 'https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js';
        loaderScript.charset = 'UTF-8';
        document.head.appendChild(loaderScript);
        window.kakaoMapLoaderLoaded = true;
      }
      
      // DOM으로 파싱하여 설치 스크립트만 제거
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = cardData.mapCodeModal;
      
      // roughmapLoader.js 스크립트 태그 제거
      tempDiv.querySelectorAll('script').forEach(script => {
        if (script.src && script.src.includes('roughmapLoader.js')) {
          script.remove();
        }
      });
      
      modalMap.innerHTML = tempDiv.innerHTML;
      modalMap.style.display = 'block';
      
      // 실행 스크립트 재실행 (약간의 딜레이로 로더 로드 대기)
      setTimeout(() => {
        const scripts = modalMap.querySelectorAll('script');
        scripts.forEach(script => {
          const newScript = document.createElement('script');
          newScript.textContent = script.textContent;
          script.parentNode.replaceChild(newScript, script);
        });
      }, 100);
    } else {
      modalMap.innerHTML = '';
      modalMap.style.display = 'none';
    }
  }
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// 카드 클릭 이벤트 등록 함수
function setupCardListeners() {
  // 행사 카드 클릭
  document.querySelectorAll('.event-card').forEach(card => {
    if (card.dataset.listenerAdded) return;
    card.dataset.listenerAdded = 'true';
    card.addEventListener('click', (e) => {
      if (e.target.classList.contains('apply-button') || e.target.closest('.apply-button')) {
        return;
      }
      
      const img = card.querySelector('img');
      const title = card.querySelector('h3').textContent;
      const category = card.querySelector('.event-category').textContent;
      const date = card.querySelector('.event-date')?.textContent || '';
      const organizer = card.querySelector('.event-organizer')?.textContent || '';
      const location = card.querySelector('.event-location')?.textContent || '';
      const description = card.querySelector('.event-description').textContent;
      const fullDesc = card.dataset.fullDesc || '';
      const applyBtn = card.querySelector('.apply-button');
      
      const details = [];
      if (card.dataset.target) details.push(`🎯 대상: ${card.dataset.target}`);
      if (card.dataset.benefits) details.push(`🎁 혜택: ${card.dataset.benefits}`);
      if (card.dataset.requirements) details.push(`📦 준비물: ${card.dataset.requirements}`);
      if (card.dataset.schedule) details.push(`📅 일정: ${card.dataset.schedule}`);
      if (card.dataset.contact) details.push(`📞 문의: ${card.dataset.contact}`);
      
      const cardData = {
        image: img.src,
        title: title,
        category: category,
        categoryColor: category === '공모전' ? '#e74c3c' : '#3498db',
        meta: [date, organizer, location].filter(item => item),
        description: fullDesc || description,
        details: details,
        buttonUrl: applyBtn?.href || null,
        buttonText: applyBtn?.textContent || null,
        buttonType: 'apply'
      };
      
      openModal(cardData);
    });
  });

  // 동아리 카드 클릭
  document.querySelectorAll('.community-card').forEach(card => {
    if (card.dataset.listenerAdded) return;
    card.dataset.listenerAdded = 'true';
    card.addEventListener('click', (e) => {
      if (e.target.classList.contains('kakao-button') || e.target.closest('.kakao-button') ||
          e.target.classList.contains('card-google-form-button') || e.target.closest('.card-google-form-button')) {
        return;
      }
      
      const img = card.querySelector('img');
      const title = card.querySelector('h3').textContent;
      const category = card.querySelector('.community-category').textContent;
      const description = card.querySelector('.community-description').textContent;
      const kakaoBtn = card.querySelector('.kakao-button');
      const detailText = card.dataset.detail || '';
      const fullDesc = card.dataset.fullDesc || '';

      const isOfficialClub = card.classList.contains('official-club-card');
      let clubData = null;
      if (isOfficialClub && typeof officialClubsData !== 'undefined' && card.dataset.officialIndex !== undefined) {
        clubData = officialClubsData[parseInt(card.dataset.officialIndex)];
      }

      const subImages = [];
      if (clubData) {
        if (clubData.subImage1) {
          const s1 = clubData.subImage1.startsWith('http') ? clubData.subImage1 : imgPrefix + clubData.subImage1;
          subImages.push(s1);
        }
        if (clubData.subImage2) {
          const s2 = clubData.subImage2.startsWith('http') ? clubData.subImage2 : imgPrefix + clubData.subImage2;
          subImages.push(s2);
        }
      }
      
      const cardData = {
        image: img ? img.src : 'https://picsum.photos/600/300',
        title: title,
        category: category,
        categoryColor: '#27ae60',
        meta: [],
        description: clubData?.detail || clubData?.description || detailText || fullDesc || description,
        details: [],
        buttonUrl: kakaoBtn?.href || clubData?.kakaoLink || null,
        buttonText: kakaoBtn?.textContent || (clubData?.kakaoLink ? '💬 참여하기' : null),
        buttonType: 'kakao',
        subImages: subImages,
        contact: clubData?.contact || null,
        googleFormLink: clubData?.googleFormLink || null,
        qrCodeImage: clubData?.qrCodeImage || null,
        instagram: clubData?.instagram || null,
        facebook: clubData?.facebook || null,
      };
      
      openModal(cardData);
    });
  });

  // 제휴업체 카드 클릭
  document.querySelectorAll('.partner-card').forEach(card => {
    if (card.dataset.listenerAdded) return;
    card.dataset.listenerAdded = 'true';
    card.addEventListener('click', (e) => {
      if (e.target.closest('.partner-map-container')) {
        return;
      }
      
      const img = card.querySelector('img');
      const title = card.querySelector('h3').textContent;
      const category = card.querySelector('.partner-category').textContent;
      const discount = card.querySelector('.partner-discount')?.textContent || '';
      const location = card.querySelector('.partner-location')?.textContent || '';
      const description = card.querySelector('.partner-description').textContent;
      const fullDesc = card.dataset.fullDesc || '';
      const index = parseInt(card.dataset.index);
      const partner = typeof partnersData !== 'undefined' ? partnersData[index] : null;

      const partnerSubImages = [];
      if (partner) {
        if (partner.subImage1) {
          const s1 = partner.subImage1.startsWith('http') ? partner.subImage1 : imgPrefix + partner.subImage1;
          partnerSubImages.push(s1);
        }
        if (partner.subImage2) {
          const s2 = partner.subImage2.startsWith('http') ? partner.subImage2 : imgPrefix + partner.subImage2;
          partnerSubImages.push(s2);
        }
      }
      
      const cardData = {
        image: img.src,
        title: title,
        category: category,
        categoryColor: '#9b59b6',
        meta: [discount, location].filter(item => item),
        description: fullDesc || description,
        details: [],
        buttonUrl: null,
        buttonText: null,
        buttonType: null,
        subImages: partnerSubImages,
        mapCodeModal: partner?.mapCodeModal || null
      };
      
      openModal(cardData);
    });
  });
}

// 카드 렌더링 후 이벤트 리스너 등록
setupCardListeners();

// 모달 닫기
if (modalClose) {
  modalClose.addEventListener('click', closeModal);
}

if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
    closeModal();
  }
});

/*
================================================================================
🌙 다크모드 토글
================================================================================
*/
const darkModeToggle = document.getElementById('darkModeToggle');

function initDarkMode() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    if (darkModeToggle) darkModeToggle.textContent = '☀️';
  }
}

if (darkModeToggle) {
  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    darkModeToggle.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

initDarkMode();

/*
================================================================================
🏠 메인 페이지 렌더링
================================================================================
*/
if (typeof homeData !== 'undefined') {
  const heroTitle = document.getElementById('heroTitle');
  const heroSubtitle = document.getElementById('heroSubtitle');
  const heroDescription = document.getElementById('heroDescription');
  const noticeList = document.getElementById('noticeList');
  const faqPreviewList = document.getElementById('faqPreviewList');
  const snsGrid = document.getElementById('snsGrid');
  
  if (heroTitle) heroTitle.textContent = homeData.introduction.title;
  if (heroSubtitle) heroSubtitle.textContent = homeData.introduction.subtitle;
  if (heroDescription) heroDescription.textContent = homeData.introduction.description;
  
  if (noticeList && typeof notices !== 'undefined') {
    const recentNotices = notices.slice(0, 3);
    recentNotices.forEach(notice => {
      const item = document.createElement('a');
      item.className = 'notice-item';
      item.href = 'common/notice.html';
      item.innerHTML = `
        <div class="notice-item-header">
          <span class="notice-category">${notice.category}</span>
          ${notice.poll ? '<span class="notice-poll-badge">링크</span>' : ''}
          <span class="notice-date">${notice.date}</span>
        </div>
        <h3>${notice.title}</h3>
      `;
      noticeList.appendChild(item);
    });
  }
  
  if (faqPreviewList && typeof faqs !== 'undefined') {
    const recentFaqs = faqs.slice(0, 3);
    recentFaqs.forEach(faq => {
      const item = document.createElement('a');
      item.className = 'faq-preview-item';
      item.href = 'common/notice.html#faq';
      item.innerHTML = `
        <span class="faq-preview-icon">Q</span>
        <span class="faq-preview-text">${faq.question}</span>
      `;
      faqPreviewList.appendChild(item);
    });
  }
  
  if (snsGrid && homeData.sns) {
    homeData.sns.forEach(sns => {
      const button = document.createElement('a');
      button.className = 'sns-button';
      button.href = sns.url;
      button.target = '_blank';
      button.rel = 'noopener noreferrer';
      button.style.backgroundColor = sns.color;
      if (sns.color === '#FEE500') button.style.color = '#3c1e1e';
      button.innerHTML = `
        <span>${sns.icon}</span>
        <span>${sns.name}</span>
      `;
      snsGrid.appendChild(button);
    });
  }
}

/*
================================================================================
📢 공지사항 페이지 렌더링
================================================================================
*/
const noticeFullList = document.getElementById('noticeFullList');
const faqList = document.getElementById('faqList');
const suggestButton = document.getElementById('suggestButton');

if (noticeFullList && typeof notices !== 'undefined') {
  let noticesCurrentPage = 1;
  const noticesPerPage = (typeof noticeConfig !== 'undefined' && noticeConfig.itemsPerPage) ? noticeConfig.itemsPerPage : 20;
  
  function renderNotices(page) {
    noticesCurrentPage = page;
    noticeFullList.innerHTML = '';
    
    const start = (page - 1) * noticesPerPage;
    const end = start + noticesPerPage;
    const pageNotices = notices.slice(start, end);
    
    pageNotices.forEach(notice => {
      const item = document.createElement('div');
      item.className = 'notice-full-item';
      
      let pollHtml = '';
      if (notice.poll) {
        pollHtml = `
          <div class="notice-poll">
            <div class="notice-poll-title">${notice.poll.title}</div>
            <div class="notice-poll-description">${notice.poll.description}</div>
            <a href="${notice.poll.link}" target="_blank" rel="noopener noreferrer" class="notice-poll-link">바로가기</a>
          </div>
        `;
      }
      
      item.innerHTML = `
        <div class="notice-item-header">
          <span class="notice-category">${notice.category}</span>
          ${notice.poll ? '<span class="notice-poll-badge">링크</span>' : ''}
          <span class="notice-date">${notice.date}</span>
        </div>
        <h3>${notice.title}</h3>
        <p>${notice.content}</p>
        ${pollHtml}
      `;
      noticeFullList.appendChild(item);
    });
    
    createPagination('noticePagination', notices.length, noticesPerPage, page, renderNotices);
  }
  
  renderNotices(1);
}

if (faqList && typeof faqs !== 'undefined') {
  faqs.forEach((faq, index) => {
    const item = document.createElement('div');
    item.className = 'faq-item';
    const faqLinkHtml = faq.link ? `<a href="${faq.link}" target="_blank" rel="noopener noreferrer" class="faq-link-button">🔗 바로가기</a>` : '';
    item.innerHTML = `
      <div class="faq-question">
        <span>${faq.question}</span>
        <span class="faq-toggle">▼</span>
      </div>
      <div class="faq-answer">${faqLinkHtml}${faq.link ? '<br>' : ''}${faq.answer}</div>
    `;
    
    item.querySelector('.faq-question').addEventListener('click', () => {
      item.classList.toggle('active');
    });
    
    faqList.appendChild(item);
  });
}

if (suggestButton && typeof noticeConfig !== 'undefined' && noticeConfig.suggestFormLink) {
  suggestButton.href = noticeConfig.suggestFormLink;
}

/*
================================================================================
📋 공지사항 페이지 탭 내비게이션
================================================================================
*/
const noticeNavTabs = document.querySelectorAll('.notice-nav-tab');
const noticeSection = document.getElementById('noticeSection');
const faqSection = document.getElementById('faqSection');

if (noticeNavTabs.length > 0 && noticeSection && faqSection) {
  noticeSection.classList.add('active');
  
  if (window.location.hash === '#faq') {
    noticeSection.classList.remove('active');
    faqSection.classList.add('active');
    noticeNavTabs.forEach(t => t.classList.remove('active'));
    document.querySelector('[data-target="faqSection"]').classList.add('active');
  }
  
  noticeNavTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      noticeNavTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      const target = tab.dataset.target;
      noticeSection.classList.remove('active');
      faqSection.classList.remove('active');
      document.getElementById(target).classList.add('active');
    });
  });
}

/*
================================================================================
🔍 이미지 라이트박스 (클릭하면 크게 보기)
================================================================================
*/
const lightboxOverlay = document.createElement('div');
lightboxOverlay.className = 'image-lightbox';
lightboxOverlay.innerHTML = '<img src="" alt="">';
document.body.appendChild(lightboxOverlay);

function openLightbox(src) {
  lightboxOverlay.querySelector('img').src = src;
  lightboxOverlay.classList.add('show');
  document.body.style.overflow = 'hidden';
}

lightboxOverlay.addEventListener('click', function() {
  lightboxOverlay.classList.remove('show');
  document.body.style.overflow = '';
});
