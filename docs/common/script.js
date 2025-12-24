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
📅 캘린더 렌더링 (일정 페이지)
================================================================================
*/
if (typeof calendarMonths !== 'undefined') {
  const monthButtonsContainer = document.getElementById('monthButtons');
  const calendarImage = document.getElementById('calendarImage');
  
  // 이미지 프리로드
  const calendarImageCache = {};
  calendarMonths.forEach(m => {
    const img = new Image();
    img.src = imgPrefix + m.image;
    calendarImageCache[m.month] = img;
  });
  
  // 월 버튼 생성
  calendarMonths.forEach((m, index) => {
    const btn = document.createElement('button');
    btn.className = 'month-btn' + (index === 0 ? ' active' : '');
    btn.textContent = m.label;
    btn.dataset.month = m.month;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.month-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      calendarImage.src = calendarImageCache[m.month].src;
    });
    monthButtonsContainer.appendChild(btn);
  });
  
  // 현재 월에 맞는 탭 자동 선택
  function getTargetMonthIndex() {
    const currentMonth = new Date().getMonth() + 1; // 1-12
    
    // 월 → 탭 인덱스 매핑 (방학 처리 포함)
    const monthToIndex = {
      1: 3,   // 1월 → 12월 (4번째, index 3)
      2: 0,   // 2월 → 3월/9월 (1번째, index 0)
      3: 0,   // 3월 → 1번째
      4: 1,   // 4월 → 2번째
      5: 2,   // 5월 → 3번째
      6: 3,   // 6월 → 4번째
      7: 3,   // 7월 → 6월 (4번째, index 3)
      8: 0,   // 8월 → 9월 (1번째, index 0)
      9: 0,   // 9월 → 1번째
      10: 1,  // 10월 → 2번째
      11: 2,  // 11월 → 3번째
      12: 3   // 12월 → 4번째
    };
    
    const targetIndex = monthToIndex[currentMonth];
    return Math.min(targetIndex, calendarMonths.length - 1);
  }
  
  const initialIndex = getTargetMonthIndex();
  
  // 초기 활성 탭 설정
  if (calendarMonths.length > 0) {
    const buttons = monthButtonsContainer.querySelectorAll('.month-btn');
    buttons.forEach((btn, i) => {
      btn.classList.toggle('active', i === initialIndex);
    });
    calendarImage.src = calendarImageCache[calendarMonths[initialIndex].month].src;
  }
}

/*
================================================================================
🎉 행사 & 공모전 렌더링
================================================================================
*/
if (typeof eventsData !== 'undefined') {
  const eventGrid = document.getElementById('eventGrid');
  const suggestButton = document.getElementById('suggestButton');
  
  if (suggestButton && eventsConfig) {
    suggestButton.href = eventsConfig.suggestFormLink;
  }
  
  eventsData.forEach(event => {
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
    
    card.innerHTML = `
      <img src="${imageSrc}" alt="${event.title}" />
      <div class="event-content">
        <span class="event-category">${event.category}</span>
        <h3>${event.title}</h3>
        <p class="event-date">📅 ${event.date}</p>
        <p class="event-organizer">${event.organizer}</p>
        ${event.location ? `<p class="event-location">📍 장소: ${event.location}</p>` : ''}
        <p class="event-description">${event.description}</p>
        <div class="event-buttons">
          ${event.link ? `<a href="${event.link}" target="_blank" class="link-button">🔗 바로가기</a>` : ''}
          ${event.applyLink ? `<a href="${event.applyLink}" target="_blank" class="apply-button">📝 신청하기</a>` : ''}
        </div>
      </div>
    `;
    
    eventGrid.appendChild(card);
  });
}

/*
================================================================================
👥 동아리 & 소모임 렌더링
================================================================================
*/
if (typeof clubsData !== 'undefined') {
  const communityGrid = document.getElementById('communityGrid');
  const applyButton = document.getElementById('applyButton');
  
  if (applyButton && clubsConfig) {
    applyButton.href = clubsConfig.applyFormLink;
  }
  
  clubsData.forEach(club => {
    const card = document.createElement('div');
    card.className = 'community-card';
    card.dataset.category = club.category;
    if (club.detail) card.dataset.detail = club.detail;
    
    const imageSrc = club.image.startsWith('http') ? club.image : imgPrefix + club.image;
    
    card.innerHTML = `
      <img src="${imageSrc}" alt="${club.title}" />
      <div class="community-content">
        <div class="community-header-card">
          <h3>${club.title}</h3>
          <span class="community-category">${club.category}</span>
        </div>
        <p class="community-description">${club.description}</p>
        <a href="${club.kakaoLink}" target="_blank" rel="noopener noreferrer" class="kakao-button">💬 참여하기</a>
      </div>
    `;
    
    communityGrid.appendChild(card);
  });
}

