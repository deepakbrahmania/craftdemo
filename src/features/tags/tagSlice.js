import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { fetchTags } from "./tagAPI";

const tagEntityAdapter = createEntityAdapter({
  selectId: (tag) => tag.tag_id,
});
const initialState = tagEntityAdapter.getInitialState({
  status: "idle", // idle || pending || successed || failed
  error: null, // null || errorMsg
});

export const fetchAllTags = createAsyncThunk("tag/fetch_all", async (props) => {
  const response = await fetchTags(props);
  return response.data;
});

const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {
    add: {
      reducer: (state, action) => {
        return { ...state, tags: [...state.tags, action.payload] };
      },
      prepare: (tag_name, tag_fullName) => {
        return {
          payload: {
            tag_name,
            tag_fullName,
            default: false,
          },
        };
      },
    },
    update: (state, action) => {
      return {
        ...state,
        tags: state.map((tag) => {
          if (tag.tag_name === action.payload.tag_name) {
            return action.payload;
          } else return tag;
        }),
      };
    },
    remove: (state, action) => {
      return {
        ...state,
        tags: state.filter((tag) => tag.tag_name !== action.tag_name),
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTags.pending, (state) => {
        // state.status = "pending";
        state.error = null;
      })
      .addCase(fetchAllTags.fulfilled, (state, action) => {
        if (action.payload.status === "SUCCESS") {
            tagEntityAdapter.upsertMany(state, action.payload.data.tags);
        } else {
            state.error = action.payload.data.message;
        } 
      })
      .addCase(fetchAllTags.rejected, (state) => {
        // state.status = "failed";
        state.error = "Network Failure, please try again later";
      });
  },
});
// actions
export const { add, update, remove } = tagSlice.actions;
// selectors
export const getTagsStatus = (state) => [state.tags.status, state.tags.error];
export const {
  selectAll: selectAllTags,
  selectById: selectTagById,
  selectIds: selectTagIds,
  selectEntities: selectTagEntities,
} = tagEntityAdapter.getSelectors((state) => {
  return state.tags;
});

// reducers
export default tagSlice.reducer;
