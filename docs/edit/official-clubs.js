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
    subImage1: "image/정규동아리/북한선교동아리/북한선교동아리 2.jpg", // 서브 이미지 1 (없으면 null)
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
  
  // @@@@@@@@@@@@@@@@@
  {
    category: "종교", // 카테고리 필터용 (officialClubsConfig.categories 중 하나)
    image: "image/정규동아리/ECU/ECU.jpg", // 대표 이미지 경로
    subImage1: null, // 서브 이미지 1 (없으면 null)
    subImage2: null, // 서브 이미지 2 (없으면 null)
    title: "ECU",
    description: "ECU(Evangelical Christian Union)는 복음주의 신앙을 바탕으로 한 기독교 연합 동아리로, 캠퍼스 복음화를 위해 말씀 공부, 전도, 양육에 힘쓰고 있습니다. 하나님을 더 알아가고 싶은 분, 성경이 궁금한 분, 대학 생활을 함께할 믿음의 공동체를 찾고 있는 분이라면 누구나 환영합니다!",
    detail: null, // 모달 팝업에 표시될 상세 설명
    kakaoLink: null, // 카카오톡 오픈채팅 링크 (없으면 null)
    googleFormLink: "https://forms.gle/qbXPHuETE89nwCsz8", // 구글폼 링크 (없으면 null)
    qrCodeImage: null, // QR 코드 이미지 경로 (없으면 null)
    contact: null, // 연락처 (없으면 null)
    instagram: null, // 인스타그램 링크 (없으면 null)
    facebook: null, // 페이스북 링크 (없으면 null)
  },
  // #####################
  // @@@@@@@@@@@@@@@@@
  {
    category: "종교", // 카테고리 필터용 (officialClubsConfig.categories 중 하나)
    image: "image/정규동아리/IVF/IVF.jpg", // 대표 이미지 경로
    subImage1: null, // 서브 이미지 1 (없으면 null)
    subImage2: null, // 서브 이미지 2 (없으면 null)
    title: "IVF",
    description: "IVF에는 하나님과 나 사이의 살아있는 이야기가 있습니다.우리는 함께 읽고, 묻고, 해석합니다성경공부를 통해 우리가 누구인지 그리고 하나님이 어떤 분인지 알아갑니다.IVF에는 하나님 앞에 서 있는 나와 같은 친구들이 있습니다.우리는 함께 고민하고, 걸어갑니다.서로의 삶을 나누며 나의 일상이 더욱 의미 있어집니다.IVF에는 비교나 경쟁, 증명이아닌 진정한 변화의 이야기가 있습니다.우리는 온전하게 달라집니다.그리고 나는 더 나다워집니다.",
    detail: null, // 모달 팝업에 표시될 상세 설명
    kakaoLink: null, // 카카오톡 오픈채팅 링크 (없으면 null)
    googleFormLink: null, // 구글폼 링크 (없으면 null)
    qrCodeImage: null, // QR 코드 이미지 경로 (없으면 null)
    contact: "김하영 간사: 010-6615-1249 , 회장 윤영우: 010-4914-5389", // 연락처 (없으면 null)
    instagram: null, // 인스타그램 링크 (없으면 null)
    facebook: null, // 페이스북 링크 (없으면 null)
  },
  // #####################
  
   // @@@@@@@@@@@@@@@@@
  {
    category: "종교", // 카테고리 필터용 (officialClubsConfig.categories 중 하나)
    image: "image/정규동아리/OCC/OCC 1.jpg", // 대표 이미지 경로
    subImage1: "image/정규동아리/OCC/OCC 2.jpg", // 서브 이미지 1 (없으면 null)
    subImage2: null, // 서브 이미지 2 (없으면 null)
    title: "OCC",
    description: "원바디캠퍼스커뮤니티(OCC)는 예수님의 지상명령에 따라 캠퍼스에 있는 각 과에 복음의 일꾼을 세워 캠퍼스를 복음화합니다. 또한 교회와 사회와 가정을 섬기며 초대교회적인 교회개척과 무한대 선교사역을 수행합니다.",
    detail: null, // 모달 팝업에 표시될 상세 설명
    kakaoLink: null, // 카카오톡 오픈채팅 링크 (없으면 null)
    googleFormLink: "https://docs.google.com/forms/d/e/1FAIpQLSeA6Fv-pdaA51_NIZsPIK5Z1hzEzrJtkRuBfd4HD7QFGkrFIQ/viewform", // 구글폼 링크 (없으면 null)
    qrCodeImage: null, // QR 코드 이미지 경로 (없으면 null)
    contact: "010-2053-7431", // 연락처 (없으면 null)
    instagram: null, // 인스타그램 링크 (없으면 null)
    facebook: null, // 페이스북 링크 (없으면 null)
  },
  // #####################
  
  // @@@@@@@@@@@@@@@@@
  {
    category: "종교", // 카테고리 필터용 (officialClubsConfig.categories 중 하나)
    image: "image/정규동아리/비전선교단/비전선교단.jpg", // 대표 이미지 경로
    subImage1: null, // 서브 이미지 1 (없으면 null)
    subImage2: null, // 서브 이미지 2 (없으면 null)
    title: "비전선교단",
    description: "아무도 가지 않지만 누군가는 가야하는 곳.\n2000년 넘게 복음을 들어보지 못한 민족에게 나아가 예수님의 사랑을 전하는 우리는 비전선교단입니다!\n-평생 기억될 특별한 선교를 가보고 싶은 분!-선교는 하고 싶지만 막연한 분!\n-믿음의 공동체 안에서 훈련받고 성장하고 싶은 분!\n-뜨거운 예배와 통찰력 있는 말씀을 갈망하시는 분 함께해요!",
    detail: null, // 모달 팝업에 표시될 상세 설명
    kakaoLink: "https://open.kakao.com/o/stTgwq0c", // 카카오톡 오픈채팅 링크 (없으면 null)
    googleFormLink: "https://forms.gle/3hzEAPYrCQ5VBj7c7", // 구글폼 링크 (없으면 null)
    qrCodeImage: null, // QR 코드 이미지 경로 (없으면 null)
    contact: "010-2053-7431", // 연락처 (없으면 null)
    instagram: null, // 인스타그램 링크 (없으면 null)
    facebook: null, // 페이스북 링크 (없으면 null)
  },
  // #####################
  
  // @@@@@@@@@@@@@@@@@
  {
    category: "종교", // 카테고리 필터용 (officialClubsConfig.categories 중 하나)
    image: "image/정규동아리/예수전도단/예수전도단.jpg", // 대표 이미지 경로
    subImage1: null, // 서브 이미지 1 (없으면 null)
    subImage2: null, // 서브 이미지 2 (없으면 null)
    title: "예수전도단",
    description: "예수전도단은 하나님을 섬기고 함께 예배하는 동아리 입니다.",
    detail: null, // 모달 팝업에 표시될 상세 설명
    kakaoLink: null, // 카카오톡 오픈채팅 링크 (없으면 null)
    googleFormLink: null, // 구글폼 링크 (없으면 null)
    qrCodeImage: null, // QR 코드 이미지 경로 (없으면 null)
    contact: "010-8682-1497", // 연락처 (없으면 null)
    instagram: null, // 인스타그램 링크 (없으면 null)
    facebook: null, // 페이스북 링크 (없으면 null)
  },
  // #####################
  
   // @@@@@@@@@@@@@@@@@
  {
    category: "종교", // 카테고리 필터용 (officialClubsConfig.categories 중 하나)
    image: "image/정규동아리/전도폭발/전도폭발 1.png", // 대표 이미지 경로
    subImage1:"image/정규동아리/전도폭발/전도폭발 2.png", // 서브 이미지 1 (없으면 null)
    subImage2: null, // 서브 이미지 2 (없으면 null)
    title: "전도폭발",
    description: "친교와 전도, 제자훈련 및 건강한 성장이란 사명을 가지고 전세계 지역교회를 무장시킴으로써 주님의 지상명령을 행하고, 하나님을 영화롭게 하는데 있습니다. 매주 월,목 백주년 607호 오후 9시, 화 명헌기념관 동아리방 12시에서 기도모임이 진행되고 있으니 기도하고 싶은 분들은 누구든지 오셔서 언제든지 함께 기도해요.   ",
    detail: null, // 모달 팝업에 표시될 상세 설명
    kakaoLink: null, // 카카오톡 오픈채팅 링크 (없으면 null)
    googleFormLink: null, // 구글폼 링크 (없으면 null)
    qrCodeImage: null, // QR 코드 이미지 경로 (없으면 null)
    contact: "대표 간사 010-6811-3204\n회장 010-2824-1407 ", // 연락처 (없으면 null)
    instagram: null, // 인스타그램 링크 (없으면 null)
    facebook: null, // 페이스북 링크 (없으면 null)
  },
  // #####################
  
  // @@@@@@@@@@@@@@@@@
  {
    category: "종교", // 카테고리 필터용 (officialClubsConfig.categories 중 하나)
    image: "image/정규동아리/위스캠프/위스캠프.png", // 대표 이미지 경로
    subImage1: null, // 서브 이미지 1 (없으면 null)
    subImage2: null, // 서브 이미지 2 (없으면 null)
    title: "위스캠프",
    description: "위스캠프는 방중에 작은교회와 자체적으로 캠프를 열지못하고 청소년 수련회를 경험하지 못한 다음세대 청소년들의 뜨거운 예배와 캠프를 경험시켜주기 위해 함께할 동역자들과 이야기와 추억을 만드는 동아리입니다!",
    detail: null, // 모달 팝업에 표시될 상세 설명
    kakaoLink: null, // 카카오톡 오픈채팅 링크 (없으면 null)
    googleFormLink: null, // 구글폼 링크 (없으면 null)
    qrCodeImage: null, // QR 코드 이미지 경로 (없으면 null)
    contact: "010-6595-1078", // 연락처 (없으면 null)
    instagram: null, // 인스타그램 링크 (없으면 null)
    facebook: null, // 페이스북 링크 (없으면 null)
  },
  // #####################

   
  // @@@@@@@@@@@@@@@@@
  {
    category: "종교", // 카테고리 필터용 (officialClubsConfig.categories 중 하나)
    image: "image/정규동아리/기노스코/기노스코.png", // 대표 이미지 경로
    subImage1: null, // 서브 이미지 1 (없으면 null)
    subImage2: null, // 서브 이미지 2 (없으면 null)
    title: "기노스코",
    description: "예수의 제자가 되고 제자 삼는 길을 배우다.",
    detail: null, // 모달 팝업에 표시될 상세 설명
    kakaoLink: null, // 카카오톡 오픈채팅 링크 (없으면 null)
    googleFormLink: null, // 구글폼 링크 (없으면 null)
    qrCodeImage: null, // QR 코드 이미지 경로 (없으면 null)
    contact: null, // 연락처 (없으면 null)
    instagram: null, // 인스타그램 링크 (없으면 null)
    facebook: null, // 페이스북 링크 (없으면 null)
  },
  // #####################
  
   // @@@@@@@@@@@@@@@@@
  {
    category: "봉사", // 카테고리 필터용 (officialClubsConfig.categories 중 하나)
    image: "image/정규동아리/그리너스/그리너스 3.png", // 대표 이미지 경로
    subImage1: "image/정규동아리/그리너스/그리너스 2.jpg", // 서브 이미지 1 (없으면 null)
    subImage2: "image/정규동아리/그리너스/그리너스 1.jpg", // 서브 이미지 2 (없으면 null)
    title: "그린어스",
    description: "🌱 GREENUS | 환경과 사람을 잇는 ESG 실천 동아리 🌱\nGREENUS는환경 및 생태를 주제로 다양한 봉사와 공모사업을 진행하며 지속가능한 발전과 친환경 미래사회를 위해 나아가는 동아리입니다.\nGREENUS는 국가지속가능발전가치 SDG-s 중 자원의 순환과 양질의 교육 중점을 바탕으로 업사이클을 활용한 교육 컨텐츠 개발을 진행하고 있습니다.\n2025년에는 환경 공모전 참여를 위한 콘텐츠 개발 및 교육자료 제작,\n업사이클 키트를 활용한 청소년 대상 환경 교육 프로그램 기획 및 운영,\n지역 주민 및 학생 대상 무료 점심 제공 봉사활동을 진행하며 ESG 가치를 실천 중심의 활동으로 확장해 나가고 있습니다.\nGREENUS에서 ESG에 대해 배우고 다양한 실무 경험과 의미 있는 스펙을 쌓을 수 있으며,\n선배들과의 활발한 교류를 통해 즐겁고 보람 있는 학교생활을 경험해 보세요 😊",
    detail: null, // 모달 팝업에 표시될 상세 설명
    kakaoLink: null, // 카카오톡 오픈채팅 링크 (없으면 null)
    googleFormLink: "https://m.site.naver.com/20jNZ", // 구글폼 링크 (없으면 null)
    qrCodeImage: null, // QR 코드 이미지 경로 (없으면 null)
    contact: "회장 010-5826-4123", // 연락처 (없으면 null)
    instagram: "https://m.site.naver.com/20jNN", // 인스타그램 링크 (없으면 null)
    facebook: null, // 페이스북 링크 (없으면 null)
  },
  // #####################
  
    // @@@@@@@@@@@@@@@@@
  {
    category: "봉사", // 카테고리 필터용 (officialClubsConfig.categories 중 하나)
    image: "image/정규동아리/나눌/나눌 1.jpg", // 대표 이미지 경로
    subImage1: "image/정규동아리/나눌/나눌 2.jpg", // 서브 이미지 1 (없으면 null)
    subImage2: null, // 서브 이미지 2 (없으면 null)
    title: "나눌",
    description: "나눌은 NGO 온해피 봉사단 위원회로, 대학생 봉사자들이 주체적으로 참여하는 교육 멘토링 봉사 활동입니다!",
    kakaoLink: null, // 카카오톡 오픈채팅 링크 (없으면 null)
    googleFormLink: null, // 구글폼 링크 (없으면 null)
    qrCodeImage: null, // QR 코드 이미지 경로 (없으면 null)
    contact: null, // 연락처 (없으면 null)
    instagram: "https://www.instagram.com/sksnf_1027?igsh=MTZlaTlzcGpqejMwMg==", // 인스타그램 링크 (없으면 null)
    facebook: null, // 페이스북 링크 (없으면 null)
  },
  // #####################
  
   // @@@@@@@@@@@@@@@@@
  {
    category: "종교", // 카테고리 필터용 (officialClubsConfig.categories 중 하나)
    image: "image/정규동아리/다쿠/다쿠.jpg", // 대표 이미지 경로
    subImage1: null, // 서브 이미지 1 (없으면 null)
    subImage2: null, // 서브 이미지 2 (없으면 null)
    title: "다쿠",
    description: "일본 선교를 희망하는 학생들이 모여,\n선교를 준비하고 신앙 관련 활동을 하는 동아리입니다.\n25학년에는 신앙서적 독서 모임 위주로 동아리가 운영되었습니다.",
    kakaoLink: null, // 카카오톡 오픈채팅 링크 (없으면 null)
    googleFormLink: null, // 구글폼 링크 (없으면 null)
    qrCodeImage: null, // QR 코드 이미지 경로 (없으면 null)
    contact: "kanntann09@gmail.com", // 연락처 (없으면 null)
    instagram: null, // 인스타그램 링크 (없으면 null)
    facebook: null, // 페이스북 링크 (없으면 null)
  },
  // #####################

  // @@@@@@@@@@@@@@@@@
  {
    category: "문화", // 카테고리 필터용 (officialClubsConfig.categories 중 하나)
    image: "image/정규동아리/리바이블/리바이블.jpg", // 대표 이미지 경로
    subImage1: null, // 서브 이미지 1 (없으면 null)
    subImage2: null, // 서브 이미지 2 (없으면 null)
    title: "리바이블",
    description: "STU 뮤지컬 선교동아리!\n복음으로 돌아와,복음을 통해 뮤지컬 창작 및 기독교 컨텐츠들을 만들어 내는 동아리로\n주된 활동은  정기 워십, 배우 스텝 훈련, 나눔, 친목 등을 합니다.\n뮤지컬, 연극, 무언극 등 무대예술에 관심있고 열정적으로 참여할 수 있는 사람 지원하세요~!",
    kakaoLink: null, // 카카오톡 오픈채팅 링크 (없으면 null)
    googleFormLink: null, // 구글폼 링크 (없으면 null)
    qrCodeImage: null, // QR 코드 이미지 경로 (없으면 null)
    contact: null, // 연락처 (없으면 null)
    instagram: "https://www.instagram.com/rebible_musical?igsh=Y3RieWI5dHUxOGx2", // 인스타그램 링크 (없으면 null)
    facebook: null, // 페이스북 링크 (없으면 null)
  },
  // #####################
  
  // @@@@@@@@@@@@@@@@@
  {
    category: "취미", // 카테고리 필터용 (officialClubsConfig.categories 중 하나)
    image: "image/정규동아리/사이다/사이다.png", // 대표 이미지 경로
    subImage1: null, // 서브 이미지 1 (없으면 null)
    subImage2: null, // 서브 이미지 2 (없으면 null)
    title: "사이다",
    description: "사이다 동아리는 사진을 사랑하는 학우면 누구나 가입할 수 있는 본교 사진동아리로 학우님들이 서로 사진에 대한 정보를 공유하고, 친밀해지는 것을 목적으로 합니다.",
    kakaoLink: null, // 카카오톡 오픈채팅 링크 (없으면 null)
    googleFormLink: null, // 구글폼 링크 (없으면 null)
    qrCodeImage: null, // QR 코드 이미지 경로 (없으면 null)
    contact: "회장 010-2292-4831 ", // 연락처 (없으면 null)
    instagram: null, // 인스타그램 링크 (없으면 null)
    facebook: null, // 페이스북 링크 (없으면 null)
  },
  // #####################
  
   // @@@@@@@@@@@@@@@@@
  {
    category: "봉사", // 카테고리 필터용 (officialClubsConfig.categories 중 하나)
    image: "image/정규동아리/솔트/솔트.jpg", // 대표 이미지 경로
    subImage1: null, // 서브 이미지 1 (없으면 null)
    subImage2: null, // 서브 이미지 2 (없으면 null)
    title: "솔트",
    description: "세상의 소금이 되어 봉사로 선을 행하는 봉사동아리 SALT입니다. 저희는 부천과 서울 지역의 봉사지와 연계하여, 자율적으로 봉사활동에 참여하는 동아리입니다. 학기 중 개강 및 종강모임, MT와 각종 다양한 내부 이벤트도 진행하니 많은 관심 바랍니다.",
    kakaoLink: null, // 카카오톡 오픈채팅 링크 (없으면 null)
    googleFormLink: "https://docs.google.com/forms/d/e/1FAIpQLSdWz988yuBl7c0TnOMKrjBYc6qnv1e3IXhHypA-wzXSXApohQ/viewform?usp=preview", // 구글폼 링크 (없으면 null)
    qrCodeImage: null, // QR 코드 이미지 경로 (없으면 null)
    contact: "회장 010-2292-4831 ", // 연락처 (없으면 null)
    instagram: null, // 인스타그램 링크 (없으면 null)
    facebook: null, // 페이스북 링크 (없으면 null)
  },
  // ####################


  
  // @@@@@@@@@@@@@@@@@
  {
    category: "취미", // 카테고리 필터용 (officialClubsConfig.categories 중 하나)
    image: "image/정규동아리/피에스타/피에스타.jpg", // 대표 이미지 경로
    subImage1: null, // 서브 이미지 1 (없으면 null)
    subImage2: null, // 서브 이미지 2 (없으면 null)
    title: "피에스타",
    description: "피에스타는 춤을 좋아하는 사람들이 모여 만든 서울신대 유일한 댄스 동아리입니다!",
    kakaoLink: null, // 카카오톡 오픈채팅 링크 (없으면 null)
    googleFormLink: null, // 구글폼 링크 (없으면 null)
    qrCodeImage: null, // QR 코드 이미지 경로 (없으면 null)
    contact: "회장 010-3292-7698", // 연락처 (없으면 null)
    instagram: null, // 인스타그램 링크 (없으면 null)
    facebook: null, // 페이스북 링크 (없으면 null)
  },

      
  // #####################


      
       // @@@@@@@@@@@@@@@@@
  {
    category: "취미", // 카테고리 필터용 (officialClubsConfig.categories 중 하나)
    image: "image/정규동아리/홍길동/홍길동.jpg", // 대표 이미지 경로
    subImage1: null, // 서브 이미지 1 (없으면 null)
    subImage2: null, // 서브 이미지 2 (없으면 null)
    title: "홍길동",
    description: "다양한 친목 활동을 통해 인간 관계 형성 및 다양한 친목 자치 활동을 목표로 하고 있습니다!",
    kakaoLink: null, // 카카오톡 오픈채팅 링크 (없으면 null)
    googleFormLink: "https://docs.google.com/forms/d/e/1FAIpQLSe9ifqoSRxCNo6lSbNmcxRQXUS6zEaVRqzwfB86vlgoylvNfQ/viewform?usp=dialog", // 구글폼 링크 (없으면 null)
    qrCodeImage: null, // QR 코드 이미지 경로 (없으면 null)
    contact: null, // 연락처 (없으면 null)
    instagram: null, // 인스타그램 링크 (없으면 null)
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
