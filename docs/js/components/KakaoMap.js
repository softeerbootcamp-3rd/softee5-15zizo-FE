import Component from "../core/Component.js";

export default class KakaoMap extends Component {
  template() {
    return `
      <div disable-rerender id="map" style="width: 100%; height: 100%"></div>
    `;
  }
  mounted() {}
}

export function typeToMarker(hasCar) {
  if (hasCar) return "/img/marker_car.png";
  return "/img/marker_walk.png";
}

export function createCustomMarker(order, onmousedown) {
  const element = document.createElement("img");
  element.setAttribute("class", `marker`);
  element.setAttribute("src", getImgFromStatus(order.status));

  element.onmousedown = onmousedown;
  return element;
}

export function getImgFromStatus(status) {
  switch (status) {
    case "REQUESTING":
    case "RESPONDING":
    case "MATCHED":
      return "/img/marker_minimal_disabled.svg";
    case "ME":
      return "/img/marker_me.svg";
  }
  return "/img/marker_minimal.svg";
}
