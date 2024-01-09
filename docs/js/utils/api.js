import { httpDelete, httpGet, httpPatch, httpPost } from "./http.js";
const API_BASE_URL = "https://8c6e-221-149-4-114.ngrok-free.app/api/v1";

export async function getOrders() {
  return (await httpGet(`${API_BASE_URL}/members`))?.json();
}

export async function postProfile(data) {
  return (
    await httpPost(`${API_BASE_URL}/members`, {
      nickname: data.nickName,
      gender: data.gender,
      info: data.info,
      hasCompany: data.hasCompany,
      companyInfo: data.companyInfo,
      hasCar: data.hasCar,
      age: data.age,
      location: {
        lat: data.location.lat,
        lng: data.location.lng,
      },
    })
  )?.json();
}

export async function logout() {
  return await httpDelete(`${API_BASE_URL}/members`);
}

// actions:  "REQUEST" | "ACCEPT" | "REJECT" | "MEET" | "RESTART"
export async function requestCarting(action, partnerId) {
  return await httpPatch(`${API_BASE_URL}/members`, { action, partnerId });
}
