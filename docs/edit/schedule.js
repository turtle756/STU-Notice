/*
================================================================================
📅 일정 데이터 (캘린더)
================================================================================
*/

const scheduleConfig = {
  pageTitle: "📅 이번 달 주요 일정", // 페이지 상단 제목
};

const calendarMonths = [
  // status: "off"인 달은 이미지 파일이 아직 없어도 됩니다. "on"으로 바꾸기 전에 해당 이미지 파일을 image/캘린더/ 폴더에 추가하세요.
  { month: 1, label: "1월", image: "image/캘린더/1월달력.jpg", status: "off" }, // month: 월 숫자 / label: 버튼 텍스트 / image: 이미지 경로 / status: "on"=표시, "off"=숨김
  { month: 2, label: "2월", image: "image/캘린더/2월달력.jpg", status: "on" },
  { month: 3, label: "3월", image: "image/캘린더/3월달력.png", status: "on" },
  { month: 4, label: "4월", image: "image/캘린더/4월달력.png", status: "on" },
  { month: 5, label: "5월", image: "image/캘린더/5월달력.png", status: "on" },
  { month: 6, label: "6월", image: "image/캘린더/6월달력.png", status: "on" },
  { month: 7, label: "7월", image: "image/캘린더/7월달력.jpg", status: "off" },
  { month: 8, label: "8월", image: "image/캘린더/8월달력.jpg", status: "off" },
  { month: 9, label: "9월", image: "image/캘린더/9월달력.jpg", status: "off" },
  { month: 10, label: "10월", image: "image/캘린더/10월달력.jpg", status: "off" },
  { month: 11, label: "11월", image: "image/캘린더/11월달력.jpg", status: "off" },
  { month: 12, label: "12월", image: "image/캘린더/12월달력.jpg", status: "off" }
];
