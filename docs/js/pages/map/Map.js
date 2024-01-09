import Component from "../../core/Component.js";
import { getOrders } from "../../utils/api.js";
import KakaoMap, {
  createCustomMarker,
  typeToMarker,
} from "../../components/KakaoMap.js";
import { ProfileCardBlue } from "../../components/ProfileCardBlue.js";
import ProfileModal from "../../components/ProfileModal.js";
import { ProfileList } from "../../components/ProfileList.js";

export default class MapPage extends Component {
  setup() {
    this.state = {
      map: undefined,
      location: undefined,
      orders: new Map(),
      selectedOrderId: undefined,
      modalOrderId: undefined,
      showList: false,
      requestOrderId: undefined,
      userMarker: undefined,
    };
  }

  template() {
    const order = this.state.orders.get(this.state.selectedOrderId);
    const modalOrder = this.state.orders.get(this.state.modalOrderId);
    return `
      <div class="map-page-container">
        <div data-component="map-container" class="map-container">
        </div>
        <button data-component="list-btn" class="list-button">목록 보기</button>
        <img data-component="gps-btn" class="gps-btn" src="/img/gps.svg" ${
          this.state.selectedOrderId ? 'style="margin-bottom:160px"' : ""
        }/>
        ${
          order === undefined
            ? ""
            : `<div class="map-profile-card">${ProfileCardBlue({
                ...order,
                name: order.id,
              })}</div>`
        }
        ${
          !this.state.showList
            ? ""
            : ProfileList({ orders: Array.from(this.state.orders.values()) })
        }
        ${
          modalOrder === undefined
            ? ""
            : ProfileModal({
                name: modalOrder.id,
                tags: ["asdf", "asdf"],
                distance: 12,
                age: 10,
                gender: "F",
              })
        }
      </div>
    `;
  }

  updateLocation(pos) {
    if (this.state.map === undefined) return;
    const location = { lat: pos.coords.latitude, lng: pos.coords.longitude };

    if (this.state.userMarker === undefined) {
      // create user marker
      const marker = new kakao.maps.CustomOverlay({
        position: new kakao.maps.LatLng(0, 0),
        content: createCustomMarker(),
        xAnchor: 0.5,
        yAnchor: 0.5,
      });

      marker.setMap(this.state.map);
      this.setState({ userMarker: marker, location });
      return;
    }

    this.setState({ location });
  }

  mounted() {
    this.initializeMap();

    // current location
    if (this.state.userMarker)
      this.state.userMarker.setPosition(
        new kakao.maps.LatLng(this.state.location.lat, this.state.location.lng)
      );
    const gpsBtn = this.target.querySelector('[data-component="gps-btn"]');
    if (gpsBtn && this.state.map && this.state.location)
      gpsBtn.onclick = () =>
        this.state.map.setCenter(
          new kakao.maps.LatLng(
            this.state.location.lat,
            this.state.location.lng
          )
        );

    // carting buttons
    const requestCartingBtns = this.target.querySelectorAll(
      '[data-component="carting-request"]'
    );
    for (const btn of requestCartingBtns) {
      const orderId = btn.getAttribute("data-order-id");
      if (orderId === null) return;
      btn.onclick = (e) => {
        // todo: implement this
        console.log("request", orderId);
        e.stopPropagation();
        this.setState({ requestOrderId: parseInt(orderId) });
      };
    }

    // open modal from blue profile card
    const openModalBtns = this.target.querySelectorAll(
      '[data-component="open-modal"]'
    );
    for (const btn of openModalBtns) {
      const orderId = btn.getAttribute("data-order-id");
      if (orderId === null) return;
      btn.onclick = (e) => {
        e.stopPropagation();
        this.setState({ modalOrderId: parseInt(orderId) });
      };
    }

    // close modal
    const closeModalBtn = this.target.querySelector(
      "button#profile-modal-close-btn"
    );
    if (closeModalBtn)
      closeModalBtn.onclick = () => this.setState({ modalOrderId: undefined });

    // list button
    const listBtn = this.target.querySelector('[data-component="list-btn"]');
    listBtn.onclick = () => this.setState({ showList: true });

    // modal list close
    const listModalClose = this.target.querySelector(
      '[data-component="profile-list-modal-background"]'
    );
    if (listModalClose) {
      listModalClose.onclick = (e) => {
        if (e.target === listModalClose) {
          this.setState({ showList: false });
        }
      };
    }

    // close profile modal
    const profileModalClose = this.target.querySelector(
      '[data-component="profile-modal-background"]'
    );
    if (profileModalClose)
      profileModalClose.onclick = (e) => {
        if (e.target === profileModalClose) {
          this.setState({ modalOrderId: undefined });
        }
      };
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
        oldOrder.marker.setPosition(
          new kakao.maps.LatLng(order.location.lat, order.location.lng)
        );
        continue;
      }

      const markerNode = createCustomMarker(order, (e) => {
        e.stopPropagation();
        this.setState({ selectedOrderId: order.id });
      });

      // 새로 생성
      const marker = new kakao.maps.CustomOverlay({
        position: new kakao.maps.LatLng(order.location.lat, order.location.lng),
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

    // 위치
    navigator.geolocation.watchPosition(
      (p) => this.updateLocation(p),
      console.log,
      {
        enableHighAccuracy: true,
        timeout: 3000,
        maximumAge: 0,
      }
    );
  }
}
