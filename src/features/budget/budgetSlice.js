import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTotalBudget, putTotalBudget, updateTotalBudget, deleteBudget } from "./budgetAPI";

export const fetchBudget = createAsyncThunk('budget/fetch_all', async (props) => {
    const response = await getTotalBudget(props);
    return response.data;
})
export const putNewTotalBudget = createAsyncThunk('budget/create', async (props) => {
  const response = await putTotalBudget(props);
  return response.data;
})
export const updateCurrentBudget = createAsyncThunk('budget/update', async (props) => {
  const response = await updateTotalBudget(props);
  return response.data;
})
export const deleteCurrentBudget = createAsyncThunk('budget/delete', async (props) => {
  const response = await deleteBudget(props);
  return response.data;
})

const initialState = {
  budget: {
    tags: [],
    assigned: 0,
    spend: 0,
  },
  status: "idle",
  error: null,
};

const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    // addBudget: (state, action) => {
    //   return { ...state, budget: action.payload };
    // },
    // updateBudget: (state, action) => {
    //   return {
    //     ...state,
    //     budget: {
    //       ...state.budget,
    //       assigned: action.payload,
    //     },
    //   };
    // },
    // // deleteBudget: (state, action) => {
    // //   state  = initialState;
    // // },
    // addTags: (state, action) => {
    //   return {
    //     ...state,
    //     budget: {
    //       ...state.budget,
    //       tags: [...state.budget, action.payload],
    //     },
    //   };
    // },
    // updateTags: (state, action) => {
    //   return {
    //     ...state,
    //     budget: {
    //       ...state.budget,
    //       tags: state.tags.map((tag) => {
    //         return tag.tag_id === action.payload.tag_id ? action.payload : tag;
    //       }),
    //     },
    //   };
    // },
    // deleteTag: (state, action) => {
    //   return {
    //     ...state,
    //     budget: {
    //       ...state.budget,
    //       tags: state.budget.tags.filter(
    //         (tag) => tag.tag_id !== action.payload.tag_id
    //       ),
    //     },
    //   };
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBudget.pending, (state)=> {
        state.status = "pending";
        state.error = null;
    })
    .addCase(fetchBudget.fulfilled, (state,action) => {
        if(action.payload.status === 'SUCCESS') {
            state.budget = action.payload.data.budget;
        } else {
            state.error = action.payload.message;
        }
        state.status = "successed";
    })
    .addCase(fetchBudget.rejected, (state) => {
      state.status = "failed";
      state.error = "Network Failure, please try again later";
    })
    .addCase(putNewTotalBudget.fulfilled, (state, action) => {
      state.budget = action.payload.data;
    })
    .addCase(updateCurrentBudget.fulfilled, (state, action) => {
      state.budget = action.payload.data;
    })
    .addCase(deleteCurrentBudget.fulfilled, (state, action) => {
      state = initialState;
    })
    ;
  },
});

// export const { addBudget, updateBudget, addTags, updateTags, deleteTag } = budgetSlice.actions;

export const getBudgetStatus = (state) => [state.budget.status, state.budget.error]; 
export const getBudget = (state) => state.budget.budget;

export default budgetSlice.reducer;
