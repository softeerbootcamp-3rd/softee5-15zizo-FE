import Component from "../core/Component.js";
import { getOrders } from "../utils/api.js";

export default class KakaoMap extends Component {
  setup() {
    this.state = { map: undefined, orders: [], markers: new Map() };
  }

  template() {
    return `
      <div id="map" style="width: 100%; height: 100%"></div>
    `;
  }

  async onInterval() {
    console.log("interval");
    // 새로 오더 목록 받아옴
    const orders = await getOrders();

    // 현재 markers 복사
    const newMarkers = new Map([...this.state.markers]);

    // orders에 해당하는 마커 지도에 추가
    for (const order of orders) {
      // 이미 존재할 경우 취소
      if (newMarkers.get(order.id) !== undefined) return;

      // 새로 생성
      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(order.x, order.y),
      });

      // 지도에 추가
      marker.setMap(this.state.map);

      // 맵에 추가
      newMarkers.set(order.id, marker);
    }

    this.setState({ orders: orders, markers: newMarkers });
  }

  mounted() {
    // 한번만 실행
    if (this.state.map === undefined) {
      const container = this.target.querySelector("div#map");

      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };

      const mapObj = new kakao.maps.Map(container, options);

      // 지도 중심 좌표 이동 이벤트
      document.addEventListener("panTo", (event) => {
        const { x, y } = event.detail;
        const moveLatLon = new kakao.maps.LatLng(x, y);
        mapObj.panTo(moveLatLon);
      });

      // 마커 데이터 받아오기
      this.onInterval();
      setInterval(() => this.onInterval(), 5000);

      // map 인스턴스 저장
      this.setState({ map: mapObj });
    }
  }
}
