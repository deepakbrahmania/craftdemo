import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchTrends } from "./trendsAPI";

export const fetchAllTrends = createAsyncThunk(
  "trends/fetch",
  async (props) => {
    const response = await fetchTrends(props);
    return response.data;
  }
);

const initialState = {
  trends: [],
  error: "",
  status: "idle",
};
export const trendSlice = createSlice({
  name: "trends",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTrends.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(fetchAllTrends.fulfilled, (state, action) => {
        if (action.payload.status === "SUCCESS") {
          state.trends = action.payload.data.trends;
        } else {
          state.error = action.payload.message;
        }
        state.status = "successed";
      })
      .addCase(fetchAllTrends.rejected, (state) => {
        state.status = "failed";
        state.error = "Network Failure, please try again later";
      });
  },
});

export const {} = trendSlice.actions;

export const getTrendStatus = (state) => [
  state.trends.status,
  state.trends.error,
];
export const getTrends = (state) => state.trends;
export default trendSlice.reducer;
