/* 
================================================================================
📅 캘린더 이미지 전환
================================================================================

캘린더 이미지 변경 방법:
1. docs/image/calendar/ 폴더에 새 이미지 넣기
2. 파일명: calendar_3.jpg (3월), calendar_4.jpg (4월), calendar_5.jpg (5월), calendar_6.jpg (6월)
3. 같은 파일명으로 덮어쓰기하면 자동 적용

================================================================================
*/

// 캘린더 이미지 전환
const monthButtons = document.querySelectorAll(".month-btn");
const calendarImage = document.getElementById("calendarImage");

monthButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    monthButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    
    const month = btn.getAttribute("data-month");
    calendarImage.src = `image/calendar/calendar_${month}.jpg`;
  });
});

// 페이지 로드 시 3월 캘린더 표시
if (calendarImage) {
  calendarImage.src = "image/calendar/calendar_3.jpg";
  monthButtons.forEach((btn) => {
    if (btn.getAttribute("data-month") === "3") {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* 
================================================================================
JS: SCROLL - 스크롤 네비게이션 함수
================================================================================
*/
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    const navHeight = 70;
    const sectionTop = section.offsetTop - navHeight;
    window.scrollTo({ top: sectionTop, behavior: "smooth" });
  }
}

/* 
================================================================================
JS: FILTERS - 필터 버튼 기능
================================================================================
*/
const filterButtons = document.querySelectorAll(".filter-btn");
const eventCards = document.querySelectorAll(".event-card");
const communityCards = document.querySelectorAll(".community-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const section = button.getAttribute("data-section");
    const filter = button.getAttribute("data-filter");

    filterButtons.forEach((btn) => {
      if (btn.getAttribute("data-section") === section) {
        btn.classList.remove("active");
      }
    });

    button.classList.add("active");

    if (section === "events") {
      eventCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        if (filter === "전체" || category === filter) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    } else if (section === "community") {
      communityCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        if (filter === "전체" || category === filter) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    }
  });
});

const navLinks = document.querySelectorAll(".nav-links a");
const sections = ["calendar", "events", "community"];

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const sectionTop = section.offsetTop - 100;
      if (window.pageYOffset >= sectionTop) {
        current = sectionId;
      }
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("onclick")?.includes(current)) {
      link.classList.add("active");
    }
  });
});

/* 
================================================================================
JS: MODAL - 모달 팝업 기능
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
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

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
    if (card.dataset.benefit) details.push(`🎁 혜택: ${card.dataset.benefit}`);
    if (card.dataset.preparation) details.push(`📦 준비물: ${card.dataset.preparation}`);
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
    
    const title = card.querySelector('h3').textContent;
    const category = card.querySelector('.community-category').textContent;
    const members = card.querySelector('.community-members')?.textContent || '';
    const description = card.querySelector('.community-description').textContent;
    const kakaoBtn = card.querySelector('.kakao-button');
    
    const detailText = card.dataset.detail || '';
    
    // 동아리 카드에 이미지가 없으면 무작위 이미지 사용
    const cardData = {
      image: 'https://picsum.photos/600/300',
      title: title,
      category: category,
      categoryColor: '#27ae60',
      meta: [members].filter(item => item),
      description: detailText || description,
      details: [],
      buttonUrl: kakaoBtn?.href || null,
      buttonText: kakaoBtn?.textContent || null,
      buttonType: 'kakao'
    };
    
    openModal(cardData);
  });
});

// 닫기 버튼 클릭
modalClose.addEventListener('click', closeModal);

// 배경 클릭으로 닫기
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// ESC 키로 닫기
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    closeModal();
  }
});
