import Component from "../../core/Component.js";
import { carting, getOrders, getStatus, logout } from "../../utils/api.js";
import KakaoMap, {
  createCustomMarker,
  typeToMarker,
  getImgFromStatus,
} from "../../components/KakaoMap.js";
import { ProfileCardBlue } from "../../components/ProfileCardBlue.js";
import ProfileModal from "../../components/ProfileModal.js";
import { ProfileList } from "../../components/ProfileList.js";
import StatelessRequestModal from "../../components/StatelessRequestModal.js";
import { RequiredModal } from "../../components/RequiredModal.js";
import { globalPos } from "../../main.js";
import { SuccessModal } from "../../components/SuccessModal.js";

export default class MapPage extends Component {
  setup() {
    this.state = {
      map: undefined,
      location: globalPos,
      orders: new Map(),
      selectedOrderId: undefined,
      modalOrderId: undefined,
      showList: false,
      requestOrderId: undefined,
      requestTime: 0,
      requestTimer: undefined,
      requiredOrderId: undefined,
      requiredTime: 0,
      requiredTimer: undefined,
      matchId: undefined,
      userMarker: undefined,
      status: "AVAILABLE",
    };
  }

  template() {
    const order = this.state.orders.get(this.state.selectedOrderId);
    const modalOrder = this.state.orders.get(this.state.modalOrderId);
    const requiredOrder = this.state.orders.get(this.state.requiredOrderId);
    const matchOrder = this.state.orders.get(this.state.matchId);
    const isMatched = this.state.status === "MATCHED";
    return `
      <div class="map-page-container">
      <div class="map-header">
        <img src="./img/logo_small.svg"/>
        <img src="./img/profile_small.svg"/>
      </div>
        <div data-component="map-container" class="map-container">
        </div>
        <button data-component="list-btn" class="list-button">목록 보기</button>
        <img data-component="gps-btn" class="gps-btn" src="./img/gps.svg" ${
          this.state.selectedOrderId ? 'style="margin-bottom:160px"' : ""
        }/>
        ${
          isMatched
            ? SuccessModal(matchOrder)
            : `${
                order === undefined
                  ? ""
                  : `<div class="map-profile-card">${ProfileCardBlue({
                      ...order,
                    })}</div>`
              }
              ${
                !this.state.showList
                  ? ""
                  : ProfileList({
                      orders: Array.from(this.state.orders.values()),
                    })
              }
              ${
                this.state.requestOrderId === undefined
                  ? ""
                  : StatelessRequestModal({ time: this.state.requestTime })
              }
              ${
                !requiredOrder
                  ? ""
                  : RequiredModal({
                      time: this.state.requiredTime,
                      ...requiredOrder,
                    })
              }
              ${!modalOrder ? "" : ProfileModal(modalOrder)}
              `
        }
      </div>
    `;
  }

  updateLocation(e) {
    const location = e.detail.location;
    console.log("location event", location);
    this.setState({ location });
  }

  cancelRequest() {
    clearInterval(this.state.requestTimer);
    const id = this.state.requestOrderId;
    // reject
    carting("REJECT", id);
    this.setState({
      requestOrderId: undefined,
      requestTimer: undefined,
      requestTime: 0,
    });
  }

  rejectRequired() {
    clearInterval(this.state.requiredTimer);
    const id = this.state.requiredOrderId;
    // reject
    carting("REJECT", id);
    this.setState({
      requiredOrderId: undefined,
      requiredTimer: undefined,
      requiredTime: 0,
    });
  }

  acceptRequired() {
    clearInterval(this.state.requiredTimer);
    const id = this.state.requiredOrderId;
    // reject
    carting("ACCEPT", this.state.requiredOrderId);
    this.setState({
      requiredOrderId: undefined,
      requiredTimer: undefined,
      requiredTime: 0,
      matchId: this.state.requiredOrderId,
      status: "MATCHED",
    });
  }

