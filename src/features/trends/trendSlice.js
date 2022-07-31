import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { putNewTransaction, updateTransaction, removeTransaction } from "../transactions/transactionSlice";
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
  reducers: {
    updateTrend: (state, action) => {
      console.log('xyz');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTrends.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(fetchAllTrends.fulfilled, (state, action) => {
        if (action.payload.status === "SUCCESS") {
          state.trends = action.payload.data.transactions;
        } else {
          state.error = action.payload.message;
        }
        state.status = "successed";
      })
      .addCase(fetchAllTrends.rejected, (state) => {
        state.status = "failed";
        state.error = "Network Failure, please try again later";
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        if (action.payload.status === "SUCCESS") {
          const foundIndex = state.trends.findIndex(x => String(x.transaction_id) == String(action.payload.data.transaction_id));
          state.trends[foundIndex] = action.payload.data;
        } else {
          state.error = action.payload.message;
        }
        state.status = "successed";
      })
      .addCase(putNewTransaction.fulfilled, (state, action) => {
        if (action.payload.status === "SUCCESS") {
          state.trends.push(action.payload.data);
        } else {
          state.error = action.payload.message;
        }
        state.status = "successed";
      })
      .addCase(removeTransaction.fulfilled, (state, action) => {
        if (action.payload.status === "SUCCESS") {
          const transactionId = action.meta.arg.transaction_id;
          const foundIndex = state.trends.findIndex(x => String(x.transaction_id) == String(transactionId));
          if (foundIndex > -1) {
            state.trends.splice(foundIndex, 1);
          }
        } else {
          state.error = action.payload.message;
        }
        state.status = "successed";
      })
  },
});

export const {updateTrend} = trendSlice.actions;

export const getTrendStatus = (state) => [
  state.trends.status,
  state.trends.error,
];
export const getTrends = (state) => state.trends.trends;
export default trendSlice.reducer;
