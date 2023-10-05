import { Post } from "@/app/types/Post.type";
import { deleteData, getData, postData, putData } from "@/utils/http";
import {
  PayloadAction,
  createAction,
  createAsyncThunk,
  createReducer,
  createSlice,
} from "@reduxjs/toolkit";

interface BlogState {
  postList: Post[];
  editPost: Post | null;
}

const initialState: BlogState = {
  postList: [],
  editPost: null,
};

// export const addPost = createAction<Post>("blog/addPost");
// export const deletePost = createAction<string>("blog/deletePost");
// export const startEditPost = createAction<string>("blog/startEditPost");
// export const cancelEditPost = createAction("blog/cancelEditPost");
// export const finishEditPost = createAction<Post>("blog/finishEditPost");

// const blogReducer = createReducer(initialState, (builder) => {
//   builder
//     .addCase(addPost, (state, action) => {
//       state.postList.push(action.payload);
//     })
//     .addCase(deletePost, (state, action) => {})
//     .addCase(startEditPost, (state, action) => {})
//     .addCase(cancelEditPost, (state) => {
//       state.editPost = null;
//     })
//     .addCase(finishEditPost, (state, action) => {
//       const postId = action.payload.id;
//       state.postList;
//       state.editPost = null;
//     });
// });

export const getPostList = createAsyncThunk(
  "blog/getPostList",
  async (_, thunkAPI) => {
    const response = await getData();
    return response.data;
  }
);

export const addPost = createAsyncThunk(
  "blog/addPost",
  async (body: Omit<Post, "_id">, thunkAPI) => {
    const response = await postData(body);
    return response.data;
  }
);

export const updatePost = createAsyncThunk(
  "blog/updatePost",
  async ({ postId, body }: { postId: string; body: Post }, thunkAPI) => {
    const response = await putData(body, postId);
    return response.data;
  }
);

export const deletePost = createAsyncThunk(
  "blog/deletePost",
  async (postId: string, thunkAPI) => {
    const response = await deleteData(postId);
    return response.data;
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    startEditPost: (state, action: PayloadAction<string>) => {
      const postId = action.payload;
      const foundPost =
        state.postList.find((post) => post._id === postId) || null;
      state.editPost = foundPost;
    },
    cancelEditPost: (state) => {
      state.editPost = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getPostList.fulfilled, (state, action) => {
        state.postList = action.payload;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.postList.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.editPost = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.postList = state.postList.filter(
          (post) => post._id !== action.payload
        );
      });
  },
});

export const { cancelEditPost, startEditPost } = blogSlice.actions;

export default blogSlice.reducer;
