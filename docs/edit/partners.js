/*
================================================================================
🤝 제휴사 데이터
================================================================================

【 수정 방법 】
1. 카드 추가: @@@@ 부터 #### 까지 통째로 복사해서 붙여넣기
2. 카드 삭제: @@@@ 부터 #### 까지 통째로 삭제
3. 지도 추가: 카카오맵에서 "지도 퍼가기" 코드를 그대로 복붙 (설치 스크립트 포함해도 자동 처리됨)

【 카드 속성 설명 】
- category: "음식", "카페", "문화", "기타" 등
- image: 이미지 경로
- title: 제휴사 이름
- description: 혜택 설명
- location: 위치
- discount: 할인 정보
- mapCodeModal: 카카오맵 퍼가기 코드 (모달에서 표시)

【 지도 퍼가기 방법 】
1. 카카오맵(map.kakao.com)에서 장소 검색
2. 공유 → 지도 퍼가기 클릭
3. 크기: 560x300 설정
4. 생성된 코드 전체를 mapCodeModal에 그대로 복붙 (설치 스크립트 포함해도 OK)

================================================================================
*/

const partnersData = [

// @@@@@@@@@@@@@@@@@
{
  category: "음식",
  image: "https://picsum.photos/400/300?1",
  title: "맛있는 식당",
  description: "학생증 제시 시 10% 할인",
  location: "정문 앞 100m",
  discount: "10% 할인",

  // --------------------------
  // 모달용 지도 (카카오맵 퍼가기 코드 그대로 복붙)
  // --------------------------
  mapCodeModal: `
<!-- * 카카오맵 - 지도퍼가기 -->
<!-- 1. 지도 노드 -->
<div id="daumRoughmapContainer1766552216775" class="root_daum_roughmap root_daum_roughmap_landing"></div>

<!--
        2. 설치 스크립트
        * 지도 퍼가기 서비스를 2개 이상 넣을 경우, 설치 스크립트는 하나만 삽입합니다.
-->
<script charset="UTF-8" class="daum_roughmap_loader_script" src="https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js"></script>

<!-- 3. 실행 스크립트 -->
<script charset="UTF-8">
  new daum.roughmap.Lander({
    "timestamp" : "1766552216775",
    "key" : "esqstjy7iqi",
    "mapWidth" : "560",
    "mapHeight" : "300"
  }).render();
</script>
  `
  // --------------------------
}
// #####################

,

// @@@@@@@@@@@@@@@@@
{
  category: "카페",
  image: "https://picsum.photos/400/300?2",
  title: "캠퍼스 카페",
  description: "음료 전 메뉴 500원 할인",
  location: "학교 내 학생회관 1층",
  discount: "500원 할인",

  // --------------------------
  // 모달용 지도 (카카오맵 퍼가기 코드 그대로 복붙)
  // --------------------------
  mapCodeModal: `
<!-- * 카카오맵 - 지도퍼가기 -->
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
</script>
  `
  // --------------------------
}
// #####################

,

// @@@@@@@@@@@@@@@@@
{
  category: "문화",
  image: "https://picsum.photos/400/300?3",
  title: "시네마 영화관",
  description: "주중 영화 관람 20% 할인",
  location: "후문 버스정류장 앞",
  discount: "20% 할인",

  // --------------------------
  // 모달용 지도 (카카오맵 퍼가기 코드 그대로 복붙)
  // --------------------------
  mapCodeModal: `
<!-- * 카카오맵 - 지도퍼가기 -->
<!-- 1. 지도 노드 -->
<div id="daumRoughmapContainer1766560906875" class="root_daum_roughmap root_daum_roughmap_landing"></div>

<!--
        2. 설치 스크립트
        * 지도 퍼가기 서비스를 2개 이상 넣을 경우, 설치 스크립트는 하나만 삽입합니다.
-->
<script charset="UTF-8" class="daum_roughmap_loader_script" src="https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js"></script>

<!-- 3. 실행 스크립트 -->
<script charset="UTF-8">
  new daum.roughmap.Lander({
    "timestamp" : "1766560906875",
    "key" : "ef9qo797zhm",
    "mapWidth" : "560",
    "mapHeight" : "300"
  }).render();
</script>
  `
  // --------------------------
}
// #####################

];

const partnersConfig = {
  suggestFormLink: "https://forms.gle/partner-suggest",
  itemsPerPage: 15,
  categories: ["음식", "카페", "문화", "기타"]
};
