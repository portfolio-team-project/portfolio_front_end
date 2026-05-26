import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import qnaReducer from "../slices/qnaSlice";
import memberReducer, { logout, refreshAccessToken } from "../slices/memberSlice";
import axios from "axios";

const logger = createLogger();

const store = configureStore({
    reducer: {
        qna: qnaReducer,
        member: memberReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== 'production',
});

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await store.dispatch(refreshAccessToken());
        const newToken = store.getState().member.user?.accessToken;
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axios(originalRequest);
      } catch {
        store.dispatch(logout());
        window.location.href = "/Login";
      }
    }
    return Promise.reject(error);
  }
);


export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;