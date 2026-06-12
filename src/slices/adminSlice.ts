import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

interface MemberResponse {
  userId: string;
  userName: string;
  email: string;
  status: string;
  createdDate: string;
}

interface AdminState {
  members: MemberResponse[];
  loading: boolean;
  error: string | null;
}
const initialState: AdminState = {
  members: [],
  loading: false,
  error: null
}

export const fetchMembers = createAsyncThunk(
  "admin/fetchMember", 
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/admin/member");
      return response.data.data;
    } catch (error:any) {
      return rejectWithValue(error.response?.data?.message || "사용자 데이터 불러오기를 실패했습니다.");
    }
});

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
           .addCase(fetchMembers.pending, (state) => {
              state.loading = true;
              state.error = null;
           })
           .addCase(fetchMembers.fulfilled, (state, action) => {
              state.loading = false;
              state.members = action.payload;
           })
           .addCase(fetchMembers.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload as string;
           });
  },
});

export default adminSlice.reducer; 