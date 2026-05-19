import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { QnaItem } from "../types/qna";

interface QnaState {
  items: QnaItem[];
  loading: boolean;
  error: string | null;
}

const initialState: QnaState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchQnaList = createAsyncThunk("qna/fetchList", async () => {
  const response = await axios.get("http://localhost/api/qna");
  return response.data;
});

const qnaSlice = createSlice({
  name: "qna",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQnaList.pending,   (state) => { state.loading = true; })
      .addCase(fetchQnaList.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchQnaList.rejected,  (state) => { state.loading = false; });
  },
});

export default qnaSlice.reducer;
