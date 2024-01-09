import Component from "../core/Component.js";

export default class KakaoMap extends Component {
  template() {
    return `
      <div disable-rerender id="map" style="width: 100%; height: 100%"></div>
    `;
  }
  mounted() {}
}

export function typeToMarker(type) {
  switch (type) {
    case 1:
    case 2:
  }

  return "/img/marker_car.png";
}

export function createCustomMarker(order, onmousedown) {
  const element = document.createElement("img");
  element.setAttribute("class", `marker`);
  element.setAttribute("src", getImgFromStatus(order.status));

  // 상태
  switch (order.status) {
    case "REQUESTING":
    case "RESPONDING":
    case "MATCHED":
      element.setAttribute("src", getImgFromStatus(order.status));
  }

  element.onmousedown = onmousedown;
  return element;
}

export function getImgFromStatus(status) {
  switch (status) {
    case "REQUESTING":
    case "RESPONDING":
    case "MATCHED":
      return "/img/marker_minial_disabled.svg";
  }
  return "/img/marker_minimal.svg";
}
