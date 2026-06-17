import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

interface MemberResponse {
  userId: string;
  userName: string;
  email: string;
  status: string;
  createdDate: string;
}

interface MemberDetailResponse {
  userId: string;
  userName: string;
  email: string;
  status: string;
  createdDate: string;
  cpName: string;
  rank: string;
  department: string;
  work: string;
}

interface AdminState {
  members: MemberResponse[];
  totalPages: number;
  currentpage: number;
  totalCount: number;
  mounthCount: number;
  memberDetail: MemberDetailResponse | null;
  loading: boolean;
  error: string | null;
}
const initialState: AdminState = {
  members: [],
  totalPages: 0,
  currentpage: 0,
  totalCount: 0,
  mounthCount: 0,
  memberDetail: null,
  loading: false,
  error: null
}

export const fetchMembers = createAsyncThunk(
  "admin/fetchMember",
  async ({page = 0, size = 10, keyword = "", searchType = "userId"} : {page?: number; size?: number; keyword?: string; searchType?: string;}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/admin/member",{params: {page, size, keyword, searchType}});
      return response.data.data;
    } catch (error:any) {
      return rejectWithValue(error.response?.data?.message || "사용자 데이터 불러오기를 실패했습니다.");
    }
});

export const fetchMonthCount = createAsyncThunk(
  "admin/fetchMonthCount",
    async (_, {rejectWithValue}) => {
      try {
        const response = await axiosInstance.get("/api/admin/joinMonthCount");
        return response.data.data;
      } catch (error:any) {
        return rejectWithValue(error.response?.data?.message || "이번 달 가입자 수 불러오기를 실패했습니다.");
      }
  });

export const fetchMemberDetail = createAsyncThunk(
  "admin/fetchMemberDetail",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/admin/detailUserInfo", { params: { userId } });
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "회원 상세 정보 불러오기를 실패했습니다.");
    }
  }
);

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
              state.members = action.payload.content;
              state.totalPages = action.payload.page.totalPages;
              state.currentpage = action.payload.page.number;
              state.totalCount = action.payload.page.totalElements;
           })
           .addCase(fetchMembers.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload as string;
           })
           .addCase(fetchMonthCount.pending, (state) => {
            state.loading = true;
            state.error = null;
           })
           .addCase(fetchMonthCount.fulfilled, (state, action)=> {
            state.loading = false;
            state.mounthCount = action.payload;
           })
           .addCase(fetchMonthCount.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
           })
           .addCase(fetchMemberDetail.fulfilled, (state, action) => {
            state.memberDetail = action.payload;
           });
  },
});

export default adminSlice.reducer; 