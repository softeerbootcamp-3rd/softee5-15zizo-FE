import { httpGet } from "./http.js";
const API_BASE_URL = "http://api.base/api";

export async function getOrders() {
  // return (await httpGet(`${API_BASE_URL}/v1/orders`)).json();
  const orders = [];

  // type: 0->비활성화 1->차 2->뚜벅이
  for (let i = 0; i < 10; i++) {
    orders.push({
      x: 33.450701 + Math.random(),
      y: 126.570667 + Math.random(),
      id: i,
      type: i % 3,
    });
  }
  return orders;
}