  mounted() {
    this.initializeMap();

    // guide btn
    const guideBtn = this.target.querySelector('[data-component="guide-btn"]');
    if (guideBtn)
      guideBtn.onclick = () =>
        window.open(guideBtn.getAttribute("href"), "_blank");

    // reset btn
    const resetBtn = this.target.querySelector('[data-component="finish-btn"]');
    if (resetBtn)
      resetBtn.onclick = () =>
        logout().then(
          (document.location.href = "/softee5-15zizo-FE/#/register")
        );

    // logout btn
    const logoutBtn = this.target.querySelector(
      '[data-component="logout-btn"]'
    );
    if (logoutBtn)
      logoutBtn.onclick = () =>
        logout().then((document.location.href = "/softee5-15zizo-FE/"));

    // required btns
    // accept
    const acceptRequiredBtn = this.target.querySelector(
      '[data-component="required-accept-btn"]'
    );
    if (acceptRequiredBtn)
      acceptRequiredBtn.onclick = () => this.acceptRequired();
    // reject
    const rejectRequiredBtn = this.target.querySelector(
      '[data-component="required-reject-btn"]'
    );
    if (rejectRequiredBtn)
      rejectRequiredBtn.onclick = () => this.rejectRequired();

    // request btns
    // cancel
    const cancelRequestBtn = this.target.querySelector(
      '[data-component="cancel-btn"]'
    );
    if (cancelRequestBtn) cancelRequestBtn.onclick = () => this.cancelRequest();

    // timer clear
    if (this.state.requestTime < 0 && this.state.requestTimer) {
      this.cancelRequest();
    }
    if (this.state.requiredTime < 0 && this.state.requiredTimer) {
      this.rejectRequired();
    }

    console.log(this.state);
    // current location
    if (this.state.map && this.state.location) {
      if (!this.state.userMarker) {
        // 현재 위치
        const marker = new kakao.maps.CustomOverlay({
          position: new kakao.maps.LatLng(
            this.state.location.lat,
            this.state.location.lng
          ),
          content: createCustomMarker({ status: "ME" }),
          xAnchor: 0.5,
          yAnchor: 0.5,
        });

        marker.setMap(this.state.map);
        this.setState({ userMarker: marker });
      } else {
        this.state.userMarker.setPosition(
          new kakao.maps.LatLng(
            this.state.location.lat,
            this.state.location.lng
          )
        );
      }
    }

    const gpsBtn = this.target.querySelector('[data-component="gps-btn"]');
    if (gpsBtn)
      gpsBtn.onclick = () => {
        this.state.map.setCenter(
          new kakao.maps.LatLng(
            this.state.location.lat,
            this.state.location.lng
          )
        );
      };

    // carting buttons
    const requestCartingBtns = this.target.querySelectorAll(
      '[data-component="carting-request"]'
    );
    for (const btn of requestCartingBtns) {
      const orderId = btn.getAttribute("data-order-id");
      if (orderId === null) return;
      btn.onclick = (e) => {
        e.stopPropagation();
        // 카팅 요청
        this.setState({ status: "REQUESTING" });
        carting("REQUEST", parseInt(orderId)).then((res) => {
          // timer start
          const tick = () => {
            this.setState({ requestTime: this.state.requestTime - 1 });
          };
          this.setState({ requestTimer: setInterval(tick, 1000) });
        });
        this.setState({ requestOrderId: parseInt(orderId), requestTime: 30 });
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
    // 내 상태 받아옴 (비동기)
    getStatus().then((res) => {
      const oldStatus = this.state.status;
      const newStatus = res.status;

      console.log(oldStatus, newStatus);

      // 매치 -> 요청/응답 상태 초기화 시키고 성공 모달 표시
      if (newStatus === "MATCHED") {
        clearInterval(this.state.requiredTimer);
        clearInterval(this.state.requestTimer);
        // timer 있으면 clear
        this.setState({
          requestTime: 0,
          requestTimer: undefined,
          requestOrderId: undefined,
          requiredTime: 0,
          requiredTimer: undefined,
          requiredOrderId: undefined,
          matchId: res.partnerId,
        });
      }

      // 요청중 -> idle -> 상태 초기화 후 맵 화면
      if (oldStatus === "REQUESTING" && newStatus === "AVAILABLE") {
        this.setState({
          requestTime: -1,
        });
      }

      // 매치(임시 설정) -> idle -> 상태 초기화
      if (oldStatus === "MATCHED" && newStatus === "AVAILABLE") {
        this.setState({ matchId: undefined });
      }

      // idle -> 응답 -> 응답 모달
      if (oldStatus === "AVAILABLE" && newStatus === "RESPONDING") {
        this.setState({
          requiredTime: 30,
          requiredTimer: setInterval(
            () => this.setState({ requiredTime: this.state.requiredTime - 1 }),
            1000
          ),
          requiredOrderId: res.partnerId,
        });
      }
      // 읍답중 -> idle -> 상태 초기화 후 맵 화면
      if (oldStatus === "RESPONDING" && newStatus === "AVAILABLE") {
        this.setState({
          requiredTime: -1,
        });
      }

      this.setState({ status: newStatus });
    });

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

        // 상태에 따라 변경
        const content = oldOrder.marker.getContent();
        content.setAttribute("src", getImgFromStatus(oldOrder.status));
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
    setTimeout(() => this.onInterval(), 5000);
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
        level: 8,
      };

      const mapObj = new kakao.maps.Map(container, options);

      this.setState({ map: mapObj });

      // 마커 데이터 받아오기
      this.onInterval();

      // location event listener
      console.log("add events");
      document.addEventListener("location", (e) => this.updateLocation(e));
    }

    // 선택된 마커 강조
    for (const [id, order] of this.state.orders) {
      if (id === this.state.selectedOrderId) {
        order.marker.getContent().setAttribute("class", "marker marker-large");
        order.marker
          .getContent()
          .setAttribute("src", typeToMarker(order.hasCar));
        order.marker.setZIndex(3);
      } else {
        order.marker.getContent().setAttribute("class", "marker");
        order.marker
          .getContent()
          .setAttribute("src", getImgFromStatus(order.status));
        order.marker.setZIndex(1);
      }
    }
  }
}
