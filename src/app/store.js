import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "../features/transactions/transactionSlice";
import tagsReducer from "../features/tags/tagSlice";
import accountSlice from "../features/accounts/accountSlice";
import budgetReducer from '../features/budget/budgetSlice';
import trendReducer from '../features/trends/trendSlice';
/* eslint-disable no-underscore-dangle */
export const store = configureStore(
  {
    reducer: {
      transactions: transactionsReducer,
      tags: tagsReducer,
      accounts: accountSlice,
      budget: budgetReducer,
      trends: trendReducer,
    },
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
/* eslint-enable */
