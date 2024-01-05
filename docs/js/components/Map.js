import Component from "../core/Component.js";

export default class Map extends Component {
  setup() {
    this.state = { map: undefined };
  }

  template() {
    return `
      <div id="map" style="width: 100%; height: 100%"></div>
    `;
  }

  mounted() {
    // 한번만 실행
    if (!this.state.map) {
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

      this.setState({ map: mapObj });
    }
  }
}
