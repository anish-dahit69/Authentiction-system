import axios from "axios";
import { navigateTo } from "../utils/navigation";
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response && error.response.status === 401) {
      navigateTo("/login");
    }
    return Promise.reject(error);
  }
);
