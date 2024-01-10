import MapPage from "../pages/map/Map.js";
import RegisterPage from "../pages/register/Register.js";

export function getPage() {
  const path = window.location.hash.replace("#", "");
  switch (path) {
    case "/register":
      return RegisterPage;
  }
  window.location.hash = "/";
  return MapPage;
}
