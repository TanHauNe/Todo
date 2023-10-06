import { IPost } from "@/app/types/Post.type";
import { deleteData, getData, postData, putData } from "@/utils/http";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface BlogState {
  postList: IPost[];
  editPost: IPost | null;
  isLoading: boolean;
}

const initialState: BlogState = {
  postList: [],
  editPost: null,
  isLoading: false,
};

export const getPostList = createAsyncThunk(
  "blog/getPostList",
  async (_, thunkAPI) => {
    try {
      const response = await getData();

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const addPost = createAsyncThunk(
  "blog/addPost",
  async (body: Omit<IPost, "_id">, thunkAPI) => {
    try {
      const response = await postData(body);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updatePost = createAsyncThunk(
  "blog/updatePost",
  async ({ postId, body }: { postId: string; body: IPost }, thunkAPI) => {
    try {
      const response = await putData(body, postId);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deletePost = createAsyncThunk(
  "blog/deletePost",
  async (postId: string, thunkAPI) => {
    try {
      const response = await deleteData(postId);
      return response.data;
    } catch (error) {
      throw error;
    }
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
      .addCase(getPostList.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getPostList.fulfilled, (state, action) => {
        state.postList = action.payload;
        state.isLoading = false;
      })
      .addCase(getPostList.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addPost.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.postList.push(action.payload);
        state.isLoading = false;
      })
      .addCase(addPost.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updatePost.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const updatedPost = action.payload;
        const existingPostIndex = state.postList.findIndex(
          (post) => post._id === updatedPost._id
        );

        if (existingPostIndex !== -1) {
          state.postList[existingPostIndex] = updatedPost;
        }

        state.editPost = null;
        state.isLoading = false;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deletePost.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.postList = state.postList.filter(
          (post) => post._id !== action.payload._id
        );
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { cancelEditPost, startEditPost } = blogSlice.actions;

export default blogSlice.reducer;
