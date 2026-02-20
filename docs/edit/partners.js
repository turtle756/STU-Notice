/*
================================================================================
🤝 제휴업체 데이터
================================================================================
*/

const partnersData = [

// @@@@@@@@@@@@@@@@@
{
  category: "음식", // 카테고리 필터용 (partnersConfig.categories 중 하나)
  image: "image/제휴 업체/제휴/홍대개미/1.png", // 카드 이미지 경로
  title: "홍대개미",
  description: `학생증 제시 시 전 메뉴 10% 할인`,
  location: "경기 부천시 원미구 부천로 9번길 24", // 위치 정보
  discount: "10% 할인", // 할인 정보 배지

  mapCodeModal: `<!-- * 카카오맵 - 지도퍼가기 -->
<!-- 1. 지도 노드 -->
<div id="daumRoughmapContainer1771576074785" class="root_daum_roughmap root_daum_roughmap_landing"></div>

<!--
        2. 설치 스크립트
        * 지도 퍼가기 서비스를 2개 이상 넣을 경우, 설치 스크립트는 하나만 삽입합니다.
-->
<script charset="UTF-8" class="daum_roughmap_loader_script" src="https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js"></script>

<!-- 3. 실행 스크립트 -->
<script charset="UTF-8">
        new daum.roughmap.Lander({
                "timestamp" : "1771576074785",
                "key" : "hpb9fgj23y3",
                "mapWidth" : "560",
                "mapHeight" : "300"
        }).render();
</script>`
}
// #####################

,

// @@@@@@@@@@@@@@@@@
{
  category: "카페", // 카테고리 필터용 (partnersConfig.categories 중 하나)
  image: "https://picsum.photos/400/300?2", // 카드 이미지 경로
  title: "캠퍼스 카페",
  description: `음료 전 메뉴 500원 할인`,
  location: "학교 내 학생회관 1층", // 위치 정보
  discount: "500원 할인", // 할인 정보 배지

  mapCodeModal: `<!-- * 카카오맵 - 지도퍼가기 -->
<!-- 1. 지도 노드 -->
<div id="daumRoughmapContainer1766559121887" class="root_daum_roughmap root_daum_roughmap_landing"></div>

<!--
        2. 설치 스크립트
        * 지도 퍼가기 서비스를 2개 이상 넣을 경우, 설치 스크립트는 하나만 삽입합니다.
-->
<script charset="UTF-8" class="daum_roughmap_loader_script" src="https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js"></script>

<!-- 3. 실행 스크립트 -->
<script charset="UTF-8">
  new daum.roughmap.Lander({
    "timestamp" : "1766559121887",
    "key" : "esqd4navtin",
    "mapWidth" : "560",
    "mapHeight" : "300"
  }).render();
</script>`
}
// #####################

,

// @@@@@@@@@@@@@@@@@
{
  category: "기타", // 카테고리 필터용 (partnersConfig.categories 중 하나)
  image: "image/제휴 업체/제휴/제휴 (2)/1.png", // 카드 이미지 경로
  title: "학생화방문구센터",
  description: `2만원 이상 결제시 5%할인`,
  location: "경기도 부천시 원미구 부천로 24번길 3", // 위치 정보
  discount: null , // 할인 정보 배지

  mapCodeModal: `<!-- * 카카오맵 - 지도퍼가기 -->
<!-- 1. 지도 노드 -->
<div id="daumRoughmapContainer1771578793508" class="root_daum_roughmap root_daum_roughmap_landing"></div>

<!--
        2. 설치 스크립트
        * 지도 퍼가기 서비스를 2개 이상 넣을 경우, 설치 스크립트는 하나만 삽입합니다.
-->
<script charset="UTF-8" class="daum_roughmap_loader_script" src="https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js"></script>

<!-- 3. 실행 스크립트 -->
<script charset="UTF-8">
        new daum.roughmap.Lander({
                "timestamp" : "1771578793508",
                "key" : "hpciqawdd7c",
                "mapWidth" : "560",
                "mapHeight" : "300"
        }).render();
</script>`
}
// #####################

];

const partnersConfig = {
  pageTitle: "제휴업체", // 페이지 상단 제목
  pageSubtitle: "학생증을 제시하고 다양한 혜택을 받으세요!", // 페이지 상단 부제목
  suggestFormLink: "https://forms.gle/partner-suggest", // 페이지 상단 "제안하기" 버튼 링크
  itemsPerPage: 15, // 한 페이지에 표시할 카드 수
  categories: ["음식", "카페", "문화", "기타"] // 필터 버튼 목록 (추가/삭제 가능)
};
