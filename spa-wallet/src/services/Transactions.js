import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "http://localhost:3000";

export function getAllTransactions() {
  const response = axios.get(`${BASE_URL}/`, {
    headers: { Authorization: `Bearer ${Cookies.get("token")}` },
  });
  return response;
}

export function createTransaction(body) {
  const response = axios.post(`${BASE_URL}/`, body, {
    headers: { Authorization: `Bearer ${Cookies.get("token")}` },
  });
  return response;
}
