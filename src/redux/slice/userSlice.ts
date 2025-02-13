/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUserThunk,
  loginUserThunk,
  logoutUserThunk,
  addUserThunk,
  updateUserThunk,
  deleteUserThunk,
} from "../thunk/userThunk";
import { TStatus } from "@/types/TStatus";

interface UserState {
  user: any;
  users: any;
  fetchUserStatus: TStatus;
  loginStatus: TStatus;
  logoutStatus: TStatus;
  addUserStatus: TStatus;
  updateUserStatus: TStatus;
  deleteUserStatus: TStatus;
}

const initialState: UserState = {
  user: undefined,
  users: [
    { id: 1, username: "admin", fullName: "Administrator" },
    {
      id: 2,
      username: "filpaw001",
      fullName: "Filip Pawłowski",
    },
    {
      id: 3,
      username: "kackrz000",
      fullName: "Kacper Krzyżniewski",
    },
    {
      id: 4,
      username: "szyjan004",
      fullName: "Szymon Janiak",
    },
  ],
  fetchUserStatus: null,
  loginStatus: null,
  logoutStatus: null,
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
      state.fetchUserStatus = null;
      state.loginStatus = null;
      state.logoutStatus = null;
      state.addUserStatus = null;
      state.updateUserStatus = null;
      state.deleteUserStatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch user
      .addCase(fetchUserThunk.pending, (state) => {
        state.fetchUserStatus = "loading";
      })
      .addCase(fetchUserThunk.fulfilled, (state, { payload }) => {
        state.fetchUserStatus = "success";
        state.user = payload || null;
      })
      .addCase(fetchUserThunk.rejected, (state) => {
        state.fetchUserStatus = "failed";
        state.user = null;
      })

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

      // Logout user
      .addCase(logoutUserThunk.pending, (state) => {
        state.logoutStatus = "loading";
      })
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.logoutStatus = "success";
        state.user = null;
      })
      .addCase(logoutUserThunk.rejected, (state) => {
        state.logoutStatus = "failed";
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
