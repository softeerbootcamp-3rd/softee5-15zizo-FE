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
  element.setAttribute("src", "/img/marker_minimal.svg");
  element.onmousedown = onmousedown;
  return element;
}
