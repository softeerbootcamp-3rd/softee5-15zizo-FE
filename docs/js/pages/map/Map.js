import Component from "../../core/Component.js";
import { getOrders } from "../../utils/api.js";
import KakaoMap, {
  createCustomMarker,
  typeToMarker,
} from "../../components/KakaoMap.js";
import { ProfileCardBlue } from "../../components/ProfileCardBlue.js";

export default class MapPage extends Component {
  setup() {
    this.state = {
      map: undefined,
      orders: new Map(),
      selectedOrderId: undefined,
    };
  }

  template() {
    const order = this.state.orders.get(this.state.selectedOrderId);
    return `
      <div class="map-page-container">
        <div data-component="map-container" class="map-container">
        </div>
        <button class="list-button">목록 보기</button>
        ${
          order === undefined
            ? ""
            : `<div class="map-profile-card">${ProfileCardBlue({
                ...order,
                name: order.id,
              })}</div>`
        }
      </div>
    `;
  }

  mounted() {
    this.initializeMap();
    this.initialize;
  }

  async onInterval() {
    if (this.state.map === undefined) return;
    // 새로 오더 목록 받아옴
    const orders = await getOrders();

    // 현재 markers 복사
    const newOrders = new Map([...this.state.orders]);

    // orders에 해당하는 마커 지도에 추가
    for (const order of orders) {
      // 이미 존재할 경우 취소
      const oldOrder = newOrders.get(order.id);
      if (oldOrder !== undefined) {
        // 마커 위치 수정
        oldOrder.marker.setPosition(new kakao.maps.LatLng(order.x, order.y));
        continue;
      }

      const markerNode = createCustomMarker(order, (e) => {
        e.stopPropagation();
        this.setState({ selectedOrderId: order.id });
      });

      // 새로 생성
      const marker = new kakao.maps.CustomOverlay({
        position: new kakao.maps.LatLng(order.x, order.y),
        content: markerNode,
        xAnchor: 0.5,
        yAnchor: 0.5,
      });

      // 지도에 추가
      marker.setMap(this.state.map);

      // 맵에 추가
      newOrders.set(order.id, { ...order, marker });
    }

    this.setState({ orders: newOrders });
  }

  initializeMap() {
    // map init
    if (this.state.map === undefined) {
      const mapContainer = this.target.querySelector(
        '[data-component="map-container"]'
      );

      new KakaoMap(mapContainer);

      mapContainer.onmousedown = () =>
        this.setState({ selectedOrderId: undefined });

      const container = this.target.querySelector("div#map");

      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };

      const mapObj = new kakao.maps.Map(container, options);

      // 지도 중심 좌표 이동 이벤트
      document.addEventListener("panTo", (event) => {
        const { x, y } = event.detail;
        mapObj.panTo(new kakao.maps.LatLng(x, y));
      });

      this.setState({ map: mapObj });

      // 마커 데이터 받아오기
      this.onInterval();
      setInterval(() => this.onInterval(), 5000);
    }

    // 선택된 마커 강조
    for (const [id, order] of this.state.orders) {
      if (id === this.state.selectedOrderId) {
        order.marker.getContent().setAttribute("class", "marker marker-large");
        order.marker.getContent().setAttribute("src", typeToMarker(order.type));
        order.marker.setZIndex(3);
      } else {
        order.marker.getContent().setAttribute("class", "marker");
        order.marker
          .getContent()
          .setAttribute("src", "/img/marker_minimal.svg");
        order.marker.setZIndex(1);
      }
    }
  }
}
