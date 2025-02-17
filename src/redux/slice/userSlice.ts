/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import {
  loginUserThunk,
  addUserThunk,
  updateUserThunk,
  deleteUserThunk,
  getUsersThunk,
} from "../thunk/userThunk";
import { TStatus } from "@/types/TStatus";

interface UserState {
  user: any;
  users: any;
  loginStatus: TStatus;
  getUsersStatus: TStatus;
  addUserStatus: TStatus;
  updateUserStatus: TStatus;
  deleteUserStatus: TStatus;
}

const initialState: UserState = {
  user: undefined,
  users: [],
  loginStatus: null,
  getUsersStatus: null,
  addUserStatus: null,
  updateUserStatus: null,
  deleteUserStatus: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUserState: (state) => {
      state.user = undefined;
      state.loginStatus = null;
      state.addUserStatus = null;
      state.updateUserStatus = null;
      state.deleteUserStatus = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // Login user
      .addCase(loginUserThunk.pending, (state) => {
        state.loginStatus = "loading";
      })
      .addCase(loginUserThunk.fulfilled, (state, { payload }) => {
        state.loginStatus = "success";
        state.user = payload;
      })
      .addCase(loginUserThunk.rejected, (state) => {
        state.loginStatus = "failed";
      })

      // Get users
      .addCase(getUsersThunk.pending, (state) => {
        state.getUsersStatus = "loading";
      })
      .addCase(getUsersThunk.fulfilled, (state, { payload }) => {
        state.getUsersStatus = "success";
        state.users = payload;
      })
      .addCase(getUsersThunk.rejected, (state) => {
        state.getUsersStatus = "failed";
      })

      // Add user
      .addCase(addUserThunk.pending, (state) => {
        state.addUserStatus = "loading";
      })
      .addCase(addUserThunk.fulfilled, (state) => {
        state.addUserStatus = "success";
      })
      .addCase(addUserThunk.rejected, (state) => {
        state.addUserStatus = "failed";
      })

      // Update user
      .addCase(updateUserThunk.pending, (state) => {
        state.updateUserStatus = "loading";
      })
      .addCase(updateUserThunk.fulfilled, (state, { payload }) => {
        state.updateUserStatus = "success";
        state.user = { ...state.user, ...payload }; // Aktualizacja danych użytkownika
      })
      .addCase(updateUserThunk.rejected, (state) => {
        state.updateUserStatus = "failed";
      })

      // Delete user
      .addCase(deleteUserThunk.pending, (state) => {
        state.deleteUserStatus = "loading";
      })
      .addCase(deleteUserThunk.fulfilled, (state) => {
        state.deleteUserStatus = "success";
        state.user = null;
      })
      .addCase(deleteUserThunk.rejected, (state) => {
        state.deleteUserStatus = "failed";
      });
  },
});

export const { resetUserState } = userSlice.actions;
export default userSlice.reducer;
