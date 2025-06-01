import axios from "axios";
import { getAuthToken } from "./localStorage";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin":"*"
  },
});

axiosInstance.interceptors.request.use(function (config) {
  if (getAuthToken()) {
    config.headers.Authorization = "Bearer " + getAuthToken();
  }
  return config;
});

export default axiosInstance;
