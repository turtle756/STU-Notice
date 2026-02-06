/*
================================================================================
📅 일정 데이터 (캘린더)
================================================================================
*/

const scheduleConfig = {
  pageTitle: "📅 이번 달 주요 일정", // 페이지 상단 제목
};

const calendarMonths = [
  { month: 1, label: "1월", image: "image/calendar/calendar_1.jpg", status: "off" }, // month: 월 숫자 / label: 버튼 텍스트 / image: 이미지 경로 / status: "on"=표시, "off"=숨김
  { month: 2, label: "2월", image: "image/calendar/calendar_2.jpg", status: "on" },
  { month: 3, label: "3월", image: "image/calendar/calendar_4.jpg", status: "on" },
  { month: 4, label: "4월", image: "image/calendar/calendar_4.jpg", status: "on" },
  { month: 5, label: "5월", image: "image/calendar/calendar_5.jpg", status: "on" },
  { month: 6, label: "6월", image: "image/calendar/calendar_6.jpg", status: "on" },
  { month: 7, label: "7월", image: "image/calendar/calendar_7.jpg", status: "off" },
  { month: 8, label: "8월", image: "image/calendar/calendar_8.jpg", status: "off" },
  { month: 9, label: "9월", image: "image/calendar/calendar_9.jpg", status: "off" },
  { month: 10, label: "10월", image: "image/calendar/calendar_10.jpg", status: "off" },
  { month: 11, label: "11월", image: "image/calendar/calendar_11.jpg", status: "off" },
  { month: 12, label: "12월", image: "image/calendar/calendar_12.jpg", status: "off" }
];
