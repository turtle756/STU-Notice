/*
================================================================================
🏆 정규 동아리 데이터
================================================================================
*/

const officialClubsData = [
  // @@@@@@@@@@@@@@@@@
  {
    category: "종교", // 카테고리 필터용 (officialClubsConfig.categories 중 하나)
    image: "https://github.com/turtle756/STU-Notice/blob/main/docs/image/%EC%A6%9D%EC%9D%B8%EB%93%A4%203.png", // 카드 이미지 경로
    title: "증인들",
    description: "안녕하세요, 찬양선교동아리 증인들입니다! 은혜를 사모하고 기쁘게 찬양하고 싶은 모든 분들 환영합니다! 평생 함께 예배할 수 있는 동역자를 만드시고 싶으시다면 증인들로 오세요 :)  문의) 010-3805-4577",
    kakaoLink: null, // 카카오톡 오픈채팅 링크 (가입 문의용)
    detail: null, // 모달 팝업에 표시될 상세 설명
  }, 

{
    category: "종교", // 카테고리 필터용 (officialClubsConfig.categories 중 하나)
    image: "https://github.com/turtle756/STU-Notice/blob/main/docs/image/%EC%97%98%ED%94%BC%EC%8A%A4%201.jpg", // 카드 이미지 경로
    title: "엘피스",
    description: "엘피스 찬양팀입니다",
    kakaoLink: "null", // 카카오톡 오픈채팅 링크 (가입 문의용)
    detail: "엘피스는 기독교정신을 바탕으로 예수 그리스도의 사랑과 실천으로 공동체를 이루며 그 시대의문화에 맞춰 어느 곳에서든지 복음을 전하는 데 목적을 두고 있습니다! 주된 활동은 학교 채플과 신앙수련회 찬양팀 방중사역 (수련회, 고교채플) 등이 있습니다!인스타그램) @_elpeace_페이스북) 하나님의 소망, 엘피스 문화찬양선교단전체리더 고민빈 010.9552.8018"

  , // 모달 팝업에 표시될 상세 설명
  },
  // #####################
];

const officialClubsConfig = {
  itemsPerPage: 15, // 한 페이지에 표시할 카드 수
  categories: ["종교", "봉사", "학술", "문화예술", "체육"], // 필터 버튼 목록 (추가/삭제 가능)
  applyFormLink: "https://forms.gle/example" // 정규 동아리 신청 폼 링크
};
