import {
  PayloadAction,
  createAction,
  createReducer,
  createSlice,
} from "@reduxjs/toolkit";
import { User } from "../../app/types/register.type";

interface UserState {
  userList: User[];
}

const initialState: UserState = {
  userList: [],
};

export const registerUser = createAction<User>("user/registerUser");

const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(registerUser, (state, action) => {
    const user = action.payload;
    state.userList.push(user);
  });
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerUser: (state, action: PayloadAction<User>) => {},
  },
});

export default userReducer;
