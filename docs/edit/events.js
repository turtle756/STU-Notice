/*
================================================================================
🎉 행사 & 공모전 데이터
================================================================================

【 수정 방법 】
1. 카드 추가: @@@@ 부터 #### 까지 통째로 복사해서 붙여넣기
2. 카드 삭제: @@@@ 부터 #### 까지 통째로 삭제

【 카드 속성 설명 】
- category: "행사" 또는 "공모전"
- image: 이미지 경로 (예: "image/example_festival.png")
- title: 제목
- date: 날짜
- organizer: 주관/주최
- location: 장소 (행사만)
- description: 간단한 설명
- link: 바로가기 링크 (없으면 null)
- applyLink: 신청 링크 (공모전만, 없으면 null)
- details: 상세 정보 (모달용)
  - target: 대상
  - benefits: 혜택
  - requirements: 준비물
  - schedule: 일정
  - contact: 문의처

================================================================================
*/

const eventsData = [

// @@@@@@@@@@@@@@@@@
{
  category: "행사",
  image: "image/example_festival.png",
  title: "2024 가을 축제",
  date: "2024.11.15 - 2024.11.16",
  organizer: "주관: 학생회",
  location: "중앙운동장",
  description: "우리 대학 가을 축제에 여러분을 초대합니다!",
  link: "https://example.com/festival",
  applyLink: null,
  details: {
    target: "전체 재학생",
    benefits: "무료 먹거리 제공, 푸짐한 경품 추첨, 다양한 공연 관람",
    schedule: "11/15(금) 17:00-22:00, 11/16(토) 12:00-22:00",
    contact: "총학생회 010-XXXX-XXXX"
  }
}
// #####################

,

// @@@@@@@@@@@@@@@@@
{
  category: "공모전",
  image: "image/example_startup.png",
  title: "창업 아이디어 공모전",
  date: "2024.11.20",
  organizer: "주최: LINC+ 사업단",
  location: null,
  description: "혁신적인 창업 아이디어를 공모합니다.",
  link: null,
  applyLink: "https://forms.gle/example1",
  details: {
    target: "전체 재학생 및 휴학생",
    benefits: "대상 200만원, 최우수상 100만원, 우수상 50만원, 창업 멘토링 제공",
    requirements: "제출물: 사업계획서(10페이지 이내), PPT 발표자료",
    schedule: "신청 마감: 11/20, 서류심사: 11/25, 발표심사: 12/1",
    contact: "LINC+ 사업단 02-XXXX-XXXX"
  }
}
// #####################

,

// @@@@@@@@@@@@@@@@@
{
  category: "행사",
  image: "image/example_winter.png",
  title: "겨울 MT",
  date: "2024.12.05",
  organizer: "주관: 학생회",
  location: "강원도 평창",
  description: "학과 MT에 참여하세요!",
  link: null,
  applyLink: null,
  details: {}
}
// #####################

,

// @@@@@@@@@@@@@@@@@
{
  category: "공모전",
  image: "image/example_contest.png",
  title: "글쓰기 경진대회",
  date: "2024.11.30",
  organizer: "주최: 학습지원센터",
  location: null,
  description: "다양한 글쓰기 주제로 경진대회에 도전하세요.",
  link: null,
  applyLink: "https://forms.gle/example2",
  details: {}
}
// #####################

,

// @@@@@@@@@@@@@@@@@
{
  category: "행사",
  image: "image/example_sports.png",
  title: "체육대회",
  date: "2024.12.10",
  organizer: "주관: 체육부",
  location: "체육관",
  description: "단합 조으로 자웅을 겨루는 체육대회",
  link: null,
  applyLink: null,
  details: {}
}
// #####################

,

// @@@@@@@@@@@@@@@@@
{
  category: "공모전",
  image: "https://picsum.photos/400/304",
  title: "프로그래밍 해커톤",
  date: "2024.12.15",
  organizer: "주최: 컴퓨터공학과",
  location: null,
  description: "24시간 코딩 마라톤에 도전하세요!",
  link: null,
  applyLink: "https://forms.gle/example3",
  details: {}
}
// #####################

];

const eventsConfig = {
  suggestFormLink: "https://forms.gle/example",
  itemsPerPage: 15,
  categories: ["행사", "공모전"]
};
