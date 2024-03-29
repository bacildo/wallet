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

export function deleteTransaction(id) {
  const response = axios.delete(`${BASE_URL}/${id}`, {
    headers: { Authorization: `Bearer ${Cookies.get("token")}` },
  });
  return response;
}

export async function updateTransaction(id, data) {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, data, {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

