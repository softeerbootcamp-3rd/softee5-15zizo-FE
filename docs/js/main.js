import App from "./App.js";
// div#app에 App 컴포넌트 내용 렌더
new App(document.querySelector("#app"));

export let globalPos = undefined;

const geolocation = (pos) => {
  const location = { lat: pos.coords.latitude, lng: pos.coords.longitude };
  globalPos = location;
  console.log("dispatch location");
  document.dispatchEvent(
    new CustomEvent("location", {
      detail: { location },
    })
  );
};

// 위치
navigator.geolocation.watchPosition(geolocation, console.log, {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0,
});
