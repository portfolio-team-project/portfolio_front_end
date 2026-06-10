import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

interface MemberState {
    user: { 
        userId: string;
        userName: string;
        accessToken: string;
        role: string;
    } | null;
    loading: boolean;
    error: string | null;
}

const initialState: MemberState = {
    user: null,
    loading: false,
    error: null,
};

export const login = createAsyncThunk(
    "member/login",
    async (data: { userId: string; password: string }, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.post(`/api/login`, data);

            if (!response.data.success) {
                return rejectWithValue(response.data.message || "로그인에 실패했습니다.");
            }

            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message ?? "서버에 연결 할 수 없습니다.");
        }
    }
);

export const refreshAccessToken = createAsyncThunk(
  "member/refresh",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/auth/refresh");

      return response.data.data;
    } catch {
      return rejectWithValue("세션이 만료되었습니다.");
    }
  }
);

export const logoutAsync = createAsyncThunk(
    "member/logout",
    async (_, { rejectWithValue }) => {
        try {
            await axiosInstance.post("/api/logout");
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message ?? "로그아웃 중 오류가 발생했습니다.");
        }
    }
);

export const kakaoLogin = createAsyncThunk(
    "member/kakaoLogin",
    async (data: { code: string }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`/api/auth/social/kakao`, data);
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data);
        }
    }
);

const memberSlice = createSlice({
    name: "member",
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(kakaoLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(kakaoLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(kakaoLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(refreshAccessToken.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(refreshAccessToken.rejected, (state) => {
                state.user = null;
            })
            .addCase(logoutAsync.fulfilled, (state) => {
                state.user = null;
            })
            .addCase(logoutAsync.rejected, (state) => {
                state.user = null;
            });
    }
});

export const { logout } = memberSlice.actions;
export default memberSlice.reducer;