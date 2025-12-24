/*
================================================================================
공통 스크립트 (수정 불필요)
================================================================================
*/

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
  
  // 첫 번째 이미지 표시
  if (calendarMonths.length > 0) {
    calendarImage.src = calendarImageCache[calendarMonths[0].month].src;
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
        ${event.applyLink ? `<a href="${event.applyLink}" target="_blank" class="apply-button">📝 신청하기</a>` : ''}
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
        <a href="${club.kakaoLink}" target="_blank" rel="noopener noreferrer" class="kakao-button">💬 오픈채팅 참여하기</a>
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
  
  partnersData.forEach(partner => {
    const card = document.createElement('div');
    card.className = 'partner-card';
    card.dataset.category = partner.category;
    if (partner.mapEmbed) card.dataset.mapEmbed = partner.mapEmbed;
    
    const imageSrc = partner.image.startsWith('http') ? partner.image : imgPrefix + partner.image;
    
    const mapHtml = partner.mapEmbed ? `
      <div class="partner-map-container">
        <iframe src="${partner.mapEmbed}" class="partner-map" frameborder="0" allowfullscreen></iframe>
      </div>
    ` : '';
    
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
        ${mapHtml}
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
    if (cardData.mapEmbed) {
      modalMap.innerHTML = `<iframe src="${cardData.mapEmbed}" class="modal-map-iframe" frameborder="0" allowfullscreen></iframe>`;
      modalMap.style.display = 'block';
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
      const mapEmbed = card.dataset.mapEmbed || null;
      
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
        mapEmbed: mapEmbed
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
