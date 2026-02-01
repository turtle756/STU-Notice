/*
================================================================================
🏆 정규 동아리 데이터
================================================================================
*/

const officialClubsData = [
  // @@@@@@@@@@@@@@@@@
  {
    category: "종교", // 카테고리 필터용 (officialClubsConfig.categories 중 하나)
    image: "image/example_club.png", // 카드 이미지 경로
    title: "예시 정규 동아리",
    description: "정규 동아리 예시입니다.",
    kakaoLink: "https://open.kakao.com/o/example", // 카카오톡 오픈채팅 링크 (가입 문의용)
    detail: "정규 동아리 상세 설명입니다.", // 모달 팝업에 표시될 상세 설명
  },
  // #####################
];

const officialClubsConfig = {
  itemsPerPage: 15, // 한 페이지에 표시할 카드 수
  categories: ["종교", "봉사", "학술", "문화예술", "체육"] // 필터 버튼 목록 (추가/삭제 가능)
};
