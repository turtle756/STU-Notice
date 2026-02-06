/*
================================================================================
🎉 행사 & 공모전 데이터
================================================================================
*/

const eventsData = [
  // @@@@@@@@@@@@@@@@@
  {
    category: "행사", // 카테고리 필터용 (eventsConfig.categories 중 하나)
    image: "image/행사&공모전/2024가을축제/가을축제.png", // 카드 이미지 경로
    title: "2024 가을 축제",
    date: "2024.11.15 - 2024.11.16", // 카드에 표시될 날짜
    organizer: "주관: 학생회", // 주관/주최 정보
    location: "중앙운동장", // 장소 (행사만 해당, 공모전은 null)
    description: "우리 대학 가을 축제에 여러분을 초대합니다!",
    link: "https://example.com/festival", // 바로가기 버튼 링크 (없으면 null)
    applyLink: null, // 신청하기 버튼 링크 (공모전용, 없으면 null)
    details: { // 모달 팝업에 표시될 상세 정보
      target: "전체 재학생", // 대상
      benefits: "무료 먹거리 제공, 푸짐한 경품 추첨, 다양한 공연 관람", // 혜택
      schedule: "11/15(금) 17:00-22:00, 11/16(토) 12:00-22:00", // 일정
      contact: "총학생회 010-XXXX-XXXX", // 문의처
    },
  },
  // #####################

  // @@@@@@@@@@@@@@@@@
  {
    category: "공모전", // 카테고리 필터용 (eventsConfig.categories 중 하나)
    image: "image/행사&공모전/창업아이디어공모전/창업공모전.png", // 카드 이미지 경로
    title: "창업 아이디어 공모전",
    date: "2024.11.20", // 카드에 표시될 날짜
    organizer: "주최: LINC+ 사업단", // 주관/주최 정보
    location: null, // 장소 (행사만 해당, 공모전은 null)
    description: "혁신적인 창업 아이디어를 공모합니다.",
    link: null, // 바로가기 버튼 링크 (없으면 null)
    applyLink: "https://forms.gle/example1", // 신청하기 버튼 링크 (공모전용, 없으면 null)
    details: { // 모달 팝업에 표시될 상세 정보
      target: "전체 재학생 및 휴학생", // 대상
      benefits: "대상 200만원, 최우수상 100만원, 우수상 50만원, 창업 멘토링 제공", // 혜택
      requirements: "제출물: 사업계획서(10페이지 이내), PPT 발표자료", // 준비물/제출물
      schedule: "신청 마감: 11/20, 서류심사: 11/25, 발표심사: 12/1", // 일정
      contact: "LINC+ 사업단 02-XXXX-XXXX", // 문의처
    },
  },
  // #####################

  // @@@@@@@@@@@@@@@@@
  {
    category: "행사", // 카테고리 필터용 (eventsConfig.categories 중 하나)
    image: "image/행사&공모전/겨울MT/겨울MT.png", // 카드 이미지 경로
    title: "겨울 MT",
    date: "2024.12.05", // 카드에 표시될 날짜
    organizer: "주관: 학생회", // 주관/주최 정보
    location: "강원도 평창", // 장소 (행사만 해당, 공모전은 null)
    description: "학과 MT에 참여하세요!",
    link: null, // 바로가기 버튼 링크 (없으면 null)
    applyLink: null, // 신청하기 버튼 링크 (공모전용, 없으면 null)
    details: {}, // 모달 팝업에 표시될 상세 정보
  },
  // #####################

  // @@@@@@@@@@@@@@@@@
  {
    category: "공모전", // 카테고리 필터용 (eventsConfig.categories 중 하나)
    image: "image/행사&공모전/글쓰기경진대회/글쓰기대회.png", // 카드 이미지 경로
    title: "글쓰기 경진대회",
    date: "2024.11.30", // 카드에 표시될 날짜
    organizer: "주최: 학습지원센터", // 주관/주최 정보
    location: null, // 장소 (행사만 해당, 공모전은 null)
    description: "다양한 글쓰기 주제로 경진대회에 도전하세요.",
    link: null, // 바로가기 버튼 링크 (없으면 null)
    applyLink: "https://forms.gle/example2", // 신청하기 버튼 링크 (공모전용, 없으면 null)
    details: {}, // 모달 팝업에 표시될 상세 정보
  },
  // #####################

  // @@@@@@@@@@@@@@@@@
  {
    category: "행사", // 카테고리 필터용 (eventsConfig.categories 중 하나)
    image: "image/행사&공모전/체육대회/체육대회.png", // 카드 이미지 경로
    title: "체육대회",
    date: "2024.12.10", // 카드에 표시될 날짜
    organizer: "주관: 체육부", // 주관/주최 정보
    location: "체육관", // 장소 (행사만 해당, 공모전은 null)
    description: "단합 조으로 자웅을 겨루는 체육대회",
    link: null, // 바로가기 버튼 링크 (없으면 null)
    applyLink: null, // 신청하기 버튼 링크 (공모전용, 없으면 null)
    details: {}, // 모달 팝업에 표시될 상세 정보
  },
  // #####################

  // @@@@@@@@@@@@@@@@@
  {
    category: "공모전", // 카테고리 필터용 (eventsConfig.categories 중 하나)
    image: "https://picsum.photos/400/304", // 카드 이미지 경로
    title: "프로그래밍 해커톤",
    date: "2024.12.15", // 카드에 표시될 날짜
    organizer: "주최: 컴퓨터공학과", // 주관/주최 정보
    location: null, // 장소 (행사만 해당, 공모전은 null)
    description: "24시간 코딩 마라톤에 도전하세요!",
    link: null, // 바로가기 버튼 링크 (없으면 null)
    applyLink: "https://forms.gle/example3", // 신청하기 버튼 링크 (공모전용, 없으면 null)
    details: {}, // 모달 팝업에 표시될 상세 정보
  },
  // #####################
];

const eventsConfig = {
  pageTitle: "교내 행사 & 공모전", // 페이지 상단 제목
  pageSubtitle: "다양한 교내 활동에 참여해보세요!", // 페이지 상단 부제목
  suggestFormLink: "https://forms.gle/edD7CaFW92pCbjQm8", // 페이지 상단 "건의하기" 버튼 링크
  itemsPerPage: 15, // 한 페이지에 표시할 카드 수
  categories: ["행사", "공모전"], // 필터 버튼 목록 (추가/삭제 가능)
};
