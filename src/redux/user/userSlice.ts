import { IPost } from "@/app/types/Post.type";
import { IAuth, ILogin } from "@/app/types/User.type";
import { deleteData, getData, loginAPI, postData, putData } from "@/utils/http";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface UserState {
  auth: IAuth;
  isLoading: boolean;
}

const initialState: UserState = {
  auth: {
    user: {
      _id: "",
      email: "",
      full_name: "",
      url_img: "",
      role: 0,
      createdAt: "",
      updatedAt: "",
      __v: 0,
    },
    access_token: "",
    refresh_token: "",
  },
  isLoading: false,
};

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (body: ILogin, thunkAPI) => {
    try {
      const response = await loginAPI(body);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.auth = action.payload;
        const { user, access_token } = action.payload;
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("user_id", user?._id);
        state.isLoading = false;
      })
      .addCase(loginUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export default blogSlice.reducer;
