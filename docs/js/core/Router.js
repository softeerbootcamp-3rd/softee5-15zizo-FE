import MainPage from "../pages/main/Main.js";
import RegisterPage from "../pages/register/register.js";

export function getPage() {
  const path = window.location.hash.replace("#", "");
  switch (path) {
    case "/register":
      return RegisterPage;
  }
  window.location.hash = "/";
  return MainPage;
}
