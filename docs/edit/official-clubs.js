/*
================================================================================
🏆 정규 동아리 데이터
================================================================================
*/

const officialClubsData = [
  // @@@@@@@@@@@@@@@@@
  {
    category: "종교", // 카테고리 필터용 (officialClubsConfig.categories 중 하나)
    image: "image/정규동아리/증인들/증인들.png", // 대표 이미지 경로
    subImage1: "image/정규동아리/증인들/증인들 1.jpg", // 서브 이미지 1 (없으면 null)
    subImage2: "image/정규동아리/증인들/증인들 2.jpg", // 서브 이미지 2 (없으면 null)
    title: "증인들",
    description: "안녕하세요, 찬양선교동아리 증인들입니다!\n은혜를 사모하고 기쁘게 찬양하고 싶은 모든 분들 환영합니다!\n평생 함께 예배할 수 있는 동역자를 만드시고 싶으시다면 증인들로 오세요 :)",
    detail: null, // 모달 팝업에 표시될 상세 설명
    kakaoLink: null, // 카카오톡 오픈채팅 링크 (없으면 null)
    googleFormLink: null, // 구글폼 링크 (없으면 null)
    qrCodeImage: "image/정규동아리/증인들/증인들 4.png", // QR 코드 이미지 경로 (없으면 null)
    contact: "010-3805-4577", // 연락처 (없으면 null)
    instagram: "https://www.instagram.com/witness.official_?igsh=ZnlvYjJsNGdleXcy", // 인스타그램 링크 (없으면 null)
    facebook: null, // 페이스북 링크 (없으면 null)
  },
  // #####################

  // @@@@@@@@@@@@@@@@@
  {
    category: "종교", // 카테고리 필터용 (officialClubsConfig.categories 중 하나)
    image: "image/정규동아리/엘피스/엘피스.jpg", // 대표 이미지 경로
    subImage1: "image/정규동아리/엘피스/엘피스 2.png", // 서브 이미지 1 (없으면 null)
    subImage2: null, // 서브 이미지 2 (없으면 null)
    title: "엘피스",
    description: "엘피스는 기독교정신을 바탕으로\n예수 그리스도의 사랑과 실천으로 공동체를 이루며 그 시대의문화에 맞춰 어느 곳에서든지 복음을 전하는 데 목적을 두고 있습니다!\n주된 활동은 학교 채플과 신앙수련회 찬양팀 방중사역 (수련회, 고교채플) 등이 있습니다!",
    detail: null, // 모달 팝업에 표시될 상세 설명
    kakaoLink: null, // 카카오톡 오픈채팅 링크 (없으면 null)
    googleFormLink: null, // 구글폼 링크 (없으면 null)
    qrCodeImage: null, // QR 코드 이미지 경로 (없으면 null)
    contact: "010-9552-8018", // 연락처 (없으면 null)
    instagram: "https://instagram.com/_elpeace_", // 인스타그램 링크 (없으면 null)
    facebook: null, // 페이스북 링크 (없으면 null)
  },
  // #####################

   // @@@@@@@@@@@@@@@@@
  {
    category: "종교", // 카테고리 필터용 (officialClubsConfig.categories 중 하나)
    image: "image/정규동아리/아침햇살/아침햇살 1.jpg", // 대표 이미지 경로
    subImage1: "image/정규동아리/아침햇살/아침햇살 2.jpg", // 서브 이미지 1 (없으면 null)
    subImage2: null, // 서브 이미지 2 (없으면 null)
    title: "아침햇살",
    description: "안녕하세요 저희는 아침을 깨우고 새벽채플을 여는 아침햇살 찬양팀입니다!저희는 매주 화요일 기도회를 진행하고, 목,금 생활관 새벽채플 찬양인도를 맡고있습니다. 그 외에 선후배가 서로 교제하는 기도짝, 매 달 진행되는 생활관 영성집회 마지막으로 방중활동 같은 활동들을 하고 있습니다. 자세한 내용은 인스타 서울신학대학교 아침햇살 홍보 포스터 참고해주세요!",
    detail: null, // 모달 팝업에 표시될 상세 설명
    kakaoLink: null, // 카카오톡 오픈채팅 링크 (없으면 null)
    googleFormLink:"https://docs.google.com/forms/d/e/1FAIpQLSeX-lNKkAwe607ChqSy1WqSLnI_hFZqzeeGckfFpW71tWVxLA/viewform?usp=header", // 구글폼 링크 (없으면 null)
    qrCodeImage: null, // QR 코드 이미지 경로 (없으면 null)
    contact: "(전체리더)010-9625-8440", // 연락처 (없으면 null)
    instagram: "https://www.instagram.com/morning_sunshine_official?igsh=MTFpMDlhaHcwcHlqdA==", // 인스타그램 링크 (없으면 null)
    facebook: null, // 페이스북 링크 (없으면 null)
  },
  // #####################
  
  // @@@@@@@@@@@@@@@@@
  {
    category: "종교", // 카테고리 필터용 (officialClubsConfig.categories 중 하나)
    image: "image/정규동아리/CCC/CCC.jpg", // 대표 이미지 경로
    subImage1: null, // 서브 이미지 1 (없으면 null)
    subImage2: null, // 서브 이미지 2 (없으면 null)
    title: "CCC",
    description: "서울신학대학교 중앙동아리 CCC는 전국 41개 도시,\n320여 개 대학에서 약 2만 명의 대학생들이 함께하는 전국 연합 기독교 동아리입니다.\n\"Movements Everywhere\"라는 비전 아래 성령의 능력으로 그리스도를 전하고 제자를 세우며,\n1:1 순모임, 캠퍼스 모임, 연합 채플, 수련회와 단기선교 등 다양한 활동을 통해\n신앙과 공동체의 성장을 경험할 수 있는 동아리입니다.",
    detail: null, // 모달 팝업에 표시될 상세 설명
    kakaoLink: null, // 카카오톡 오픈채팅 링크 (없으면 null)
    googleFormLink: "https://forms.gle/FAiHWku5BQAqffDN8", // 구글폼 링크 (없으면 null)
    qrCodeImage: null, // QR 코드 이미지 경로 (없으면 null)
    contact: "010-7467-5623", // 연락처 (없으면 null)
    instagram: null, // 인스타그램 링크 (없으면 null)
    facebook: null, // 페이스북 링크 (없으면 null)
  },
  // #####################

  
  // @@@@@@@@@@@@@@@@@
  {
    category: "종교", // 카테고리 필터용 (officialClubsConfig.categories 중 하나)
    image: "image/정규동아리/북한선교동아리/북한선교동아리 1.jpg", // 대표 이미지 경로
    subImage1: "image/정규동아리/북한선교동아리/북한선교동아리 2.jpg," // 서브 이미지 1 (없으면 null)
    subImage2: null, // 서브 이미지 2 (없으면 null)
    title: "북한선교동아리",
    description: "북한선교 동아리는 하나님의 마음으로 북한을 위해서 기도하는 동아리입니다. 그리고 나라와 민족, 온 열방을 위해서 기도하고 있습니다. 하나님의 마음으로 북한을 사랑하며 기도하고 싶으신 분들 대환영합니다!",
    detail: null, // 모달 팝업에 표시될 상세 설명
    kakaoLink: null, // 카카오톡 오픈채팅 링크 (없으면 null)
    googleFormLink: null, // 구글폼 링크 (없으면 null)
    qrCodeImage: null, // QR 코드 이미지 경로 (없으면 null)
    contact: null, // 연락처 (없으면 null)
    instagram:"https://www.instagram.com/stu__nkmc?igsh=MTJwMnh6MThwM3F2eg==", // 인스타그램 링크 (없으면 null)
    facebook: null, // 페이스북 링크 (없으면 null)
  },
  // #####################
];

const officialClubsConfig = {
  pageTitle: "정규 동아리", // 페이지 상단 제목
  pageSubtitle: "학교에서 공식 인정받은 동아리입니다", // 페이지 상단 부제목
  itemsPerPage: 15, // 한 페이지에 표시할 카드 수
  categories: ["종교", "봉사", "학술", "취미"], // 필터 버튼 목록 (추가/삭제 가능)
  applyFormLink: null, // 정규 동아리 신청 폼 링크
};
