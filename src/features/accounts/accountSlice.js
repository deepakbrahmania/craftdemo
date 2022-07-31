import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import {
  deleteAccount,
  fetchAccounts,
  putAccount,
  updateAccount,
} from "./accountAPI";


export const fetchAllAccounts = createAsyncThunk(
  "account/fetch_all",
  async (props) => {
    const res = await fetchAccounts(props);
    return res.data;
  }
);

export const createNewAccount = createAsyncThunk(
  "account/create_new",
  async (props) => {
    const res = await putAccount(props);
    return res.data;
  }
);

export const updateCurrentAccount = createAsyncThunk(
  "account/update_account",
  async (props) => {
    const res = await updateAccount(props);
    return res.data;
  }
);

export const removeAccount = createAsyncThunk(
  "account/delete_account",
  async (props) => {
    const res = await deleteAccount(props);
    return res.data;
  }
);

const initialState = {
  accounts: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed',
  error: null, // string | null
  updates_status: "",
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    clearUpdates: (state, action) => {
      state.updates_status = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllAccounts.pending, (storeState) => {
        storeState.error = null;
      })
      .addCase(fetchAllAccounts.fulfilled, (storeState, action) => {
        if (action.payload.status === "SUCCESS") {
          // accountEntityAdapter.upsertMany(
          //   storeState,
          //   action.payload.data.accounts
          // );
          storeState.accounts = action.payload.data.accounts;
        } else {
          storeState.error = action.payload.message;
        }
      })
      .addCase(fetchAllAccounts.rejected, (storeState) => {
        storeState.error = "Network Failure, please try again later";
      })
      .addCase(createNewAccount.fulfilled, (state, action) => {
        if (action.payload.status === "SUCCESS") {
          action.payload.data.account_id = String(
            action.payload.data.account_id
          );
          // accountSlice.caseReducers.addAccount({...action.payload.data});
          state.accounts.push(action.payload.data);
          state.updates_status = action.payload.message;
        } else {
          state.updates_status = action.payload.message;
        }
      })
      .addCase(removeAccount.fulfilled, (state, action) => {
        if (action.payload.status === "SUCCESS") {
          state.accounts = state.accounts.filter(
            (account) => account.account_id !== action.meta.arg.account_id
          );
          state.updates_status = action.payload.message;
        } else {
          state.updates_status = action.payload.message;
        }
      })
      .addCase(updateCurrentAccount.fulfilled, (state, action) => {
        if (action.payload.status === "SUCCESS") {
          state.accounts = state.accounts.map((account) =>
            account.account_id == action.payload.data.account_id
              ? action.payload.data
              : account
          );
          state.updates_status = action.payload.message;
        } else {
          state.updates_status = action.payload.message;
        }
      })
      .addCase(updateCurrentAccount.rejected, (state, action) => {
        state.updates_status = action.payload.message;
      });
  },
});

export const { clearUpdates } = accountSlice.actions;

export const getAccountStatus = (state) => [
  state.accounts.status,
  state.accounts.error,
];

export const getUpdateStatus = (state) => state.accounts.updates_status;
export const selectAllAccounts = (state) => state.accounts.accounts;
export const selectAccountEntities = (state) => {
  const entities = {};
  state.accounts.accounts.map((account) => {
    const {account_id, ...res} = account;
    entities[[account_id]] = {...res};
  });
  return entities;
}

export default accountSlice.reducer;
