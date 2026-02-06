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
    subImage1: null, // 서브 이미지 1 (없으면 null)
    subImage2: null, // 서브 이미지 2 (없으면 null)
    title: "증인들",
    description: "안녕하세요, 찬양선교동아리 증인들입니다! 은혜를 사모하고 기쁘게 찬양하고 싶은 모든 분들 환영합니다! 평생 함께 예배할 수 있는 동역자를 만드시고 싶으시다면 증인들로 오세요 :)",
    detail: null, // 모달 팝업에 표시될 상세 설명
    kakaoLink: null, // 카카오톡 오픈채팅 링크 (없으면 null)
    googleFormLink: null, // 구글폼 링크 (없으면 null)
    qrCodeImage: null, // QR 코드 이미지 경로 (없으면 null)
    contact: "010-3805-4577", // 연락처 (없으면 null)
    instagram: null, // 인스타그램 링크 (없으면 null)
    facebook: null, // 페이스북 링크 (없으면 null)
  },
  // #####################

  // @@@@@@@@@@@@@@@@@
  {
    category: "종교", // 카테고리 필터용 (officialClubsConfig.categories 중 하나)
    image: "image/정규동아리/엘피스/엘피스.jpg", // 대표 이미지 경로
    subImage1: "image/정규동아리/엘피스/테스트용1.png", // 서브 이미지 1 (없으면 null)
    subImage2: "image/정규동아리/엘피스/테스트용2.png", // 서브 이미지 2 (없으면 null)
    title: "엘피스",
    description: "엘피스는 기독교정신을 바탕으로 예수 그리스도의 사랑과 실천으로 공동체를 이루며 그 시대의문화에 맞춰 어느 곳에서든지 복음을 전하는 데 목적을 두고 있습니다! 주된 활동은 학교 채플과 신앙수련회 찬양팀 방중사역 (수련회, 고교채플) 등이 있습니다!",
    detail: "엘피스는 서울신학대학교 소속 찬양선교동아리입니다. 매주 정기 연습과 합주를 통해 실력을 키우며, 학기 중 채플 찬양 인도와 각종 교내외 행사에서 활발히 활동하고 있습니다.", // 모달 팝업에 표시될 상세 설명
    kakaoLink: null, // 카카오톡 오픈채팅 링크 (없으면 null)
    googleFormLink: "https://forms.gle/example-elpeace", // 구글폼 링크 (없으면 null)
    qrCodeImage: "image/정규동아리/엘피스/테스트QR코드.png", // QR 코드 이미지 경로 (없으면 null)
    contact: "010-9552-8018", // 연락처 (없으면 null)
    instagram: "https://instagram.com/_elpeace_", // 인스타그램 링크 (없으면 null)
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
