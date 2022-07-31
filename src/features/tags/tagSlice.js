import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteTag, fetchTags,putTag, updateTag } from "./tagAPI";

const initialState = {
  tags: [],
  status: "idle", // idle || pending || successed || failed
  error: null, // null || errorMsg
};

export const fetchAllTags = createAsyncThunk("tag/fetch_all", async (props) => {
  const response = await fetchTags(props);
  return response.data;
});

export const addTag = createAsyncThunk("tag/add", async (props) => {
  const response = await putTag(props);
  return response.data;
});

export const updateExistingTag = createAsyncThunk("tag/update", async (props) => {
  const response = await updateTag(props);
  return response.data;
});

export const removeTag = createAsyncThunk("tag/delete", async (props) => {
  const response = await deleteTag(props);
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
          state.tags = action.payload.data.tags;
        } else {
          state.error = action.payload.data.message;
        }
      })
      .addCase(fetchAllTags.rejected, (state) => {
        // state.status = "failed";
        state.error = "Network Failure, please try again later";
      })
      .addCase(addTag.fulfilled, (state,action) => {
        state.tags.push(action.payload.data);
      })
      .addCase(updateExistingTag.fulfilled, (state,action) => {
        if (action.payload.status === "SUCCESS") {
          state.tags = state.tags.map(tag => tag.tag_id !== action.payload.data.tag_id ? tag: action.payload.data)
          // state.updates_status = action.payload.message;
        } else {
          // state.updates_status = action.payload.message;
        }
      })
      .addCase(removeTag.fulfilled, (state,action) => {
        if (action.payload.status === "SUCCESS") {
          state.tags = state.tags.filter(tag => tag.tag_id !== action.meta.arg.tag_id)
          // state.updates_status = action.payload.message;
        } else {
          // state.updates_status = action.payload.message;
        }
      })
      ;
  },
});
// actions
export const { add, update, remove } = tagSlice.actions;
// selectors
export const getTagsStatus = (state) => [state.tags.status, state.tags.error];
export const selectAllTags = (state) => state.tags.tags;
export const selectTagEntities = (state) => {
  const entities = {};
  state.tags.tags.map((tag) => {
    const { tag_id, ...res } = tag;
    entities[[tag_id]] = { ...res };
  });
  return entities;
};

// export const {
//   selectAll: selectAllTags,
//   selectById: selectTagById,
//   selectIds: selectTagIds,
//   selectEntities: selectTagEntities,
// } = tagEntityAdapter.getSelectors((state) => {
//   return state.tags;
// });

// reducers
export default tagSlice.reducer;
