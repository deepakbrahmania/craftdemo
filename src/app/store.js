import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import transactionsReducer from "../features/transactions/transactionSlice";
import tagsReducer from "../features/tags/tagSlice";
import accountSlice from "../features/accounts/accountSlice";
import budgetReducer from '../features/budget/budgetSlice';
/* eslint-disable no-underscore-dangle */
export const store = configureStore(
  {
    reducer: {
      counter: counterReducer,
      transactions: transactionsReducer,
      tags: tagsReducer,
      accounts: accountSlice,
      budget: budgetReducer,
    },
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
/* eslint-enable */
