import {
  createSlice,
  createEntityAdapter,
  nanoid,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { fetchAccounts } from "./accountAPI";

const accountEntityAdapter = createEntityAdapter({
  selectId: (account) => account.account_id,
  sortComparer: (acc1, acc2) => {
    return String(acc1.account_name).localeCompare(String(acc2.account_name));
  },
});

export const fetchAllAccounts = createAsyncThunk("account/fetch_all", async (props) => {
  const res = await fetchAccounts(props);
  return res.data;
});

const initialState = accountEntityAdapter.getInitialState({
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed',
  error: null, // string | null
});

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    addAccount: {
      reducer: (state, action) => {
        state.accounts.push(action.payload);
      },
      prepare: (data) => {
        return {
          accountID: nanoid(10),
          ...data,
        };
      },
    },
    updateAccount: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllAccounts.pending, (storeState) => {
        storeState.error = null;
      })
      .addCase(fetchAllAccounts.fulfilled, (storeState, action) => {
        if (action.payload.status === "SUCCESS") {
          accountEntityAdapter.upsertMany(storeState, action.payload.data.accounts)
        } else {
          storeState.error = action.payload.errMsg;
        }
      })
      .addCase(fetchAllAccounts.rejected, (storeState) => {
        storeState.error = "Network Failure, please try again later";
      });
  },
});

export const { addAccount, updateAccount } = accountSlice.actions;

export const getAccountStatus = (state) => [state.accounts.status, state.accounts.error];
export const {
  selectAll: selectAllAccounts,
  selectById: selectAccountById,
  selectIds: selectAccountIds,
  selectEntities: selectAccountEntities,
} = accountEntityAdapter.getSelectors((state) => state.accounts);

export default accountSlice.reducer;
