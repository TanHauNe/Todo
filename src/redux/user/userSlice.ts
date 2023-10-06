import { IAuth, ILogin } from "@/app/[lang]/types/User.type";
import { setUserDataInCookie } from "@/common/cookie";

import { loginAPI } from "@/utils/http";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
        const userId = user?._id;

        localStorage.setItem("access_token", access_token);
        localStorage.setItem("user_id", userId);
        // setUserDataInCookie(access_token, "a", 15);
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
