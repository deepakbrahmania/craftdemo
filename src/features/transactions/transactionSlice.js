import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteTransaction, fetchTransactions, putTransaction, updateExistingTransaction } from "./transactionAPI";

const initialState = {
  transactions: [],
  status: "idle",
  error: null,
};

export const fetchAllTransactions = createAsyncThunk(
  "transaction/fetch_all",
  async (props) => {
    const response = await fetchTransactions(props);
    return response.data;
  }
);

export const putNewTransaction = createAsyncThunk(
  "transaction/put_new",
  async (props) => {
    const response = await putTransaction(props);
    return response.data;
  }
);

export const removeTransaction = createAsyncThunk(
  "transaction/delete",
  async (props) => {
    const response = await deleteTransaction(props);
    return response.data;
  }
);
export const updateTransaction = createAsyncThunk(
  "transaction/update",
  async (props) => {
    const response = await updateExistingTransaction(props);
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
      .addCase(fetchAllTransactions.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(fetchAllTransactions.fulfilled, (state, action) => {
        if (action.payload.status === "SUCCESS") {
          state.transactions = action.payload.data.transactions;
        } else {
          state.error = action.payload.message;
        }
        state.status = "successed";
      })
      .addCase(fetchAllTransactions.rejected, (state) => {
        state.status = "failed";
        state.error = "Network Failure, please try again later";
      })
      .addCase(putNewTransaction.fulfilled, (state, action) => {
        if (action.payload.status === "SUCCESS") {
          state.transactions.push(action.payload.data);
          // state.updates_status = action.payload.message;
        } else {
          // state.updates_status = action.payload.message;
        }
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        if (action.payload.status === "SUCCESS") {
          state.transactions = state.transactions.map((transaction) =>
            transaction.transaction_id == action.payload.data.transaction_id
              ? action.payload.data
              : transaction
          );
          // state.updates_status = action.payload.message;
        } else {
          // state.updates_status = action.payload.message;
        }
      })
      .addCase(removeTransaction.fulfilled, (state, action) => {
        if (action.payload.status === "SUCCESS") {
          state.transactions = state.transactions.filter(
            (transaction) => transaction.transaction_id !== action.meta.arg.transaction_id
          );
          // state.updates_status = action.payload.message;
        } else {
          // state.updates_status = action.payload.message;
        }
      })
      ;
  },
});

export const { add, remove, update } = transactionSlice.actions;

export const getTransactionStatus = (state) => [
  state.transactions.status,
  state.transactions.error,
];
export const getAllTransactions = (state) => state.transactions.transactions;

export default transactionSlice.reducer;
