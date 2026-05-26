import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface MemberState {
    user: { 
        user_id: string;
        user_name: string;
        accessToken: string;
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
    async (data: { user_id: string; password: string }, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/login`, data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data ?? "서버에 연결 할 수 없습니다.");
        }
    }
);

export const refreshAccessToken = createAsyncThunk(
  "member/refresh",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/auth/refresh");
      return res.data; // 새 accessToken
    } catch {
      return rejectWithValue("세션이 만료되었습니다.");
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
            });
    }
});

export const { logout } = memberSlice.actions;
export default memberSlice.reducer;