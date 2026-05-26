import axios from "axios";
import store from "../store/store";
import { logout, refreshAccessToken } from "../slices/memberSlice";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// 요청마다 accessToken 자동으로 헤더에 추가
axiosInstance.interceptors.request.use((config) => {
  const token = store.getState().member.user?.accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 401 나면 refresh 시도
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await store.dispatch(refreshAccessToken());
        const newToken = store.getState().member.user?.accessToken;
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch {
        store.dispatch(logout());
        window.location.href = "/Login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
