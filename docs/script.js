      Ctrl+F 검색어: "JS: CALENDAR DATA"
      
      📅 캘린더 일정 추가/수정 방법
      ================================================================================
      
      1. 원하는 월(9, 10, 11, 12) 아래에 일정 추가:
         events: {
           15: [{ name: "가을 축제", type: "" }],  // 15일에 일반 행사
           20: [{ name: "창업 공모전", type: "contest" }],  // 20일에 공모전 (빨간색)
         }
      
      2. 이벤트 타입 (type):
         - "" (빈 문자열) = 파란색 일반 행사
         - "contest" = 빨간색 공모전
         - "club" = 녹색 동아리 행사
      
      3. 하루에 여러 일정 추가:
         15: [
           { name: "가을 축제", type: "" },
           { name: "창업 설명회", type: "contest" }
         ]
      
      4. 월 정보 (firstDay, daysInMonth):
         - firstDay: 해당 월 1일의 요일 (0=일, 1=월, 2=화, ... 6=토)
         - daysInMonth: 해당 월의 총 일수
         - 캘린더 웹사이트나 달력을 보고 확인하세요!
      
      ================================================================================
      */
      
      // 캘린더 데이터 (월별)
      const calendarData = {
        9: {
          month: "2024년 9월",
          firstDay: 0,
          daysInMonth: 30,
          prevMonthDays: 31,
          events: {
            5: [{ name: "신입생 환영회", type: "" }],
            12: [{ name: "동아리 박람회", type: "club" }],
            20: [{ name: "추석 연휴", type: "" }],
          },
        },
        10: {
          month: "2024년 10월",
          firstDay: 2,
          daysInMonth: 31,
          prevMonthDays: 30,
          events: {
            3: [{ name: "개천절", type: "" }],
            9: [{ name: "한글날", type: "" }],
            15: [{ name: "중간고사", type: "" }],
            16: [{ name: "중간고사", type: "" }],
            17: [{ name: "중간고사", type: "" }],
            25: [{ name: "학술제", type: "club" }],
          },
        },
        11: {
          month: "2024년 11월",
          firstDay: 5,
          daysInMonth: 30,
          prevMonthDays: 31,
          events: {
            15: [{ name: "가을 축제", type: "" }],
            16: [{ name: "가을 축제", type: "" }],
            20: [{ name: "창업 공모전", type: "contest" }],
            30: [{ name: "글쓰기 대회", type: "contest" }],
          },
        },
        12: {
          month: "2024년 12월",
          firstDay: 0,
          daysInMonth: 31,
          prevMonthDays: 30,
          events: {
            5: [{ name: "겨울 MT", type: "" }],
            10: [{ name: "체육대회", type: "" }],
            15: [{ name: "해커톤", type: "contest" }],
            20: [{ name: "기말고사", type: "" }],
            21: [{ name: "기말고사", type: "" }],
            22: [{ name: "기말고사", type: "" }],
            25: [{ name: "크리스마스", type: "" }],
          },
        },
      };

      let currentDisplayMonth = 11;

      /* 
      ================================================================================
      JS: CALENDAR RENDER - 캘린더 렌더링 함수
      Ctrl+F 검색어: "JS: CALENDAR RENDER"
      - 위 calendarData를 읽어서 화면에 캘린더를 그립니다
      - 이 함수는 수정하지 않아도 됩니다
      ================================================================================
      */
      function renderCalendar(month) {
        const data = calendarData[month];
        const calendarDaysContainer = document.getElementById("calendarDays");
        calendarDaysContainer.innerHTML = "";

        document.getElementById("currentMonth").textContent = data.month;

        const firstDay = data.firstDay;
        const daysInMonth = data.daysInMonth;
        const prevMonthDays = data.prevMonthDays;

        for (let i = firstDay - 1; i >= 0; i--) {
          const dayDiv = document.createElement("div");
          dayDiv.className = "calendar-day other-month";
          dayDiv.innerHTML = `<div class="calendar-day-number">${prevMonthDays - i}</div>`;
          calendarDaysContainer.appendChild(dayDiv);
        }

        for (let day = 1; day <= daysInMonth; day++) {
          const dayDiv = document.createElement("div");
          dayDiv.className = "calendar-day";
          dayDiv.innerHTML = `<div class="calendar-day-number">${day}</div>`;

          if (data.events[day]) {
            data.events[day].forEach((event) => {
              const eventDiv = document.createElement("div");
              eventDiv.className = `calendar-event ${event.type}`;
              eventDiv.textContent = event.name;
              dayDiv.appendChild(eventDiv);
            });
          }

          calendarDaysContainer.appendChild(dayDiv);
        }

        const totalCells = firstDay + daysInMonth;
        const remainingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);

        for (let i = 1; i <= remainingCells; i++) {
          const dayDiv = document.createElement("div");
          dayDiv.className = "calendar-day other-month";
          dayDiv.innerHTML = `<div class="calendar-day-number">${i}</div>`;
          calendarDaysContainer.appendChild(dayDiv);
        }
      }

      renderCalendar(currentDisplayMonth);

      const monthButtons = document.querySelectorAll(".month-btn");
      monthButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
          monthButtons.forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");

          const month = parseInt(btn.getAttribute("data-month"));
          currentDisplayMonth = month;
          renderCalendar(month);
        });
      });

      function scrollToTop() {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }

      /* 
      ================================================================================
      JS: SCROLL - 스크롤 네비게이션 함수
      Ctrl+F 검색어: "JS: SCROLL"
      - 상단 메뉴 클릭 시 해당 섹션으로 부드럽게 스크롤합니다
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
      Ctrl+F 검색어: "JS: FILTERS"
      - 행사/공모전, 동아리 섹션의 필터 버튼 기능
      - 전체/행사/공모전 또는 전체/스포츠/학술/문화예술/취미 필터링
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
      Ctrl+F 검색어: "JS: MODAL"
      - 카드 클릭 시 확대 모달 표시
      - ESC 키, 배경 클릭, X 버튼으로 닫기
      - data-* 속성 정보를 읽어서 모달에 상세 정보 표시
      ================================================================================
      */
      const modal = document.getElementById('cardModal');
      const modalClose = document.getElementById('modalClose');
      const modalImage = document.getElementById('modalImage');
      const modalCategory = document.getElementById('modalCategory');
      const modalTitle = document.getElementById('modalTitle');
      const modalMeta = document.getElementById('modalMeta');
      const modalDescription = document.getElementById('modalDescription');
      const modalButton = document.getElementById('modalButton');

      // 모달 열기 함수
      function openModal(cardData) {
        modalImage.src = cardData.image;
        modalImage.alt = cardData.title;
        modalCategory.textContent = cardData.category;
        modalCategory.style.backgroundColor = cardData.categoryColor || '#3498db';
        modalTitle.textContent = cardData.title;
        
        // 메타 정보 (날짜, 주관, 장소 등)
        modalMeta.innerHTML = '';
        if (cardData.meta && cardData.meta.length > 0) {
          cardData.meta.forEach(item => {
            const metaDiv = document.createElement('div');
            metaDiv.className = 'modal-meta';
            metaDiv.textContent = item;
            modalMeta.appendChild(metaDiv);
          });
        }
        
        // 상세 정보 추가 (data-* 속성 활용)
        if (cardData.details && cardData.details.length > 0) {
          const detailList = document.createElement('ul');
          detailList.style.marginTop = '1rem';
          detailList.style.paddingLeft = '1.5rem';
          detailList.style.lineHeight = '1.8';
          cardData.details.forEach(detail => {
            const li = document.createElement('li');
            li.textContent = detail;
            li.style.marginBottom = '0.5rem';
            detailList.appendChild(li);
          });
          modalMeta.appendChild(detailList);
        }
        
        modalDescription.textContent = cardData.description;
        
        // 버튼 (신청하기 또는 카카오톡)
        modalButton.innerHTML = '';
        if (cardData.buttonUrl) {
          const btn = document.createElement('a');
          btn.href = cardData.buttonUrl;
          btn.target = '_blank';
          btn.rel = 'noopener noreferrer';
          btn.className = 'modal-button' + (cardData.buttonType === 'kakao' ? ' kakao' : '');
          btn.textContent = cardData.buttonText || '📝 신청하기';
          modalButton.appendChild(btn);
        }
        
        // 모달 열기
        document.body.classList.add('modal-open');
        modal.classList.add('active');
        modalClose.focus();
      }

      // 모달 닫기 함수
      function closeModal() {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
      }

      // 이벤트 카드 클릭
      document.querySelectorAll('.event-card').forEach(card => {
        card.addEventListener('click', (e) => {
          // 버튼 클릭은 모달 열지 않음
          if (e.target.classList.contains('apply-button') || e.target.closest('.apply-button')) {
            return;
          }
          
          const img = card.querySelector('img');
          const category = card.querySelector('.event-category').textContent;
          const title = card.querySelector('h3').textContent;
          const date = card.querySelector('.event-date')?.textContent || '';
          const organizer = card.querySelector('.event-organizer')?.textContent || '';
          const location = card.querySelector('.event-location')?.textContent || '';
          const description = card.querySelector('.event-description').textContent;
          const applyBtn = card.querySelector('.apply-button');
          
          // data-* 속성에서 상세 정보 읽기
          const details = [];
          if (card.dataset.target) details.push(`🎯 참가 대상: ${card.dataset.target}`);
          if (card.dataset.benefits) details.push(`🎁 참가 혜택: ${card.dataset.benefits}`);
          if (card.dataset.requirements) details.push(`📋 준비물/제출물: ${card.dataset.requirements}`);
          if (card.dataset.schedule) details.push(`⏰ 일정: ${card.dataset.schedule}`);
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
          // 버튼 클릭은 모달 열지 않음
          if (e.target.classList.contains('kakao-button') || e.target.closest('.kakao-button')) {
            return;
          }
          
          const title = card.querySelector('h3').textContent;
          const category = card.querySelector('.community-category').textContent;
          const members = card.querySelector('.community-members')?.textContent || '';
          const description = card.querySelector('.community-description').textContent;
          const kakaoBtn = card.querySelector('.kakao-button');
          
          // data-detail 속성에서 상세 정보 읽기
          const detailText = card.dataset.detail || '';
          
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
