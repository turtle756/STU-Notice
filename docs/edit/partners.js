/*
================================================================================
🤝 제휴업체 데이터
================================================================================
*/

const partnersData = [
  // @@@@@@@@@@@@@@@@@
  {
    category: "음식",
    image: "image/제휴 업체/제휴/홍대개미/1.png",
    title: "홍대개미",
    description: "학생증 제시 시 전 메뉴 10% 할인",
    subImage1: null,
    subImage2: null,
    location: "경기 부천시 원미구 부천로 9번길 24",
    discount: "10% 할인",
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
</script>`,
  },
  // #####################

  // @@@@@@@@@@@@@@@@@
  {
    category: "기타",
    image: "image/제휴 업체/제휴/제휴 (2)/1.png",
    title: "학생화방문구센터",
    description: "2만원 이상 결제시 5%할인",
    subImage1: null,
    subImage2: null,
    location: "경기도 부천시 원미구 부천로 24번길 3",
    discount: null,
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
</script>`,
  },
  // #####################

  // @@@@@@@@@@@@@@@@@
  {
    category: "카페",
    image: "https://picsum.photos/400/300?2",
    title: "캠퍼스 카페",
    description: "음료 전 메뉴 500원 할인",
    subImage1: null,
    subImage2: null,
    location: "학교 내 학생회관 1층",
    discount: "500원 할인",
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
</script>`,
  },
  // #####################

];

const partnersConfig = {
  pageTitle: "제휴업체",
  pageSubtitle: "학생증을 제시하고 다양한 혜택을 받으세요!",
  suggestFormLink: "https://forms.gle/partner-suggest",
  itemsPerPage: 15,
  categories: ["음식","카페","문화","기타"],
};
