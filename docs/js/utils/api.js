import { httpDelete, httpGet, httpPatch, httpPost } from "./http.js";
const API_BASE_URL = "https://a5e8-221-149-4-114.ngrok-free.app/api/v1";

export async function getOrders() {
  // return (await httpGet(`${API_BASE_URL}/members`))?.json();
  return [
    {
      nickname: "asdf",
      gender: "FEMALE",
      info: "asd asdf fdd",
      hasCompany: false,
      companyInfo: null,
      hasCar: true,
      id: 1,
      age: 20,
      location: {
        lat: 33.0001,
        lng: 127,
      },
    },
    {
      nickname: "car",
      gender: "FEMALE",
      status: "AVAILABLE",
      info: "asd asdf fdd",
      hasCompany: false,
      companyInfo: null,
      hasCar: true,
      id: 2,
      age: 20,
      location: {
        lat: 33.0002,
        lng: 127,
      },
    },
    {
      nickname: "nocar",
      gender: "FEMALE",
      status: "REQUESTING",
      info: "asd asdf fdd",
      hasCompany: false,
      companyInfo: null,
      hasCar: false,
      id: 3,
      age: 20,
      location: {
        lat: 33.0003,
        lng: 127,
      },
    },
  ];
}

export async function postProfile(data) {
  return {};
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
export async function carting(action, partnerId) {
  return;
  return await httpPatch(`${API_BASE_URL}/members`, { action, partnerId });
}

export async function getStatus() {
  return { status: "AVAILABLE" };
  return (await httpGet(`${API_BASE_URL}/members/me`)).json();
}
