/*
================================================================================
🤝 제휴사 데이터
================================================================================

【 수정 방법 】
1. partnersData 배열에 새 제휴사 추가
2. 기존 제휴사 수정/삭제
3. 이미지는 docs/image/ 폴더에 저장

【 카드 속성 설명 】
- category: "음식", "카페", "문화", "기타" 등 자유롭게
- image: 이미지 경로 (예: "image/partner_example.png")
- title: 제휴사 이름
- description: 혜택 설명
- location: 위치
- discount: 할인 정보
- mapEmbed: 네이버 지도 임베드 URL (선택사항)
  → 네이버 지도에서 장소 검색 → 공유 → 퍼가기 → src="..." 부분 복사

================================================================================
*/

const partnersData = [
  {
    category: "음식",
    image: "https://picsum.photos/400/300?1",
    title: "맛있는 식당",
    description: "학생증 제시 시 10% 할인",
    location: "정문 앞 100m",
    discount: "10% 할인",
    mapEmbed: "https://map.naver.com/p/entry/place/1100286950?c=15.00,0,0,0,dh"
  },
  {
    category: "카페",
    image: "https://picsum.photos/400/300?2",
    title: "캠퍼스 카페",
    description: "음료 전 메뉴 500원 할인",
    location: "학교 내 학생회관 1층",
    discount: "500원 할인",
    mapEmbed: "https://map.naver.com/p/entry/place/37271925?c=15.00,0,0,0,dh"
  },
  {
    category: "문화",
    image: "https://picsum.photos/400/300?3",
    title: "시네마 영화관",
    description: "주중 영화 관람 20% 할인",
    location: "후문 버스정류장 앞",
    discount: "20% 할인",
    mapEmbed: "https://map.naver.com/p/entry/place/11583195?c=15.00,0,0,0,dh"
  }
];

const partnersConfig = {
  suggestFormLink: "https://forms.gle/partner-suggest"
};
