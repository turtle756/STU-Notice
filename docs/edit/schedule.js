/*
================================================================================
📅 일정 데이터 (캘린더)
================================================================================

【 수정 방법 】
1. calendarMonths 배열에서 월 추가/삭제
2. 이미지 변경: docs/image/calendar/ 폴더에서 같은 파일명으로 교체

【 월 자동 선택 규칙 】
- 7월 → 6월 표시, 8월 → 9월 표시
- 1~2월 → 12월 표시

================================================================================
*/

const calendarMonths = [
  { month: 3, label: "3월", image: "image/calendar/calendar_3.jpg" },
  { month: 4, label: "4월", image: "image/calendar/calendar_4.jpg" },
  { month: 5, label: "5월", image: "image/calendar/calendar_5.jpg" },
  { month: 6, label: "6월", image: "image/calendar/calendar_6.jpg" },
  { month: 9, label: "9월", image: "image/calendar/calendar_9.jpg" },
  { month: 10, label: "10월", image: "image/calendar/calendar_10.jpg" },
  { month: 11, label: "11월", image: "image/calendar/calendar_11.jpg" },
  { month: 12, label: "12월", image: "image/calendar/calendar_12.jpg" }
];
