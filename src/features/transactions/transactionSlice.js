import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchTransactions } from "./transactionAPI";

const initialState = {
  transactions: [],
  status: 'idle',
  error: null,
};

export const updateTransaction = createAsyncThunk(
  "transaction/fetch_all",
  async (props) => {
    const response = await fetchTransactions(props);
    return response.data;
  }
);

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    update: (state, action) => {
      return {
        ...state,
        transactions: [...state.transactions, ...action.payload],
      };
    },
    remove: (state, action) => {
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction.id !== action.payload.id
        ),
      };
    },
    add: (state, action) => {
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateTransaction.pending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        if (action.payload.status === "SUCCESS") {
          state.transactions = action.payload.data.transactions;
        } else {
          state.error = action.payload.message;
        }
        state.status = 'successed';
      })
      .addCase(updateTransaction.rejected, (state) => {
        state.status = 'failed';
        state.error = "Network Failure, please try again later";
      });
  },
});

export const { add, remove, update } = transactionSlice.actions;

export const getTransactionStatus = (state) => [state.transactions.status, state.transactions.error];
export const getAllTransactions = (state) => state.transactions.transactions;

export default transactionSlice.reducer;
