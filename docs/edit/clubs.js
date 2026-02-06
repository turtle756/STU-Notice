/*
================================================================================
👥 동아리 & 소모임 데이터
================================================================================
*/

const clubsData = [
  // @@@@@@@@@@@@@@@@@
  {
    category: "스포츠", // 카테고리 필터용 (clubsConfig.categories 중 하나)
    image: "image/동아리/축구동아리.png", // 카드 이미지 경로
    title: "축구 동아리",
    description: "함께 축구하며 친목을 다지는 동아리입니다.",
    kakaoLink: "https://open.kakao.com/o/example1", // 카카오톡 오픈채팅 링크 (가입 문의용)
    detail: "매주 화/목요일 저녁 7시에 체육관에서 만나 축구를 즐깁니다. 초보자도 환영하며, 학기별로 1회 대학 연합 친선 경기를 개최합니다. 회비는 월 1만원이며, 유니폼과 음료 구매에 사용됩니다.", // 모달 팝업에 표시될 상세 설명
  },
  // #####################

  // @@@@@@@@@@@@@@@@@
  {
    category: "학술", // 카테고리 필터용 (clubsConfig.categories 중 하나)
    image: "image/동아리/코딩스터디.png", // 카드 이미지 경로
    title: "코딩 스터디",
    description: "알고리즘 문제풀이 및 프로젝트 스터디",
    kakaoLink: "https://open.kakao.com/o/example3", // 카카오톡 오픈채팅 링크 (가입 문의용)
    detail: "", // 모달 팝업에 표시될 상세 설명
  },
  // #####################

  // @@@@@@@@@@@@@@@@@
  {
    category: "문화예술", // 카테고리 필터용 (clubsConfig.categories 중 하나)
    image: "image/동아리/밴드동아리.png", // 카드 이미지 경로
    title: "밴드 동아리",
    description: "다양한 악기로 밴드를 구성해 공연합니다.",
    kakaoLink: "https://open.kakao.com/o/example4", // 카카오톡 오픈채팅 링크 (가입 문의용)
    detail: "", // 모달 팝업에 표시될 상세 설명
  },
  // #####################

  // @@@@@@@@@@@@@@@@@
  {
    category: "학술", // 카테고리 필터용 (clubsConfig.categories 중 하나)
    image: "image/동아리/독서토론.png", // 카드 이미지 경로
    title: "독서 토론 모임",
    description: "매주 한 권의 책을 읽고 토론합니다.",
    kakaoLink: "https://open.kakao.com/o/example5", // 카카오톡 오픈채팅 링크 (가입 문의용)
    detail: "", // 모달 팝업에 표시될 상세 설명
  },
  // #####################
];

const clubsConfig = {
  pageTitle: "자율 동아리 & 소모임", // 페이지 상단 제목
  pageSubtitle: "관심사가 같은 친구들과 함께하세요!", // 페이지 상단 부제목
  applyFormLink: "https://forms.gle/3t7igzSKnyMeLT1n8", // 페이지 상단 "신청하기" 버튼 링크
  itemsPerPage: 15, // 한 페이지에 표시할 카드 수
  categories: ["스포츠", "학술", "문화예술", "취미"] // 필터 버튼 목록 (추가/삭제 가능)
};
