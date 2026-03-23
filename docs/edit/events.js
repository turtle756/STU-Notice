/*
================================================================================
🎉 행사 & 공모전 데이터
================================================================================
*/

const eventsData = [
  // @@@@@@@@@@@@@@@@@
  {
    category: "행사",
    image: "image/행사&공모전/오픈예배 포스터.jpg",
    subImage1: null,
    subImage2: null,
    title: "서울신학대학교 x 제이어스 오픈워십 ",
    date: "2026 - 04 - 25(토)",
    organizer: "총학생회",
    location: "서울신학대학교 성결인의 집",
    description: `[서울신학대학교 OPEN WORSHIP]

<Seed of Glory>
영광의 씨앗 - 요한복음 12:24

☑️ 장소: 서울신학대학교 성결인의 집
☑️ 일시: 2026년 4월 25일(토) 15시 
☑️ 대상: 다음 세대의 부흥을 희망하는 모든 예배자
☑️ 인원: 선착순 2,500명 (무료)
❗️개인 및 단체(3인 이상) 신청 가능❗️

📌재학생 사전 신청 : 3월 10일(화) 11:00 ~ 3월 15일 23:59
(선착순 신청으로 조기 마감될 수 있음을 알려드립니다.)

🎤 찬양: 제이어스 J-US
📖 말씀: 강은도 목사

다음 세대의 부흥을 갈망하는 
청소년, 청년, 교역자분들을 초청합니다!
복음을 위해 영광의 씨앗을 함께 심고,
하나님의 임재 속에서 새로운 부흥을 기대하는
특별한 은혜의 시간이 되길 소망합니다!`,
    link: null,
    applyLink: "https://forms.gle/8cQX6HpBWMiTwLNH8",
    details: {
      contact: "서울신학대학교 총학생회 카카오톡 플러스 채널 ",
      target: "서울신학대학교 모든 재학생 "
    },
  },
  // #####################

  // @@@@@@@@@@@@@@@@@
  {
    category: "안내사항",
    image: "image/행사&공모전/KakaoTalk_20260311_105709679.jpg",
    subImage1: "image/행사&공모전/KakaoTalk_20260311_105709679_01.jpg",
    subImage2: null,
    title: "2026-1학기 신앙상담 신청안내",
    date: null,
    organizer: "교목처",
    location: null,
    description: `[📢 2026-1학기 신앙상담 신청 안내]

신앙상담은 비신자 학생들의 교회봉사 / 신앙생활 평가서를 대체하기 위한 제도입니다.
학기 중 1~2회 상담으로 대체할 수 있으니, 필요한 학생들은 아래 내용을 확인해 주세요.

- 신청 기간: 3월 10일(화) ~ 4월 24일(금)
- 상담 기간: 3월 17일(화) ~ 5월 22일(금)
- 신청 가능 시간: 09:00 ~ 17:30
  ※ 이후 문의는 다음 날 답변드립니다.
- 신청 방법: 본인 학년 / 학과 담당 목사님(교목, 멘토)께 개별 연락
- 유의 사항: 상담 미진행 시 해당 학기 채플 미이수 처리

자세한 담당자 배정 및 연락처는 첨부 이미지를 확인해 주세요.
감사합니다.

서울신학대학교 교목처`,
    link: null,
    applyLink: null,
    details: {},
  },
  // #####################

  // @@@@@@@@@@@@@@@@@
  {
    category: "행사",
    image: "image/행사&공모전/힐송 컨퍼런스.jpg",
    subImage1: null,
    subImage2: null,
    title: "힐송 컨퍼런스",
    date: "2026.03.26(목)",
    organizer: "서울신학대학교",
    location: "성결인의 집 ",
    description: `서울신학대학교와 HILLSONG COLLEGE가
2024년부터 협약을 맺어 "LEAD WORSHIPER" 교육 과정을
운영하고 있습니다.

오는 3월 26일, 한국의 모든 예배자들과 함께
힐송의 탁월한 예배 사역을 나누고 배우는 자리에 초청합니다.

"2026 STU-HILLSONG COLLEGE 예배찬양컨퍼런스"를 통해
하나님이 원하시고 기뻐하시는 예배를 함께 세워가기를 바랍니다.
(누구나 신청할 수 있는 오픈된 컨퍼런스입니다.)

교회와 공동체 그리고 주변에 널리 소식을 알려주시면
감사드리겠습니다.`,
    link: "https://2026stuhillsong.my.canva.site/c267ygc42f0ppzwh",
    applyLink: "https://docs.google.com/forms/d/e/1FAIpQLScTKEuuL52ILXHMgxyN8nYRsLUIT3upjuroGzgMjCGbE1x3Hw/viewform",
    details: {
      target: " 한국의 모든 예배자",
      contact: "서울신학대학교 교학과 (032-340-9265)",
      benefits: "재학생 저녁7시 집회 참여시 채플 마스터카드(채플1회 결석권) 배부"
    },
  },
  // #####################

];

const eventsConfig = {
  pageTitle: "교내 행사 & 공모전",
  pageSubtitle: "다양한 교내 활동에 참여해보세요!",
  suggestFormLink: "https://forms.gle/edD7CaFW92pCbjQm8",
  itemsPerPage: 15,
  categories: ["행사","공모전","프로젝트","안내사항"],
};