/*
================================================================================
🤝 제휴사 렌더링
================================================================================
*/
if (typeof partnersData !== 'undefined') {
  const partnerGrid = document.getElementById('partnerGrid');
  const suggestButton = document.getElementById('suggestButton');
  
  if (suggestButton && partnersConfig) {
    suggestButton.href = partnersConfig.suggestFormLink;
  }
  
  partnersData.forEach((partner, index) => {
    const card = document.createElement('div');
    card.className = 'partner-card';
    card.dataset.category = partner.category;
    card.dataset.index = index;
    
    const imageSrc = partner.image.startsWith('http') ? partner.image : imgPrefix + partner.image;
    
    card.innerHTML = `
      <img src="${imageSrc}" alt="${partner.title}" />
      <div class="partner-content">
        <div class="partner-header-card">
          <h3>${partner.title}</h3>
          <span class="partner-category">${partner.category}</span>
        </div>
        <p class="partner-discount">${partner.discount}</p>
        <p class="partner-location">📍 ${partner.location}</p>
        <p class="partner-description">${partner.description}</p>
      </div>
    `;
    
    partnerGrid.appendChild(card);
  });
}

/*
================================================================================
🔍 필터 기능
================================================================================
*/
const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const section = button.dataset.section;
    const filter = button.dataset.filter;
    
    filterButtons.forEach(btn => {
      if (btn.dataset.section === section) {
        btn.classList.remove('active');
      }
    });
    button.classList.add('active');
    
    let cards = [];
    if (section === 'events') {
      cards = document.querySelectorAll('.event-card');
    } else if (section === 'community') {
      cards = document.querySelectorAll('.community-card');
    } else if (section === 'partners') {
      cards = document.querySelectorAll('.partner-card');
    }
    
    cards.forEach(card => {
      const category = card.dataset.category;
      if (filter === '전체' || category === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

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

function openModal(cardData) {
  modalImage.src = cardData.image;
  modalTitle.textContent = cardData.title;
  modalCategory.textContent = cardData.category;
  modalCategory.style.backgroundColor = cardData.categoryColor;
  
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
  
  if (cardData.buttonUrl) {
    const buttonClass = cardData.buttonType === 'kakao' ? 'modal-button kakao' : 'modal-button';
    modalButton.innerHTML = `<a href="${cardData.buttonUrl}" target="_blank" class="${buttonClass}">${cardData.buttonText}</a>`;
  } else {
    modalButton.innerHTML = '';
  }
  
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
        description: description,
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
    card.addEventListener('click', (e) => {
      if (e.target.classList.contains('kakao-button') || e.target.closest('.kakao-button')) {
        return;
      }
      
      const img = card.querySelector('img');
      const title = card.querySelector('h3').textContent;
      const category = card.querySelector('.community-category').textContent;
      const description = card.querySelector('.community-description').textContent;
      const kakaoBtn = card.querySelector('.kakao-button');
      const detailText = card.dataset.detail || '';
      
      const cardData = {
        image: img ? img.src : 'https://picsum.photos/600/300',
        title: title,
        category: category,
        categoryColor: '#27ae60',
        meta: [],
        description: detailText || description,
        details: [],
        buttonUrl: kakaoBtn?.href || null,
        buttonText: kakaoBtn?.textContent || null,
        buttonType: 'kakao'
      };
      
      openModal(cardData);
    });
  });

  // 제휴사 카드 클릭
  document.querySelectorAll('.partner-card').forEach(card => {
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
      const index = parseInt(card.dataset.index);
      const partner = typeof partnersData !== 'undefined' ? partnersData[index] : null;
      
      const cardData = {
        image: img.src,
        title: title,
        category: category,
        categoryColor: '#9b59b6',
        meta: [discount, location].filter(item => item),
        description: description,
        details: [],
        buttonUrl: null,
        buttonText: null,
        buttonType: null,
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
  notices.forEach(notice => {
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
}

if (faqList && typeof faqs !== 'undefined') {
  faqs.forEach((faq, index) => {
    const item = document.createElement('div');
    item.className = 'faq-item';
    item.innerHTML = `
      <div class="faq-question">
        <span>${faq.question}</span>
        <span class="faq-toggle">▼</span>
      </div>
      <div class="faq-answer">${faq.answer}</div>
    `;
    
    item.querySelector('.faq-question').addEventListener('click', () => {
      item.classList.toggle('active');
    });
    
    faqList.appendChild(item);
  });
}

if (suggestButton && typeof suggestFormLink !== 'undefined') {
  suggestButton.href = suggestFormLink;
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
