import { createSlice } from "@reduxjs/toolkit";

import { fetchUserThunk } from "../thunk/userThunk";
import { TStatus } from "@/types/TStatus";

interface UserState {
    user: any;
    fetchUserStatus: TStatus;
}

const initialState: UserState = {
    user: undefined,
    fetchUserStatus: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserThunk.pending, (state) => {
                state.fetchUserStatus = "loading";
            })
            .addCase(fetchUserThunk.fulfilled, (state, { payload }) => {
                state.fetchUserStatus = "success";
                if (payload) {
                    state.user = payload;
                } else {
                    state.user = null;
                }
            })
            .addCase(fetchUserThunk.rejected, (state) => {
                state.fetchUserStatus = "failed";
            });
    },
});

// export const {  } = userSlice.actions;

export default userSlice.reducer;